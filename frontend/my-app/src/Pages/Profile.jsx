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

    useEffect(() => {
        // Verify token on component mount
        verifyToken();
        
        // Fetch student details when isAuthenticated is true
        if (isAuthenticated) {
            axios.get('http://localhost:4000/data/getstudentdetails')
                .then((response) => {
                    console.log(response)
                })
                .catch((err) => console.log(err));
        }
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
