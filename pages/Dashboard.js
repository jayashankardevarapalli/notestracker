import { React, useState } from "react";
import { auth } from "../Components/Config";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Notes } from "@/Components/Notes";
import { AddNotes } from "@/Components/AddNotes";

const Dashboard = () => {
  const [component, setComponent] = useState(<Notes />);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const signout = () => {
    signOut(auth);
    router.push("/");
  };

  function addNotes() {
    setComponent(<AddNotes />);
  }

  function fetchNotes() {
    setComponent(<Notes />);
  }

  if (user) {
    return (
      <>
        <div>
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
            <p className="text-gray-500 text-md font-mono tracking-wide pb-6">
              Hey, {user.displayName}
            </p>
          </div>

          <div className="container mx-auto text-center space-x-8 space-y-6">
            <button
              className="bg-blue-700 text-white font-bold font-mono tracking-wide py-2 px-4 rounded-full"
              onClick={addNotes}
            >
              Add Notes
            </button>
            <button
              className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={fetchNotes}
            >
              Fetch Notes
            </button>
          </div>

          {component}
        </div>
      </>
    );
  } else {
    return (
      <div className="font-mono tracking-widest absolute top-8 left-2 center-word">
        Loading......
      </div>
    );
  }
};

export default Dashboard;
