import { createContext } from 'react';

const BelepContext = createContext();

function Belep(props) {
    const setIsLogged = (ertek) => {
        localStorage.setItem('isLoggedIn', JSON.stringify(ertek));
    };

    const getIsLogged = () => {
        return JSON.parse(localStorage.getItem('isLoggedIn'));
    };

    return (
        <BelepContext.Provider value={{ setIsLogged, getIsLogged }}>
            {props.children}
        </BelepContext.Provider>
    );
}

export { Belep };
export default BelepContext;
