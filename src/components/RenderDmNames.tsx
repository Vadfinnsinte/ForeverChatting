import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"
import { useVariableStore } from "../data/store"
import { useNavigate } from "react-router-dom"
import { getActiveUser } from "../functions/getAllRooms"
import { RiChatNewLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { searchUsers } from "../functions/searchUsers"
import { User } from "../data/models/User"
import { FaUserAlt } from "react-icons/fa";


// const LS_KEY = 'JWT-DEMO--TOKEN'

const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<string[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [matchingUsers, setMatchingUsers] = useState<User[]>([])
    // const [query, setQuery] = useState<string>("")
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
   const handleSearchUser = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.trim().toLowerCase()
    console.log(value);
    
    // setQuery(value)
    if(value === "") {
        setMatchingUsers([])
        return
    }else {
        const response = await searchUsers(value)
         if(response) {
             setMatchingUsers(response)
         }else {
            setMatchingUsers([])
         }

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
        <RiChatNewLine onClick={() => setIsSearching(!isSearching)} className="new-chat-icon" /> 
            {isSearching && 
            <div className="search-user">
                <MdClose onClick={() => setIsSearching(false)} className="close-icon" />
                <input type="text" placeholder="search user" onChange={(e) => handleSearchUser(e)}  />
                { matchingUsers.map( user => (
                    <div key={user._id} className="search-div"> 
                        {user.image ? (<img className="profile-pic" src={user.image} />) : (
                            <FaUserAlt className="profile-pic" />
                        ) }
                        <p onClick={() => handlePrivateDM(user.username)}>{user.username}</p>
                    </div>

                ))}

            </div>
            }
        {/* // Gör en div där search visas.
        // ha en state som haterar synligheten, och ändra den på onClick i chat-icon */}

        </div>
        {uniqueNames.map((name, index) => (
            <p onClick={() => handlePrivateDM(name)} key={index}>{name}</p>
        ))}
        
        </div>
        </>
    )
}

export default RenderDmNames