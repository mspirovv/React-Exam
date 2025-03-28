import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/cars';

export const useCars = () => {
    const [cars,setCars] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
        .then(setCars)
    }, []);

    return { cars };    
};

export const useCar = (carId) => {
    const [car, setCar] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${carId}`)
        .then(setCar)
    }, [carId]);

    return {
        car,
    }
}

export const useCreateCar = () => {
    const { request } = useAuth();

    const create = (carData) => {
        request.post(baseUrl,carData);
    }

    return {
        create,
    }

}

export const useEditCar = () => {
    const { request } = useAuth();

    const edit = (carId,carData) =>
    request.put(`${baseUrl}/${carId}` , {...carData, _id: carId });

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
export const searchCars = async (brand, price) => {
    let query = {};
 
    if (brand) {
        query.brand = brand;
    }

    if (price) {
        query.price = { $lte: Number(price) }; 
    }

   
    let whereClause = '';
    if (brand) {
        whereClause = `where=brand%20LIKE%20%22${encodeURIComponent(brand)}%22`;
    }

    if (price) {
        if (whereClause) {
            whereClause += `%20AND%20price%20%3C%3D%20${price}`;
        } else {
            whereClause = `where=price%20%3C%3D%20${price}`;
        }
    }


    const url = `http://localhost:3030/data/cars?${whereClause}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Search request failed:", error);
        return [];
    }
};
