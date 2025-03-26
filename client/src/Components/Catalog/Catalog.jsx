import { useCars } from "../../services/carService";
import CarCatalogItem from "./car-catalog-item/CarCatalogItem";

import './Catalog.css'

export default function Catalog() {
   
  const { cars } = useCars();
   return (
       <>
       {/* <section id="featured-cars" className="featured-cars"> */}
    {/* <div className="container">
      <div className="section-header">
        <p>
          checkout <span>the</span> featured cars
        </p> */}
        {/* <h2>featured cars</h2> */}
      {/* </div> */}
      {/*/.section-header*/}
      <div className="featured-cars-content">
        <div className="row">
         
         {cars.length > 0 
         ? cars.map(car => <CarCatalogItem key={car._id}{...car} />)
         : <h3>No added cars yet!</h3>}
        </div>
      </div>
    {/* </div> */}
    {/*/.container*/}
  {/* </section> */}
       </>
   );
}