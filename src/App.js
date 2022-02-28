import { Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
