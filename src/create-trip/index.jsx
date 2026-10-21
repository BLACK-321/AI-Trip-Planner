import React, { useState, useEffect } from "react";
import { SearchBox } from "@mapbox/search-js-react";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions } from "../constants/options";
import { SelectTravelesList } from "../constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { chatSession } from "@/service/AIModal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from '@/view-trip/components/Footer';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        },
      )
      .then((resp) => {
        console.log("2. Google API response success:", resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((err) => {
        console.error("3. Error inside getUserProfile axios call:", err);
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
    flow: "implicit", // Ensures access token is returned directly without popup issues
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.add({
        description: "Please fill all details",
      });
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label,
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result.response.text());
    setLoading(false);
    SaveAiTrip(result.response.text());
  };

  const SaveAiTrip = async (TripData) => {
    // Add a new document in collection "cities"
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  // const getUserProfile = (tokenInfo) => {
  //   axios
  //     .get(
  //       `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${tokenInfo?.access_token}`,
  //           Accept: "Application/json",
  //         },
  //       },
  //     )
  //     .then((resp) => {
  //       console.log(resp.data);
  //     });
  // };
  // Triggered when the user clicks a location from the Mapbox dropdown
  // const handleRetrieve = (res) => {
  //   const selectedFeature = res.features[0];

  //   // Constructing the exact payload structured similarly to Google Places output
  //   const placeData = {
  //     label:
  //       selectedFeature.properties.full_address ||
  //       selectedFeature.properties.name,
  //     value: {
  //       description: selectedFeature.properties.full_address,
  //       place_id: selectedFeature.properties.mapbox_id,
  //       coordinates: {
  //         lng: selectedFeature.geometry.coordinates[0],
  //         lat: selectedFeature.geometry.coordinates[1],
  //       },
  //       raw: selectedFeature, // Contains context like city, region, country, postal code
  //     },
  //   };

  //   setPlace(placeData);

  //   // Check your DevTools console to see the formatted output
  //   console.log("Formatted Place State:", placeData);
  //   const [formData, setFormData] = useState([]);
  //   const handleInputChange = (name, value) => {};
  const handleRetrieve = (res) => {
    const selectedFeature = res.features[0];

    // Build the formatted place object matching the Google Places structure
    const placeData = {
      label:
        selectedFeature.properties.full_address ||
        selectedFeature.properties.name,
      value: {
        description: selectedFeature.properties.full_address,
        place_id: selectedFeature.properties.mapbox_id,
        coordinates: {
          lng: selectedFeature.geometry.coordinates[0],
          lat: selectedFeature.geometry.coordinates[1],
        },
        raw: selectedFeature,
      },
    };

    // 1. Update local place state
    setPlace(placeData);

    // 2. Update parent formData state (matching the tutorial's handleInputChange('location', v))
    handleInputChange("location", placeData);
  };
  return (
    <div className="w-full">
    <div className="px-5 sm:px-10 md:px-20 lg:px-36 xl:px-56 mt-6 sm:mt-10">
      <h2 className="font-bold text-2xl sm:text-3xl">
        Tell us your travel preferences🏕️🏝️
      </h2>
      <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-10 sm:mt-16 flex flex-col gap-8 sm:gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <SearchBox
            accessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            value={place ? place.label : ""}
            onRetrieve={handleRetrieve}
            onChange={(val) => {
              if (!val) {
                setPlace(null);
                handleInputChange("location", null); // Clears 'location' from formData state
              }
            }}
            options={{
              language: "en",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip.
          </h2>
          <Input
            placeholder={"Ex.3"}
            className='border-2 border-black'
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`p-4 border-3 cursor-pointer 
                  rounded-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-xl
                  ${formData?.budget == item.title && "shadow-xl border-black border-3"}
                  `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border-3 transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer
                 rounded-lg hover:shadow-xl
                 ${formData?.traveler == item.people && "shadow-xl border-black border-3"}
                 `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader className="items-start text-left">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto mr-auto" />
            <DialogTitle className="font-bold text-xl mt-4 text-left">
              Sign In With Google
            </DialogTitle>
            <DialogDescription className="text-left -mt-1 text-sm font-bold">
              Sign in to the App with Google Authentication
            </DialogDescription>
          </DialogHeader>

          <Button
            onClick={() => login()}
            className="w-full flex gap-4 items-center justify-center"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
      <Footer/>
    </div>
  );
}

export default CreateTrip;
