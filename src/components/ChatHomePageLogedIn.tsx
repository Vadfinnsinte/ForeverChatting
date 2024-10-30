
import { useNavigate  } from "react-router-dom"
import {  getAllRooms } from "../functions/getAllRooms.js";
import { useVariableStore } from "../data/store.js";
import { useCallback, useEffect, useState } from "react";
import Header from "./Header.js";
import RenderDmNames from "./RenderDmNames.js";
import { getActiveUser } from "../functions/getActiveUser.js";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { Room } from "../data/models/Room.js";
import { createNewRoom } from "../functions/createNewRoom.js";
import { response } from "express";

// const LS_KEY = 'JWT-DEMO--TOKEN'


const ChatHomePageLogedIn = () => {
  
  
  const allRooms = useVariableStore((state) => state.allRooms);
  const setAllRooms = useVariableStore((state) => state.setAllRooms);
  const [addingRoom, setaddingRoom] = useState<boolean>(false)
  const [roomInput, setRoomInput] = useState<string>("")
  const [isLocked, setIsLocked] = useState<boolean>(false)
  const navigate = useNavigate()
  
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
  const handleNewChatRoom = () => {
    setaddingRoom(true)
  }
  const handleSaveRoom = async () => {
    const roomObject: Room = { 
      name: roomInput,
      status: isLocked
    }
    const response = await createNewRoom(roomObject)
    if(response?.ok) {
      setRoomInput("")
      setaddingRoom(false)
      handelGet()
    }
  }
  
  return (
    <>
    <Header/> 
    
      { addingRoom && <div className="add-room-div"> 
        <h3>Add a chat-room</h3>
        <RxCross1 onClick={() => setaddingRoom(false)} className="close-icon"/>
        <input value={roomInput} onChange={(e) => setRoomInput(e.target.value)} className="input" type="text" placeholder="Room name" />
        <div className="radio-div">
          <h3> Lock for guests? </h3>
          <div>
          <label htmlFor="false" >No</label>
          <input id="false" 
                type="radio" 
                name="isLocked" 
                value="false" 
                checked={!isLocked} 
                onChange={() => setIsLocked(false)} />

          </div>
          <div className="margin">
          <label htmlFor="true" >Yes</label>
          <input id="true" 
                type="radio" 
                name="isLocked" 
                value="true" 
                checked={isLocked} 
                onChange={() => setIsLocked(true)} />

          </div>
        </div>
          <button onClick={handleSaveRoom} className="button new-room-btn" >Save</button>
      </div>}
    <main className={ !addingRoom ? ( "main-chat") : ("main-chat blur") }>
    <div className="chat-room-div">
    <h3 className="color">Chat-Rooms</h3> 
    <FaPlus className="plus" onClick={handleNewChatRoom}/>
    { allRooms && allRooms.map(room => (
      <p onClick={() => handleChat(room.name)} key={room._id}> {room.name}</p>
    ))}
    
    </div>
    <RenderDmNames/> 
    </main>
    
    
    
    </>
    
  )
}

export default ChatHomePageLogedIn