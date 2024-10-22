// import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { getAllRooms } from "../functions/getAllRooms.js";
import { variableStore } from "../data/store.js";
import { useCallback, useEffect } from "react";
import Header from "./Header.js";
import RenderDmNames from "./RenderDmNames.js";


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
            <Header/> 
		

         <main>
             <div className="chat-room-div">
                <h3>Chat-Rooms</h3>
                { allRooms && allRooms.map(room => (
                    <p key={room._id}> {room.name}</p>
                ))}

             </div>
                <RenderDmNames/> 
                <button className="button" onClick={logoutFunction}>Log out</button>
            </main>



        </>

    )
}

export default ChatHomePageLogedIn