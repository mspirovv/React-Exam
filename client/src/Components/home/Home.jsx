import { useCars } from "../../services/carService";
import { Link } from "react-router";
import { useState, useEffect } from "react";

import './Home.css'

export default function Home() {
  const { cars } = useCars();
  const [carLikes, setCarLikes] = useState({}); 

  const fetchLikes = async (carId) => {
    try {
      const res = await fetch(`http://localhost:3030/data/likes?where=carId%3D%22${carId}%22`);
      const data = await res.json();
      return data.length; 
    } catch (error) {
      console.error("Error fetching likes:", error);
      return 0;
    }
  };

  useEffect(() => {
    const getLikesForCars = async () => {
      const likesForCars = {};
      for (const car of cars) {
        const likesCount = await fetchLikes(car._id);
        likesForCars[car._id] = likesCount; 
      }
      setCarLikes(likesForCars);
    };

    if (cars && cars.length > 0) {
      getLikesForCars();
    }
  }, [cars]);

  if (!cars || cars.length === 0) {
    return <p>Loading cars...</p>;
  }

  const sortedCars = [...cars].sort((a, b) => (carLikes[b._id] || 0) - (carLikes[a._id] || 0));

  const topCars = sortedCars.slice(0, 4);

  return (
    <>
      <section id="top-cars-home" className="top-cars-home">
        <div className="top-cars-container">
          <div className="top-cars-section-header">
            <p>
              Checkout <span>the</span> most liked cars
            </p>
            <h2>Top 4</h2>
          </div>

          <div className="row">
            {topCars.map(({ _id, imageUrl, year, transmission, brand, model, price }) => (
              <div key={_id} className="col-lg-3 col-md-4 col-sm-6">
                <div className="single-featured-cars">
                  <div className="featured-img-box">
                    <div className="featured-cars-img">
                      <img src={imageUrl} alt={`${brand} ${model}`} />
                    </div>
                    <div className="featured-model-info">
                      <p>
                        <span className="featured-mi-span">Year: {year}</span>
                        <span className="featured-hp-span">Transmission: {transmission}</span>
                      </p>
                    </div>
                  </div>
                  <div className="featured-cars-txt-home">
                    <h2>
                    {brand} <span>{model}</span>
                    </h2>
                    <h3>Price: ${price}</h3>
                    <p>Likes: {carLikes[_id] || 0}</p>
                  </div>
                  <div className="details-btn">
                    <Link to={`/cars/${_id}/details`} className="welcome-btn new-cars-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
