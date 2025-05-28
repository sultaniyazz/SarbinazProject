import React from 'react'

const TodayCalendar = () => {
  const today = new Date()

  const weekdays = [
    'yakshanba', 'dushanba', 'seshanba', 'chorshanba', 'payshanba', 'juma', 'shanba'
  ]

  const months = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
  ]

  const weekday = weekdays[today.getDay()]
  const day = today.getDate()
  const month = months[today.getMonth()]
  const year = today.getFullYear()

  const formattedDate = `${weekday}, ${day} ${month} ${year}`

  return (
    <div className="lg:text-3xl text-xl font-semibold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
      {formattedDate}
    </div>

  )
}

export default TodayCalendar
