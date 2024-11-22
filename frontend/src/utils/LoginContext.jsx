import { createContext, useState } from 'react';

const BelepContext = createContext();

function Belep(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BelepContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {props.children}
        </BelepContext.Provider>
    );
}

export { Belep };
export default BelepContext;
