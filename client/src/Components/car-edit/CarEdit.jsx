import { useNavigate, useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import { useCar, useEditCar } from "../../services/carService";

export default function CarEdit() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const { edit } = useEditCar();

    const [car, setCar] = useState(null);
    const [response, setResponse] = useState(null);
    const [errors, setErrors] = useState({});

    const { car: fetchedCar, response: fetchedResponse } = useCar(carId, null);

    useEffect(() => {
        if (fetchedCar) {
            setCar(fetchedCar);
            setResponse(fetchedResponse);
        }
    }, [fetchedCar, fetchedResponse]);

    const formRef = useRef();

    const validateField = (input) => {
        let validationErrors = {};
        if (input.required && !input.value) {
            validationErrors[input.name] = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
        }
        setErrors(validationErrors);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = formRef.current;

        let validationErrors = {};

        form.querySelectorAll("input, textarea").forEach((input) => {
            if (input.required && !input.value) {
                validationErrors[input.name] = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required.`;
            }
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = new FormData(form);
        const carData = Object.fromEntries(formData);
        edit(carId, carData);
        navigate(`/cars/${carId}/details`);
    };

    const handleBlur = (e) => {
        validateField(e.target);
    };

    const handleChange = (e) => {
        validateField(e.target);
    };

    if (!car) {
        return <p>Loading...</p>;
    }

    return (
        <div className="create-car-container">
            <div className="form-box">
                <h2 className="title">Edit Car</h2>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="brand">Brand:</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            className="input-field"
                            defaultValue={car.brand}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            defaultValue={car.model}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            defaultValue={car.transmission}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            defaultValue={car.year}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            defaultValue={car.imageUrl}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.imageUrl && <p className="error-text">{errors.imageUrl}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            className="input-field"
                            defaultValue={car.description}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
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
                            defaultValue={car.price}
                            required
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>

                    <button type="submit" className="submit-btn">Edit Car</button>
                </form>
            </div>
        </div>
    );
}
