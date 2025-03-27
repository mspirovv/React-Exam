import './Logout.css'
import { useLogout } from "../../services/apiService";
import { Navigate } from 'react-router';

export default function Logout() {
    const { isLoggedOut } = useLogout();

    console.log('logout succesful')
  
    return isLoggedOut 
    ? <Navigate to='/' />
    : (<div className="spinner"></div>);

}