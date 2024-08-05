// src/pages/Layout.jsx
import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import '../App.css';

const Layout = () => {
    const { isAuthenticated, currentUser, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className='home'>
            <nav>
                <ul>
                    <li>
                        <Link to="/events">Liste des événements</Link>
                    </li>
                    <li>
                        <Link to='/events/new'>Créer un événement</Link>
                    </li>
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <Link to='/signin'>Connexion</Link>
                            </li>
                            <li>
                                <Link to='/signup'>S'enregistrer</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/signout' onClick={handleLogout}>Se déconnecter</Link>
                            </li>
                            <li>
                                <span>Bienvenue, {currentUser}</span>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
