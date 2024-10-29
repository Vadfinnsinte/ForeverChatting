import { useNavigate } from "react-router-dom"
import { useVariableStore } from "../data/store"
import { useState } from "react"
import { updateUser } from "../functions/updateUser";
import { TempUser } from "../data/models/User";
import { getActiveUser } from "../functions/getActiveUser";
import { searchUsers } from "../functions/searchUsers";
const LS_KEY = 'JWT-DEMO--TOKEN'



const Settings = () => {
    const userObject = useVariableStore(state => state.userObject)
    const setUserObject = useVariableStore(state => state.setUserObject)
    const setIsLoggedIn = useVariableStore(state => state.setIsLoggedIn)
    const [imageInput, setImageInput] = useState<string>("")
    const [flairInput, setFlairInput] = useState<string>("")
    const navigate = useNavigate()

    const handleGetUser = async () => {
        const activeUsername = await getActiveUser()
        if(activeUsername) {
            const users = await searchUsers(activeUsername)
            if( users && users.length > 0) {
                setUserObject(users[0])
            }
            
        }
    }

    function logoutFunction() {
        setIsLoggedIn(false) // håll syncad med LS_key. 
              localStorage.removeItem(LS_KEY)
              navigate("/")
      }
    const saveChanges = async () => {
   
        let object: TempUser = {}
        if(imageInput !== "" && flairInput !== "") {
            object = {...object, image: imageInput, flair: flairInput}
        }else if (imageInput === "") {
            object = {...object, flair: flairInput}
        }else {
            object = {...object, image: imageInput}
        }
        if(userObject?._id) {
            const id = userObject?._id
            await updateUser(object, id)
            setFlairInput("")
            setImageInput("")
            await handleGetUser()
        }
    }
      
    return (
        <main className="main-settings">
            <div className="settings-div">
        
                <h3>Settings</h3>
                <div className="user-div">
                    <img className="settings-pic" src={userObject?.image} />
                    <p className="p-user">{userObject?.username}</p>
                    {userObject?.flair && <p  className="flair">{userObject?.flair}</p>}
            </div>
            </div>
            <button onClick={logoutFunction} className="button logout-btn"> Logout</button>
                <div className="change-info-div">
                    <h4>Change: </h4>
                    <div className="input-label">
                    <label>image:</label>
                    <input onChange={(e) => setImageInput(e.target.value)} value={imageInput} type="text" placeholder={userObject?.image} className="input"/>

                    </div>
                    <div className="input-label">
                    <label>flair: </label>
                     <input onChange={(e) => setFlairInput(e.target.value)} value={flairInput} type="text" placeholder={userObject?.flair} className="input"/>
                     </div>
                <button onClick={saveChanges} className="button send-btn" > Spara</button>
             </div>
            <button className=" button delete-btn">delete account</button>
        </main>
    )
}

export default Settings