import { useParams } from "react-router-dom"
import { useVariableStore } from "../data/store";
import { useEffect, useState } from "react";
import { DM } from "../data/models/DM";
import Header from "./Header";
import { getDmMathingUser } from "../functions/getDmUserNames";
import { getActiveUser } from "../functions/getAllRooms";


const RenderPrivateDM = () => {
    const { name } = useParams<{ name: string }>()
    console.log(name);
    const[ sortedDms, setSortedDms] = useState<DM[] | null>(null) 
    const setActiveUser = useVariableStore(state => state.setActiveUser)
 
    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const dmObjects = await getDmMathingUser()
        if(activeusername){
            setActiveUser(activeusername)
            console.log("activeUser in chat: ", activeusername);
            
          }
        if(dmObjects){
            const matchingDms = dmObjects.filter(dm =>  (dm.senderName === activeusername && dm.reciverName === name) || 
            (dm.senderName === name && dm.reciverName === activeusername))
            
            const sortedDms = matchingDms.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            setSortedDms(sortedDms)
        }
       
    }


    useEffect(() => {
        handleGet()
    },[])


    return (
        <main className="chat-page-main">
        <Header/> 
        <h3>{name}</h3>
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
         <textarea className="message-input" placeholder="type message.." cols={2} rows={4} ></textarea>   
        <button className="button send-btn" >Send</button>
        
        </main>
    )
}

export default RenderPrivateDM