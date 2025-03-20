import { useState, useContext } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { context } from "./App.jsx";

const Auth = () => {
  const { setShowLogin, setColor, setShowForm, setLoggedIn,setEmail } = useContext(context);
  const [login, setLogin] = useState({ gmail: "", otp: "" });
  const [otpVar, setOtpVar] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleInput = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleOTPGenerate = async () => {
    setLoadingOtp(true); // Show loading animation
    try {
      const res = await axios.post("https://techfest-participants.vercel.app/api/generateOTP", { gmail: login.gmail });
      // console.log('res',res)
      setOtpVar(res.data.otp);
      setOtpSent(true); // Show OTP input field
    } catch (error) {
      alert("Failed to send OTP. Try again.",error);
    }
    setLoadingOtp(false);
  };

  const handleOTPComparison = () => {
    setVerifying(true);
    setTimeout(() => {
      if (login.otp === otpVar) {
        setEmail(login.gmail);
        setLogin({ gmail: "", otp: "" });
        setShowForm(true);
        setLoggedIn(true);
        setShowLogin(false);
        setColor("f");
      } else {
        alert("Invalid OTP");
      }
      setVerifying(false);
    }, 1000);
  };

  return (
    <div className="positionL max-w-md w-[400px] p-8 bg-white shadow-2xl rounded-2xl border border-gray-200">
      {/* Close Button */}
      <RxCross1
        onClick={() => setShowLogin(false)}
        size="30px"
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-300 transition duration-200 cursor-pointer"
      />

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Verify Your Email</h2>

      {/* Email Field */}
      <div className="relative mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="gmail"
          onChange={handleInput}
          value={login.gmail}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          required
          disabled={otpSent}
        />
      </div>

      {/* Send OTP Button */}
      {otpSent?'':(<button
        type="button"
        onClick={ handleOTPGenerate}
        disabled={loadingOtp || otpSent}
        className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition flex justify-center items-center mb-4"
      >
        {loadingOtp ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Sending OTP...</span>
          </div>
        ) : (
          "Send OTP"
        )}
      </button>)}

      {/* OTP Input & Verify Button (Only Show After OTP Sent) */}
      {otpSent && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">OTP</label>
            <input
              type="number"
              name="otp"
              onChange={handleInput}
              className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            onClick={handleOTPComparison}
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition flex justify-center items-center"
          >
            {verifying ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
