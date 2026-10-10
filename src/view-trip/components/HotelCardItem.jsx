import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlacePhoto } from "../../service/GlobalApi";

function HotelCardItem({ item }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (item) {
      fetchHotelPhoto();
    }
  }, [item]);

  const fetchHotelPhoto = async () => {
  if (!item?.hotelName) return;

  // 1. Remove hyphens and special characters
  const cleanName = item.hotelName
    .replace(/-/g, ' ')
    .replace(/\(.*?\)/g, '')
    .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  try {
    // Attempt 1: Search without hyphens (e.g., "Shangri La Vancouver")
    let url = await GetPlacePhoto(cleanName);

    // Attempt 2: Search main brand + "hotel" (e.g., "Shangri La hotel")
    if (!url) {
      const brand = cleanName.split(' ')[0] + ' hotel';
      url = await GetPlacePhoto(brand);
    }

    // Attempt 3: General luxury hotel search for that city
    if (!url && item?.hotelAddress) {
      const city = item.hotelAddress.split(',')[0] || 'hotel';
      url = await GetPlacePhoto(`${city} luxury hotel`);
    }

    if (url) setPhotoUrl(url);
  } catch (error) {
    console.error("Hotel photo fetch error:", error);
  }
};
  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(
          (item?.hotelName || "") + "," + (item?.hotelAddress || ""),
        )
      }
      target="_blank"
    >
      <div className="border rounded-xl p-2 flex gap-2 hover:scale-105 transition-all cursor-pointer shadow-xl h-full flex-col w-full">
        <img
          src={photoUrl || "/airplane.jpg"}
          onError={(e) => {
            // Fallback image directly from Unsplash CDN if request limits are hit
            e.target.src =
              "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400";
          }}
          className="w-full h-48 rounded-xl object-cover"
          alt={item?.hotelName || "Hotel"}
        />
        <div className="my-2 flex flex-col gap-1">
          <h2 className="font-medium text-black">{item?.hotelName}</h2>
          <h2 className="text-xs text-gray-700">📍 {item?.hotelAddress}</h2>
          <h2 className="text-sm font-semibold text-black">💰 {item?.price}</h2>
          <h2 className="text-sm font-semibold text-yellow-500">
            ⭐ {item?.rating}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
