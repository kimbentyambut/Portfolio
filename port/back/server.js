const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("typingChallenge");
    console.log("Connected to MongoDB!");
    
    // Create indexes
    await db.collection("leaderboards").createIndex({ "challenge": 1, "wpm": -1 });
    await db.collection("comments").createIndex({ "createdAt": -1 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.post("/api/contact", (req, res) => {
  console.log(req.body);
  res.json({ success: true, msg: "Message received!" });
});


app.post("/api/comments", async (req, res) => {
  try {
    const { name, message } = req.body;

   
    if (!name || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "Name and message are required" 
      });
    }

    if (name.trim().length === 0 || message.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: "Name and message cannot be empty" 
      });
    }

    if (name.length > 50) {
      return res.status(400).json({ 
        success: false, 
        error: "Name must be 50 characters or less" 
      });
    }

    if (message.length > 500) {
      return res.status(400).json({ 
        success: false, 
        error: "Message must be 500 characters or less" 
      });
    }


    const comment = {
      name: name.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      approved: true 
    };


    const result = await db.collection("comments").insertOne(comment);
    

    const createdComment = {
      ...comment,
      _id: result.insertedId
    };

    res.json({
      success: true,
      message: "Comment posted successfully",
      comment: createdComment
    });

  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

app.get("/api/comments", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

  
    const comments = await db.collection("comments")
      .find({ approved: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

 
    const totalComments = await db.collection("comments").countDocuments({ approved: true });

    res.json({
      success: true,
      comments: comments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalComments / limit),
        totalComments: totalComments,
        hasMore: skip + comments.length < totalComments
      }
    });

  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});

app.delete("/api/comments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        error: "Comment ID is required" 
      });
    }

    const result = await db.collection("comments").deleteOne({ 
      _id: new require('mongodb').ObjectId(id) 
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Comment not found" 
      });
    }

    res.json({
      success: true,
      message: "Comment deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ 
      success: false, 
      error: "Internal server error" 
    });
  }
});


app.post("/api/likes", async (req, res) => {
  try {
    const result = await db.collection("likes").findOneAndUpdate(
      { section: "landing" },
      { $inc: { count: 1 } },
      { 
        returnDocument: "after", 
        upsert: true,
        projection: { count: 1 }
      } 
    );

    if (!result || !result.value || typeof result.value.count !== 'number') {
      const doc = await db.collection("likes").findOne({ section: "landing" });
      const count = doc?.count ?? 1; 
      
      return res.json({
        success: true,
        count: count,
      });
    }

    res.json({
      success: true,
      count: result.value.count,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

app.get("/api/likes", async (req, res) => {
  try {
    const doc = await db.collection("likes").findOne({ section: "landing" });
    res.json({
      success: true,
      count: doc?.count ?? 0,
    });
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Existing typing game routes
app.post("/api/typing-result", async (req, res) => {
  try {
    const { username, challenge, wpm, accuracy, timeElapsed, completionTime } = req.body;

    if (!username || !challenge || !wpm || !accuracy || !timeElapsed) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingRecord = await db.collection("leaderboards").findOne({
      username: username.toLowerCase(),
      challenge: challenge
    });

    const resultData = {
      username: username.toLowerCase(),
      displayName: username,
      challenge: challenge,
      wpm: parseInt(wpm),
      accuracy: parseFloat(accuracy),
      timeElapsed: parseFloat(timeElapsed),
      completionTime: completionTime || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (existingRecord) {
      if (parseInt(wpm) > existingRecord.wpm) {
        await db.collection("leaderboards").updateOne(
          { username: username.toLowerCase(), challenge: challenge },
          { $set: resultData }
        );
        res.json({ 
          success: true, 
          message: "Personal best updated!",
          improved: true,
          previousWpm: existingRecord.wpm
        });
      } else {
        res.json({ 
          success: true, 
          message: "Result recorded (no improvement)",
          improved: false,
          currentBest: existingRecord.wpm
        });
      }
    } else {
      await db.collection("leaderboards").insertOne({
        ...resultData,
        createdAt: new Date().toISOString()
      });
      res.json({ 
        success: true, 
        message: "First attempt recorded!",
        improved: true
      });
    }

  } catch (error) {
    console.error("Error saving typing result:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/leaderboard/:challenge", async (req, res) => {
  try {
    const challenge = req.params.challenge;
    const limit = parseInt(req.query.limit) || 10;

    const leaderboard = await db.collection("leaderboards")
      .find({ challenge: challenge })
      .sort({ wpm: -1, timeElapsed: 1 })
      .limit(limit)
      .toArray();

    res.json({
      success: true,
      challenge: challenge,
      leaderboard: leaderboard.map((entry, index) => ({
        rank: index + 1,
        displayName: entry.displayName,
        wpm: entry.wpm,
        accuracy: entry.accuracy,
        timeElapsed: entry.timeElapsed,
        completionTime: entry.completionTime,
        updatedAt: entry.updatedAt
      }))
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/leaderboards", async (req, res) => {
  try {
    const challenges = await db.collection("leaderboards").distinct("challenge");
    const allLeaderboards = {};
    
    for (const challenge of challenges) {
      const leaderboard = await db.collection("leaderboards")
        .find({ challenge: challenge })
        .sort({ wpm: -1, timeElapsed: 1 })
        .limit(10)
        .toArray();
      
      allLeaderboards[challenge] = leaderboard.map((entry, index) => ({
        rank: index + 1,
        displayName: entry.displayName,
        wpm: entry.wpm,
        accuracy: entry.accuracy,
        timeElapsed: entry.timeElapsed,
        completionTime: entry.completionTime
      }));
    }

    res.json({
      success: true,
      leaderboards: allLeaderboards
    });

  } catch (error) {
    console.error("Error fetching all leaderboards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/user-records/:username", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();

    const userRecords = await db.collection("leaderboards")
      .find({ username: username })
      .sort({ wpm: -1 })
      .toArray();

    res.json({
      success: true,
      username: username,
      records: userRecords.map(record => ({
        challenge: record.challenge,
        wpm: record.wpm,
        accuracy: record.accuracy,
        timeElapsed: record.timeElapsed,
        completionTime: record.completionTime,
        updatedAt: record.updatedAt
      }))
    });

  } catch (error) {
    console.error("Error fetching user records:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/check-username/:username", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();
    const userExists = await db.collection("leaderboards")
      .findOne({ username: username });

    res.json({
      success: true,
      exists: !!userExists,
      username: username
    });

  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/stats", async (req, res) => {
  try {
    const totalUsers = await db.collection("leaderboards").distinct("username");
    const totalChallenges = await db.collection("leaderboards").distinct("challenge");
    const totalAttempts = await db.collection("leaderboards").countDocuments();
    
    const topWpmRecord = await db.collection("leaderboards")
      .findOne({}, { sort: { wpm: -1 } });

    res.json({
      success: true,
      stats: {
        totalUsers: totalUsers.length,
        totalChallenges: totalChallenges.length,
        totalAttempts: totalAttempts,
        topWpm: topWpmRecord ? {
          wpm: topWpmRecord.wpm,
          user: topWpmRecord.username,
          challenge: topWpmRecord.challenge
        } : null
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await client.close();
  process.exit(0);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));