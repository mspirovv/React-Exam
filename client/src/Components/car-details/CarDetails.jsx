import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useCar, useDeleteCar } from "../../services/carService";
import { useEffect, useState } from "react";
import './CarDetails.css';

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId , accessToken} = useAuth();
  const { carId } = useParams();
  const { car } = useCar(carId);
  const { deleteCar } = useDeleteCar();
  const isOwner = car._ownerId === userId;

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3030/data/likes?where=carId%3D%22${carId}%22`)
      .then(res => res.json())
      .then(data => {
        setLikes(data);
        setHasLiked(data.some(like => like._ownerId === userId));
      });
  }, [carId, userId]);

  const likeHandler = async () => {
    if (!accessToken) {
        alert("You need to be logged in to like a car!");
        return;
    }

    if (hasLiked) {
        const like = likes.find(like => like._ownerId === userId);
        if (!like) return;

        await fetch(`http://localhost:3030/data/likes/${like._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken // Изпращаме токена
            }
        });
    } else {
        await fetch(`http://localhost:3030/data/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": accessToken // Изпращаме токена
            },
            body: JSON.stringify({ carId, _ownerId: userId, email })
        });
    }

    fetch(`http://localhost:3030/data/likes?where=carId%3D%22${carId}%22`)
      .then(res => res.json())
      .then(data => {
        setLikes(data);
        setHasLiked(data.some(like => like._ownerId === userId));
      });
};


  return (
    <section id="new-cars" className="new-cars">
      <div className="container">
        <div className="new-cars-content">
          <div className="new-cars-item">
            <div className="single-new-cars-item">
              <div className="row">
                <div className="col-md-7 col-sm-12">
                  <div className="new-cars-img">
                    <img src={car.imageUrl} alt="img" />
                  </div>
                </div>
                <div className="col-md-5 col-sm-12">
                  <div className="new-cars-txt">
                    <h2>{car.brand} <span> {car.model} </span></h2>
                    <p>Description: {car.description}</p>
                    <p>Year: {car.year}</p>
                    <p>Transmission: {car.transmission}</p>
                    <p>Price: {car.price}$</p>
                    <p>Likes: {likes.length}</p>
                    {!isOwner && userId &&
                    <div className="button-group">
                    <button onClick={likeHandler} className="like-btn">
                      {hasLiked ? "Unlike" : "Like"}
                    </button>
                    </div>
}
             
                    {isOwner && (
                      <div className="button-group">
                        <Link to={`/cars/${carId}/edit`} className="edit-btn">Edit</Link>
                        <button className="delete-btn" onClick={() => deleteCar(carId)}>Delete</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
