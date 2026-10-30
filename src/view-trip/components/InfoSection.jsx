import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlacePhoto } from '../../service/GlobalApi';
import { GetPlaceDetails } from '../../service/GlobalApi';

function InfoSection({ trip }) {
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
    <div>
        <img 
        src={photoUrl || "/airplane.jpg"} 
        className="w-full h-65.5 sm:h-87.5 md:h-105 object-cover rounded-3xl"
        alt="Destination"
      />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className="flex flex-wrap gap-2">
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md'>📆 {trip.userSelection?.noOfDays} Day</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md'>💰 {trip.userSelection?.budget} Budget</h2>
                    <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-700 text-xs md:text-md'>👫 Number Of Traveler: {trip.userSelection?.traveler} People</h2>
                </div>
            </div>
            <Button><IoIosSend /></Button>
        </div>
    </div>
  )
}

export default InfoSection