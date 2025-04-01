import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useCars } from "../../services/carService";
import CarCatalogItem from "./car-catalog-item/CarCatalogItem";

import './Catalog.css'


export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 8;

  const { cars } = useCars();
  const totalCars = cars.length;
  const totalPages = totalCars > 0 ? Math.ceil(totalCars / pageSize) : 1;

  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromUrl);
  const displayedCars = cars.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    if (!searchParams.has("page")) {
      setSearchParams({ page: "1" }, { replace: true });
    }
  }, []);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setSearchParams({ page: newPage.toString() });
  }
  return (
    <>
      <div className="featured-cars-content">
        <div className="row">

          {displayedCars.length > 0
            ? displayedCars.map(car => <CarCatalogItem key={car._id}{...car} />)
            : <h3>No added cars yet!</h3>}
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage == totalPages} onClick={() => changePage(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}