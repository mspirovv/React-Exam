import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/cars';

export const useCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(data => {
                if (data.result && Array.isArray(data.result)) {
                    setCars(data.result);
                } else {
                    setCars([])

                }
            })
            .catch(error => {

                alert("Грешка при зареждане на колите. Моля, опитайте отново.");
            });
    }, []);

    return { cars };
};

export const useCar = (carId) => {
    const [car, setCar] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { result, response: res } = await request.get(`${baseUrl}/${carId}`);
                setCar(result);
                setResponse(res);
            } catch (error) {
                alert("Error fetching car:", error);
            }
        };

        if (carId) {
            fetchCar();
        }
    }, [carId]);

    return { car, response };
};

export const useCreateCar = () => {
    const { request } = useAuth();

    const create = (carData) => {
        request.post(baseUrl, carData);
    }

    return {
        create,
    }

}

export const useEditCar = () => {
    const { request } = useAuth();

    const edit = (carId, carData) =>
        request.put(`${baseUrl}/${carId}`, { ...carData, _id: carId });

    return {
        edit,
    }
}

export const useDeleteCar = () => {
    const { request } = useAuth();

    const deleteCar = (carId) =>
        request.delete(`${baseUrl}/${carId}`);

    return {
        deleteCar,
    }

}

export const searchCars = async (brand, price, skip = 0, take = 100) => {
    let whereClauses = [];

    if (brand) {
        whereClauses.push(`brand%20LIKE%20%22${encodeURIComponent(brand)}%22`);
    }

    if (price) {
        whereClauses.push(`price%20%3C%3D%20${price}`);
    }

    let whereClause = whereClauses.length > 0 ? `where=${whereClauses.join('%20AND%20')}` : '';
    let queryParams = `${whereClause}&offset=${skip}&pageSize=${take}`.replace(/^&/, ''); // Премахва водещия `&`

    const url = `http://localhost:3030/data/cars?${queryParams}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("Грешка при заявката:", response.status, response.statusText);
            return []; // Ако отговорът не е успешен, връщаме празен масив
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            console.error("Очакваше се масив, но получихме:", data);
            return []; // Връщаме празен масив, ако API-то не върне списък
        }

        return data;
    } catch (error) {
        console.error("Търсенето не успя:", error);
        return [];
    }
};

