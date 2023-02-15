import { React, useState, useEffect } from "react";
import { auth, db } from "Components/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [user] = useAuthState(auth);

  const fetchTitle = (e) => {
    setTitle(e.target.value);
  };
  const fetchContent = (e) => {
    setContent(e.target.value);
  };

  const handleClose = () => {
    setShowMessage(false);
  };

  const submitform = (e) => {
    e.preventDefault();
    if (user) {
      const timestamp = Date.now();
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? "0" : ""
      }${minutes} ${ampm}`;
      const formattedDate = `${day}/${month}/${year}`;
      if (title == "" && content == "") {
        alert("No Data found to store!!");
      } else {
        try {
          const docRef = addDoc(collection(db, "Notes"), {
            Title: title,
            Content: content,
            TimeDate: formattedTime + " " + formattedDate,
            Timestamp: timestamp,
            Uid: user.uid,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setShowMessage(true);
        setTitle("");
        setContent("");
      }
    }
  };
  return (
    <>
      <div className="container mx-auto px-8">
        <div>
          <h1 className="text-start font-mono pt-8 tracking-wide text-gray-700">
            Add Your Notes Here!!
          </h1>
        </div>
        <form>
          <div className="container mx-auto mt-4 space-y-8">
            {showMessage && (
              <div className="bg-green-200 p-4 text-center space-y-4 flex justify-center space-x-4">
                <p className="text-center pt-4 font-mono">
                  Your notes is stored successfully!!
                </p>
                <button onClick={handleClose} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.0}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex justify-center space-x-3">
              <h1 className="text-2xl pt-2 tracking-wide font-mono">Title</h1>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={fetchTitle}
                required
                className="border-2 border-blue-500 rounded-lg w-3/4 h-12"
              />
            </div>
            <div className="flex justify-center space-x-3">
              <h1 className="text-2xl pt-2 tracking-wide font-mono">Notes</h1>
              <textarea
                type="text"
                name="content"
                id="content"
                value={content}
                onChange={fetchContent}
                required
                className="border-2 border-blue-500 rounded-lg w-3/4 h-40"
              />
            </div>
            <div className="text-center">
              <button
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={submitform}
              >
                Add Notes
              </button>
            </div>
          </div>
        </form>
        <div className="container text-center mt-12 mb-2">
          <Link
            href="https://jayashankar.in"
            target="_blank"
            className="rounded-full px-4 py-2 font-bold tracking-wide text-white bg-slate-900"
          >
            Talk to the dev
          </Link>
        </div>
      </div>
    </>
  );
};

export { AddNotes };
