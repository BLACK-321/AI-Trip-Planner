import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  const rawData = typeof trip?.tripData === 'string' 
    ? JSON.parse(trip?.tripData) 
    : trip?.tripData;

  const itinerary = rawData?.itinerary;

  return (
    <div className='mt-6'>
      <h2 className='font-bold text-xl mb-2'>Places To Visit</h2>

      <div>
        {Array.isArray(itinerary) ? (
          itinerary.map((item, dayIndex) => (
            <div key={dayIndex} className='mt-3'>
              <h2 className='font-semibold text-lg text-black mb-2'>Day {item?.day || `Day ${dayIndex + 1}`}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {item?.plan?.map((place, placeIndex) => (
                  <div key={placeIndex} className='my-2'>
                    <h2 className='font-bold text-md text-orange-600 mb-1'>SUGGEST, {place?.time || place?.timeToVisit || place?.suggestedTimeSlot}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          itinerary && Object.entries(itinerary).map(([dayKey, dayData], dayIndex) => (
            <div key={dayIndex} className='mt-5'>
              <h2 className='font-semibold text-lg text-black mb-2'>{dayData?.day || dayKey.toUpperCase()}</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {dayData?.plan?.map((place, placeIndex) => (
                  <div key={placeIndex} className='my-2'>
                    <h2 className='font-bold text-sm text-orange-600 mb-1'>
                      {place?.time || place?.timeToVisit || place?.suggestedTimeSlot}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;