import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import Listing from "./Components/Listing";
import Details from "./Components/Details";
import Cart from "./Components/Cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/details" element={<Details />} /> 
      <Route path="/cart" element={<Cart />} />      
    </Routes>
  );
}

export default App;
