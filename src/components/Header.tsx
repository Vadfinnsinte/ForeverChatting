import { useEffect, useState } from "react"
import { getActiveUser } from "../functions/getActiveUser"
import { searchUsers } from "../functions/searchUsers"
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useVariableStore } from "../data/store";

const Header = () => {
const userObject = useVariableStore(state => state.userObject)
const setUserObject = useVariableStore(state => state.setUserObject)
const [isGuest, setIsGuest] = useState<boolean>(false)

const navigate = useNavigate()
    const handleGetUser = async () => {

        const activeUsername = await getActiveUser()
        
        if(activeUsername) {
            const users = await searchUsers(activeUsername)
            if( users && users.length > 0) {
                setUserObject(users[0])
            }
        }else {
            setIsGuest(true)  
        }
    }
    const handleSettings = () => {
        navigate("/settings")
    }
    useEffect(() => {
        handleGetUser()
    },[])

    return (
        <header className="header-chat">
        <h1 className="FC">FC</h1>
        {!isGuest ? (  
                <div>
        <div className="profile-div">
        
                    <div className="user-header" onClick={handleSettings}>
                    {userObject?.image ? (<img className="header-profile-pic" src={userObject?.image}/>) : (  <FaUserAlt className="header-profile-pic icon" />)}
                    </div>
                    <p onClick={handleSettings} className="settings">⚙️</p>
                    <p className="username-header">{userObject?.username}</p>

                </div>
        </div>) : (<p></p>) }
    </header> 

    )
}

export default Header