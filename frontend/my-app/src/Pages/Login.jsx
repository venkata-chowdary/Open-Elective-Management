// SignUpForm.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../App.css';
import '../Styles/Form.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


const Login = () => {

  const navigate=useNavigate()
  const [loginData,setloginData]=useState({
    studentEmail:'',
    password:''
  })

  const {studentEmail,password}=loginData
  
  function handleChange(e){
    console.log(e.target)
    const {name,value}=e.target
    setloginData({
      ...loginData,[name]:value
    })
  }



  function handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:4000/login',loginData,{ withCredentials: true })
    .then((response)=>{
      console.log(response)
      const {success,message}=response.data
      if(success){
        toast.success(message,{position:'bottom-right'})
        setTimeout(()=>{
          navigate('/')
        },1000)
      }
      else{
        toast.error(message,{position:'bottom-right'})
      }

      setloginData({
        ...loginData,
        studentEmail:"",
        password:""
      })
    })
    .catch((err)=>{
      console.log(err)
    })

  };

  return (
    <div className="login-container form-container">
      <h2 className="login-header form-header">Student Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="studentEmail"
          value={studentEmail}
          onChange={handleChange}
          placeholder='Email Address'
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder='Password'
        />

        <button type="submit" className="submit-button primary-button">
          Sign Up
        </button>
      
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
