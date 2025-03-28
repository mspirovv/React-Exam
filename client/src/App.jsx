import { Route, Routes } from 'react-router'

import UserProvider from './providers/UserProvider';


import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';
import Search from './Components/Search/Search';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home';
import CreateCar from './Components/CreateCar/CreateCar';
import Catalog from './Components/Catalog/Catalog';
import CarDetails from './Components/car-details/CarDetails';
import CarEdit from './Components/car-edit/CarEdit';
import Logout from './Components/logout/Logout';
import AuthGuard from './Components/guards/AuthGuard';
import GuestGuard from './Components/guards/GuestGuard';

function App() {


  return (
    <>
       
       <UserProvider>

      <title>CarVilla</title>
     
      <Header/>
  
      <Routes>
        <Route index element={<Home/>} />
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
