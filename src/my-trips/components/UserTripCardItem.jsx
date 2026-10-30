import React, { useEffect, useState } from 'react';
import { GetPlacePhoto } from '../../service/GlobalApi';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";

function UserTripCardItem({ trip, onDelete }) {
    const [photoUrl, setPhotoUrl] = useState('');
    
      useEffect(() => {
        if (trip) {
          fetchPhoto();
        }
      }, [trip]);
    
      const fetchPhoto = async () => {
        const locationName = trip?.userSelection?.location?.label?.split(',')[0];
        if (!locationName) return;
    
        try {
          const url = await GetPlacePhoto(locationName);
          console.log("Unsplash Image URL:", url);
          setPhotoUrl(url);
        } catch (error) {
          console.error("Unsplash Fetch Error:", error);
        }
    };
  return (

    // 1. ADD 'relative' HERE TO SCOPE THE DELETE ICON TO THIS CARD
    <div className="relative hover:scale-105 transition-all">

    <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-110 duration-200 ease-in-out transition-all cursor-pointer border-3 p-2 m-2 rounded-2xl shadow-2xl border-gray-300 hover:border-4 hover:border-red-600">
      <img src={photoUrl || "/airplane.jpg"}
      className="object-cover rounded-xl h-55 w-full" />

      {/* Delete Button with React Icon */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering card click events
          e.preventDefault();  // Prevents default link behavior just in case
          if (window.confirm("Are you sure you want to delete this trip?")) {
            onDelete(trip.id);
          }
        }}
        className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white p-2 rounded-full text-gray-700 transition-all shadow"
        title="Delete Trip"
      >
        <FaTrashAlt size={20} />
      </button>

      <div>
        <h2 className="font-bold text-lg text-black">
          {trip?.userSelection?.location?.label}
        </h2>
        <p className="text-sm font-semibold text-gray-700">
          {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} budget
        </p>
      </div>
    </div>
    </Link></div>
  );
}

export default UserTripCardItem;