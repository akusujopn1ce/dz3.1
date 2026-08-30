import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSwapiData, clearData, setEndpointParts } from './store';
import './App.css';

function App() {
  const [endpoint, setEndpoint] = useState('people/1');
  
  const dispatch = useDispatch();
  const { data, loading, error, endpointParts } = useSelector((state) => state.swapi);

  const handleGetInfo = () => {
    if (endpoint.trim()) {
      const parts = endpoint.split('/').filter(part => part.trim() !== '');
      dispatch(setEndpointParts(parts));
      
      dispatch(fetchSwapiData(endpoint.trim()));
    }
  };

  const handleClear = () => {
    dispatch(clearData());
    setEndpoint(''); 
  };

  return (
    <div className="container">
      <h1 className="title">SWAPI</h1>

      <div className="input-group">
        <span className="input-prefix">https://swapi.py4e.com/api/</span>
        <input
          type="text"
          className="input-field"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          placeholder="people/1"
        />
        <button className="btn-get" onClick={handleGetInfo}>Get info</button>
      </div>

      <div className="content-area">
        {loading && <div className="status">Завантаження...</div>}
        {error && <div className="status error">Помилка: {error}</div>}
        
        {!loading && !error && data && (
          <div className="data-display">
            <div className="badges">
              {endpointParts.map((part, index) => (
                <span key={index} className="badge">{part}</span>
              ))}
            </div>
            <pre className="json-output">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="footer">
        <button className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
}

export default App;