import { useState, useEffect } from 'react';
import './style.css';

const initialEmojis = [
  { id: 1, symbol: '😃', count: 0 },
  { id: 2, symbol: '😊', count: 0 },
  { id: 3, symbol: '😎', count: 0 },
  { id: 4, symbol: '🤩', count: 0 },
  { id: 5, symbol: '😍', count: 0 },
];

function App() {
  const [emojis, setEmojis] = useState(() => {
    const savedData = localStorage.getItem('emojiVotes');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return initialEmojis;
  });

  const [winner, setWinner] = useState(null);

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = (id) => {
    setEmojis(
      emojis.map((emoji) =>
        emoji.id === id ? { ...emoji, count: emoji.count + 1 } : emoji
      )
    );
    if (winner) setWinner(null);
  };

  const showResults = () => {
    const maxVotes = Math.max(...emojis.map(e => e.count));
    
    if (maxVotes === 0) {
      setWinner({ symbol: '🤷‍♂️', text: 'Голосів ще немає!' });
      return;
    }

    const winningEmoji = emojis.find(e => e.count === maxVotes);
    setWinner({ symbol: winningEmoji.symbol, text: `Кількість голосів: ${maxVotes}` });
  };

  const clearResults = () => {
    setEmojis(initialEmojis); 
    setWinner(null); 
    localStorage.removeItem('emojiVotes'); 
  };

  return (
    <div className="voting-container">
      <h1 className="title">Голосування за найкращий смайлик</h1>

      <div className="emoji-grid">
        {emojis.map((emoji) => (
          <div 
            key={emoji.id} 
            className="emoji-card"
            onClick={() => handleVote(emoji.id)}
          >
            <span className="emoji-icon">{emoji.symbol}</span>
            <span className="emoji-count">{emoji.count}</span>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={showResults}>
          Показати результати
        </button>
        <button className="btn btn-danger" onClick={clearResults}>
          Очистити результати
        </button>
      </div>

      {winner && (
        <div className="results-section">
          <h2 className="winner-title">Результати голосування:</h2>
          <h3>Переможець:</h3>
          <div className="winner-emoji">{winner.symbol}</div>
          <p className="emoji-count">{winner.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;