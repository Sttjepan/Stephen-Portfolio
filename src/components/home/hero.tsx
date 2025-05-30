import React, { useRef, useEffect, useState } from 'react';

// Pong game with serve delay, alternating serve, dashed center line, spin, difficulty, game-over, and visual polish
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [difficulty, setDifficulty] = useState<'Easy'|'Medium'|'Hard'>('Medium');
  const [lineFlash, setLineFlash] = useState(false);

  // Prevent arrow-key scrolling
  useEffect(() => {
    const preventScroll = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
    };
    window.addEventListener('keydown', preventScroll, { passive: false });
    return () => window.removeEventListener('keydown', preventScroll);
  }, []);

  // Serve control
  const nextServer = useRef<'player'|'cpu'>(Math.random()<0.5?'player':'cpu');
  const isServing = useRef(false);

  // Music
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    gameStarted ? audio.play() : audio.pause();
  }, [gameStarted, volume]);

  useEffect(() => {
    if (!gameStarted) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const paddleW=10, paddleH=100, ballSize=10, baseSpeed=3;
    let leftY=(canvas.height-paddleH)/2, rightY=(canvas.height-paddleH)/2;
    let ballX=canvas.width/2, ballY=canvas.height/2;
    let ballSpeedX=0, ballSpeedY=0;
    let up=false, down=false;
    let animationId: number, serveTimeout: number;

    // CPU speed by difficulty
    const cpuSpeed = difficulty==='Easy'?2 : difficulty==='Hard'?5 : 3;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') up = true;
      if (e.key === 'ArrowDown') down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') up = false;
      if (e.key === 'ArrowDown') down = false;
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Serve logic
    const startServe = () => {
      isServing.current = true;
      ballX = canvas.width/2; ballY = canvas.height/2;
      ballSpeedX = 0; ballSpeedY = 0;
      serveTimeout = window.setTimeout(() => {
        isServing.current = false;
        const dir = nextServer.current === 'player' ? 1 : -1;
        ballSpeedX = baseSpeed * dir;
        ballSpeedY = baseSpeed * (Math.random() < 0.5 ? 1 : -1);
        nextServer.current = nextServer.current === 'player' ? 'cpu' : 'player';
      }, 1000);
    };
    startServe();

    const gameLoop = () => {
      // Win check
      if ((playerScore >= 11 || cpuScore >= 11) && Math.abs(playerScore - cpuScore) >= 2) {
        setWinner(playerScore > cpuScore ? 'Player' : 'CPU');
        setGameStarted(false);
        return;
      }

      // Move paddles
      if (up) leftY = Math.max(0, leftY - 5);
      if (down) leftY = Math.min(canvas.height - paddleH, leftY + 5);
      rightY = ballY < rightY + paddleH/2
        ? Math.max(0, rightY - cpuSpeed)
        : Math.min(canvas.height - paddleH, rightY + cpuSpeed);

      // Ball movement
      if (!isServing.current) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        if (ballY <= 0 || ballY + ballSize >= canvas.height) ballSpeedY = -ballSpeedY;
        // Paddle collisions with spin
        if (ballX <= paddleW && ballY + ballSize >= leftY && ballY <= leftY + paddleH) {
          ballSpeedX = -ballSpeedX * 1.05;
          ballSpeedY = ballSpeedY * 1.05 + (up ? -1 : down ? 1 : 0);
        }
        if (ballX + ballSize >= canvas.width - paddleW && ballY + ballSize >= rightY && ballY <= rightY + paddleH) {
          ballSpeedX = -ballSpeedX * 1.05;
          ballSpeedY = ballSpeedY * 1.05;
        }
        // Score
        if (ballX < 0) { setCpuScore(s => s + 1); setLineFlash(true); startServe(); }
        if (ballX > canvas.width) { setPlayerScore(s => s + 1); setLineFlash(true); startServe(); }
      }

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = lineFlash ? '#f0f' : '#fff';
      ctx.setLineDash([10,10]);
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, 0);
      ctx.lineTo(canvas.width/2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, leftY, paddleW, paddleH);
      ctx.fillRect(canvas.width - paddleW, rightY, paddleW, paddleH);
      ctx.fillRect(ballX, ballY, ballSize, ballSize);

      animationId = requestAnimationFrame(gameLoop);
    };
    animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
      clearTimeout(serveTimeout);
    };
  }, [gameStarted, playerScore, cpuScore, difficulty]);

  // Reset lineFlash
  useEffect(() => {
    if (!lineFlash) return;
    const timer = window.setTimeout(() => setLineFlash(false), 300);
    return () => clearTimeout(timer);
  }, [lineFlash]);

  const handleStart = () => {
    setPlayerScore(0);
    setCpuScore(0);
    setWinner(null);
    nextServer.current = Math.random()<0.5?'player':'cpu';
    setGameStarted(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-foreground overflow-hidden">
      {/* Score */}
      <div className="absolute top-2 text-white text-xl">{playerScore} : {cpuScore}</div>
      {/* Canvas */}
      <canvas ref={canvasRef} width={640} height={480} className="border" tabIndex={0} />
      {/* Overlay */}
      {!gameStarted && (
        <div className="absolute flex flex-col items-center bg-black bg-opacity-75 p-6 rounded">
          {winner && <p className="text-white mb-2">{winner} wins! 🎉</p>}
          <div className="text-white mb-2">Use ↑ ↓ to move</div>
          <div className="text-white mb-2">Difficulty:</div>
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value as any)}
            className="mb-4 px-2 py-1"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button
            onClick={handleStart}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            {winner ? 'Restart' : 'Start'}
          </button>
        </div>
      )}
      {/* Volume */}
      <div className="absolute bottom-4 flex items-center text-white">
        <label htmlFor="volume" className="mr-2">Music Vol:</label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
        />
      </div>
      <audio ref={audioRef} src="/Music/music1.ogg" loop />
    </div>
  );
}
