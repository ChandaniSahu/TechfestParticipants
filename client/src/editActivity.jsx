import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { context } from "./App";

const EditActivity = () => {
  const { setShowForm, setColor, editActivity, setEditActivity ,setShowEditForm} = useContext(context);

  const [detail, setDetail] = useState({
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editActivity && editActivity) {
      setDetail({
        activity: editActivity.activity || "",
        mode: editActivity.mode || "",
        Tname: editActivity.Tname || "",
        TDes: editActivity.TDes || "",
        members: editActivity.members || [],
      });
      setName(editActivity.members[0] || "");
    }
  }, [editActivity]);

  const handleInput = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const addMember = () => {
    if (member.trim() !== "") {
      setDetail((prev) => ({ ...prev, members: [...prev.members, member] }));
      setMember("");
    }
  };

  const deleteMember = (index) => {
    setDetail((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }));
  };

  const selectMember = (index) => {
    setIndex(index);
    setMember(detail.members[index]);
    setShowEdit(true);
  };

  const editMember = () => {
    const updatedMembers = [...detail.members];
    updatedMembers[index] = member;
    setDetail((prev) => ({ ...prev, members: updatedMembers }));
    setMember("");
    setShowEdit(false);
  };

  const handleUpdate = async () => {
    setLoading(true);

    if (!detail.activity || !detail.Tname || !detail.TDes || !detail.mode) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }

    if (detail.mode === "group" && detail.members.length < 2) {
      alert("At least two members are required for group mode.");
      setLoading(false);
      return;
    }

    if (detail.mode === "solo" && detail.members.length !== 1) {
      alert("Only one member is allowed in solo mode.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3000/api/updateActivity/${editActivity._id}`,
        detail
      );

      if (res.data.msg==="Activity updated successfully!") {
        alert("Activity updated successfully!");
        setShowEditForm(false);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      alert("Error updating activity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[100px] position mx-5 w-full max-w-[400px] p-8 bg-white bg-opacity-90 shadow-2xl rounded-2xl border border-gray-200 relative">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📋 Edit Activity</h2>
      <div className="space-y-5">
        
        {/* Activity Selection */}
        <div>
          <label className="block font-medium text-gray-700">Select Activity:</label>
          <select
            name="activity"
            value={detail.activity}
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
            value={detail.Tname}
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
            value={detail.TDes}
            onChange={handleInput}
          />
        </div>

        {/* Mode Selection */}
        <div>
          <label className="block font-medium text-gray-700">Choose Mode:</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={detail.mode === "solo"}
                onChange={() => setDetail({ ...detail, mode: "solo", members: [] })}
                className="w-4 h-4"
              />
              Solo
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="mode"
                checked={detail.mode === "group"}
                onChange={() => setDetail({ ...detail, mode: "group", members: [] })}
                className="w-4 h-4"
              />
              Group
            </label>
          </div>
        </div>

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

        {/* Group Members */}
        {detail.mode === "group" && (
          <div>
            <label className="block font-medium text-gray-700">Member Names:</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={member}
                onChange={(e) => setMember(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="Add member name"
              />
              {showEdit ? (
                <button onClick={editMember} className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:scale-105">Edit</button>
              ) : (
                <button onClick={addMember} className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-lg hover:scale-105">Add</button>
              )}
            </div>
          </div>
        )}
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
                 <FiTrash2
                 title="Delete"
            onClick={() => {deleteMember(index)}}
            className="text-red-500 cursor-pointer hover:text-red-700"
            size={20}
          /> 
          <FiEdit
            onClick={() => {selectMember(index)}}
            title="Edit"
            className="text-green-500 cursor-pointer hover:text-green-700"
            size={20}
          />
          
        </div>
              </div>
              
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button onClick={handleUpdate} className="w-full bg-blue-500 text-white p-3 rounded-lg shadow-lg hover:scale-105">
          {loading ? "Updating..." : "Update"}
        </button>
      </div>

      <RxCross1 onClick={() => setShowEditForm(false)} size="35px" className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200" />
    </div>
  );
};

export default EditActivity;
