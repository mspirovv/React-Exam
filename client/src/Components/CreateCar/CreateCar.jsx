
import './CreateCar.css';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function CreateCar() {
  // Предполагаме, че useCreateCar връща функция за създаване на автомобил


  const schema = yup.object().shape({
    brand: yup.string().required("Brand is required"),
    model: yup.string().required("Model is required"),
    transmission: yup.string().required("Transmission is required"),
    year: yup
      .number()
      .min(1900, "Year must be greater than 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future")
      .required("Year is required"),
    imageUrl: yup.string().url("Invalid URL").required("Image URL is required"),
    description: yup.string().required("Description is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const createCarHandler = async (data) => {
    const { brand, model, transmission, year, imageUrl, description } = data;
    console.log(brand, model, transmission, year, imageUrl, description);
    
    // Извикване на API за създаване на автомобила
    const response = await createCar(brand, model, transmission, year, imageUrl, description);
    console.log('Car created successfully!', response);
  };

  return (
    <div className="create-car-container">
      <div className="form-box">
        <h2 className="title">Create Car</h2>
        <form onSubmit={handleSubmit(createCarHandler)}>
          <div className="input-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              className="input-field"
              {...register("brand")}
            />
            {errors.brand && <p className="error-text">{errors.brand.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              className="input-field"
              {...register("model")}
            />
            {errors.model && <p className="error-text">{errors.model.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="transmission">Transmission:</label>
            <input
              type="text"
              id="transmission"
              name="transmission"
              className="input-field"
              {...register("transmission")}
            />
            {errors.transmission && <p className="error-text">{errors.transmission.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="year">Year:</label>
            <input
              type="number"
              id="year"
              name="year"
              className="input-field"
              {...register("year")}
            />
            {errors.year && <p className="error-text">{errors.year.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="input-field"
              {...register("imageUrl")}
            />
            {errors.imageUrl && <p className="error-text">{errors.imageUrl.message}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              className="input-field"
              {...register("description")}
            ></textarea>
            {errors.description && <p className="error-text">{errors.description.message}</p>}
          </div>

          <button type="submit" className="submit-btn">Create Car</button>
        </form>
      </div>
    </div>
  );
}
