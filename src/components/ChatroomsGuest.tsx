import { useEffect } from "react";
import { getAllRooms } from "../functions/getAllRooms";
import { useVariableStore } from "../data/store";
import { NavLink, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { getActiveUser } from "../functions/getActiveUser";


const ChatroomsGuest  = () => {
    const allRooms = useVariableStore((state) => state.allRooms);
    const setAllRooms = useVariableStore((state) => state.setAllRooms);
    const setActiveUser = useVariableStore(state => state.setActiveUser)

    const navigate = useNavigate()

    const handleGet = async () => {
        setActiveUser("guest")
        const username = await getActiveUser()
        if(username) {
          navigate("/chatrooms")
        }
        const result = await getAllRooms()
        if (result && result.length > 0) {
            setAllRooms(result);
          }
    }
    const handleChat = (room:string, status:boolean) => {
        if(!status) {
            navigate(`/chat-room/${room}`)

        }
      }
      
    
    useEffect(() => {
        handleGet();
    }, []);
    
    
    return (
        
        <>
        <div className="chat-room-div">
        <h3>Chat-Rooms</h3>
        { allRooms && allRooms.map(room => (
            <p onClick={() => handleChat(room.name, room.status)}  className={room.status ? 'locked' : 'unlocked'} key={room._id}> {room.name}{room.status === true && (
                <span className="lock-icon" aria-label="Locked">
                    <FaLock/>
                </span>
            )}</p>
        ))}
        
        </div>
        <div className="chat-room-div">
        <h3 className="locked"> DM's <FaLock className="lock-icon"/> </h3>
        <NavLink className="navlink" to="/">Login to send DM's</NavLink> 
        </div>
        </>
    )
}

export default ChatroomsGuest