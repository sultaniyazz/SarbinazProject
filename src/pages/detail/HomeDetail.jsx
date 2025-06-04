import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import {
  BedDouble, Ruler, Navigation, Phone, BadgeCheck,
  Heart, MessageSquare, ShoppingCart, User, CalendarDays,
  Pencil,
} from 'lucide-react';

const HomeDetail = ({ onEdit }) => {
  const { slug } = useParams();
  const homeList = useSelector(state => state.homeSlice.homeData);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log("Current User:", currentUser);


  const selectedHome = homeList.find(item => item.slug === slug);

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(selectedHome?.likes || 0);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    setLocalComments(selectedHome?.comments || []);
    setLikes(selectedHome?.likes || 0);


    const likedHomes = JSON.parse(localStorage.getItem('likedHomes') || '{}');
    if (likedHomes[selectedHome?.id]) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [selectedHome]);

  if (!selectedHome) {
    return <div className="p-4 text-red-500">Uy topilmadi</div>;
  }

  const handleLike = async () => {
    if (liked) return;

    try {
      const newLikesCount = likes + 1;
      await axios.patch(`https://sarbinazapi.onrender.com/homes/${selectedHome.id}`, {
        likes: newLikesCount,
      });
      setLikes(newLikesCount);
      setLiked(true);

      const likedHomes = JSON.parse(localStorage.getItem('likedHomes') || '{}');
      likedHomes[selectedHome.id] = true;
      localStorage.setItem('likedHomes', JSON.stringify(likedHomes));
    } catch (error) {
      console.error('Like yuborishda xatolik:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (commentName.trim() && commentText.trim()) {
      const newComment = { user: commentName, text: commentText };

      try {
        const res = await axios.get(`https://sarbinazapi.onrender.com/homes/${selectedHome.id}`);
        const latestComments = res.data.comments || [];

        const updatedComments = [...latestComments, newComment];

        await axios.patch(`https://sarbinazapi.onrender.com/homes/${selectedHome.id}`, {
          comments: updatedComments,
        });

        setLocalComments(updatedComments);
        setCommentName('');
        setCommentText('');
      } catch (error) {
        console.error('Comment yuborishda xatolik:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
            {selectedHome.gallery?.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`image-${index}`} className="rounded-md object-cover h-96 w-full" />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="flex flex-col gap-4 text-gray-800">
          <h1 className="text-2xl font-semibold leading-tight">{selectedHome.title}</h1>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Navigation size={16} /> {selectedHome.location}
          </p>
          <div className="flex flex-wrap gap-4 text-sm mt-2">
            <p className="flex items-center gap-1"><BedDouble size={16} /> {selectedHome.rooms} xonali</p>
            <p className="flex items-center gap-1"><Ruler size={16} /> {selectedHome.area} m²</p>
            <p className="flex items-center gap-1">
              <BadgeCheck
                size={16}
                className={
                  selectedHome.status === 'sold' ? 'text-red-600' :
                    selectedHome.status === 'rented' ? 'text-yellow-600' : 'text-green-600'
                }
              /> {selectedHome.status}
            </p>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <p className="flex items-center gap-1"><User size={14} /> Sotuvchi: {selectedHome.seller}</p>
            <p className="flex items-center gap-1"><CalendarDays size={14} /> {selectedHome.postedAt}</p>
          </div>

          <div className="mt-4">
            <p className="text-lg font-bold text-green-700">{selectedHome.price}</p>
            <p className="text-sm mt-1 flex items-center gap-2 text-gray-700">
              <Phone size={16} /> {selectedHome.number}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              disabled={selectedHome.status !== 'active'}
              onClick={() => alert('Sotib olish jarayoni boshlandi')}
              className={`${selectedHome.status === 'active' ? "bg-blue-600 hover:bg-blue-700" : "bg-red-600 hover:bg-red-700 cursor-not-allowed"} flex items-center gap-2  text-white px-4 py-2 rounded-full`}
            >
              <ShoppingCart size={16} /> Sotib olish
            </button>

            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-4 py-2 rounded-full ${liked ? 'bg-red-100 text-red-600 cursor-not-allowed' : 'bg-gray-200 text-gray-800 cursor-pointer'}`}
            >
              <Heart size={16} /> {likes}
            </button>

            {/* ✅ Tahrirlash tugmasi */}
            {currentUser?.id === selectedHome?.adminId && (
              <button
                onClick={() => onEdit(selectedHome)}
                className="flex items-center gap-1 border border-gray-300 hover:border-gray-500 text-gray-700 hover:text-black px-3 py-1.5 rounded-md text-sm transition-colors"
              >
                <Pencil size={16} strokeWidth={1.5} />
                Tahrirlash
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className='py-4 my-5 flex flex-col gap-4'>
          <h2 className="text-xl font-semibold">Batafsil ma'lumot</h2>
          <p className="text-gray-700">{selectedHome.description}</p>
        </div>
        {selectedHome.residents && selectedHome.residents.length > 0 && (
          <div className="my-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User size={20} /> Hozirda yashayotganlar ({selectedHome.residents.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedHome.residents.map((person, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex gap-4 items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                    {person.name.split(' ')[0][0]}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{person.name}</p>
                    <p className="text-sm text-gray-600">Yosh: {person.age}</p>
                    <p className="text-sm text-gray-600">Kasbi: {person.occupation}</p>
                    <p className="text-sm text-blue-600">{person.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="font-medium mb-3  flex items-center gap-2 text-lg">
          <MessageSquare size={18} /> Izohlar ({localComments.length})
        </h2>

        <div className="bg-gray-50 border rounded-xl p-4 shadow-sm mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={commentName}
            onChange={e => setCommentName(e.target.value)}
            className="border px-3 outline-none border-gray-400 py-2 rounded-md w-full md:w-1/4"
            placeholder="Ismingiz"
          />
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            className="border px-3 outline-none border-gray-400 py-2 rounded-md w-full flex-1"
            placeholder="Izoh yozing..."
          />
          <button
            onClick={handleCommentSubmit}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            Yuborish
          </button>
        </div>

        <ul className="space-y-4 text-sm text-gray-700">
          {localComments.map((cmt, idx) => (
            <li key={idx} className="border-l-4 border-blue-300 pl-4">
              <p className="font-semibold flex items-center gap-1 text-gray-800">
                <User size={14} /> {cmt.user}
              </p>
              <p className="text-gray-600 ml-5">{cmt.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeDetail;
