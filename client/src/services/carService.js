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

