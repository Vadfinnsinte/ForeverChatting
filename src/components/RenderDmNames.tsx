import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"


// const LS_KEY = 'JWT-DEMO--TOKEN'

const RenderDmNames = () => {
   const [uniqueNames, setUniqueNames] = useState<string[]>([])


    const handleGet = async () => {
        const matchingdm = await getDmMathingUser()
        if(matchingdm) {
            const names = [...new Set(matchingdm.map(username => username.senderName))]
            setUniqueNames(names)
        }
        //lägg till skickade också.
    }
     
    useEffect(() => {
        handleGet()
    },[])

    return (
        <>
        <div className="chat-room-div">

        <h3>DM's</h3>
        {uniqueNames.map((name, index) => (
            <p key={index}>{name}</p>
        ))}
            
        </div>
        </>
    )
}

export default RenderDmNames