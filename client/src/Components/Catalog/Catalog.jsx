import { useState } from "react";
import { useCars } from "../../services/carService";
import CarCatalogItem from "./car-catalog-item/CarCatalogItem";

import './Catalog.css'

export default function Catalog() {
  const pageSize = 8;
  const [currentPage,setCurrentPage] = useState(1);
  const { cars } = useCars();

  const totalCars = cars.length;
  const totalPages = Math.ceil(totalCars/pageSize);
  const displayedCars = cars.slice((currentPage-1) * pageSize,currentPage * pageSize);
   return (
       <>
      <div className="featured-cars-content">
        <div className="row">
         
         {displayedCars.length > 0 
         ? displayedCars.map(car => <CarCatalogItem key={car._id}{...car} />)
         : <h3>No added cars yet!</h3>}
        </div>

        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage-1)}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button disabled={currentPage == totalPages} onClick={() => setCurrentPage(currentPage +1)}>
            Next
          </button>
        </div>
      </div>
       </>
   );
}