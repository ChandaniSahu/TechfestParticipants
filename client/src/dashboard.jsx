import { useState, useEffect,useContext} from "react";
import axios from "axios";
import{context} from './App'
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Dashboard = () => {
  const {user,editActivity,setEditActivity,setShowEditForm} = useContext(context);
  const [data, setData] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://techfest-participants.vercel.app/api/getData");
      const rev = res.data.reverse();
      setData(rev);
      console.log('dash',res.data)
      setSelectedActivity(res.data[0]?.activity || "");

    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    
    fetchData();
  },[]);

  const deleteActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    try{
      console.log('delete id',id)
   const res = await axios.get(`http://localhost:3000/api/deleteData/${id}`)
    console.log('res',res)
    }
   catch(e){
     console.log('error in delete in dash',e)
   }
  }

  const handleEditActivity =  (activity) => {
    console.log('editactivity',activity)
    setEditActivity(activity)
    console.log('acty',editActivity)
    setShowEditForm(true)
   }

  const activities = [...new Set(data.map((item) => item.activity))];
  const filteredParticipants = data.filter((item) => item.activity === selectedActivity);

  return (
    <div className="pt-[100px] min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">🎯 Activities</h2>

        {/* Loading Animation */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Activity Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedActivity(activity)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg border-2 ${
                      selectedActivity === activity
                        ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white border-transparent scale-105 shadow-xl"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 hover:text-white hover:border-transparent"
                    }`}
                  >
                    🚀 {activity}
                    {console.log(activity)}
                  </button>
                ))
              ) : (
                <p className="text-gray-600">No activities found.</p>
              )}
            </div>

            {/* Participants List */}
            {selectedActivity && (
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                  🏆 Participants for {selectedActivity}
                </h3>
                <div className="space-y-6">
                  {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((item) => (
                      <div
                        key={item._id}
                        className="p-6 border border-gray-300 rounded-xl shadow-lg bg-white bg-opacity-80 backdrop-blur-md transition-all hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-transparent to-blue-300 opacity-20"></div>
                        <p className="font-semibold text-gray-900">
                          🔹 Mode: <span className="text-gray-600">{item.mode}</span>
                        </p>
                        <p className="font-semibold text-gray-900">
                          📚 Topic Name: <span className="text-gray-600">{item.Tname}</span>
                        </p>
                        <p className="font-semibold text-gray-900">
                          📝 Description: <span className="text-gray-600">{item.TDes}</span>
                        </p>
                        {item.mode === "solo" ? (
                          <p className="font-semibold text-gray-900">
                            🎭 Participant: <span className="text-gray-600">{item.members[0]}</span>
                          </p>
                        ) : (
                          <p className="font-semibold text-gray-900">
                            👥 Members: <span className="text-gray-600">{item.members.join(", ")}</span>
                          </p>
                        )}{console.log('emailRani',user.email)}
                         {user.email==='rrrsahu2005@gmail.com' && user.loggedIn ?<div className="absolute top-3 right-3 flex space-x-3">
                          <FiTrash2
                             onClick={() => deleteActivity(item._id)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                            size={20}
                           />
                          <FiEdit
                           onClick={() => handleEditActivity(item)}
                           className="text-green-500 cursor-pointer hover:text-green-700"
                           size={20}
                           />
                        </div>:'no'}
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-600">No participants found.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
