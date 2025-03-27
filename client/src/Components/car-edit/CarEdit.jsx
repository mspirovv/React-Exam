import { Navigate, useNavigate, useParams } from "react-router";

import useAuth from "../../hooks/useAuth";
import { useCar, useEditCar } from "../../services/carService";

export default function CarEdit() {
    const navigate = useNavigate();
    const { userId } = useAuth();
    const { carId } = useParams();
    const { car } = useCar(carId);
    const { edit } = useEditCar();

    console.log(`CarEdit userID: ${userId}`)
    console.log(`CarEdit carID: ${car._ownerId}`)

    const formAction = async (formData) => {
        const carData = Object.fromEntries(formData);

        await edit(carId,carData);

        navigate(`/cars/${carId}/details`);
    }

    if (!car._ownerId) {
        return <p>Loading...</p>;  
    }

  
    const isOwner = car._ownerId && userId === car._ownerId;
    console.log(isOwner);

    if (!isOwner) {
       return <Navigate to='/catalog' />
    }



   return (
    <div className="create-car-container">
    <div className="form-box">
      <h2 className="title">Edit Car</h2>
      <form action={formAction}>
        <div className="input-group">
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="input-field"
            defaultValue={car.brand}
          />
        </div>

        <div className="input-group">
          <label htmlFor="model">Model:</label>
          <input
            type="text"
            id="model"
            name="model"
            className="input-field"
            defaultValue={car.model}
          />
        </div>

        <div className="input-group">
          <label htmlFor="transmission">Transmission:</label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            className="input-field"
            defaultValue={car.transmission}
          />
        </div>

        <div className="input-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            className="input-field"
            defaultValue={car.year}
          />
        </div>

        <div className="input-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="input-field"
            defaultValue={car.imageUrl}
          />
        </div>

        <div className="input-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            className="input-field"
            defaultValue={car.description}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="input-field"
            defaultValue={car.price}
          />
        </div>

        <button type="submit" className="submit-btn">Edit Car</button>
      </form>
    </div>
  </div>
   );
}