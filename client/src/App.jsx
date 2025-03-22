import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./form.jsx";
import Dashboard from "./dashboard.jsx";
import Navbar from "./navbar.jsx";
import EditActivity from "./editActivity.jsx";
import Auth from "./auth.jsx";

export const context = createContext();
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [color, setColor] = useState('d')
  const[showForm,setShowForm] = useState(false)
  const[showEditForm,setShowEditForm] = useState(false)
  const [editActivity,setEditActivity]=useState('')

  const[user,setUser] = useState(()=>{
    const retrievedDetails = localStorage.getItem('user')
    if(retrievedDetails==='undefined' || retrievedDetails==='null' || retrievedDetails===null || retrievedDetails===undefined ){
      return {email:'',loggedIn:false}
 
    }else{
     return JSON.parse(retrievedDetails)
    }
   })
  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(user))
  },[user])

 

  return (
    <context.Provider value={{showLogin,setShowLogin,color,setColor,showForm,setShowForm,
      user,setUser,editActivity,setEditActivity,showEditForm,setShowEditForm
    }}>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path="/form" element={<Form />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit" element={<EditActivity />} />
          {/* <Route path="/auth" element={<Auth />} /> */}
        </Routes>
      </Router>
    </context.Provider>
  );
};

export default App;
