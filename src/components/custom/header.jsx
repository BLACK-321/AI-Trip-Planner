import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error),
    flow: "implicit", // Ensures access token is returned directly without popup issues
  });
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
        window.location.reload();
      })
      .catch((err) => {
        console.error("3. Error inside getUserProfile axios call:", err);
      });
  };
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      {user ? (
        <div className="flex items-center gap-3">
          <a href="/create-trip">
          <Button variant="outline" className="rounded-full  bg-black text-white font-semibold hover:bg-black hover:text-white hover:scale-110">
            Create Trips
          </Button>
          </a>
          <a href="/my-trips">
          <Button variant="outline" className="rounded-full bg-black text-white font-semibold  hover:bg-black hover:text-white hover:scale-110">
            My Trips
          </Button>
          </a>

          {/* Add 'relative' to this wrapper div */}
          <div className="relative flex items-center gap-3">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              <img
                src={user?.picture || user?.picture_url || user?.photoURL}
                alt={user?.name || "User Profile"}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover transition-transform duration-300 ease-in-out hover:scale-120"
                onError={(e) => {
                  // Fallback if Google image URL expires or fails to load
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`;
                }}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle></PopoverTitle>
                <PopoverDescription>
                  <h2
                    className="cursor-pointer text-black font-semibold text-[15px]"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
          </div>
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      )}
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
  );
}

export default Header;
