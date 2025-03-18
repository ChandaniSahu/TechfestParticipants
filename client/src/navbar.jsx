import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { context } from "./App.jsx";
import Logo from "./matsLogo.png";
import myPhoto from './profilePhoto.jpeg'
import Form from "./form.jsx";
import Auth from "./auth.jsx";

const Navbar = () => {
  const { showLogin, setShowLogin, color, loggedIn, setLoggedIn, setColor, showForm, setShowForm } = useContext(context);

  const handleShowLogin = () => {
    if (loggedIn) setShowForm(true);
    else setShowLogin(true);
  };

  useEffect(()=>{
  if(!showLogin&& !showForm)
    setColor('d')
  },[showLogin,showForm])
  return (
    <>
      {/* Navbar Container */}
      <div className="bg-white shadow-md border-b-[3px] border-orange-500 px-6 md:px-12 flex items-center justify-between h-[80px] fixed top-0 w-full z-50">
        {/* Logo */}
      <a href='https://matsuniversity.ac.in' target='_blank' className="transition-transform duration-200 hover:scale-110"> <img src={Logo} alt="MATS Logo" className="w-[70px] h-[70px] object-contain " /></a> 

        {/* Navigation Links */}
        <div className="flex space-x-8 text-[18px] font-medium">
          <Link
            onClick={() => {
              setColor("f");
              handleShowLogin();
            }}
            className={`transition duration-300 ${
              color === "f" ? "text-orange-600 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Participate
          </Link>

          <Link
            to="/"
            onClick={() => {
              setColor("d");
              setShowForm(false)
              setShowLogin(false)
            }}
            className={`transition duration-300 ${
              color === "d" ? "text-orange-600 border-b-2 border-orange-500" : "text-gray-700 hover:text-orange-500"
            }`}
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Popups */}
      {showLogin && <Auth />}
      {showForm && loggedIn && <Form />}
      <div className="fixed bottom-0 right-[-23px] bg-black text-white p-2 pr-8 flex items-center opacity-90 rounded-full z-30">
      <img src={myPhoto} alt="Developer" className="w-8 h-8 rounded-full mr-2" />
      <span className="text-sm">
        <a
          href="https://chandani-sahu.netlify.app"
          className="text-white no-underline"
        >
          Chandani Sahu
        </a>
      </span>
    </div>
    </>
  );
};

export default Navbar;
