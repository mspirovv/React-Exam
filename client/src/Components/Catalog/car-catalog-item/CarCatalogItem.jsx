import { Link } from "react-router";

export default function CarCatalogItem({
    _id,
    brand,
    model,
    price,
    imageUrl,
    year,
    transmission

}) {
   return (
    <div className="col-lg-3 col-md-4 col-sm-6">
    <div className="single-featured-cars">
      <div className="featured-img-box">
        <div className="featured-cars-img">
          <img src={imageUrl} alt="cars" />
        </div>
        <div className="featured-model-info">
          <p>
            <span className="featured-mi-span"> year: {year}</span>
            <span className="featured-hp-span"> transmission: {transmission}</span>
          </p>
        </div>
      </div>
      <div className="featured-cars-txt">
        <h2>
          <a href="#">
           {brand}<span> {model}</span>
          </a>
        </h2>
     <h3>price: {price}$</h3>

      </div>
      <div className="details-btn">
   

 <Link to={`/cars/${_id}/details`} className="welcome-btn new-cars-btn" >
view details </Link>

</div>
    </div>
    
  </div>
   );
}