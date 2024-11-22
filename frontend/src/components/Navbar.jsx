import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BelepContext from '../utils/LoginContext';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { getIsLogged, setIsLogged } = useContext(BelepContext);

    useEffect(() => {
        setIsLoggedIn(getIsLogged());
    }, []);

    const kilep = () => {
        setIsLogged(false);
        window.location.replace('/');
    };

    return (
        <div>
            <Link to="/">Home</Link>
            {isLoggedIn ? (
                <button onClick={kilep}>Logout</button>
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
