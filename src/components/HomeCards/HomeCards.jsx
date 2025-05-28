import React from 'react'
import { useLocation } from 'react-router-dom'

const HomeCards = ({ header, number, procent }) => {
  const location = useLocation()


  return (
    <div className={`${location.pathname == '/favourite' ? "" : "flex flex-col justify-between"} flex rounded-sm border border-gray-200 lg:p-4 p-2  gap-4 justify-center shadow-md bg-white transition-transform`}>
      <div className='text-gray-600 lg:text-xl md:text-lg text-base'>{header}</div>
      <div className={`${location.pathname == "/favourite" ? "justify-end" : "justify-between"} flex  w-full items-center`}>
        <div className='lg:text-4xl md:text-3xl text-2xl font-semibold text-gray-800'>{number}</div>
        <div className={`${location.pathname == '/favourite' ? "" : "bg-green-100 text-green-700"}  px-3 py-1 rounded-full text-sm font-semibold`}>{procent}</div>
      </div>
    </div>
  )
}

export default HomeCards