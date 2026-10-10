// import { GoogleGenAI } from "@google/genai";

// const apikey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
// const genAI = new GoogleGenerativeAI(apikey);

// const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
// });

// const generationconfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "application/json",
// };

//     export const chatSession = model.startChat({
//         generationfig,
//         history: [
//             {
//                 role: "user",
//                 parts: [
//                     {text: "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} people with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format."}
//                 ],
//             },
//             {
//                 role: "model",
//                 parts: [{}],
//             },
//         ],
//     });

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({
//   apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
// });

// export const chatSession = ai.chats.create({
//   model: "gemini-3.1-pro",
//   config: {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 8192,
//     responseMimeType: "application/json",
//   },

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};
export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} people with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: JSON.stringify({
            hotels: [
              {
                hotelName: "Sample 1st Hotel Name",
                hotelAddress: "123 Street Name, City",
                // price: "$100 per night",
                price: "Price in local currency of the destination per night (e.g., ₹1,500 / $100 / €90)",
                hotelImageUrl: "https://example.com/hotel.jpg",
                geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                rating: 4.5,
                description: "A short description of the hotel.",
              },
              {
                hotelName: "Sample 2nd Hotel Name",
                hotelAddress: "123 Street Name, City",
                // price: "$100 per night",
                price: "Price in local currency of the destination per night (e.g., ₹1,500 / $100 / €90)",
                hotelImageUrl: "https://example.com/hotel.jpg",
                geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                rating: 4.5,
                description: "A short description of the hotel.",
              },
              {
                hotelName: "Sample 3rd Hotel Name",
                hotelAddress: "123 Street Name, City",
                // price: "$100 per night",
                price: "Price in local currency of the destination per night (e.g., ₹1,500 / $100 / €90)",
                hotelImageUrl: "https://example.com/hotel.jpg",
                geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                rating: 4.5,
                description: "A short description of the hotel.",
              },
              {
                hotelName: "Sample 4th Hotel Name",
                hotelAddress: "123 Street Name, City",
                // price: "$100 per night",
                price: "Price in local currency of the destination per night (e.g., ₹1,500 / $100 / €90)",
                hotelImageUrl: "https://example.com/hotel.jpg",
                geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                rating: 4.5,
                description: "A short description of the hotel.",
              },
              {
                hotelName: "Sample 5th Hotel Name",
                hotelAddress: "123 Street Name, City",
                // price: "$100 per night",
                price: "Price in local currency of the destination per night (e.g., ₹1,500 / $100 / €90)",
                hotelImageUrl: "https://example.com/hotel.jpg",
                geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                rating: 4.5,
                description: "A short description of the hotel.",
              },
            ],
            itinerary: [
              {
                day: 1,
                bestTimeToVisit: "Morning",
                plan: [
                  {
                    placeName: "Sample Location",
                    placeDetails: "Details about the place.",
                    placeImageUrl: "https://example.com/place.jpg",
                    geoCoordinates: { latitude: 0.0, longitude: 0.0 },
                    ticketPricing: "$10",
                    timeTravel: "30 mins from hotel",
                    timeToSpend: "2 hours",
                    suggestedTimeSlot: "9:00 AM - 11:00 AM"
                  },
                ],
              },
            ],
          }),
        },
      ],
    },
  ],
});
