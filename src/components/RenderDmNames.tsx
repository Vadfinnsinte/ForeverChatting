import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"
import { useVariableStore } from "../data/store"
import { useNavigate } from "react-router-dom"
import { getActiveUser } from "../functions/getAllRooms"
import { RiChatNewLine } from "react-icons/ri";



// const LS_KEY = 'JWT-DEMO--TOKEN'

const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<string[]>([])
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const setDmObjects = useVariableStore(state => state.setDmObjects)
    const navigate = useNavigate()
    


    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const matchingdm = await getDmMathingUser()
        if(activeusername){
            setActiveUser(activeusername)
            
          }
        if(matchingdm) {
            const names = [...new Set([
                ...matchingdm
                .filter( username => username.senderName !== activeusername)
                .map(username => username.senderName),
                ...matchingdm
                .filter(dm => dm.reciverName && dm.reciverName !== activeusername)
                .map(dm => dm.reciverName)
            ])]
            setUniqueNames(names)
            setDmObjects(matchingdm)
  
            
        }
    }
   
    
    const handlePrivateDM = (name: string) => {
        navigate(`/private-dm/${name}`)
    }
    
    
    useEffect(() => {
        handleGet()
    },[])
    
    return (
        <>
        <div className="chat-room-div">
        
        <div className="DM-div">
        <h3 className="DM-h">DM's  </h3>
        <RiChatNewLine className="new-chat-icon" /> 
        </div>
        {uniqueNames.map((name, index) => (
            <p onClick={() => handlePrivateDM(name)} key={index}>{name}</p>
        ))}
        
        </div>
        </>
    )
}

export default RenderDmNames