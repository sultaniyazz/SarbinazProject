import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import Home from './pages/Home/Home';
import { Favourite } from './pages/Favourite/Favourite';
import RootLayout from './layout/RootLayout';
import Messages from './pages/Messages/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAdminData, getAllHouseData } from './api/request';
import MyListings from './pages/MyListings/MyListings';
import HomeDetail from './pages/detail/HomeDetail';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Notification from './pages/Notification/Notification';


const App = () => {
  const dispatch = useDispatch();
  const modalLoginForm = useSelector((state) => state.pageActionSlice.showLoginModal);
  const modalSignUpForm = useSelector((state) => state.pageActionSlice.showSignUpModal);

  useEffect(() => {
    dispatch(getAllHouseData('https://sarbinazapi.onrender.com/homes'));
    dispatch(getAllAdminData('https://sarbinazapiadmin.onrender.com/users'));
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/detail/:slug" element={<HomeDetail />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="my-listings" element={<MyListings />} />
        <Route path="messages" element={<Messages />} />
        <Route path="/notification" element={<Notification />} />
      </Route>
    )
  );

  return (
    <>
      {/* Login modal */}
      {modalLoginForm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <LoginForm onClose={() => dispatch(showLoginModal(false))} />
        </div>
      )}

      {/* ✅ Sign Up modal */}
      {modalSignUpForm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex justify-center items-center z-50">
          <SignUpForm onClose={() => dispatch(showSignUpModal(false))} />
        </div>
      )}

      <RouterProvider router={router} />
    </>
  );
};

export default App;
