import { useContext, useEffect } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/userContext";

const baseURL = 'http://localhost:3030/users';

export const useRegister = () => {

    const register = (email, password) =>
        request.post(`${baseURL}/register`, { email, password });

    return {
        register
    }
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