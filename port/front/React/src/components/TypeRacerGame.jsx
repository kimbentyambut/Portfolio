import { useState, useEffect, useRef } from 'react';

const TypeRacerGame = () => {

  const defaultTexts = [
    {
      title: "More About me!",
      text: "Hello! My name is Kevin, a 22-year-old from Baguio City. I grew up surrounded by my six dogs Bimbim, Bambam, Badboy, Beauty, Bearbear, and Princess and my cat named Jaguar. I studied Information Technology at Saint Louis University in Baguio. Typing fast feels just like racing, and I'm here to show my speed!",
      challengeWpm: 75,
      myTime: "42.3s"
    },
    {
      title: "Tech Philosophy", 
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Simplicity is the ultimate sophistication.",
      challengeWpm: 80,
      myTime: "38.7s"
    },
    {
      title: "Kevin's Challenge",
      text: "Building beautiful user interfaces requires attention to detail, patience, and a deep understanding of user experience. Every pixel matters, every animation counts.",
      challengeWpm: 85,
      myTime: "35.2s"
    }
  ];


  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  
 
  const [customText, setCustomText] = useState('');
  const [customWpm, setCustomWpm] = useState(75);
  const [selectedChallenge, setSelectedChallenge] = useState(defaultTexts[0]);
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  
  
  const [leaderboards, setLeaderboards] = useState({});
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentLeaderboard, setCurrentLeaderboard] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [globalStats, setGlobalStats] = useState(null);
  
  const inputRef = useRef(null);
  const gameAreaRef = useRef(null);
  const usernameInputRef = useRef(null);


  const API_BASE = 'https://portfolio-ahuh.onrender.com/api';

  useEffect(() => {
    if (selectedChallenge) {
      setCurrentText(selectedChallenge.text);
      resetGame();
      fetchLeaderboard(selectedChallenge.title);
    }
  }, [selectedChallenge]);

  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        setTimeElapsed(prev => prev + 0.1);
      }, 100);
      setTimerInterval(interval);
      
      return () => {
        clearInterval(interval);
        setTimerInterval(null);
      };
    } else if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  }, [isGameActive]);

  useEffect(() => {
    if (isGameActive && timeElapsed > 0) {
      const timeInMinutes = timeElapsed / 60;
      const wordsTyped = userInput.trim().split(/\s+/).filter(word => word.length > 0).length;
      const currentWpm = timeInMinutes > 0 ? Math.round(wordsTyped / timeInMinutes) : 0;
      setWpm(currentWpm);
      
      const correctChars = userInput.split('').filter((char, index) => char === currentText[index]).length;
      const totalChars = userInput.length;
      const currentAccuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
      setAccuracy(currentAccuracy);
    }
  }, [userInput, timeElapsed, isGameActive, currentText]);

  useEffect(() => {
    fetchGlobalStats();
  }, []);


  const fetchLeaderboard = async (challenge) => {
    try {
      const response = await fetch(`${API_BASE}/leaderboard/${encodeURIComponent(challenge)}`);
      const data = await response.json();
      if (data.success) {
        setCurrentLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      
      setCurrentLeaderboard([]);
    }
  };

  const fetchGlobalStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`);
      const data = await response.json();
      if (data.success) {
        setGlobalStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      
      setGlobalStats({
        totalUsers: 0,
        totalChallenges: 3,
        totalAttempts: 0,
        topWpm: null
      });
    }
  };

  const submitResult = async () => {
    if (!isLoggedIn || !username) return;

    try {
      const response = await fetch(`${API_BASE}/typing-result`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          challenge: selectedChallenge.title,
          wpm: wpm,
          accuracy: accuracy,
          timeElapsed: timeElapsed,
          completionTime: new Date().toISOString()
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmissionStatus(data.message);
        fetchLeaderboard(selectedChallenge.title);
        fetchGlobalStats();
      }
    } catch (error) {
      console.error('Error submitting result:', error);
      setSubmissionStatus('Error submitting result - check if server is running');
    }
  };

  const handleUsernameSubmit = () => {
  if (username.trim().length >= 2) {
    setIsLoggedIn(true);
    setShowUsernameModal(false);


    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight * 3.2,
        behavior: "smooth", 
      });
    }, 200); 
  }
};


  const resetGame = () => {
    setUserInput('');
    setStartTime(null);
    setEndTime(null);
    setIsGameActive(false);
    setIsGameComplete(false);
    setCurrentWordIndex(0);
    setCurrentCharIndex(0);
    setErrors(0);
    setWpm(0);
    setAccuracy(100);
    setTimeElapsed(0);
    setSubmissionStatus('');
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };

  const startGame = () => {
    resetGame();
    setIsGameActive(true);
    setStartTime(Date.now());
    setTimeElapsed(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (e) => {
    if (!isGameActive) return;

    const value = e.target.value;
    setUserInput(value);

  
    if (value === currentText) {
      setEndTime(Date.now());
      setIsGameActive(false);
      setIsGameComplete(true);
      if (timerInterval) {
        clearInterval(timerInterval);
        setTimerInterval(null);
      }
  
      setTimeout(() => submitResult(), 500);
    }

    const words = currentText.split(' ');
    const userWords = value.split(' ');
    let charCount = 0;
    let wordIndex = 0;

    for (let i = 0; i < userWords.length - 1; i++) {
      charCount += words[i].length + 1;
      wordIndex = i + 1;
    }

    setCurrentWordIndex(wordIndex);
    setCurrentCharIndex(charCount + (userWords[userWords.length - 1] || '').length);




    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
  };

  const useCustomText = () => {
    if (customText.trim()) {
      const customChallenge = {
        title: "Custom Challenge",
        text: customText.trim(),
        challengeWpm: customWpm,
        myTime: "N/A"
      };
      setSelectedChallenge(customChallenge);
      setShowCustomInput(false);
    }
  };

  const renderText = () => {
    const words = currentText.split(' ');
    
    return (
      <div className="text-sm md:text-base leading-relaxed font-mono">
        {words.map((word, wordIndex) => {
          const isCurrentWord = wordIndex === currentWordIndex;
          const isTypedWord = wordIndex < currentWordIndex;
          const isUpcomingWord = wordIndex > currentWordIndex;
          
          return (
            <span key={wordIndex} className="inline-block mr-2">
              {word.split('').map((char, charIndex) => {
                const globalCharIndex = words.slice(0, wordIndex).join(' ').length + (wordIndex > 0 ? 1 : 0) + charIndex;
                const isTyped = globalCharIndex < userInput.length;
                const isCorrect = isTyped && userInput[globalCharIndex] === char;
                const isCurrent = globalCharIndex === userInput.length && isGameActive;
                
                return (
                  <span
                    key={charIndex}
                    className={`${
                      isCurrent
                        ? 'bg-blue-500/30 animate-pulse'
                        : isTyped
                        ? isCorrect
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-red-500/20 text-red-300'
                        : isCurrentWord
                        ? 'text-white/80'
                        : 'text-white/50'
                    } transition-colors duration-150`}
                  >
                    {char}
                  </span>
                );
              })}
              {wordIndex < words.length - 1 && (
                <span className={`${
                  words.slice(0, wordIndex + 1).join(' ').length < userInput.length
                    ? userInput[words.slice(0, wordIndex + 1).join(' ').length] === ' '
                      ? 'bg-green-500/20'
                      : 'bg-red-500/20'
                    : 'text-white/50'
                }`}> </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  const getResultMessage = () => {
    if (!isGameComplete) return '';
    
    const myTimeSeconds = parseFloat(selectedChallenge.myTime);
    const userTimeSeconds = timeElapsed;
    
    if (selectedChallenge.myTime === "N/A") {
      return `Great job! You completed it in ${userTimeSeconds.toFixed(1)} seconds with ${wpm} WPM!`;
    }
    
    if (userTimeSeconds <= myTimeSeconds) {
      return `🎉 Incredible! You beat my time of ${selectedChallenge.myTime}! You finished in ${userTimeSeconds.toFixed(1)} seconds!`;
    } else {
      return `Good effort! You finished in ${userTimeSeconds.toFixed(1)} seconds. Can you beat my time of ${selectedChallenge.myTime}?`;
    }
  };

  const getTimeColor = () => {
    if (!isGameComplete || selectedChallenge.myTime === "N/A") return 'text-blue-300';
    const myTimeSeconds = parseFloat(selectedChallenge.myTime);
    const userTimeSeconds = timeElapsed;
    return userTimeSeconds <= myTimeSeconds ? 'text-green-400' : 'text-yellow-400';
  };


  if (showUsernameModal) {
    return (
      <div className="min-h-screen flex items-center justify-center p-3">
        <div className="w-full max-w-sm bg-[#e83fff]/50 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Type Racer Challenge
            </h2>
            <p className="text-white/80 text-sm">Enter your name to start competing</p>
          </div>
          
          {globalStats && (
            <div className="bg-white/10 rounded-2xl p-3 border border-white/20 mb-4">
              <div className="grid grid-cols-2 gap-3 text-center text-white/80 text-xs">
                <div>
                  <div className="text-xl font-bold text-cyan-300">{globalStats.totalUsers}</div>
                  <div>Players</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-purple-300">{globalStats.topWpm?.wpm || 0}</div>
                  <div>Top WPM</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <input
              ref={usernameInputRef}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit()}
              placeholder="Enter your name"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-blue-400/50 focus:outline-none transition-colors text-center text-sm"
              maxLength={20}
            />
            <button
              onClick={handleUsernameSubmit}
              disabled={username.trim().length < 2}
              className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-400 text-white font-bold rounded-2xl hover:from-pink-600 hover:to-purple-500 transition-all duration-300 disabled:opacity-100 disabled:cursor-not-allowed transform hover:scale-105 text-sm"
            >
              Start Racing! 🏎️
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 pt-55">
      <div className="max-w-7xl mx-auto">
  
        <div className="flex flex-col lg:flex-row gap-4">
      
          <div className="flex-1 lg:max-w-4xl">
            <div className="bg-gradient-to-br from-slate-900/90 via-blue-900/20 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-3 md:p-4 h-fit">
         
              <div className="text-center mb-3">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2">
                  <div className="text-center sm:text-left">
                    <h3 className="text-sm text-white/80">Welcome back,</h3>
                    <div className="text-lg font-bold text-cyan-300">{username}</div>
                  </div>
                  <div className="text-center sm:text-right lg:hidden">
                    <button
                      onClick={() => setShowLeaderboard(!showLeaderboard)}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30 rounded-2xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-xs"
                    >
                      {showLeaderboard ? 'Hide' : 'Show'} Leaderboard
                    </button>
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Type Racer Challenge
                </h2>
                <p className="text-white/80 text-sm">Can you beat my typing time? ⏱️🏎️</p>
              </div>

              <div className="space-y-3">
             
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {defaultTexts.map((challenge, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChallenge(challenge)}
                        className={`px-2 py-1.5 rounded-2xl font-medium transition-all duration-300 text-xs ${
                          selectedChallenge === challenge
                            ? 'bg-blue-500/30 text-white border border-blue-400/50'
                            : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                        }`}
                      >
                        <div className="hidden sm:block">{challenge.title} ({challenge.myTime})</div>
                        <div className="sm:hidden">{challenge.title}</div>
                      </button>
                    ))}
                     {/*<button
                      onClick={() => setShowCustomInput(!showCustomInput)}
                      className="px-2 py-1.5 rounded-2xl font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-xs"
                    >
                      Custom Text
                    </button> */}
                  </div>

              
                  {showCustomInput && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 mb-3">
                      <div className="space-y-2">
                        <div>
                          <label className="block text-white/80 text-xs font-medium mb-1">
                            Custom Challenge Text:
                          </label>
                          <textarea
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Enter your challenge text here..."
                            className="w-full p-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 resize-none h-16 focus:border-blue-400/50 focus:outline-none transition-colors text-sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-white/80 text-xs font-medium">
                            Challenge WPM:
                          </label>
                          <input
                            type="number"
                            value={customWpm}
                            onChange={(e) => setCustomWpm(parseInt(e.target.value) || 75)}
                            min="20"
                            max="200"
                            className="w-16 p-1.5 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-400/50 focus:outline-none transition-colors text-sm"
                          />
                          <button
                            onClick={useCustomText}
                            disabled={!customText.trim()}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-xl hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                          >
                            Use This Text
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 text-center border border-white/20">
                    <div className={`text-lg font-bold ${getTimeColor()}`}>{timeElapsed.toFixed(1)}s</div>
                    <div className="text-white/70 text-xs">Time</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 text-center border border-white/20">
                    <div className="text-lg font-bold text-cyan-300">{wpm}</div>
                    <div className="text-white/70 text-xs">WPM</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 text-center border border-white/20">
                    <div className="text-lg font-bold text-cyan-300">{accuracy}%</div>
                    <div className="text-white/70 text-xs">Accuracy</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 text-center border border-white/20">
                    <div className="text-lg font-bold text-purple-300">{selectedChallenge.myTime}</div>
                    <div className="text-white/70 text-xs">My Time</div>
                  </div>
                </div>

                <div 
                  ref={gameAreaRef}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/20 h-[180px] overflow-y-auto"
                >
                  <div className="mb-2 text-center">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {selectedChallenge.title} - Beat my time: {selectedChallenge.myTime}!
                    </span>
                  </div>
                  {renderText()}
                </div>

             
                <div>
                  <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    disabled={!isGameActive}
                    placeholder={isGameActive ? "Start typing..." : "Click 'Start Challenge' to begin"}
                    className="w-full p-2.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 resize-none h-14 focus:border-blue-400/50 focus:outline-none transition-colors disabled:opacity-50 text-sm"
                  />
                </div>

        

                <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                  <button
                    onClick={startGame}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-500 transform hover:scale-105 transition-all duration-300 text-sm"
                  >
                    {isGameActive ? 'Restart Challenge' : 'Start Challenge'}
                  </button>
                  <button
                    onClick={resetGame}
                    className="w-full sm:w-auto px-4 py-2 bg-white/10 text-white font-medium rounded-2xl hover:bg-white/20 border border-white/20 transition-all duration-300 text-sm"
                  >
                    Reset
                  </button>
                </div>
           
                {isGameComplete && (
                  <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20 text-center">
                    <h3 className="text-lg font-bold text-white mb-1">Challenge Complete!</h3>
                    <p className="text-sm text-white/90 mb-2">{getResultMessage()}</p>
                    <div className="flex justify-center space-x-4 text-xs text-white/70 mb-2">
                      <span>Time: {timeElapsed.toFixed(1)}s</span>
                      <span>Words: {currentText.split(' ').length}</span>
                      <span>Characters: {currentText.length}</span>
                    </div>
                    {submissionStatus && (
                      <div className={`text-xs font-medium ${submissionStatus.includes('updated') || submissionStatus.includes('recorded') ? 'text-green-400' : 'text-yellow-400'}`}>
                        {submissionStatus}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

      
          <div className={`w-full lg:w-80 ${showLeaderboard || 'hidden'} lg:block`}>
            <div className="bg-gradient-to-br from-slate-900/90 via-purple-900/20 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-3 md:p-4 h-fit">
           
              <div className="hidden lg:flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-white">
                  🏆 Leaderboard & Stats
                </h3>
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-400/30 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 text-xs"
                >
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <h3 className="text-sm font-bold text-white mb-3 text-center">
                    🏆 {selectedChallenge.title} Leaderboard
                  </h3>
                  
                  {currentLeaderboard.length > 0 ? (
                    <div className="space-y-1">
                      {currentLeaderboard.slice(0, 8).map((entry, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-2 rounded-xl transition-all duration-300 ${
                            entry.displayName.toLowerCase() === username.toLowerCase()
                              ? 'bg-blue-500/20 border border-blue-400/30'
                              : 'bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-500/20 text-yellow-300' :
                              index === 1 ? 'bg-gray-400/20 text-gray-300' :
                              index === 2 ? 'bg-orange-500/20 text-orange-300' :
                              'bg-white/10 text-white/70'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-white font-medium text-xs">
                                {entry.displayName}
                              </div>
                              <div className="text-white/60 text-xs">
                                {entry.accuracy}% acc
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-xs">{entry.wpm} WPM</div>
                            <div className="text-white/60 text-xs">{entry.timeElapsed.toFixed(1)}s</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-white/60 py-4">
                      <p className="text-xs">No scores yet!</p>
                      <p className="text-xs mt-1">Be the first to complete this challenge!</p>
                    </div>
                  )}
                </div>

    
                {globalStats && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                    <h3 className="text-sm font-bold text-white mb-2 text-center">
                      📊 Global Stats
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">Total Players:</span>
                        <span className="text-cyan-300 font-bold text-xs">{globalStats.totalUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">Total Challenges:</span>
                        <span className="text-purple-300 font-bold text-xs">{globalStats.totalChallenges}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-xs">Total Attempts:</span>
                        <span className="text-blue-300 font-bold text-xs">{globalStats.totalAttempts}</span>
                      </div>
                      {globalStats.topWpm && (
                        <div className="pt-1 border-t border-white/20">
                          <div className="text-center">
                            <div className="text-white/80 text-xs">Top WPM Record</div>
                            <div className="text-lg font-bold text-yellow-400">{globalStats.topWpm.wpm}</div>
                            <div className="text-white/60 text-xs">by {globalStats.topWpm.user}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

           
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <h3 className="text-sm font-bold text-white mb-2 text-center">
                    🚀 Quick Switch
                  </h3>
                  <div className="space-y-1">
                    {defaultTexts.map((challenge, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedChallenge(challenge)}
                        className={`w-full p-2 rounded-xl text-left transition-all duration-300 ${
                          selectedChallenge === challenge
                            ? 'bg-blue-500/30 border border-blue-400/50'
                            : 'bg-white/5 hover:bg-white/10 border border-white/10'
                        }`}
                      >
                        <div className="text-white font-medium text-xs">{challenge.title}</div>
                        <div className="text-white/60 text-xs">Target: {challenge.challengeWpm} WPM</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypeRacerGame;