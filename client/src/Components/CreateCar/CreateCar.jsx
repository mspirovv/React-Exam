
import './CreateCar.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router';
import { useCreateCar } from '../../services/carService';

export default function CreateCar() {
   const navigate = useNavigate();
   const { create: createCar } = useCreateCar();

   const submitAction = async (formData) => {
    const carData = Object.fromEntries(formData);

    await createCar(carData);
    
    navigate('/catalog')
   }

  return (
    <div className="create-car-container">
      <div className="form-box">
        <h2 className="title">Create Car</h2>
        <form action={submitAction}>
          <div className="input-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="transmission">Transmission:</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="input-field"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Create Car</button>
        </form>
      </div>
    </div>
  );
}
