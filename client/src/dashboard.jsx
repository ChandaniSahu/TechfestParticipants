import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import {context} from './App'
import { FiTrash2, FiEdit } from "react-icons/fi";


const activities = {
  Day1: ["Robo War", "Drone Racing", "CAD Design Competition", "Treasure Hunt"],
  Day2: [
    "Bridge Design",
    "Project Expo",
    "Tech Quiz",
    "Idea Pitching",
    "Business Plan Competition",
  ],
  Day3: [
    "Gaming Challenge",
    "Coding Contest",
    "TED-X",
    "Innovation Challenge",
    "Tech Charades",
    "Techno Rythm",
  ],
};

export default function ActivitiesOverview() {
  const {editActivity,setEditActivity,setShowEditForm,user,data,fetchData} = useContext(context)
  const defaultDay = "Day1";
  const defaultActivity = activities[defaultDay][0];
  // const [data,setData] = useState([])
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedActivity, setSelectedActivity] = useState(defaultActivity);
  const [groupedParticipants, setGroupedParticipants] = useState({});
  const [loading, setLoading] = useState(false);
  // const[activities,setActivities] = useState([])
  const [activity,setActivity] = useState()
  useEffect(() => {
    fetchData();
    GroupData(defaultActivity)
  }, []);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get("https://techfest-participants.vercel.app/api/getData");
  //     const rev = res.data.reverse();
  //     setData(rev)
  //     console.log("Fetched Participants:", res.data);

      
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const GroupData =(name)=>{
    setActivity(name)
    function findParticipants(name) {
      return data.filter(user => user.activities.includes(name));
  }
  
  // Example usage:
  // const activityName = "Robo War"; // Change to any activity
  const participants = findParticipants(name);
  if(!participants){
    console.log('no participants')
  }
  else
  {console.log('worked',participants);
  setGroupedParticipants(participants);}
  }

  useEffect(() => {
    if (data.length > 0) {
      GroupData(selectedActivity);
    }
  }, [data, selectedActivity]);
    

  const deleteActivity = async (id,activityName) => {
    console.log('client',id,activityName)
    setShowEditForm(false)
    if (!window.confirm("Are you sure you want to delete this activity?")) {
      return;
    }
    try {
      const res = await axios.put(`https://techfest-participants.vercel.app/api/deleteActivity/${id}`, {
        activityToRemove: activityName
      });
    if(res.data.msg==='Activity deleted successfully'){
      alert('Activity deleted successfully')
      fetchData()
    }
      

    else
      alert('Activity not deleted')
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



  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center pt-[100px]">
      <div className="bg-white p-6 rounded-xl shadow-lg mb-[20px] w-full max-w-3xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          🎯 Activities Overview
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.keys(activities).map((day) => (
            <button
              key={day}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg border-2 ${
                selectedDay === day
                  ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white border-transparent scale-105 shadow-xl"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 hover:text-white hover:border-transparent"
              }`}
              onClick={() => {
                setSelectedDay(day);
                setSelectedActivity(activities[day][0]);
                GroupData(activities[day][0])
              }}
            >
              📅 {day}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl transition-all transform hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Activities on {selectedDay}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {activities[selectedDay].map((activity) => (
              // {console.log('activities[selectedDay]',activities[selectedDay])}
              <button
                key={activity}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg border-2 ${
                  selectedActivity === activity
                    ? "bg-green-600 text-white border-transparent scale-105 shadow-xl"
                    : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-green-500 hover:text-white hover:border-transparent"
                }`}
                onClick={() => (GroupData(activity),setSelectedActivity(activity))}
              >
                🚀 {activity}
              </button>
            ))}
          </div>
        </div>
             

        <div className="flex flex-col items-center justify-center p-6">
      {selectedActivity && (
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl mt-6 relative overflow-hidden transition-all transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-gray-100 opacity-30"></div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
            {activity} - Participants
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 font-medium">Loading participants...</p>
          ) : (
            <>
            {groupedParticipants?.length===0?'':(<p className="text-center font-medium mb-4 text-gray-600">
              Total Participants:
              <span className="font-bold text-blue-600">
                {" "}
                {groupedParticipants?.length}
              </span>
            </p>)}

              {groupedParticipants?.length > 0 ? (
                <ul className="space-y-3 overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2 ">
                  {groupedParticipants.map((participant, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center gap-4 hover:bg-gray-200 hover:text-white transition-all transform hover:scale-105"
                    >
                      <span className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full font-bold shadow-md">
                        {participant.name.charAt(0)}
                      </span>
                      <div className="space-x-[100px] flex" key={participant}><div>
                        <p className="font-semibold text-gray-800">{participant.name}</p>
                        <p className="text-sm text-gray-600">
                          {participant.department}, {participant.year} Year
                        </p>
                      </div>
                       <div> 
                         {user.email==='rrrsahu2005@gmail.com' && user.loggedIn ?<div className="absolute top-3 right-3 flex space-x-3 ml-[10px]">
                           <FiTrash2
                              onClick={() =>{ deleteActivity(participant._id,activity)}}
                             className="text-red-500 cursor-pointer hover:text-red-700"
                             size={20}
                            />
                            
                           <FiEdit
                            onClick={() => {handleEditActivity(participant);console.log('participant',participant)}}
                            className="text-green-500 cursor-pointer hover:text-green-700"
                            size={20}
                            />
                         </div>:
                         user?.email?.toLowerCase() === participant?.email?.toLowerCase() && user.loggedIn ?<FiEdit
                         onClick={() => {handleEditActivity(participant);console.log('participant',participant)}}
                         className="absolute top-3 right-3 text-green-500 cursor-pointer hover:text-green-700"
                         size={20}
                         />:''}
                       </div>
                     
                         </div>
                    </li>
                  ))}
                  
                </ul>
              ) : (
                <p className="text-center text-gray-500">No participants registered yet.</p>
              )}
            </>
          )}
        </div>
      )}
    </div>

        
      </div>
    </div>
  );
}

