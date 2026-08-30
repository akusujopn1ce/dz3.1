import './style.css'; 

function App() {
  return (
    <div className="container py-5">
      
      <header className="text-center mb-5 border-bottom border-secondary pb-4">
        <h1 className="swapi-header">SWAPI Explorer</h1>
        <p className="text-white-50">Інтерфейс бази даних "Зоряних війн"</p>
      </header>

      <div className="row mb-5">
        <div className="col-12">
          <div className="btn-group w-100" role="group">
            <button type="button" className="btn btn-outline-warning active">Персонажі</button>
            <button type="button" className="btn btn-outline-warning">Планети</button>
            <button type="button" className="btn btn-outline-warning">Зорельоти</button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        
        <div className="col-md-4">
          <div className="card custom-card h-100 text-light">
            <div className="card-body">
              <h5 className="card-title">Luke Skywalker</h5>
              <h6 className="card-subtitle mb-3 text-secondary">Стать: чоловіча</h6>
              <ul className="list-unstyled mb-4">
                <li className="mb-1"><strong>Зріст:</strong> 172 см</li>
                <li className="mb-1"><strong>Вага:</strong> 77 кг</li>
                <li className="mb-1"><strong>Рік народження:</strong> 19BBY</li>
              </ul>
              <button className="btn btn-warning w-100">Детальніше</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card custom-card h-100 text-light">
            <div className="card-body">
              <h5 className="card-title">C-3PO</h5>
              <h6 className="card-subtitle mb-3 text-secondary">Стать: n/a</h6>
              <ul className="list-unstyled mb-4">
                <li className="mb-1"><strong>Зріст:</strong> 167 см</li>
                <li className="mb-1"><strong>Вага:</strong> 75 кг</li>
                <li className="mb-1"><strong>Рік народження:</strong> 112BBY</li>
              </ul>
              <button className="btn btn-warning w-100">Детальніше</button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card custom-card h-100 text-light">
            <div className="card-body">
              <h5 className="card-title">R2-D2</h5>
              <h6 className="card-subtitle mb-3 text-secondary">Стать: n/a</h6>
              <ul className="list-unstyled mb-4">
                <li className="mb-1"><strong>Зріст:</strong> 96 см</li>
                <li className="mb-1"><strong>Вага:</strong> 32 кг</li>
                <li className="mb-1"><strong>Рік народження:</strong> 33BBY</li>
              </ul>
              <button className="btn btn-warning w-100">Детальніше</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;