import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAllRoomMessages } from "../functions/getAllRoomMessages";
import Header from "./Header";
import { IoArrowBackOutline } from "react-icons/io5";
import { RoomMessage } from "../data/models/RoomMessages";
import { useVariableStore } from "../data/store";
import { getAllUsers } from "../functions/getAllUsers";
import { FaUserAlt } from "react-icons/fa";
import { getActiveUser } from "../functions/getActiveUser";



const ChatRoom = () => {
    const { room } = useParams<{ room: string }>()
    
    const [sortedMessages, setSortedMessages] = useState<RoomMessage[] | null>(null)
    const [messageInput, setMessageInput] = useState("")
    const messageDivRef = useRef<HTMLDivElement>(null)
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const activeUser = useVariableStore(state => state.activeUser)
    const [userImages, setUserImages] = useState<Record<string, string>>({})
    const navigate = useNavigate()
    
    const handleGet = async () => {
        
        if(activeUser !== "guest") {
            const activeUserName = await getActiveUser()
            if(activeUserName) {
                setActiveUser(activeUserName)
            }else {
                setActiveUser("guest")
            }
            
        }
        const roomMessages = await getAllRoomMessages()
        const users = await getAllUsers()
        
        if (roomMessages) {
            const matchingMessages = roomMessages.filter(message => message.roomName === room).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setSortedMessages(matchingMessages)
            scrollToBottom()
            
            if (users) {
                const images = users.reduce((acc, user) => {
                    if(user.username) {

                          acc[user.username] = user.image || ''
                    }
                    return acc;
                }, {} as Record<string, string>);
                setUserImages(images);
            }
            
        }
    }
    const handleSendMessage = async () => {
        
        
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
    const getUserImage = (senderName: string): string | undefined => {
        return userImages[senderName] 
        
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
            <div className="pic-name-div">
            {getUserImage(message.senderName) ? (
                <img
                className="profile-pic"
                src={getUserImage(message.senderName)}
                alt={`${message.senderName}'s profile`}
                />
            ) : (
                <FaUserAlt className="profile-pic" />
            )}
            
            <p className="p-username">{message.senderName}</p>
            </div>
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