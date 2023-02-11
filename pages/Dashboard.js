import React from "react";
import { auth } from "../Components/Config";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const signout = () => {
    signOut(auth);
    router.push("/");
  };
  if (user) {
    return (
      <>
        <div className="container mx-auto">
          <button
            className="bg-red-500 text-white font-bold font-mono py-2 px-4 rounded-full mt-5 absolute top-0 right-10"
            onClick={signout}
          >
            Logout
          </button>
        </div>
        <div className="container text-center mx-auto mt-20 ">
          <h1 className="text-3xl font-mono tracking-widest">Dashboard</h1>
          <p className="text-gray-500 text-md font-mono tracking-wide">
            Hi, {user.displayName}{" "}
          </p>
        </div>
      </>
    );
  }
};

export default Dashboard;
