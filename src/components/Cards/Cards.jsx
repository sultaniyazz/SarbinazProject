import React, { useState, useEffect } from 'react';
import { BedDouble, Ruler, Navigation, ChevronRight, ShoppingBag, Trash2, BadgeCheck, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Cards = ({ image, id, rooms, area, status, title, location, price, slug, isFavouritePage = false, onRemove }) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const locations = useLocation();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
    const exists = saved.find(item => item.id === id);
    setIsFavourite(!!exists);
  }, [id]);

  const handleAddToFavourites = () => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
    const alreadyExists = saved.find(item => item.id === id);

    if (!alreadyExists) {
      const newItem = { id, image, rooms, area, status, title, location, price, slug };
      localStorage.setItem('favourites', JSON.stringify([...saved, newItem]));
      setIsFavourite(true);
      alert("Saqlanganlarga qo‘shildi!");
    } else {
      alert("Bu uy allaqachon saqlangan!");
    }
  };

  const handleRemoveFromFavourites = () => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
    const updated = saved.filter(item => item.id !== id);
    localStorage.setItem('favourites', JSON.stringify(updated));
    setIsFavourite(false);
    onRemove?.(id); // callback orqali Favourite sahifasida ro‘yxatni yangilash
  };

  return (
    <div className='group relative flex flex-col border border-gray-200 rounded-xl shadow overflow-hidden bg-white'>
      <img src={image} alt={title} className='w-full sm:h-60 h-40 object-cover' />

      <button
        onClick={isFavouritePage ? handleRemoveFromFavourites : (isFavourite ? handleRemoveFromFavourites : handleAddToFavourites)}
        className={`${locations.pathname == "/my-listings" ? "hidden not-only:" : ""}absolute top-2 right-2 bg-white backdrop-blur-sm p-1.5 rounded-full hover:bg-white/80 transition`}
      >
        {isFavouritePage
          ? <Trash2 className='w-5 h-5 text-red-500' />
          : isFavourite
            ? <Check className='w-5 h-5 text-red-500' />
            : <ShoppingBag className='w-5 h-5 text-red-500' />
        }
      </button>

      <div className='flex flex-col flex-grow p-4 justify-between'>
        <div className='flex flex-wrap gap-2 mb-2'>
          <span className='flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full'>
            <BedDouble className='sm:w-4 sm:h-4 w-2 h-2 ' /> {rooms} xonali
          </span>
          <span className='flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full'>
            <Ruler className='sm:w-4 sm:h-4 w-2 h-2 ' /> {area}m²
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${status === 'sold' ? 'bg-red-100 text-red-700'
            : status === 'rented' ? 'bg-yellow-100 text-yellow-700'
              : 'bg-green-100 text-green-700'
            }`}>
            {status}
          </span>
        </div>

        <p className='text-sm sm:block text-gray-700 flex-grow'>{title}</p>
        <div className='text-xs py-1 flex gap-1 items-center text-gray-700'>
          <Navigation size={'12px'} /> {location}
        </div>

        <div className='flex w-full items-center justify-between'>
          <span className='text-base font-bold text-green-700'>
            {price}
          </span>
          <Link to={`/detail/${slug}`}>
            <button className='text-xs h-full flex items-center text-gray-400 sm:hidden'>
              <ChevronRight />
            </button>
            <button className='text-xs max-sm:hidden bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition'>
              Batafsil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cards;
