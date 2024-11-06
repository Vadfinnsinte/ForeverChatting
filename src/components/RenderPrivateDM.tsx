import { useNavigate, useParams } from "react-router-dom"
import { useVariableStore } from "../data/store";
import { useEffect, useRef, useState } from "react";
import { DM } from "../data/models/DM";
import Header from "./Header";
import { getDmMathingUser } from "../functions/getDmUserNames";
import { IoArrowBackOutline } from "react-icons/io5";
import { getAllUsers } from "../functions/getAllUsers";
import { User } from "../data/models/User";
import { getActiveUser } from "../functions/getActiveUser";



const RenderPrivateDM = () => {
    const { name, id } = useParams<{ name: string, id: string }>()
    const[ sortedDms, setSortedDms] = useState<DM[] | null>(null) 
    const [messageInput, setMessageInput] = useState("")
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const [senderPicture, setSenderPicture] = useState<User |string>("")
    const [activePicture, setActivePicture] = useState<User |string>("")
    const activeUser = useVariableStore(state => state.activeUser)
    const messageDivRef = useRef<HTMLDivElement>(null)
    
    const navigate = useNavigate()


    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const dmObjects = await getDmMathingUser()
        const users = await getAllUsers()
    
        if(activeusername){
            setActiveUser(activeusername)
        }else(
            navigate("/chatrooms-guest")
        )

        if(dmObjects){
            const matchingDms = dmObjects.filter(dm => {
                if (name === "deleted") {
                    return ( (dm.senderName === activeusername && dm.deletedID === id) || 
                     (dm.deletedID === id && dm.reciverName === activeusername))
                } else {
                    return (dm.senderName === activeusername && dm.reciverName === name) || 
                    (dm.senderName === name && dm.reciverName === activeusername);
                }
            });
            const sortedDms = matchingDms.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            if(users) {
                const pictureSender = users.find(sender => sender.username === name)
                const pictureActive = users.find(active => active.username === activeusername)
                if(pictureActive) {
                    setActivePicture(pictureActive)
                }
                if(pictureSender) {
                    setSenderPicture(pictureSender)
                }
            }
            setSortedDms(sortedDms)
            scrollToBottom()
        }
       
    }
    const handleSendMessage = async () => {
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
     const handleback = () => {
        navigate("/chatrooms")
    }
    useEffect(() => {
        if (sortedDms) {
            scrollToBottom()
        }
    }, [sortedDms]);

    useEffect(() => {
        handleGet()
    },[])


    return (
        <>
        
        <Header/> 
        <main className="chat-page-main">
        <div>
        <IoArrowBackOutline onClick={handleback} className="back-icon"/>
        <h3 className="dm-name">{name}</h3>

        </div>
        <div className="message-div " ref={messageDivRef}>

        {sortedDms? sortedDms.map((dm) => (
            <section key={dm._id} className="chat-page">
            <div  className="senderInformation">
                <div className="pic-name-div">
            <img className="profile-pic" src={dm.senderName === activeUser   ? typeof activePicture === "object" && activePicture.image ? activePicture.image : undefined
            : typeof senderPicture === "object" && senderPicture.image ? senderPicture.image : undefined}/>

                <p className="p-username">{dm.senderName}</p>

                </div>
                <p className="date">{new Date(dm.date).toLocaleString()}</p>
            </div>
            <p className="p-message" >{dm.messageText}</p>
            </section>
        )) : (
            <p>start your chat now!</p>
        )
        }
        </div>
         <textarea value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="message-input" placeholder="type message.." cols={2} rows={3} ></textarea>   
        <button onClick={handleSendMessage} className="button send-btn" >Send</button>
        
        </main>
        </>
    )
}

export default RenderPrivateDM