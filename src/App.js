import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import Clothing from "./Components/Clothing";
import Electronics from "./Components/Electronics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/clothing" element={<Clothing />} />
      <Route path="/electronics" element={<Electronics />} />
    </Routes>
  );
}

export default App;
