import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlacePhoto } from '../../service/GlobalApi';
import { FaMapLocationDot } from "react-icons/fa6"

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    if (place) {
      fetchPlacePhoto();
    }
  }, [place]);

const fetchPlacePhoto = async () => {
  if (!place?.placeName) return;

  // 1. Strip special characters
  const cleanName = place.placeName
    .replace(/\(.*?\)/g, '')
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  try {
    // Attempt 1: Full clean place name
    let url = await GetPlacePhoto(cleanName);

    // Attempt 2: Fallback using first 2 words
    if (!url) {
      const mainWords = cleanName.split(' ').slice(0, 2).join(' ');
      url = await GetPlacePhoto(mainWords);
    }

    if (url) setPhotoUrl(url);
  } catch (error) {
    console.error("Photo fetch error:", error);
  }
};

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place?.placeName || '')}
      target='_blank'
    >
      <div className='border rounded-xl p-2 flex gap-5 hover:scale-105 transition-all cursor-pointer shadow-xl'>
        <img
          src={photoUrl || "/airplane.jpg"}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=400";
          }}
          className='w-32.5 h-32.5 rounded-xl object-cover'
          alt={place?.placeName || 'Place'}
        />
        <div>
          <h2 className='font-bold text-md text-black'>{place?.placeName}</h2>
           <p className='text-sm text-gray-700 line-clamp-2'>{place?.placeDetails}</p>
           <h2 className='mt-2 text-sm font-semibold text-black'>🚕 {place?.timeTravel}</h2>
           <h2 className='mt-2 text-sm font-semibold text-black'>⏱️ Duration {place?.timeToSpend || place?.travelTime}</h2>
           <h2 className='mt-2 text-sm font-semibold'>
           🎟️ {place?.ticketPricing || 'Free'}
         </h2>
         {/* Styled div instead of <Button> to prevent React Router / DOM nesting crashes */}
           <div className='mt-2 inline-flex items-center gap-2 text-xs bg-black text-white px-3 py-1.5 rounded-lg w-fit'>
             <FaMapLocationDot /> View on Map
           </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;