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

   console.log(`Hook: ${car.brand}`)
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

    console.log(`query: ${JSON.stringify(query)}`);

    // Проверяваме дали има стойност за brand
    if (brand) {
        query.brand = brand; // Използваме точно съвпадение за brand
    }

    // Ако има стойност за price, използваме оператор $lte
    if (price) {
        query.price = { $lte: Number(price) }; // Използваме оператор за <= (по-малко или равно)
    }

    // Генерираме whereClause на базата на наличието на brand
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

    // Съставяме финалния URL
    const url = `http://localhost:3030/data/cars?${whereClause}`;
    console.log("Generated URL:", url); // Проверяваме дали URL е правилен

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Server Response:", data); // Логваме отговора от сървъра
        return data;
    } catch (error) {
        console.error("Search request failed:", error);
        return [];
    }
};
