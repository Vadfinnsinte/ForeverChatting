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
import { BiSolidDownArrow } from "react-icons/bi";

interface Deleted {
    id: string;
    displayName: string;
}


const RenderDmNames = () => {
    const [uniqueNames, setUniqueNames] = useState<Deleted[]>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [matchingUsers, setMatchingUsers] = useState<User[]>([])
    const [userImages, setUserImages] = useState<Record<string, string>>({})
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [isOpen, setIsOpen] = useState<boolean>(false)
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
                        displayName: dm.senderName,
                        id: dm.senderName === "deleted" ? dm.deletedID : dm.deletedID
                    })),
                ...matchingdm
                    .filter(dm => dm.reciverName && dm.reciverName !== activeusername)
                    .map(dm => ({
                        displayName: dm.reciverName,
                        id: dm.reciverName === "deleted" ? dm.deletedID : dm.deletedID
                    }))
            ];
     
            const uniqueNames : Deleted[]= [];
            const seenNames = new Set();
        
            names.forEach(name => {
                if (name.displayName === "deleted" || !seenNames.has(name.displayName)) {
                    uniqueNames.push(name);
                    if (name.displayName !== "deleted") {
                        seenNames.add(name.displayName); 
                    }
                }
            });
            if (users) {
                const images = users.reduce((acc, user) => {
                    if(user.username) {

                          acc[user.username] = user.image || ''
                    }
                    return acc;
                }, {} as Record<string, string>);
                setUserImages(images);
            }
            
            
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
    const getUserImage = (senderName: string): string | undefined => {
        return userImages[senderName] 
        
    };
    const setSearching = () => {
        setIsSearching(!isSearching)
    }
     
    useEffect(() => {
        handleGet()
    },[])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 550) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        
        handleResize();
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <>
            <div className="chatroom-h-div dm">

            <BiSolidDownArrow  onClick={handleToggle} className={isOpen ?"collapse-icon-dm" : "collapse-icon-dm inline"} />
            <h3 onClick={handleToggle} className="color">DM's  </h3>
            <RiChatNewLine onClick={setSearching} className="new-chat-icon" /> 

            </div>
        <div className="chat-room-div">
        
        <div className="DM-div">
            
                {isSearching && 
                <div className="search-user">

                    <div className="search-container">
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

        </div>
            }

        </div>
        <details open={isOpen}>
            <summary></summary>
            {uniqueNames.length > 1 ? (
                 uniqueNames.map(({ displayName, id }, index) => (
            <div key={index} className="pic-name-div small">
                {getUserImage(displayName) ? (
                    <img
                        className="profile-pic"
                        src={getUserImage(displayName)}
                        alt={`${displayName}'s profile`}
                    />
                ) : (
                    <FaUserAlt className="profile-pic" />
                )}
                <p className="chat-room-name" onClick={() => handlePrivateDM(displayName, id)}>
                    {displayName}
                </p>
            </div>
        ))
    ) : (
        <p className="hover" onClick={() => setIsSearching(true)}> Start you first chat <span> <RiChatNewLine /> </span> </p>
    )}
        </details>
        </div>
        </>
    )
}

export default RenderDmNames