import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const useAuth = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const verifyToken = useCallback(() => {
        if (!cookies.token) {
            navigate("/login");
            return;
        }

        axios.post("http://localhost:4000/", {}, { withCredentials: true })
        .then((response) => {
            console.log(response.data)
            const { status, userData} = response.data;
            setUsername(userData);
            setIsAuthenticated(status);

            if (!status) {
                removeCookie("token");
                navigate("/login");
            }
        })
        .catch((error) => {
            console.error("Error verifying token:", error);
            removeCookie("token");
            navigate("/login");
        });
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie("token");
        setIsAuthenticated(false);
        setUsername("");
        console.log("user logged out");
        navigate("/login");
    };

    useEffect(() => {
        verifyToken();
    }, [verifyToken]);

    return { isAuthenticated, verifyToken, Logout, username };
};

export default useAuth;
