import { useNavigate } from "react-router-dom"
import { useVariableStore } from "../data/store"
import { useState } from "react"
import { updateUser } from "../functions/updateUser";
import { TempUser } from "../data/models/User";
import { getActiveUser } from "../functions/getActiveUser";
import { searchUsers } from "../functions/searchUsers";
import { deleteUser, updeteDM, updeteMesageName } from "../functions/deleteUser";
import { IoArrowBackOutline } from "react-icons/io5";

const LS_KEY = 'JWT-DEMO--TOKEN'



const Settings = () => {
    const userObject = useVariableStore(state => state.userObject)
    const setUserObject = useVariableStore(state => state.setUserObject)
    const setIsLoggedIn = useVariableStore(state => state.setIsLoggedIn)
    const [imageInput, setImageInput] = useState<string>("")
    const [flairInput, setFlairInput] = useState<string>("")
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
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
    const handleDelete =  async () => {
        if(userObject?._id && userObject.username){
            await updeteMesageName(userObject?.username)
            await updeteDM(userObject.username, userObject._id)
            logoutFunction()
            await deleteUser(userObject?._id)
        }
    }
    const handleback = () => { 
        navigate("/chatrooms")
}
      
    return (
        <>
        <header className='header settings-h'>
            <h1>{userObject?.username}</h1>
        </header>

        <main className={ !isDeleting ? ( "main-settings") : ("main-settings blur") }>
        <IoArrowBackOutline onClick={handleback}  className="back-icon"/>
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
                    <h3>Change: </h3>
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
            <button onClick={() => setIsDeleting(true)} className=" button delete-btn">delete account</button>
        </main>
            { isDeleting && <div className="varning-div">
                <h2 className="varning-h2">VARNING!</h2>
                <p>Deleting can not be undone!</p>
                <p>Are you sure you want to proceed?</p>
                <div className="button-div">

                <button onClick={() => setIsDeleting(false)} className="cancel-btn btn">CANCEL</button>
                <button onClick={handleDelete} className="delete-btn-final btn">DELETE</button>

                </div>
            </div>}
            </>
    )
}

export default Settings