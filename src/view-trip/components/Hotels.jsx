import React from 'react'
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  // Safely retrieve hotel list whether stored under 'hotels' or 'hotelOptions'
  const rawData = typeof trip?.tripData === 'string' 
    ? JSON.parse(trip?.tripData) 
    : trip?.tripData;

  const hotelList = rawData?.hotels || rawData?.hotelOptions;

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {hotelList && Array.isArray(hotelList) && hotelList.length > 0 ? (
          hotelList.map((item, index) => (
            <HotelCardItem key={index} item={item}/>
          ))
        ) : (
          <p className='text-gray-500 mt-2'>No hotel recommendations found.</p>
        )}
      </div>
    </div>
  )
}

export default Hotels