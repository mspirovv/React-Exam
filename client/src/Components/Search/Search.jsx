import './Search.css'

export default function Search() {
  return (
    <div className="search-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="model-search-content">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="single-model-search">
                  <h2>Search by name</h2>
                  <div className="model-select-icon">
                    <input placeholder="example - BMW" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div className="single-model-search">
                  <h2>Select price</h2>
                  <div className="model-select-icon">
                    <input placeholder="enter price $" />
                  </div>
                </div>
              </div>
              <div className="col-md-12 text-center">
                <div className="single-model-search">
                  <button
                    className="welcome-btn model-search-btn"
                    onClick={() => window.location.href = '#'}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
