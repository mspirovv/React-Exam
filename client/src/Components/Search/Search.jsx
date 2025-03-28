import { useState } from "react";
import { searchCars } from "../../services/carService";
import CarCatalogItem from "../Catalog/car-catalog-item/CarCatalogItem";
import "./Search.css";

export default function Search() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    setSearchStarted(true);
    const data = await searchCars(brand, price);
    console.log("Fetched Data:", data);
    setResults(data);
    setIsSearching(false);
  };

  return (
    <div className="search-container">
      <div className="search-filter">
        <div className="filter-item">
          <h3>Search by Brand</h3>
          <input
            type="text"
            placeholder="Enter car brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <h3>Select Max Price</h3>
          <input
            type="number"
            placeholder="Enter max price $"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search-results">
        {isSearching ? (
          <h3>Loading...</h3>
        ) : (
          searchStarted && results.length === 0 ? (
            <h3 className="no-matches">No results found.</h3>
          ) : (
            <div className="row">
              {results.map((car) => (
                <CarCatalogItem key={car._id} {...car} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}
