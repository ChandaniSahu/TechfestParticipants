import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { context } from "./App";

const EditActivity = () => {
  const activities = {
    Day1: ["Robo War", "Drone Racing", "CAD Design Competition", "Treasure Hunt"],
    Day2: ["Bridge Design", "Project Expo", "Tech Quiz", "Idea Pitching" ,"Business Plan Competition"],
    Day3: ["Gaming Challenge", "Coding Contest", "TED-X", "Innovation Challenge","Tech Charades","Techno Rythm"],
  };

  const handleCheckboxChange = (activity, checked) => {
    setDetail((prev) => ({
      ...prev,
      activities: checked
        ? [...(prev.activities || []), activity]
        : (prev.activities || []).filter((item) => item !== activity),
    }));
  };
  const { setShowForm, setColor, editActivity, setEditActivity ,setShowEditForm} = useContext(context);

  const [detail, setDetail] = useState({
    activities: [],
    name: "",
    year: "",
    department: "",
  });

  const [member, setMember] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editActivity && editActivity) {
      setDetail({
        activities: editActivity.activities || "",
        name: editActivity.name || "",
        year: editActivity.year || "",
        department: editActivity.department || "",
      });
    }
  }, [editActivity]);

  
  const handleUpdate = async () => {
    setLoading(true);

    if (!detail.activities || !detail.name || !detail.year || !detail.department) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(
        `https://techfest-participants.vercel.app/api/updateActivity/${editActivity._id}`,
        detail
      );

      if (res.data.msg==="Activity Edited successfully") {
        console.log('editmsg',res.data.msg)
        alert("Activity updated successfully!");
        setShowEditForm(false);
        setDetail({activities: [], name:"",year: "",department: ""})
          
          
      } else {
        alert(res.data.msg);
        console.log('failed editing',res.data.msg)
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Error updating activity.");
    } finally {
      setLoading(false);
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
                      checked={detail.activities.includes(activity)}
                      onChange={(e) => handleCheckboxChange(activity,e.target.checked)}
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
          onClick={handleUpdate}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl shadow-md hover:scale-105 transition flex items-center justify-center"
        >
          {!loading ? (
            "Update"
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
        onClick={() => setShowEditForm(false)}
        size="30px"
        className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-red-500 transition"
      />
    </div>
  );
};

export default EditActivity;
