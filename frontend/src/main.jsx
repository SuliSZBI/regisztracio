import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Belep } from './utils/LoginContext.jsx';

createRoot(document.getElementById('root')).render(
    <Belep>
        <StrictMode>
            <App />
        </StrictMode>
    </Belep>
);