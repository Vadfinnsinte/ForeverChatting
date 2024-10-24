import { useParams } from "react-router-dom"
import { useVariableStore } from "../data/store";
import { useEffect, useRef, useState } from "react";
import { DM } from "../data/models/DM";
import Header from "./Header";
import { getDmMathingUser } from "../functions/getDmUserNames";
import { getActiveUser } from "../functions/getAllRooms";
import { IoArrowBackOutline } from "react-icons/io5";



const RenderPrivateDM = () => {
    const { name } = useParams<{ name: string }>()
    // console.log(name);
    const[ sortedDms, setSortedDms] = useState<DM[] | null>(null) 
    const [messageInput, setMessageInput] = useState("")
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const activeUser = useVariableStore(state => state.activeUser)
    const messageDivRef = useRef<HTMLDivElement>(null)


    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const dmObjects = await getDmMathingUser()
    
        if(activeusername){
            setActiveUser(activeusername)
            // console.log("activeUser in chat: ", activeusername);
            
          }
        if(dmObjects){
            const matchingDms = dmObjects.filter(dm =>  (dm.senderName === activeusername && dm.reciverName === name) || 
            (dm.senderName === name && dm.reciverName === activeusername))
            
            const sortedDms = matchingDms.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setSortedDms(sortedDms)
            scrollToBottom()
        }
       
    }
    const handleSendMessage = async () => {
        console.log(messageInput);
        if(messageInput === ""){
            return
        }
        const message = {
            messageText: messageInput,
            reciverName: name,
            senderName: activeUser,
            date: new Date()
        }
        try {
            console.log("går in i try", message);
            
            const data = message
            const response = await fetch('/api/dm/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
                
            })

            if(response.status !== 201) {
                console.log("try again 3")
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
    const scrollToBottom = () => {
        if (messageDivRef.current) {
            messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight; 
        }
    };
    useEffect(() => {
        if (sortedDms) {
            scrollToBottom()
        }
    }, [sortedDms]);

    useEffect(() => {
        handleGet()
    },[])


    return (
        <main className="chat-page-main">
        <Header/> 
        <div>
        <IoArrowBackOutline className="back-icon"/>
        <h3 className="dm-name">{name}</h3>

        </div>
        <div className="message-div " ref={messageDivRef}>

        {sortedDms? sortedDms.map((dm) => (
            <section key={dm._id} className="chat-page">
            <div  className="senderInformation">
                <p className="p-username">{dm.senderName}</p>
                <p className="date">{new Date(dm.date).toLocaleString()}</p>
                {/* <img />
                <p>username</p>
                <p> time</p> */}
            </div>
            <p className="p-message" >{dm.messageText}</p>
            </section>
        )) : (
            <p>start your chat now!</p>
        )
        }
        </div>
         <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="message-input" placeholder="type message.." cols={2} rows={4} ></textarea>   
        <button onClick={handleSendMessage} className="button send-btn" >Send</button>
        
        </main>
    )
}

export default RenderPrivateDM