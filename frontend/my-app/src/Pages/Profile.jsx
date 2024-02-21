import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import useAuth from '../Hooks/AuthHook';
import axios from "axios";

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
        axios.get('http://localhost:4000/data/studentdetails')
        .then((data)=>console.log(data))
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
                
                <p><strong>Email:</strong> {studentDetails.studentEmail}</p>
                
            </div>
        </div>
    );
}

export default Profile;
