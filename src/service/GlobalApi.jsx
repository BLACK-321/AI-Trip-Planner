import axios from "axios";

const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";

export const GetPlaceDetails = async (query) => {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}`;
  return await axios.get(url);
};

// 2. Fetch place photo from Unsplash
export const GetPlacePhoto = async (query) => {
  const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query: query, per_page: 1, orientation: "landscape" },
    headers: { Authorization: `Client-ID ${unsplashKey}` },
  });
  return response.data.results[0]?.urls?.regular;
};

// export const GetPlacePhoto = async (query) => {
//   const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
//   try {
//     const response = await axios.get('https://api.unsplash.com/search/photos', {
//       params: {
//         query: query,
//         per_page: 1,
//         orientation: 'landscape'
//       },
//       headers: {
//         Authorization: `Client-ID ${unsplashKey}`
//       }
//     });
//     return response.data.results[0]?.urls?.regular;
//   } catch (error) {
//     console.error("Unsplash API Error:", error);
//     return null;
//   }
// };
