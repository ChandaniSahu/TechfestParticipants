import { useState, useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FiCheckCircle } from "react-icons/fi";
import { context } from "./App";

const Form = () => {
  const { setShowForm, setColor, user } = useContext(context);
  const [detail, setDetail] = useState({
    email: user.email,
    activities: [],
    name: "",
    department: "",
    year: "",
  });
  const [load, setLoad] = useState(false);

  useEffect(() => {
    console.log("detail", detail);
  }, [detail]);

  const activities = {
    Day1: ["Robo War", "Drone Racing", "CAD Design Competition", "Treasure Hunt"],
    Day2: ["Bridge Design", "Project Expo", "Tech Quiz", "Idea Pitching" ,"Business Plan Competition"],
    Day3: ["Gaming Challenge", "Coding Contest", "TED-X", "Innovation Challenge","Tech Charades","Techno Rythm"],
  };

  const handleCheckboxChange = (day, activity, checked) => {
    setDetail((prev) => ({
      ...prev,
      activities: checked
        ? [...(prev.activities || []), { day, activity }]
        : (prev.activities || []).filter((item) => item.activity !== activity),
    }));
  };

  const handleSubmit = async () => {
    setLoad(true);
    if (!detail.activities.length || !detail.name || !detail.department || !detail.year) {
      alert("All fields are required");
      setLoad(false);
      return;
    }

    try {
      const res = await axios.post("https://techfest-participants.vercel.app/api/storeData", detail);
      if (res.data.message === "data stored successfully") {
        alert("Form submitted successfully");
        setShowForm(false);
        setColor("f");
      } else {
        alert(res.data.message);
        console.log("failed submitting", res.data.message);
      }
    } catch (e) {
      console.log("error in handleSubmit", e);
      alert("Error in submitting form");
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="mt-[40px] position max-w-[370px] w-[500px]  p-8 bg-white shadow-2xl rounded-3xl border border-gray-300 relative overflow-auto max-h-[500px] scrollbar-[20px] scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-700">📋 Activity Form</h2>
      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">Full Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-3 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-400 transition"
            value={detail.name}
            onChange={(e) => setDetail({ ...detail, name: e.target.value })}
          />
        </div>

        {/* Year Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">Year of Study:</label>
          <select
            className="w-full p-3 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-400 transition"
            value={detail.year}
            onChange={(e) => setDetail({ ...detail, year: e.target.value })}
          >
            <option value="" disabled>Select your year</option>
            {["1st", "2nd", "3rd", "4th"].map((year) => (
              <option key={year} value={year}>{year} Year</option>
            ))}
          </select>
        </div>

        {/* Department Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-800">Department:</label>
          <select
            className="w-full p-3 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-400 transition"
            value={detail.department}
            onChange={(e) => setDetail({ ...detail, department: e.target.value })}
          >
            <option value="" disabled>Select your department</option>
            {["CSE", "Aero", "Mech", "Civil", "Mining"].map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Activities Section */}
        <h2 className="text-lg font-semibold text-gray-800">Select Activities:</h2>
        <div className="flex flex-col gap-4">
          {Object.keys(activities).map((day) => (
            <div key={day} className="bg-gray-100 p-4 rounded-xl shadow-md h-auto hover:bg-gray-200 hover:scale-105 transition duration-100">
              <h3 className="text-lg font-bold text-blue-600 text-center">{day}</h3>
              <ul className="space-y-2">
                {activities[day].map((activity, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(day, activity, e.target.checked)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-gray-700">{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center"
        >
          {!load ? (
            "Submit"
          ) : (
            <>
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Loading...</span>
            </>
          )}
        </button>
      </div>

      {/* Close Button */}
      <RxCross1
        onClick={() => setShowForm(false)}
        size="30px"
        className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-red-500 transition"
      />
    </div>
  );
};

export default Form;




       