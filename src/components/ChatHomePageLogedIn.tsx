import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom"

const LS_KEY = 'JWT-DEMO--TOKEN'

export interface Room {
    _id: string,
    name: string; 
    status: boolean;
}
//flytta ut.

const ChatHomePageLogedIn = () => {
    const [allRooms, setAllRooms] = useState<Room[]>([]);

    const [loading, setLoading] = useState<boolean>(true); //ta bort
    console.log(loading);
    const navigate = useNavigate()

	function logoutFunction() {
		console.log("clicked");
		// if(localStorage.getItem(LS_KEY) !== null) {
			localStorage.removeItem(LS_KEY)
			// return <Navigate to="/" replace/>
			navigate("/")
		// }

	}

    async function getAllRooms() {


        try {
            const response = await fetch("/api/rooms", { method: "GET" });
            // const text = await response.text();  
            // console.log("Response text:", text);
            if (!response.ok) {
                console.error("Failed to fetch rooms, status:", response.status);
                return;
            }

            const rooms: Room[] = await response.json(); 

            setAllRooms(rooms);  
        } catch (error) {
            console.error("Error fetching rooms:", error);
        } finally {
            setLoading(false);  //ta bort
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
        {/* <main className="main-chatrooms">
           <div className="chat-room-div">
                <h3>ChatRooms:</h3>
                <p>Chit-Chat Castle</p>
                <p>Meme Mansion</p>
                <p>Giggle Galaxy</p>
                <p>Banter Basment</p>
            </div>
           <div className="chat-room-div">
                <h3>DM's:</h3>
                <div className="dm-layout">
                    <img/>
                    <p>Lisa_w</p>
                </div>
                <div className="dm-layout">
                    <img/>
                    <p>Jane_Smith</p>
                </div>
                <div className="dm-layout">
                    <img/>
                    <p>Kalle</p>
                </div >
                <div className="dm-layout">
                    <img/>
                    <p>Linda</p>
                </div>
            </div>

            
        </main> */}


        </>

    )
}

export default ChatHomePageLogedIn