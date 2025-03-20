import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./form.jsx";
import Dashboard from "./dashboard.jsx";
import Navbar from "./navbar.jsx";
import Auth from "./auth.jsx";

export const context = createContext();
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [color, setColor] = useState('d')
  const[showForm,setShowForm] = useState(false)
  const[email,setEmail] = useState('')

  const [loggedIn, setLoggedIn] = useState(() => {
    const retrievedDetails = localStorage.getItem('loggedIn')
    if(retrievedDetails==='undefined' || retrievedDetails==='null' || retrievedDetails===null || retrievedDetails===undefined ){
      return retrievedDetails===false
 
    }else{
     return JSON.parse(retrievedDetails)
    }
});

useEffect(() => {
    localStorage.setItem('loggedIn', loggedIn);
}, [loggedIn]);

  useEffect(() => {
    console.log('showLogin',showLogin)
    console.log('showForm',showForm)
    console.log('loggedIn',loggedIn)
}, [showForm,showLogin,loggedIn]);
  return (
    <context.Provider value={{showLogin,setShowLogin,color,setColor,showForm,setShowForm,
      loggedIn,setLoggedIn,email,setEmail
    }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/form" element={<Form />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </context.Provider>
  );
};

export default App;
