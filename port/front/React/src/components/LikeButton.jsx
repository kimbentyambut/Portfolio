import { useState, useEffect } from "react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-ahuh.onrender.com/api/likes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLikes(data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLike = () => {
    fetch("https://portfolio-ahuh.onrender.com/api/likes", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLikes(data.count);
      });
  };

  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow hover:scale-105 transition"
    >

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Facebook_Like_button.svg/1200px-Facebook_Like_button.svg.png"
        alt="Like"
        className="w-6 h-6"
      />


      <span className="text-gray-700 font-medium">
        {loading ? "..." : likes}
      </span>
    </button>
  );
};

export default LikeButton;
