import React from 'react'
import HomeCards from '../../components/HomeCards/HomeCards'
import { useSelector } from 'react-redux'
import Cards from '../../components/Cards/Cards'
import { LoaderCircle } from 'lucide-react'

const Home = () => {

  const isHomeLoad = useSelector(state => state.homeSlice.isHomeLoad)
  const isHomeError = useSelector(state => state.homeSlice.isHomeError)
  const isHomeData = useSelector(state => state.homeSlice.homeData)


  const isHomeDataSold = isHomeData.filter(item => item.status === 'sold')
  const isHomeDataRented = isHomeData.filter(item => item.status === 'rented')



  return (
    <div>
      <div className='sm:p-4 p-2 sm:gap-2 gap-3 w-full items-stretch justify-center  grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3'>
        <HomeCards header={'Umumiy Uylar'} number={isHomeData.length} />
        <HomeCards header={'Ijaradagi Uylar'} number={isHomeDataRented.length} />
        <HomeCards header={'Sotilgan Uylar'} number={isHomeDataSold.length} />
      </div>
      <div>
        <div className='sm:p-4 p-2'>
          {isHomeLoad ? (
            <div className='text-center flex items-center gap-1 justify-center text-lg'>
              <h1>Loading</h1>
              <span className='animate-spin'><LoaderCircle /></span>
            </div>
          ) : isHomeError ? (
            <div className='text-center text-red-500'>Xatolik yuz berdi</div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-3 items-stretch'>
              {isHomeData.map(home => (
                <Cards slug={home.slug} key={home.id} image={home.image} id={home.id} rooms={home.rooms} area={home.area} status={home.status} title={home.title} location={home.location} price={home.price} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home