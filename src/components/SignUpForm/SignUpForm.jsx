import React, { useState } from 'react';
import { X } from 'lucide-react';
import { showSignUpModal } from '../../features/pageActionSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const SignUpForm = ({ onSignUp }) => {

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const admins = useSelector((state) => state.homeSlice.AdminData);



  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const maxId = admins.length > 0 ? Math.max(...admins.map(u => u.id)) : 0;
    const newId = maxId + 1;

    if (form.password !== form.confirmPassword) {
      alert("Parollar mos emas!");
      return;
    }

    try {
      // Avval email bor-yo‘qligini tekshiramiz


      const res = await axios.get(`https://sarbinazapiadmin.onrender.com/users?email=${form.email}`);

      if (res.data.length > 0) {
        alert("Bu email bilan allaqachon ro'yxatdan o'tilgan!");
        return;
      }

      await axios.post('https://sarbinazapiadmin.onrender.com/users', {
        id: newId,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });

      alert("Ro'yxatdan o‘tish muvaffaqiyatli yakunlandi!");
      onSignUp?.(form);
      dispatch(showSignUpModal()); // Modalni yopamiz

    } catch (err) {
      console.error("Xatolik:", err);
      alert("Ro'yxatdan o'tishda xatolik yuz berdi!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 z-50 flex justify-center items-center px-4">
      <div className="relative max-w-md w-full bg-white rounded-2xl p-8 shadow-xl">
        {/* Yopish tugmasi */}
        <button
          onClick={() => dispatch(showSignUpModal())}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          aria-label="Yopish"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ro‘yxatdan o‘tish</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col text-gray-700 font-medium">
            To‘liq ismingiz
            <input
              type="text"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
              placeholder="Ali Valiyev"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Parol
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Parolingiz"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="flex flex-col text-gray-700 font-medium">
            Parolni tasdiqlang
            <input
              type="password"
              name="confirmPassword"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Parolni qayta kiriting"
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Allaqachon hisobingiz bormi?{' '}
          <button
            onClick={() => alert('Login sahifasiga o‘tish')}
            className="text-blue-600 font-semibold hover:underline"
          >
            Kirish
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
