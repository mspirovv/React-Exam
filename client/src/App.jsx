import { Route, Routes } from 'react-router'
import { useState } from 'react'

import Catalog from './Components/Catalog';
import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';
import Search from './Components/Search/Search';
import Login from './Login/Login';
import NotFound from './Components/NotFound/NotFound';

function App() {


  return (
    <>


      <title>CarVilla</title>
     
      <Header/>
  
      <Routes>
    
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search/>} />

        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer/>

     
    </>
  );
}
export default App;
