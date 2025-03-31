import './CreateCar.css';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useCreateCar } from '../../services/carService';

export default function CreateCar() {
  const navigate = useNavigate();
  const { create: createCar } = useCreateCar();

  const [errors, setErrors] = useState({});

  const validateField = (input) => {
    let validationErrors = {};
    if (input.required && !input.value) {
      validationErrors[input.name] = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
    }
    return validationErrors;
  };

  const validateForm = (form) => {
    let validationErrors = {};

    form.querySelectorAll('input, textarea').forEach((input) => {
      const fieldErrors = validateField(input);
      if (Object.keys(fieldErrors).length > 0) {
        validationErrors = { ...validationErrors, ...fieldErrors };
      }
    });

    return validationErrors;
  };

  const handleBlur = (e) => {
    const input = e.target;
    const fieldErrors = validateField(input);
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const validationErrors = validateForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData(form);
    const carData = Object.fromEntries(formData);
    carData.likes = [];

    createCar(carData);
    navigate('/catalog');
  };

  return (
    <div className="create-car-container">
      <div className="form-box">
        <h2 className="title">Create Car</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.brand && <p className="error-text">{errors.brand}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.model && <p className="error-text">{errors.model}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="transmission">Transmission:</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.transmission && <p className="error-text">{errors.transmission}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.year && <p className="error-text">{errors.year}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.imageUrl && <p className="error-text">{errors.imageUrl}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              className="input-field"
              required
              onBlur={handleBlur}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>

          <button type="submit" className="submit-btn">Create Car</button>
        </form>
      </div>
    </div>
  );
}
