import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {

    const { username, Logout } = props
    return (
        <div className="navbar">
            <h4>
                {" "}
                Welcome <span>{username.slice(0, 10)}</span>
            </h4>
            <div style={{display:'flex',flexDirection:'row',gap:'6rem'}}>
                <button className="primary-button" onClick={() => Logout()}><p>Logout</p></button>
                <div className="profile-container">
                    <Link to='/profile'>
                        <FontAwesomeIcon icon={faUser} className="profile-icon" />
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default Navbar