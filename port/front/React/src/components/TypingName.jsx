import { useState, useEffect } from "react";

export default function TypingName() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const fullText = "Kevin king D. Yabut";
    
    const startTyping = () => {
      let index = 0;
      setDisplayText("");
      
      const typingInterval = setInterval(() => {
        if (index < fullText.length) { 
          setDisplayText(fullText.substring(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
    };


    startTyping();
    

    const loopInterval = setInterval(startTyping, 10000);

    return () => {
      clearInterval(loopInterval);
    };
  }, []);

  return (
  <h1 className="text-4xl md:text-5xl font-bold text-white/60 backdrop-blur-sm drop-shadow-md ">
    {displayText}
    <span className="border-r-2 border-white animate-pulse ml-1"></span>
  </h1>
);

}