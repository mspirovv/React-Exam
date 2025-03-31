import { useState, useEffect } from "react";
import { searchCars } from "../../services/carService";
import CarCatalogItem from "../catalog/car-catalog-item/CarCatalogItem";
import "./Search.css";
import { useSearchParams } from "react-router";

export default function Search() {
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 8;

  const handleSearch = async (page = 1) => {
    setIsSearching(true);
    const skip = (page - 1) * pageSize;

    const data = await searchCars(brand, price, skip, pageSize);
    const nextPageAvailable = data.length === pageSize;

    setHasNextPage(nextPageAvailable);
    setResults(data);
    setCurrentPage(page);
    setIsSearching(false);

    setSearchParams({
      brand: brand || "",
      price: price || "",
      page: page.toString(),
    })
  };

  const totalPages = hasNextPage ? currentPage + 1 : currentPage;

  useEffect(() => {
    const brandFromUrl = searchParams.get("brand") || "";
    const priceFromUrl = searchParams.get("price") || "";
    const pageFromUrl = Number(searchParams.get("page")) || 1;

    setBrand(brandFromUrl);
    setPrice(priceFromUrl);
    handleSearch(pageFromUrl);
  }, []);

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
        <button className="search-btn" onClick={() => handleSearch(1)}>
          Search
        </button>
      </div>

      <div className="search-results">
        {isSearching ? (
          <h3>Loading...</h3>
        ) : (
          results.length === 0 && !isSearching ? (
            <h3 className="no-matches">No results found.</h3>
          ) : (
            <>
              <div className="row">
                {results.map((car) => (
                  <div key={car._id} className="car-item">
                    <CarCatalogItem {...car} />
                  </div>
                ))}
              </div>

              {results.length > 0 && (
                <div className="pagination">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handleSearch(currentPage - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={!hasNextPage}
                    onClick={() => handleSearch(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
