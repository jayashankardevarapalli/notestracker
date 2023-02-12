import { React, useState, useEffect } from "react";
import { auth, db } from "Components/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";

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
    setTitle("");
    setContent("");
    setShowMessage(false);
  };

  const submitform = (e) => {
    if (user) {
      e.preventDefault();

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
        <div className="container mx-auto mt-4 space-y-8">
          {showMessage && (
            <div className="bg-green-200 p-4 text-center space-y-4">
              <p className="text-center">Your notes is stored successfully!!</p>
              <button
                onClick={handleClose}
                className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Close
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
      </div>
    </>
  );
};

export { AddNotes };
