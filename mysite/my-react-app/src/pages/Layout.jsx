import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import '../assets/css/Home.css'

const Layout = () => {
    const { isAuthenticated, currentUser, logout } = useContext(AuthContext);
    const location = useLocation();

    const handleLogout = () => {
        logout();
    };

    const homePage = location.pathname === '/'

    return (
        <div>
            <nav className='nav-bar'>
                <ul>
                    <li>
                        <Link to="/">Accueil</Link>
                    </li>
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

            <main className={homePage? 'home-main' : ''}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
