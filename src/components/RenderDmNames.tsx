import { useEffect, useState } from "react"
import { getDmMathingUser } from "../functions/getDmUserNames"
import { useVariableStore } from "../data/store"
import { useNavigate } from "react-router-dom"
import { RiChatNewLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { searchUsers } from "../functions/searchUsers"
import { User } from "../data/models/User"
import { FaUserAlt } from "react-icons/fa";
import { getActiveUser } from "../functions/getActiveUser";
import { getAllUsers } from "../functions/getAllUsers";

interface Deleted {
    id: string;
    displayName: string;
}

const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<Deleted[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [matchingUsers, setMatchingUsers] = useState<User[]>([])
    const [allUsers, setAllUsers] = useState<User[]>([])
    const setActiveUser = useVariableStore(state => state.setActiveUser)
    const setDmObjects = useVariableStore(state => state.setDmObjects)
    const navigate = useNavigate()
    
    const handleGet = async () => {
        const activeusername = await getActiveUser()
        const matchingdm = await getDmMathingUser()
        const users = await getAllUsers()
        if(users) {
            setAllUsers(users)
            setMatchingUsers(allUsers)
        }
        if(activeusername){
            setActiveUser(activeusername)
            
          }

        if (matchingdm) {
            const names = [
                ...matchingdm
                    .filter(username => username.senderName !== activeusername)
                    .map(dm => ({
                        displayName: dm.senderName === "deleted" ? "deleted" : dm.senderName,
                        id: dm.senderName === "deleted" ? dm.deletedID : dm.deletedID
                    })),
                ...matchingdm
                    .filter(dm => dm.reciverName && dm.reciverName !== activeusername)
                    .map(dm => ({
                        displayName: dm.reciverName === "deleted" ? "deleted" : dm.reciverName,
                        id: dm.reciverName === "deleted" ? dm.deletedID : dm.deletedID
                    }))
            ];
        
            // Remove duplicates by `id`
            const uniqueNames = names.filter(
                (name, index, self) =>
                    index === self.findIndex((t) => t.id === name.id)
            );
        
            setUniqueNames(uniqueNames);
            setDmObjects(matchingdm);
        }}


   const handleSearchUser = async (e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value.trim().toLowerCase()
    
    // setQuery(value)
    if(value === "") {
        setMatchingUsers(allUsers)
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
    
    const handlePrivateDM = (name: string, id: string) => {
        navigate(`/private-dm/${name}/${id}`)
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
                <input className="search-input" type="text" placeholder="search user" onChange={(e) => handleSearchUser(e)}  />
                { matchingUsers.map( user => (
                    <div key={user._id} className="search-div"> 
                        {user.image ? (<img className="profile-pic" src={user.image} />) : (
                            <FaUserAlt className="profile-pic" />
                        ) }
                        <p onClick={() => handlePrivateDM(user.username, user._id ? user._id :"")}>{user.username}</p>
                    </div>

                ))}

            </div>
            }

        </div>
        {/* {uniqueNames.map((name, index) => (
            <p onClick={() => handlePrivateDM(name)} key={index}>{name}</p>
        ))} */}
        {uniqueNames.map(({ displayName, id }, index) => (
    <p onClick={() => handlePrivateDM(displayName,id)} key={index}>
        {displayName}
    </p>
))}
        
        </div>
        </>
    )
}

export default RenderDmNames