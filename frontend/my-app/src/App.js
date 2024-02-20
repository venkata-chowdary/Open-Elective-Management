import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import RegisterElctive from "./Pages/RegisterElective";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/registerelective" element={<RegisterElctive/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </div>
  );
}

export default App;