import React, { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';

import HomeCards from '../../components/HomeCards/HomeCards';
import Cards from '../../components/Cards/Cards';


export const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(saved);
    setLoading(false);
  }, []);

  // Statistik ma'lumotlar:
  const sold = favourites.filter(item => item.status === 'sold');
  const rented = favourites.filter(item => item.status === 'rented');

  return (
    <div>
      <div className='sm:p-4 p-2 sm:gap-2 gap-3 w-full items-stretch justify-center  grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3'>
        <HomeCards header={'Total Favourites'} number={favourites.length} />
        <HomeCards header={'Favourites Rented'} number={rented.length} />
        <HomeCards header={'Favourites Sold'} number={sold.length} />
      </div>

      <div className='sm:p-4 p-2'>
        {loading ? (
          <div className='text-center flex items-center gap-1 justify-center text-lg'>
            <h1>Loading</h1>
            <span className='animate-spin'><LoaderCircle /></span>
          </div>
        ) : favourites.length === 0 ? (
          <div className='text-center text-gray-500'>Saqlangan uylar mavjud emas</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-3 items-stretch'>
            {favourites.map(home => (
              <Cards
                key={home.id}
                {...home}
                isFavouritePage={true}
                onRemove={(deletedId) =>
                  setFavourites(prev => prev.filter(item => item.id !== deletedId))
                }
              />

            ))}
          </div>
        )}
      </div>
    </div>
  );
};
