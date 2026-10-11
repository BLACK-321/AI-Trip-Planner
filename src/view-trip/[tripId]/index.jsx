import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import { toast } from "@/components/ui/toast";
import { useEffect } from "react";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);
  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);
  // use to get Trip information from firebase
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());

      const data = docSnap.data();
      // Parse tripData if it is returned as a JSON string from Gemini
      if (typeof data.tripData === "string") {
        data.tripData = JSON.parse(data.tripData);
      }

      setTrip(data);
    } else {
      console.log("No Such Document");
      toast.add({
        description: "No Trip Found",
      });
    }
  };
  return (
    <div className="w-full">
      <div className="p-10 md:px-20 lg:px-44 xl:px-56">
        {/* {Information Section} */}
        <InfoSection trip={trip} />
        {/* {Recommended Hotels} */}
        <Hotels trip={trip} />
        {/* {Daily Plan} */}
        <PlacesToVisit trip={trip} />
      </div>
      {/* {Footer} */}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
