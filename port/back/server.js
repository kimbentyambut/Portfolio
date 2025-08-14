
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api", (req, res) => {
  res.json({ message: "Hello from backend!" });
});


app.post("/api/contact", (req, res) => {
  console.log(req.body);
  res.json({ success: true, msg: "Message received!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
