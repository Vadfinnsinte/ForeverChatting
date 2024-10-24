import { useEffect } from "react";
import { getAllRooms } from "../functions/getAllRooms";
import { useVariableStore } from "../data/store";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


const ChatroomsGuest  = () => {
    const allRooms = useVariableStore((state) => state.allRooms);
    const setAllRooms = useVariableStore((state) => state.setAllRooms);
    
    
    const handleGet = async () => {
        
        const result = await getAllRooms()
        if (result && result.length > 0) {
            setAllRooms(result);
          }
    }
    
    
    useEffect(() => {
        handleGet();
    }, [handleGet]);
    
    
    return (
        
        <>
        <div className="chat-room-div">
        <h3>Chat-Rooms</h3>
        { allRooms && allRooms.map(room => (
            <p  className={room.status ? 'locked' : 'unlocked'} key={room._id}> {room.name}{room.status === true && (
                <span className="lock-icon" aria-label="Locked">
                    🔒
                </span>
            )}</p>
        ))}
        
        </div>
        <div className="chat-room-div">
        <h3> DM's 🔒</h3>
        <NavLink className="navlink" to="/">Login to send DM's</NavLink> 
        </div>
        </>
    )
}

export default ChatroomsGuest