import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import useAuth from "../Hooks/AuthHook";
import '../Styles/Home.css'
import '../App.css'
import Navbar from "../Components/Navbar";

const Home = () => {

  const navigate = useNavigate();
  const { isAuthenticated, verifyToken, username, Logout } = useAuth()

  console.log(username)
  useEffect(() => {
    verifyToken()
  }, [verifyToken])

  if (!isAuthenticated) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="home-page">
        <Navbar username={username} Logout={Logout}/>
        <div className="hero-container">
          <button className="elective-btn"><Link to='/registerelective'><p>Register Elective</p></Link></button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;