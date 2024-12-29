import { BiMenuAltRight } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../src/redux/features/auth/authSlice.js';

const navlists = [
  { name: 'Bitcoin', link: "https://bcpi.rf.gd" },
  { name: 'Ethereum', link: "https://bcpi.rf.gd" },
  { name: 'Alcoin', link: "https://bcpi.rf.gd" },
  { name: 'Blockchain', link: "https://bcpi.rf.gd" },
  { name: 'Defi', link: "https://bcpi.rf.gd" },
  { name: 'NFT', link: "https://bcpi.rf.gd" },
  { name: 'AI', link: "https://hagc.rf.gd" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <header className='py-6 bg-gray-800'>
      <nav className='container mx-auto flex justify-between px-5'>
        <a href="/">
          <img src="/logo.png" alt="logo" className='h-10' />
        </a>
        <ul className='sm:flex hidden items-center gap-8'>
          {navlists.map((list, index) => (
            <li key={index} className='mx-4 navliste'>
              <a href={list.link} target="_blank" rel="noopener noreferrer">{list.name}</a>
            </li>
          ))}
          {user ? (
            <>
              {user.role === 'admin' && (
                <li className="navliste">
                  <NavLink to="/dashboard" className='text-white'><button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Dashboard</button></NavLink>
                </li>
              )}
              {user.role === 'user' && (
                <li className="navliste">
                  <NavLink to="/profile" className='text-white'>
                    <FaUserCircle className="inline-block text-2xl" />
                  </NavLink>
                </li>
              )}
              <li className="navliste">
                <NavLink onClick={handleLogout} className='text-white'><button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Logout</button></NavLink>
                
              </li>
            </>
          ) : (
            <li className="navliste">
              <NavLink to="/login" className='text-white'><button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Login</button></NavLink>
            </li>
          )}
        </ul>

        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMenu}
            className='flex items-center px-3 py-4 rounded text-sm text-white'
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <RiCloseCircleLine className="size-6" /> : <BiMenuAltRight className="size-6" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className='fixed top-[180px] left-0 w-full h-auto pb-8 border-b-gray-900 bg-gray-800 shadow-sm z-50'>
          {navlists.map((list, index) => (
            <li key={index} className='mx-4 mt-5 px-4 navliste'>
              <a
                href={list.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                {list.name}
              </a>
            </li>
          ))}
          {user ? (
            <>
              {user.role === 'admin' && (
                <li className="mx-5 mt-7 px-5 navliste">
                  <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} > <button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Dashboard</button></NavLink>
                </li>
              )}
              {user.role === 'user' && (
                <li className="mx-5 mt-7 px-5 navliste">
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className='text-white'>
                    <FaUserCircle className="inline-block text-2xl" />
                  </NavLink>
                </li>
              )}
              <li className="mx-5 mt-7 px-5 navliste">
                <NavLink onClick={() => { handleLogout(); setIsMenuOpen(false); }} className='text-white'><button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Logout</button></NavLink>
              </li>
            </>
          ) : (
            <li className="mx-5 mt-7 px-5 navliste">
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className='text-white'><button className="text-white bg-[#296fdf] rounded-md px-4 py-2 hover:bg-[#3e85d6]">Login</button></NavLink>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;