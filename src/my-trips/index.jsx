import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from "./components/UserTripCardItem";
import Footer from '@/view-trip/components/Footer';

function MyTrips() {
  const navigation = useNavigate();
  const [usertrips,setUserTrips]=useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigation("/");
      return;
    }
    GetUserTrips();
  }, []);
  // used to get all user trips

  const GetUserTrips = async () => {
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    
    // Check if any documents actually came back
    if (querySnapshot.empty) {
      console.log("No trips found for this user.");
      return;
    }
    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      // This will print your actual Firebase trip data object
      console.log("Trip ID:", doc.id, "Trip Data:", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()])
    });
  };
  
  const onDeleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip: ", error);
    }
  };

  return (
    <div className="w-full">
    <div className="m:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
        {usertrips?.length>0?usertrips.map((trip,index)=>(
          <UserTripCardItem key={trip.id || index} trip={trip} onDelete={onDeleteTrip} />
        ))
      :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className="h-55 w-full bg-slate-200 animate-pulse rounded-xl">
        </div>
      ))
      }
      </div>
    </div>
      <Footer/>
    </div>
  )
}

export default MyTrips;
