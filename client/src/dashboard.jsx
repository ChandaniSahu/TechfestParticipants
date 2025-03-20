import { useState, useEffect} from "react";
import axios from "axios";

const Dashboard = () => {
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
                        )}
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
