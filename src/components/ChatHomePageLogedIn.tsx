import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { Room } from "../data/models/Room";

const LS_KEY = 'JWT-DEMO--TOKEN'




const ChatHomePageLogedIn = () => {
    const [allRooms, setAllRooms] = useState<Room[]>([]);

    const navigate = useNavigate()

	function logoutFunction() {
		console.log("clicked");
			localStorage.removeItem(LS_KEY)
			navigate("/")
	}

    async function getAllRooms() {


        try {
            const response = await fetch("/api/rooms", { method: "GET" });
            if (!response.ok) {
                console.error("Failed to fetch rooms, status:", response.status);
                return;
            }

            const rooms: Room[] = await response.json(); 

            setAllRooms(rooms);  
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
     
    }

    useEffect(() => {
        getAllRooms();  
    }, []);
		// Flytta ut getAll och lägg state i store. 

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
                { allRooms.map(room => (
                <p key={room._id}> {room.name}</p>
                ))}

             </div>
            </main>



        </>

    )
}

export default ChatHomePageLogedIn