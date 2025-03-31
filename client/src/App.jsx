import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify';


import UserProvider from './providers/UserProvider';



import AuthGuard from './components/guards/AuthGuard';
import GuestGuard from './components/guards/GuestGuard';
import Home from './components/home/Home';
import Catalog from './components/Catalog/Catalog';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import CreateCar from './components/createCar/CreateCar';
import CarEdit from './components/car-edit/CarEdit';
import Search from './components/Search/Search';
import NotFound from './components/notFound/NotFound';
import CarDetails from './components/car-details/CarDetails';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

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
