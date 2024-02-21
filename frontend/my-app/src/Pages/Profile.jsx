import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import useAuth from '../Hooks/AuthHook';
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const { isAuthenticated, verifyToken, username, Logout } = useAuth();

    const [studentDetails, setStudentDetails] = useState({
        studentName: '',
        studentEmail: '',
        currentSemester: '',
        department: '',
        openElectiveDepartment: ''
    });

    useEffect(()=>{
        axios.post('http://localhost:4000/data/getstudentdetails',{},{withCredentials:true})
        .then((data)=>{
            console.log(data.data) 
            setStudentDetails(data.data)
        })
        .catch((err)=>console.log(err))
    },[])

    useEffect(() => {
        verifyToken();
    }, [isAuthenticated, verifyToken]);
    

    if (!isAuthenticated) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar username={username} Logout={Logout} />
            <div className="container">
                <h2>Student Details</h2>
                <div>
                <p><strong>Email:</strong> {studentDetails.studentEmail}</p>
                <p><strong>Name:</strong> {studentDetails.studentName}</p>
                <p><strong>JNTU Number</strong> {studentDetails.studentEmail.slice(0,10)}</p>
                <p><strong>currentSemester:</strong> {studentDetails.currentSemester}</p>
                <p><strong>Department:</strong> {studentDetails.department}</p>
                <p><strong>Open Elective:</strong> {studentDetails.openElectiveDepartment}</p>
                </div>
            </div>
            <button>
                <Link to={`/profile/edit/${studentDetails._id}`}>Edit Details</Link>
            </button>
        </div>
    );
}

export default Profile;
