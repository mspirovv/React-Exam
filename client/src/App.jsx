import { Route, Routes, useLocation } from 'react-router'
import { ToastContainer } from 'react-toastify';


import UserProvider from './providers/UserProvider';



import AuthGuard from './Components/guards/AuthGuard';
import GuestGuard from './Components/guards/GuestGuard';
import Home from './Components/home/Home';
import Catalog from './Components/Catalog/Catalog';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Logout from './Components/logout/Logout';
import CreateCar from './Components/CreateCar/CreateCar';
import CarEdit from './Components/car-edit/CarEdit';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';
import CarDetails from './Components/car-details/CarDetails';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import { useEffect } from 'react';

function App() {

  const location = useLocation();

  const titles = {
    "/": "Home - CarVilla",
    "/catalog": "Catalog - CarVilla",
    "/register": "Register - CarVilla",
    "/login": "Login - CarVilla",
    "/logout": "Logout - CarVilla",
    "/add-car": "Add Car - CarVilla",
    "/search": "Search - CarVilla",
    "*": "404 Not Found - CarVilla",
  };

  useEffect(() => {
    if (location.pathname.includes("/cars/") && location.pathname.endsWith("/edit")) {
      document.title = "Edit Car - CarVilla";
    } else {
      document.title = titles[location.pathname] || "CarVilla";
    }
  }, [location.pathname]);

  return (
    <>
       
       <UserProvider>

      {/* <title>CarVilla</title> */}
      <ToastContainer/>
      <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />

        <Route element={<GuestGuard/>}>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<AuthGuard/>}>
        <Route path='/logout' element={<Logout />} />
        <Route path='/add-car' element={<CreateCar/>} />
        <Route path='/cars/:carId/edit' element={<CarEdit/>} />
        </Route>

        <Route path='/cars/:carId/details' element={<CarDetails/>} />
      
        <Route path='/search' element={<Search/>} />
        

        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
      </UserProvider>
     
    </>
  );
}
export default App;
