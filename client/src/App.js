import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Nav from './Components/Navbar/Nav';
import Staff from './Components/Department/Staff';
import FoodAddress from './Components/Department/ADD/FoodAddress';
import Homepage from './Components/Home/Homepage';
import FoodCart from './Components/ADDTOCART/FoodCart';
import FoodTrack from './Components/Track/FoodTrack';

function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/staff' element={<Staff/>}/>
      <Route path='/add' element={<FoodAddress/>}/>
      <Route path='/home' element={<Homepage/>}/>
      <Route path='/addTocart' element={<FoodCart/>}/>
      <Route path='/track' element={<FoodTrack/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
