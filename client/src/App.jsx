import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';


import UserProvider from './providers/UserProvider';


import Header from './Components/header/Header';
import Register from './Components/register/Register';
import Footer from './Components/footer/Footer';
import Search from './Components/search/Search';
import Login from './Components/login/Login';
import NotFound from './Components/notFound/NotFound';
import CreateCar from './Components/createCar/CreateCar';
import Catalog from './Components/catalog/Catalog';
import CarDetails from './Components/car-details/CarDetails';
import CarEdit from './Components/car-edit/CarEdit';
import Logout from './Components/logout/Logout';
import AuthGuard from './Components/guards/AuthGuard';
import GuestGuard from './Components/guards/GuestGuard';
import Home from './Components/home/Home';

function App() {


  return (
    <>
       
       <UserProvider>

      <title>CarVilla</title>
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
