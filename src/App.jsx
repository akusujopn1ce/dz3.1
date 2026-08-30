import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';
import './App.css';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="app-wrapper">
      <div className="counter-card">
        <h1 className="title">Redux Counter</h1>
        
        <div className="display-area">
          <span className="label">Value:</span>
          <span className="number">{count}</span>
        </div>

        <div className="buttons-area">
          <button className="btn btn-minus" onClick={() => dispatch(decrement())}>
            -
          </button>
          <button className="btn btn-plus" onClick={() => dispatch(increment())}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;