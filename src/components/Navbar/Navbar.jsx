import React from 'react'
import { useDispatch } from 'react-redux'
import { NavbarList } from '../../constant/NavbarList'
import { NavLink } from 'react-router-dom'
import { modal } from '../../features/pageActionSlice'

const Navbar = () => {

  const dispatch = useDispatch()

  return (
    <div>
      {NavbarList.map((item) => (
        <NavLink onClick={() => dispatch(modal())} key={item.id} to={`${item.url}`} className='flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer'>
          <item.icon className='text-3xl' />
          <span className='font-semibold font-Ancizar'>{item.name}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default Navbar