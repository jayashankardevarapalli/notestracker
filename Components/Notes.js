import { React, useState, useEffect } from "react";
import { auth, db } from "Components/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  deleteDoc,
  getDocs,
  doc,
  orderBy,
} from "firebase/firestore";
import { AddNotes } from "./AddNotes";

const Notes = () => {
  const [user] = useAuthState(auth);
  const [notesData, setNotesData] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(
        collection(db, "Notes"),
        orderBy("Timestamp", "desc")
      );

      const notes = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const date = new Date(data.Timestamp);
        return { ...data, id: doc.id, Timestamp: date.getTime() };
      });
      const authorization = notes.filter((note) => note.Uid === user.uid);
      const sortedNotes = authorization.sort(
        (a, b) => b.Timestamp - a.Timestamp
      );
      setNotesData(sortedNotes);
    };

    fetchNotes();
  }, [user]);

  function deleteNote(id) {
    deleteDoc(doc(db, "Notes", id)).then(() => {
      console.log("Document successfully deleted!");
      window.location.reload();
    });
  }

  if (notesData == "") {
    return (
      <div className="center-word font-mono tracking-wide text-lg">
        Hello There, Add Your Notes Now.
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className="container mx-auto">
          <div className="container">
            <h1 className="font-mono tracking-wide my-6 text-[30px] pl-4">
              Notes
            </h1>
          </div>
          <div className="container mx-auto space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 md:grid md:grid-cols-3 md:gap-4 px-5 mb-8">
            {notesData.map((note) => (
              <div className="flex justify-center border-2" key={note.id}>
                <div className="py-4">
                  <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
                    {note.Title}
                  </h5>
                  <p className="text-start mb-6 break-words">{note.Content}</p>
                  <div className="flex justify-between space-x-8">
                    <p className="text-gray-700 text-sm pt-2">
                      Updated: {note.TimeDate}
                    </p>

                    <button
                      className="bg-red-600 rounded-full px-4 py-2 text-white float-right"
                      onClick={() => {
                        deleteNote(note.id);
                      }}
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="tracking-wide">
        Ok!! You came So close to find the vuln!!
      </div>
    );
  }
};

export { Notes };
