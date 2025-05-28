import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { X } from 'lucide-react';
import { showLoginModal } from '../../features/pageActionSlice';

const LoginForm = ({ onLogin }) => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup.string().email('Noto‘g‘ri email').required('Email majburiy'),
    password: yup.string().min(4, 'Kamida 4 ta belgidan iborat bo‘lishi kerak').required('Parol majburiy'),
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await axios.get('https://sarbinazapiadmin.onrender.com/users');
        const user = res.data.find(
          u => u.email === values.email && u.password === values.password
        );

        if (user) {
          alert('Tizimga muvaffaqiyatli kirdingiz!');
          dispatch(showLoginModal());
          window.location.reload();


          // Faqat bitta foydalanuvchini localStorage ga saqlash
          localStorage.setItem("loggedInUser", JSON.stringify(user));

          onLogin && onLogin(user); // Agar parent component funksiyasini uzatsa
        } else {
          setErrors({ email: 'Email yoki parol noto‘g‘ri' });
        }
      } catch (error) {
        console.error(error);
        alert('Server bilan bog‘lanib bo‘lmadi');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="relative z-50 w-full max-w-md mx-4 sm:mx-0 bg-white p-8 rounded-2xl border border-gray-300 shadow-lg">
      <button
        onClick={() => dispatch(showLoginModal())}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition text-xl"
        aria-label="Yopish"
      >
        <X />
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Tizimga kirish</h2>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-700 font-medium">Email manzilingiz</label>
          <input
            type="email"
            {...formik.getFieldProps('email')}
            className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            placeholder="example@gmail.com"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-gray-700 font-medium">Parol</label>
          <input
            type="password"
            {...formik.getFieldProps('password')}
            className={`w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500`}
            placeholder="********"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Kirish
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Hisobingiz yo‘qmi?{' '}
        <button
          onClick={() => alert('Ro‘yxatdan o‘tish sahifasiga o‘tamiz')}
          className="text-blue-600 hover:underline font-medium"
        >
          Ro‘yxatdan o‘tish
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
