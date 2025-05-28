import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Cards from '../../components/Cards/Cards';
import MyListingModal from '../../components/MyListingModal/AddListingModal';
import { useSelector } from 'react-redux';


const MyListings = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userListings, setUserListings] = useState([]);
  const allData = useSelector((state) => state.homeSlice.homeData);
  console.log("All Data:", allData);


  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Userga tegishli listinglar filterlanadi
      const filteredListings = allData.filter(item => item.adminId === parsedUser.id);
      setUserListings(filteredListings);
    }
  }, []);




  return (
    <div className="px-4 py-6">
      {/* Yuqori panel */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 px-4 py-3 bg-white rounded-2xl shadow-md">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">E'lonlarim</h1>
          <p className="text-sm text-gray-500 mt-1">
            Joylagan barcha uylaringiz shu yerda
          </p>
        </div>

        {user && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition active:scale-95 shadow-md"
          >
            <PlusCircle size={20} />
            <span className="text-sm sm:text-base">Uy joylash</span>
          </button>
        )}
      </div>

      {/* Faqat userga tegishli listinglar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userListings.length > 0 ? (
          userListings.map((item) => (
            <Cards
              key={item.id}
              {...item}
              isFavouritePage={false}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            {user ? "Sizda hali uy e’loni yo‘q." : "Avval login qiling."}
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && user && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl max-sm:max-w-sm relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Yangi uy ma’lumotlari</h2>
            <div className="overflow-y-auto max-h-[70vh]">
              <MyListingModal />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
