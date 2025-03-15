import { Route, Routes } from 'react-router'
import { useState } from 'react'

import Catalog from './Components/Catalog';
import Header from './Components/Header/Header';
import Register from './Components/Register/Register';
import Footer from './Components/Footer/Footer';

function App() {


  return (
    <>


      <title>CarVilla</title>
     
      <Header/>
  
      <Routes>
    
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer/>

     
    </>
  );
}
export default App;
