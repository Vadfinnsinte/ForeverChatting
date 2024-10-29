import { useEffect, useState } from "react"
import { getActiveUser } from "../functions/getActiveUser"
import { searchUsers } from "../functions/searchUsers"
import { User } from "../data/models/User"


const Header = () => {
const [user, setUser] = useState<User| null>(null)

    const handleGetUser = async () => {
        const activeUsername = await getActiveUser()
        if(activeUsername) {
            const users = await searchUsers(activeUsername)
            if( users && users.length > 0) {
                setUser(users[0])
            }
            
        }
    }
    useEffect(() => {
        handleGetUser()
    },[])

    return (
        <header className="header-chat">
        <h1 className="FC">FC</h1>
        <div className="profile-div">
        <div className="user-header">
            <img className="header-profile-pic" src={user?.image}/>
        </div>
            <p className="settings">⚙️</p>
            <p className="username-header">{user?.username}</p>

        </div>
    </header> 

    )
}

export default Header