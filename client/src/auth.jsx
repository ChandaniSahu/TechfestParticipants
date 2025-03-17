import { useState, useContext } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { context } from "./App.jsx";

const Auth = () => {
  const { setShowLogin, setColor, setShowForm, setLoggedIn, setEmail } = useContext(context);
  const [login, setLogin] = useState({ j_username: "", j_password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [load, setLoad] = useState(false);

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("login", login);
    try {
      if (!login.j_username || !login.j_password) {
        alert("All fields are required");
        setLoad(false);
      } else {
        const res = await axios.post("https://era-login.vercel.app/login", login);
        console.log("res", res.data.msg);
        if (res.data.msg === "logged in") {
          setEmail(login.j_username);
          setLogin({ j_username: "", j_password: "" });
          setShowForm(true);
          setLoggedIn(true);
          setShowLogin(false);
          setLoad(false);
          setColor("f");
        }
        else {
          alert("Invalid Credentials");
          setLoad(false);
        }
      }
    } catch (e) {
      console.log("error in handlesubmit", e);
    }
  };

  return (
    <div 
    className="position max-w-md w-[400px] p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
      {/* Close Button */}
      <RxCross1
        onClick={() => setShowLogin(false)}
        size="30px"
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer"
      />

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Authentication</h2>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">ERP-Email</label>
        <input
          type="email"
          name="j_username"
          onChange={handleInput}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
      </div>

      {/* Password Field */}
      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-600 mb-1">ERP-Password</label>
        <input
          type={showPassword ? "text" : "password"}
          name="j_password"
          onChange={handleInput}
          className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-10 text-gray-500 hover:text-gray-700 transition"
        >
          {showPassword ? <IoEyeOffOutline size={22} /> : <IoEyeOutline size={22} />}
        </button>
      </div>

      {/* Submit Button with Loading Animation */}
      <button
        type="submit"
        onClick={() => {
          handleSubmit();
          setLoad(true);
        }}
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
      >
        {load ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </div>
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export default Auth;
