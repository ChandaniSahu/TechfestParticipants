
import { useEffect, useState } from "react";
import axios from "axios";

const ActivityViewer = () => {
  const [groupedActivities, setGroupedActivities] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://techfest-participants.vercel.app/api/getData");
        const grouped = groupByDays(response.data);
        setGroupedActivities(grouped);
        const days = Object.keys(grouped);
        if (days.length > 0) {
          setSelectedDay(days[0]);
          const activities = Object.keys(grouped[days[0]]);
          if (activities.length > 0) {
            setSelectedActivity(activities[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const groupByDays = (data) => {
    const grouped = {};
    data.forEach((entry) => {
      entry.activities.forEach(({ day, activity }) => {
        if (!grouped[day]) grouped[day] = {};
        if (!grouped[day][activity]) grouped[day][activity] = [];
        grouped[day][activity].push({
          name: entry.name,
          department: entry.department,
          year: entry.year,
        });
      });
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center pt-[100px]">
      <div className="bg-white p-6 rounded-xl shadow-lg  mb-[20px] w-full max-w-3xl ">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">🎯 Activities Overview</h1>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {Object.keys(groupedActivities).map((day) => (
          <button
            key={day}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg border-2 ${
              selectedDay === day
                ? "bg-gradient-to-r from-blue-600 to-purple-500 text-white border-transparent scale-105 shadow-xl"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 hover:text-white hover:border-transparent"
            }`}
            onClick={() => {
              setSelectedDay(day);
              const firstActivity = Object.keys(groupedActivities[day])[0];
              setSelectedActivity(firstActivity);
            }}
          >
            📅 {day}
          </button>
        ))}

      </div>
      </div>

      {selectedDay && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl  transition-all transform hover:scale-105">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Activities on {selectedDay}
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.keys(groupedActivities[selectedDay]).map((activity) => (
              <button
                key={activity}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg border-2 ${
                  selectedActivity === activity
                    ? "bg-green-600 text-white border-transparent scale-105 shadow-xl"
                    : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-green-500 hover:text-white hover:border-transparent"
                }`}
                onClick={() => setSelectedActivity(activity)}
              >
                🚀 {activity}
              </button>
            ))}
          </div>
        </div>
      )}

{selectedActivity && selectedDay && (
  <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-3xl mt-6 relative overflow-hidden transition-all transform hover:scale-105 hover:scale-105">
    {/* Subtle Background Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-transparent to-gray-100 opacity-30"></div>

    <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
      {selectedActivity} - Participants
    </h2>
    
    <p className="text-center font-medium mb-4 text-gray-600">
      Total Participants: 
      <span className="font-bold text-blue-600"> {groupedActivities[selectedDay][selectedActivity].length}</span>
    </p>

    <ul className="space-y-3 overflow-auto max-h-[300px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-2">
      {groupedActivities[selectedDay][selectedActivity].map((participant, index) => (
       <li
       key={index}
       className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center gap-4 hover:bg-gray-200 hover:text-white transition-all transform hover:scale-105"
     >
      {/* //  transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 */}
      
          <span className="flex-shrink-0 w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full font-bold shadow-md">
            {participant.name.charAt(0)}
          </span>
          <div>
            <p className="font-semibold text-gray-800">{participant.name}</p>
            <p className="text-sm text-gray-600">
              {participant.department}, {participant.year} Year
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}


    </div>
  );    }
export default ActivityViewer;


