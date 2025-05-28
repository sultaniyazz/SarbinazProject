import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modal } from '../features/pageActionSlice'
import Navbar from '../components/Navbar/Navbar'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import logo from '../assets/logo.png'

const RootLayout = () => {
  const dispatch = useDispatch()
  const modalSidebar = useSelector((state) => state.pageActionSlice.showSideBar)
  const sidebarRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        modalSidebar
      ) {
        dispatch(modal(false))
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [modalSidebar, dispatch])

  return (

    <div className='w-screen font-montserrat h-screen flex gap-1 overflow-hidden select-none'>
      <div
        ref={sidebarRef}
        className={`${modalSidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} w-45 max-sm:fixed bg-white z-40 border border-gray-200 flex flex-col gap-1 transition-transform duration-300 ease-in-out`}
      >
        <div className='h-20 flex justify-center items-center text-xl font-semibold font-serif'>
          <img src={logo} className='w-25' />
        </div>
        <div className='h-screen overflow-y-auto p-2'>
          <Navbar />
        </div>
      </div>

      <div className='w-screen flex flex-col gap-1'>
        <div className='h-20'>
          <Header />
        </div>
        <div className='h-screen overflow-y-auto p-2'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default RootLayout
