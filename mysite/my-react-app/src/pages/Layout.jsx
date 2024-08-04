import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '../App.css';

const Layout = () => {
  return (
    <div className='home'>
        <nav>
          <ul>
            <li>
              <Link to="/events">Home</Link>
            </li>
            <li>
              <Link to="/signout">Log out</Link>
            </li>
          </ul>
        </nav>
      
      <main>
        <Outlet />
      </main>
{/* 
      <footer>
        <p>Footer</p>
      </footer> */}
    </div>
  );
};

export default Layout;
