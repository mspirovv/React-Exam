import { Route, Routes } from 'react-router'

import UserProvider from './providers/UserProvider';

import Catalog from './Components/Catalog';
import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';
import Search from './Components/Search/Search';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home';
import CreateCar from './Components/CreateCar/CreateCar';

function App() {


  return (
    <>
       <UserProvider>

      <title>CarVilla</title>
     
      <Header/>
  
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-car' element={<CreateCar/>} />
        <Route path='/search' element={<Search/>} />
        

        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>
      </UserProvider>
     
    </>
  );
}
export default App;
