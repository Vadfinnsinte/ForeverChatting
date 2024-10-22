// import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { getAllRooms } from "../functions/getAllRooms.js";
import { variableStore } from "../data/store.js";
import { useCallback, useEffect } from "react";


const LS_KEY = 'JWT-DEMO--TOKEN'




const ChatHomePageLogedIn = () => {

const allRooms = variableStore((state) => state.allRooms);
  const setAllRooms = variableStore((state) => state.setAllRooms);

    const navigate = useNavigate()

	function logoutFunction() {
		console.log("clicked");
			localStorage.removeItem(LS_KEY)
			navigate("/")
	}

    const handelGet = useCallback(async () => {
        const result = await getAllRooms();
        if (result && result.length > 0) {
          setAllRooms(result);
        }
      }, [setAllRooms]);
    
      useEffect(() => {
        handelGet();
      }, [handelGet]);
    

    return (
        <>
        <header className="header-chat">
            <h1 className="FC">FC</h1>
			<button onClick={logoutFunction}>Log out</button>
            <div className="user-header">
                <img/>
                <img/>
            </div>
        </header> 
		{/* lägg hedader i egen component */}

         <main>
             <div className="chat-room-div">
                <p>Protected chat-page</p>
                { allRooms && allRooms.map(room => (
                <p key={room._id}> {room.name}</p>
                ))}

             </div>
            </main>



        </>

    )
}

export default ChatHomePageLogedIn