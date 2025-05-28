// components/AddListingModal.jsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import slugify from 'slugify';
import {
  BadgePlus, Home, MapPin, DollarSign, Ruler,
  BedDouble, Phone, User, UploadCloud, StickyNote
} from 'lucide-react';

const AddListingModal = () => {
  const [initialId, setInitialId] = useState(1);

  useEffect(() => {
    axios.get('https://sarbinazapi.onrender.com/homes')
      .then(res => setInitialId(res.data.length + 1))
      .catch(err => console.error('Xatolik:', err));
  }, []);

  const phoneRegExp = /^[+0-9()\- ]+$/;

  const formik = useFormik({
    initialValues: {
      title: '', location: '', price: '', rooms: '', area: '',
      status: 'active', description: '', number: '', seller: '', images: [], adminId: ''
    },
    validationSchema: Yup.object({
      adminId: Yup.string().required('Majburiy'),
      title: Yup.string().required('Majburiy'),
      location: Yup.string().required('Majburiy'),
      price: Yup.number().typeError('Faqat raqam').required('Majburiy'),
      rooms: Yup.number().typeError('Faqat raqam').required('Majburiy'),
      area: Yup.number().typeError('Faqat raqam').required('Majburiy'),
      status: Yup.string().oneOf(['active', 'sold', 'rented']).required(),
      description: Yup.string().min(10).required('Majburiy'),
      number: Yup.string().matches(phoneRegExp, 'Faqat raqam va belgi').required('Majburiy'),
      seller: Yup.string().required('Majburiy'),
      images: Yup.mixed()
        .test('fileCount', '1-5 rasm', value => value && value.length >= 1 && value.length <= 5)
        .required('Rasm kiriting'),
    }),
    onSubmit: async (values, { resetForm }) => {
      const slug = slugify(values.title, { lower: true });
      const gallery = Array.from(values.images);
      const mainImage = gallery[0];

      const newData = {
        id: initialId,
        title: values.title,
        location: values.location,
        price: `$${values.price}`,
        rooms: Number(values.rooms),
        area: Number(values.area),
        image: mainImage.name,
        slug,
        status: values.status,
        description: values.description,
        number: values.number,
        gallery: gallery.map(img => img.name),
        seller: values.seller,
        likes: 0,
        postedAt: new Date().toISOString(),
        comments: [],
        adminId: values.adminId
      };

      try {
        await axios.post('https://sarbinazapi.onrender.com/homes', newData);
        alert("Uy muvaffaqiyatli joylandi!");
        resetForm();
      } catch (err) {
        console.error(err);
        alert("Xatolik yuz berdi!");
      }
    }
  });

  const handleNumberChange = (e) => {
    let value = e.target.value.replace(/[^0-9+()\-\s]/g, '');
    formik.setFieldValue('number', value);
  };

  const removeImage = (index) => {
    const newImages = formik.values.images.filter((_, i) => i !== index);
    formik.setFieldValue('images', newImages);
  };
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.id) {
        formik.setFieldValue('adminId', parsedUser.id);
      }
    }
  }, []);


  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h1 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center gap-2"><BadgePlus /> Yangi Uy Joylash</h1>
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><Home size={16} /> Sarlavha</label>
          <input
            type="text"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.title && formik.errors.title ? (
            <div className="text-red-500 text-xs">{formik.errors.title}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><MapPin size={16} /> Manzil</label>
          <input
            type="text"
            name="location"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.location && formik.errors.location ? (
            <div className="text-red-500 text-xs">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><DollarSign size={16} /> Narx</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-xs">{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><BedDouble size={16} /> Xonalar soni</label>
          <input
            type="number"
            name="rooms"
            onChange={formik.handleChange}
            value={formik.values.rooms}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.rooms && formik.errors.rooms ? (
            <div className="text-red-500 text-xs">{formik.errors.rooms}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><Ruler size={16} /> Maydon (m²)</label>
          <input
            type="number"
            name="area"
            onChange={formik.handleChange}
            value={formik.values.area}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.area && formik.errors.area ? (
            <div className="text-red-500 text-xs">{formik.errors.area}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700">Holati</label>
          <select
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          >
            <option value="active">Aktiv</option>
            <option value="sold">Sotilgan</option>
            <option value="rented">Ijarada</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-500 text-xs">{formik.errors.status}</div>
          ) : null}
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-sm text-gray-700 flex items-center gap-2"><StickyNote size={16} /> Tavsif</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="input border border-gray-200 outline-none px-2 py-1 rounded resize-none"
            rows={3}
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <div className="text-red-500 text-xs">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><Phone size={16} /> Telefon raqam</label>
          <input

            type="text"
            name="number"
            onChange={handleNumberChange}
            value={formik.values.number}
            placeholder="+998 (99) 999-99-99"
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="text-red-500 text-xs">{formik.errors.number}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-700 flex items-center gap-2"><User size={16} /> Sotuvchi</label>
          <input
            type="text"
            name="seller"
            onChange={formik.handleChange}
            value={formik.values.seller}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.seller && formik.errors.seller ? (
            <div className="text-red-500 text-xs">{formik.errors.seller}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-gray-700 flex items-center gap-2"><UploadCloud size={16} /> Rasmlar</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => {
              let files = Array.from(e.target.files);
              if (files.length + formik.values.images.length > 5) {
                alert("Faqat 5 tagacha rasm yuklashingiz mumkin");
                files = files.slice(0, 5 - formik.values.images.length);
              }
              formik.setFieldValue('images', [...formik.values.images, ...files]);
            }}
            className="input border border-gray-200 outline-none px-2 py-1 rounded"
          />
          {formik.touched.images && formik.errors.images ? (
            <div className="text-red-500 text-xs mt-1">{formik.errors.images}</div>
          ) : null}

          {/* Rasmlarni preview qilish */}
          <div className="flex flex-wrap gap-3 mt-3">
            {formik.values.images && formik.values.images.length > 0 && formik.values.images.map((file, idx) => (
              <div key={idx} style={{ position: 'relative', width: 100, height: 100 }}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${idx}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    backgroundColor: 'red',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'white',
                    width: 22,
                    height: 22,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    lineHeight: 1,
                  }}
                  aria-label="Rasmni o'chirish"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Boshqa inputlar ... */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Joylash
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingModal;
