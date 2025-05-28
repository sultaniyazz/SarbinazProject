import { Menu, ArrowLeft, Bell, User, LogOut } from "lucide-react";
import { modal, showLoginModal, showSignUpModal } from '../../features/pageActionSlice';
import { useDispatch } from "react-redux";
import TodayCalendar from "../TodayCalendar/TodayCalendar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const showBackButton = location.pathname.startsWith("/detail/");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setOpenDropdown(false);
    window.location.reload();
  };

  return (
    <div className="h-full flex justify-between items-center px-4 bg-white border-b border-gray-200 py-3 relative">

      {/* Mobil menyu */}
      <div className="sm:hidden">
        <button
          onClick={() => dispatch(modal())}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Kalendar va Orqaga tugmasi */}
      <div className="flex items-center font-montserrat max-md:text-xl font-semibold max-sm:hidden gap-3">
        {showBackButton && (
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-blue-600 transition"
          >
            <ArrowLeft size={32} />
          </button>
        )}
        <TodayCalendar />
      </div>

      {/* O‘ng tomon */}
      <div className="flex items-center justify-end gap-3 max-w-lg w-full relative">
        <input
          type="search"
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 outline-none max-md:hidden"
          placeholder="Search..."
        />

        {/* Bell */}
        <button
          aria-label="Notifications"
          className="p-2 rounded-full hover:bg-gray-100 transition-transform active:scale-95"
        >
          <Bell className="text-gray-600" size={24} />
        </button>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => setOpenDropdown(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            {user ? (
              <>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
                  {user.fullname?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-800">{user.fullname}</span>
              </>
            ) : (
              <User className="text-gray-700" size={24} />
            )}
          </button>


          {/* Dropdown menyu */}
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-50">
              {user ? (
                <div className="px-4 py-2 text-sm text-gray-700">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2 py-2 hover:bg-gray-100 text-left text-red-600"
                  >
                    <LogOut size={16} />
                    Chiqish
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      dispatch(showLoginModal());
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      dispatch(showSignUpModal());
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
