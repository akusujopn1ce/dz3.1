import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './style.css';

const initialEmojis = [
  { id: 1, symbol: '😃', count: 0 },
  { id: 2, symbol: '😊', count: 0 },
  { id: 3, symbol: '😎', count: 0 },
  { id: 4, symbol: '🤩', count: 0 },
  { id: 5, symbol: '😍', count: 0 },
];

const EmojiCard = React.memo(({ emoji, onVote }) => {
  console.log(`Рендер картки: ${emoji.symbol}`); 
  
  return (
    <div className="emoji-card" onClick={() => onVote(emoji.id)}>
      <span className="emoji-icon">{emoji.symbol}</span>
      <span className="emoji-count">{emoji.count}</span>
    </div>
  );
});

const Results = ({ winner }) => {
  if (!winner) return null;

  return (
    <div className="results-section">
      <h2 className="winner-title">Результати голосування:</h2>
      <h3>Переможець:</h3>
      <div className="winner-emoji">{winner.symbol}</div>
      <p className="emoji-count">{winner.text}</p>
    </div>
  );
};

function App() {
  const [emojis, setEmojis] = useState(() => {
    const savedData = localStorage.getItem('emojiVotes');
    return savedData ? JSON.parse(savedData) : initialEmojis;
  });

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    localStorage.setItem('emojiVotes', JSON.stringify(emojis));
  }, [emojis]);

  const handleVote = useCallback((id) => {
    setEmojis((prevEmojis) =>
      prevEmojis.map((emoji) =>
        emoji.id === id ? { ...emoji, count: emoji.count + 1 } : emoji
      )
    );
    setShowResults(false); 
  }, []);

  const handleShowResults = () => setShowResults(true);

  const handleClearResults = () => {
    setEmojis(initialEmojis);
    setShowResults(false);
    localStorage.removeItem('emojiVotes');
  };

  const winner = useMemo(() => {
    if (!showResults) return null;
    
    const maxVotes = Math.max(...emojis.map(e => e.count));
    if (maxVotes === 0) return { symbol: '🤷‍♂️', text: 'Голосів ще немає!' };
    
    const winningEmoji = emojis.find(e => e.count === maxVotes);
    return { symbol: winningEmoji.symbol, text: `Кількість голосів: ${maxVotes}` };
  }, [emojis, showResults]);

  return (
    <div className="voting-container">
      <h1 className="title">Голосування за найкращий смайлик</h1>

      <div className="emoji-grid">
        {emojis.map((emoji) => (
          <EmojiCard 
            key={emoji.id} 
            emoji={emoji} 
            onVote={handleVote} 
          />
        ))}
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={handleShowResults}>
          Показати результати
        </button>
        <button className="btn btn-danger" onClick={handleClearResults}>
          Очистити результати
        </button>
      </div>

      <Results winner={winner} />
    </div>
  );
}

export default App;