import { useLogout } from '../../services/ApiService';
import './Logout.css'
import { Navigate } from 'react-router';

export default function Logout() {
    const { isLoggedOut } = useLogout()
  
    return isLoggedOut 
    ? <Navigate to='/' />
    : (<div className="spinner"></div>);

}