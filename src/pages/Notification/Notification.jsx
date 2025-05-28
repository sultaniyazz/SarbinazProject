import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get('/api/notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error('Xatolik: notificationlarni olishda muammo yuz berdi', error);
      }
    };

    fetchNotifications();

    // har 30 soniyada yangilab turish uchun:
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="bg-white shadow-xl border border-gray-200 rounded-xl px-5 py-4 max-w-xs w-full relative"
          >
            <button
              onClick={() => removeNotification(notif.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <Bell className="text-blue-500 mt-1" size={20} />
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{notif.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
