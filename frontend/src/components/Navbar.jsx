import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import BelepContext from '../utils/LoginContext';

const Navbar = () => {
    const { isLoggedIn } = useContext(BelepContext);
    // const isLoggedIn = localStorage.getItem('belepve');
    console.log(isLoggedIn);

    return (
        <div>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <Link to="/logout">Logout</Link>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            )}
        </div>
    );
};

export default Navbar;
