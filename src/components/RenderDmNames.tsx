import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"
import { useVariableStore } from "../data/store"
import { DM } from "../data/models/DM"


// const LS_KEY = 'JWT-DEMO--TOKEN'

const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<string[]>([])
    const activeUser = useVariableStore(state => state.activeUser)
    const setDmObjects = useVariableStore(state => state.setDmObjects)
    const handleGet = async () => {
        const matchingdm = await getDmMathingUser()
        if(matchingdm) {
            const names = [...new Set([
                ...matchingdm
                .filter( username => username.senderName !== activeUser)
                .map(username => username.senderName),
                ...matchingdm
                .filter(dm => dm.reciverName && dm.reciverName !== activeUser)
                .map(dm => dm.reciverName)
            ])]
            setUniqueNames(names)
            setDmObjects(matchingdm)
        }
        //lägg till skickade också.
        
        
    }
    
    const handlePrivateDM = (name: string) => {
        console.log(name);
        // rendera privatDm sidan och skicka med name. 

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