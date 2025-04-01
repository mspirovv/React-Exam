import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useCar, useDeleteCar } from "../../services/carService";
import './CarDetails.css';

export default function CarDetails() {
  const navigate = useNavigate();
  const { email, userId, accessToken } = useAuth();
  const { carId } = useParams();
  const { car, response } = useCar(carId,null);
  const { deleteCar } = useDeleteCar();

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carDetails, setCarDetails] = useState(car)

  const deleteHandler = async () => {
    const hasConfirm = confirm(`Are you sure you want to delete ${car.brand} ${car.model} car?`);

    if (!hasConfirm) {
        return;
    }

    await deleteCar(carId);

    navigate('/catalog');
};

  useEffect(() => {
    if (!carId) return; 

    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:3030/data/likes?where=carId%3D%22${carId}%22`);
        const data = await res.json();
        setLikes(data);
        setHasLiked(data.some(like => like._ownerId === userId));
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes().finally(() => setLoading(false));
  }, [carId, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found!</div>;
  }

  const isOwner = car?._ownerId === userId;

  const likeHandler = async () => {
    if (!accessToken) {
      alert("You need to be logged in to like a car!");
      return;
    }

    try {
      if (hasLiked) {
        const like = likes.find(like => like._ownerId === userId);
        if (!like) return;

        await fetch(`http://localhost:3030/data/likes/${like._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": accessToken,
          },
        });
      } else {
        await fetch(`http://localhost:3030/data/likes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": accessToken,
          },
          body: JSON.stringify({ carId, _ownerId: userId, email }),
        });
      }

      const res = await fetch(`http://localhost:3030/data/likes?where=carId%3D%22${carId}%22`);
      const data = await res.json();
      setLikes(data);
      setHasLiked(data.some(like => like._ownerId === userId));

      setCarDetails(prevCarDetails => ({ ...prevCarDetails, likes: data }));
    } catch (error) {
      console.error("Error updating like:", error);
    }
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
                    <h2>{car.brand} <span>{car.model}</span></h2>
                    <p>Description: {car.description}</p>
                    <p>Year: {car.year}</p>
                    <p>Transmission: {car.transmission}</p>
                    <p>Price: {car.price}$</p>
                    <p>Likes: {likes.length}</p>
                    {!isOwner && userId && (
                      <div className="button-group">
                        <button onClick={likeHandler} className="like-btn">
                          {hasLiked ? "Unlike" : "Like"}
                        </button>
                      </div>
                    )}
                    {isOwner && (
                      <div className="button-group">
                        <Link to={`/cars/${carId}/edit`} className="edit-btn">Edit</Link>
                        <button className="delete-btn" onClick={deleteHandler}>Delete</button>
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
