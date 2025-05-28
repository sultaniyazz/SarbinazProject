import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";
import axios from "axios";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("https://your-api.com/notifications");
        setNotifications(res.data); // bu array bo'lishi kerak
      } catch (err) {
        setError("Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-10 px-4 overflow-hidden">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Bildirishnomalar</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Yuklanmoqda...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : Array.isArray(notifications) && notifications.length > 0 ? (
        <div className="flex flex-col gap-4 w-full max-w-md">
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm relative"
              >
                <button
                  onClick={() => removeNotification(notif.id)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <X size={16} />
                </button>
                <div className="flex gap-3 items-start">
                  <Bell size={20} className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="text-gray-800 font-semibold text-sm">{notif.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-gray-500 h-60"
        >
          <Bell size={40} className="mb-4 text-gray-300" />
          <p className="text-lg font-medium">Hozircha hech qanday bildirishnoma yo‘q</p>
        </motion.div>
      )}
    </div>
  );
};

export default Notification;
