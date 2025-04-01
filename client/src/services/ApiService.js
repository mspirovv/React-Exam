import { useContext, useEffect } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/userContext";

const baseURL = 'http://localhost:3030/users';

export const useRegister = () => {
    const register = async (email, password) => {
        try {
            const { response, result } = await request.post(`${baseURL}/register`, { email, password });

            if (!response.ok) {
                throw new Error(result.message || "Email is already registered!");
            }

            return result; 
        } catch (error) {
            throw error;
        }
    };

    return { register };
};


export const useLogin = () => {
    const login = async (email, password) => {
      try {
        const { response, result } = await request.post(`${baseURL}/login`, { email, password });
  
        if (!response.ok) {
          throw new Error(result.message || "Invalid email or password!");
        }

        return result;
      } catch (error) {
        throw error;
      }
    };
  
    return { login };
  };
  

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        const options = {
            headers: {
                'X-Authorization': accessToken,
            }
        };
        
        request.get(`${baseURL}/logout`, null, options)
            .then(userLogoutHandler);

    }, [accessToken, userLogoutHandler]);

    return { isLoggedOut: !!accessToken, };
};