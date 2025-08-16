import { useState, useEffect, useRef } from "react";

const API = "https://portfolio-ahuh.onrender.com/api";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [popping, setPopping] = useState(false);
  const [pending, setPending] = useState(false);
  const abortControllerRef = useRef(null);

  const fetchCount = async () => {
    try {

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      

      abortControllerRef.current = new AbortController();
      
      const res = await fetch(`${API}/likes`, { 
        cache: "no-store",
        signal: abortControllerRef.current.signal
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data?.success && typeof data.count === "number") {
        setLikes(data.count);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching likes:", error);
   
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
    

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // on mount

  const handleLike = async () => {
    if (pending) return;
    setPending(true);
    setPopping(true);

    try {
      const res = await fetch(`${API}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      

      if (data?.success && typeof data.count === "number") {
        setLikes(data.count);
      } else {
   
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
 
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

      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-red-500" aria-hidden="true">
        <path d="M12 21s-6.716-4.438-9.333-7.056C.727 11.999.5 9.5 2.1 7.9a4.243 4.243 0 0 1 6 0L12 9.8l3.9-1.9a4.243 4.243 0 0 1 6 0c1.6 1.6 1.373 4.099-.567 6.044C18.716 16.562 12 21 12 21z" />
      </svg>

      <span className="text-gray-700 font-medium">
        {loading ? "…" : likes}
      </span>
    </button>
  );
};

export default LikeButton;