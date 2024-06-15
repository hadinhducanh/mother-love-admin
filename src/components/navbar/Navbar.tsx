import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.scss';
import { useAuth } from '@/pages/Auth/AuthContext';

export const Navbar = () => {
  const { logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to '/' after logout
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Chill</span>
      </div>
      <div className="icons">
        <div className="user" onClick={toggleDropdown}>
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>Bansua</span>
          <ul className={`dropdown ${dropdownOpen ? 'open' : ''}`}>
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
