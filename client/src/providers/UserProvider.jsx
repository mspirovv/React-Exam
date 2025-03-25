import { UserContext } from "../contexts/userContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({
    children
}) {
    const [authData,setAuthData] = usePersistedState('auth', {});

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    };

    const useLogoutHandler = () => {
        setAuthData({});
    };

    return (
        <UserContext.Provider value = {{...authData, userLoginHandler, useLogoutHandler}}>
            {children}
        </UserContext.Provider>
    );
}