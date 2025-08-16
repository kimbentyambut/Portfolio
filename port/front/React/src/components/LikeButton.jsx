import { useState, useEffect } from "react";

const API = "https://portfolio-ahuh.onrender.com/api";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [popping, setPopping] = useState(false);
  const [pending, setPending] = useState(false);
  const [reqId, setReqId] = useState(0); // to ignore stale responses

  const fetchCount = async (currentId) => {
    try {
      const res = await fetch(`${API}/likes`, { cache: "no-store" });
      const data = await res.json();
      // ignore if a newer request started after this one
      if (currentId !== reqId) return;
      if (data?.success && typeof data.count === "number") {
        setLikes(data.count);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = reqId + 1;
    setReqId(id);
    fetchCount(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // on mount

  const handleLike = async () => {
    if (pending) return;         // block spam clicks during a request
    setPending(true);
    setPopping(true);

    // optimistic bump
    setLikes((prev) => prev + 1);

    try {
      await fetch(`${API}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      // after POST, refetch canonical count
      const id = reqId + 1;
      setReqId(id);
      await fetchCount(id);
    } catch {
      // rollback optimistic bump on failure
      setLikes((prev) => Math.max(0, prev - 1));
    } finally {
      setPending(false);
      setTimeout(() => setPopping(false), 500);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={pending}
      className={`relative flex items-center gap-2 px-3 py-2 bg-white rounded-full shadow 
                  transition transform ${pending ? "opacity-70" : "hover:scale-105"}`}
      aria-label="Like"
    >
      {/* Heart pop */}
      {popping && (
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl animate-pop">
          ❤️
        </span>
      )}

      <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
        <path d="M12 21s-6.716-4.438-9.333-7.056C.727 11.999.5 9.5 2.1 7.9a4.243 4.243 0 0 1 6 0L12 9.8l3.9-1.9a4.243 4.243 0 0 1 6 0c1.6 1.6 1.373 4.099-.567 6.044C18.716 16.562 12 21 12 21z" />
      </svg>

      <span className="text-gray-700 font-medium">
        {loading ? "…" : likes}
      </span>
    </button>
  );
};

export default LikeButton;
