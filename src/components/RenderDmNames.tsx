import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"
import { useVariableStore } from "../data/store"
import { useNavigate } from "react-router-dom"
import { getActiveUser } from "../functions/getAllRooms"



// const LS_KEY = 'JWT-DEMO--TOKEN'

const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<string[]>([])
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const activeUser = useVariableStore(state => state.activeUser)
    const setDmObjects = useVariableStore(state => state.setDmObjects)
    const navigate = useNavigate()
    


    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const matchingdm = await getDmMathingUser()
        if(activeusername){
            setActiveUser(activeusername)
            console.log("activeUser in chat: ", activeUser);
            
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
        
        <h3>DM's</h3>
        {uniqueNames.map((name, index) => (
            <p onClick={() => handlePrivateDM(name)} key={index}>{name}</p>
        ))}
        
        </div>
        </>
    )
}

export default RenderDmNames