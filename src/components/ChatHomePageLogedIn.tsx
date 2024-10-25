
import { useNavigate  } from "react-router-dom"
import { getActiveUser, getAllRooms } from "../functions/getAllRooms.js";
import { useVariableStore } from "../data/store.js";
import { useCallback, useEffect } from "react";
import Header from "./Header.js";
import RenderDmNames from "./RenderDmNames.js";



const LS_KEY = 'JWT-DEMO--TOKEN'


const ChatHomePageLogedIn = () => {
  

const allRooms = useVariableStore((state) => state.allRooms);
  const setAllRooms = useVariableStore((state) => state.setAllRooms);
  const setIsLoggedIn = useVariableStore(state => state.setIsLoggedIn)

  const navigate = useNavigate()

	function logoutFunction() {
      setIsLoggedIn(false) // håll syncad med LS_key. 
			localStorage.removeItem(LS_KEY)
			navigate("/")
	}

    const handelGet = useCallback(async () => {

      const username = await getActiveUser()
      if(!username) {
        navigate("/chatrooms-guest")
      }
        const result = await getAllRooms();

        if (result && result.length > 0) {
          setAllRooms(result);
        }
     
      }, [setAllRooms]);
    
      useEffect(() => {
        handelGet();
      }, [handelGet]);
  const handleChat = (room:string) => {
    
    navigate(`/chat-room/${room}`)
  }

    return (
        <>
            <Header/> 
		

         <main>
             <div className="chat-room-div">
                <h3>Chat-Rooms</h3>
                { allRooms && allRooms.map(room => (
                    <p onClick={() => handleChat(room.name)} key={room._id}> {room.name}</p>
                ))}

             </div>
                <RenderDmNames/> 
                <button className="button" onClick={logoutFunction}>Log out</button>
            </main>



        </>

    )
}

export default ChatHomePageLogedIn