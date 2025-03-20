import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import { context } from "./App";

const Form = () => {
  const { setShowForm, setColor, email } = useContext(context);
  const [detail, setDetail] = useState({
    email: email,
    activity: "",
    mode: "",
    Tname: "",
    TDes: "",
    members: [],
  });
  const [member, setMember] = useState("");
  const [name, setName] = useState("");
  const [index, setIndex] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [load, setLoad] = useState(false);

  const handleInput = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    if (member.trim() !== "") {
      setDetail({ ...detail, members: [...detail.members, member] });
      setMember("");
    }
  };

  useEffect(() => {
    if (detail.mode === "solo" && name) {
      setDetail((prev) => ({ ...prev, members: [name] }));
    }
  }, [name, detail.mode]);

   // Function to delete a member
   const deleteMember = (index) => {
    const updatedMembers = detail.members.filter((_, i) => i !== index);
    setDetail({ ...detail, members: updatedMembers });
  };

  // Function to select a member for editing
  const selectMember = (index) => {
    setIndex(index);
    setName(detail.members[index]);
    setShowEdit(true);
  };

  // Function to save the edited member
  const editMember = (index) => {
    const updatedMembers = [...detail.members];
    updatedMembers[index] = name;
    setDetail({ ...detail, members: updatedMembers });
    setName("");
  };

  const handleSubmit = async () => {
    setLoad(true);
    if (!detail.activity || !detail.Tname || !detail.TDes || !detail.mode || detail.members.length === 0) {
      alert("All fields are required");
      setLoad(false);
      return;
    }

    if (detail.mode === "group" && detail.members.length < 2) {
      alert("At least two members are required");
      setLoad(false);
      return;
    }

    if (detail.mode === "solo" && detail.members.length > 1) {
      alert("Only one member is allowed in solo mode");
      setLoad(false);
      return;
    }

    try {
      const res = await axios.post("https://techfest-participants.vercel.app/api/storeData", detail);
      if (res.data.msg === "data already exist") {
        alert(res.data.message);
        setLoad(false);
        return;
      }

      if (res.data.message === "data stored successfully") {
        setShowForm(false);
        setLoad(false);
        setColor("d");
      }
    } catch (e) {
      console.log("error in handleSubmit", e);
      setLoad(false);
    }
  };

  return (
    <div className="mt-[100px] mx-5  position w-full  max-w-[400px] p-8 bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📋 Activity Form</h2>
      <div className="space-y-5">
        {/* Select Field */}
        <div>
          <label className="block font-medium text-gray-700">Select Activity:</label>
          <select
            name="activity"
            onChange={handleInput}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select an option</option>
            <option value="Presentation">Presentation</option>
            <option value="Poster Making">Poster Making</option>
            <option value="Reel Making">Reel Making</option>
            <option value="Quiz Competition">Quiz Competition</option>
            <option value="Debate Competition">Debate Competition</option>
            <option value="ETX video">ETX video</option>
            <option value="Project(s/w,h/w)">Project(s/w,h/w)</option>
          </select>
        </div>

        {/* Topic Name */}
        <div>
          <label className="block font-medium text-gray-700">Topic Name:</label>
          <input
            type="text"
            placeholder="Enter topic name"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            name="Tname"
            onChange={handleInput}
          />
        </div>

        {/* Topic Description */}
        <div>
          <label className="block font-medium text-gray-700">Topic Description:</label>
          <input
            type="text"
            placeholder="Enter topic description"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            name="TDes"
            onChange={handleInput}
          />
        </div>

        {/* Radio Buttons */}
        <div>
          <label className="block font-medium text-gray-700">Choose Mode:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                onClick={() => setDetail({ ...detail, mode: "solo", members: [] })}
                name="mode"
                className="w-4 h-4"
              />
              Solo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                onClick={() => setDetail({ ...detail, mode: "group", members: [] })}
                name="mode"
                className="w-4 h-4"
              />
              Group
            </label>
          </div>
        </div>

        {/* Name Input for Solo Mode */}
        {detail.mode === "solo" && (
          <div>
            <label className="block font-medium text-gray-700">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {/* Input for Group Members */}
        {detail.mode === "group" && (
          <div>
            <label className="block font-medium text-gray-700">Member Names:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={member}
                onChange={(e) => setMember(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Add member name"
              />
              {showEdit?<button
                onClick={editMember}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
              >
                 Edit
              </button>:
              <button
                onClick={addMember}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:scale-105 transition"
              >
                 Add
              </button>}
              
            </div>
          </div>
        )}

        {/* Display Members */}
        {detail.members.length > 0 && detail.mode === "group" && (
          <div className="mt-2">
            <h3 className="font-medium text-gray-700">Members:</h3>
            {detail.members.map((member, index) => (
              <div
                key={index}
                className=" relative  w-full p-2 border  rounded-lg bg-gray-100 shadow-sm text-gray-800 mb-2"
              >
                {member}
                <div className="absolute top-2 right-1 flex space-x-[10px]">
          <FiEdit
            onClick={() => selectMember(index)}
            className="text-blue-500 cursor-pointer hover:text-blue-700"
            size={20}
          />
          <FiTrash2
            onClick={() => deleteMember(index)}
            className="text-red-500 cursor-pointer hover:text-red-700"
            size={20}
          />
        </div>
              </div>
              
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-lg shadow-lg hover:scale-105 transition"
        >
          {!load ? "Submit" : (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2">Loading...</span>
            </div>
          )}
        </button>
      </div>

      {/* Close Button */}
      <RxCross1
        onClick={() => setShowForm(false)}
        size="35px"
        className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition duration-200"
      />
    </div>
  );
};

export default Form;
