import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAllRoomMessages } from "../functions/getAllRoomMessages";
import Header from "./Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { RoomMessage } from "../data/models/RoomMessages";
import { getActiveUser } from "../functions/getAllRooms";
import { useVariableStore } from "../data/store";


const ChatRoom = () => {
    const { room } = useParams<{ room: string }>()
    console.log(room);
    const [sortedMessages, setSortedMessages] = useState<RoomMessage[] | null>(null)
    const [messageInput, setMessageInput] = useState("")
    const messageDivRef = useRef<HTMLDivElement>(null)
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const activeUser = useVariableStore(state => state.activeUser)
    const navigate = useNavigate()

    const handleGet = async () => {
        const activeUserName = await getActiveUser()
        const roomMessages = await getAllRoomMessages()

        if(activeUserName) {
            setActiveUser(activeUserName)
        }
        
        if (roomMessages) {
            const matchingMessages = roomMessages.filter(message => message.roomName === room).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setSortedMessages(matchingMessages)
            scrollToBottom()
            
        }
    }
    const handleSendMessage = async () => {

        console.log(messageInput);
        if(messageInput === ""){
            return
        }
        const message = {
            senderName: activeUser,
            messageText: messageInput,
            roomName: room,
            date: new Date()
        }
        try {
            console.log("går in i try", message);
            
            const data = message
            const response = await fetch('/api/room-messages/room', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
                
            })

            if(response.status !== 201) {
                console.log("try again")
                return
            }
            setMessageInput("")  
            scrollToBottom()  
          
        
    } catch (error) {
        console.log("try again later", error);
        
    }finally {
        await handleGet() 
        scrollToBottom()  
    }
    }
    const handleback = () => {
        navigate("/chatrooms")
    }
    const scrollToBottom = () => {
        if (messageDivRef.current) {
            messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight; 
        }
    };
    useEffect(() => {
        handleGet()
    },[])
    
    return (
        <main className="chat-page-main">
        <Header />
        <div>
        <IoArrowBackOutline onClick={handleback}  className="back-icon"/>
        <h3 className="dm-name">{room}</h3>
        </div>
        <div className="message-div " ref={messageDivRef}>
        {sortedMessages && sortedMessages?.length > 0 ? sortedMessages.map((message ) => (
            <section key={message._id} className="chat-page">
            <div  className="senderInformation">
            <p className="p-username">{message.senderName}</p>
            <p className="date">{new Date(message.date).toLocaleString()}</p>
            </div>
            <p className="p-message" >{message.messageText}</p>
            </section>
            
            
        ) ) : (
            <p>EmptyChat :/</p>
        )}
        </div>
             <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="message-input" placeholder="type message.." cols={2} rows={3} ></textarea>   
             <button onClick={handleSendMessage} className="button send-btn" >Send</button>
        </main>
    )
}

export default ChatRoom