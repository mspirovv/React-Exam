import { useContext, useEffect } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/userContext";

const baseURL = 'http://localhost:3030/users';

export const useRegister = () => {
    const register = async (email, password) => {
        try {
            const response = await fetch(`${baseURL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed!");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    };

    return {
        register
    };
};


export const useLogin = () => {
    const login = async (email, password) =>
        request.post(`${baseURL}/login`, { email, password }
        );

    return {
        login,
    }
};

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);
    console.log(`Nashiqt accessToken: ${accessToken}`)

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };

        console.log('Logout Headers:', options.headers);


        request.get(`${baseURL}/logout`, null, options)
            .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler]);

    return { isLoggedOut: !!accessToken, };
};