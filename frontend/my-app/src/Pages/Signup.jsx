// SignUpForm.js
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import '../App.css';
import '../Styles/Form.css'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


const Signup = () => {

  const navigate=useNavigate()
  const [signupData,setsignupData]=useState({
    studentEmail:'',
    password:''
  })

  const {studentEmail,password}=signupData
  
  function handleChange(e){
    console.log(e.target)
    const {name,value}=e.target
    setsignupData({
      ...signupData,[name]:value
    })
  }



  function handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:4000/signup',signupData,{ withCredentials: true })
    .then((response)=>{
      console.log(response)
      const {success,message}=response.data
      if(success){
        toast.success(message,{position:'bottom-right'})
        setTimeout(()=>{
          navigate('/profile')
        },1000)
      }
      else{
        toast.error(message,{position:'bottom-right'})
      }

      setsignupData({
        ...signupData,
        studentEmail:"",
        password:""
      })
    })
    .catch((err)=>{
      console.log(err)
    })

  };

  return (
    <div className="signup-container form-container">
      <h2 className="signup-header form-header">Student Registration</h2>
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

export default Signup;
