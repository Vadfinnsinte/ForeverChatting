import { useNavigate } from "react-router-dom"
import { useVariableStore } from "../data/store"
const LS_KEY = 'JWT-DEMO--TOKEN'



const Settings = () => {
    const userObject = useVariableStore(state => state.userObject)
    const setIsLoggedIn = useVariableStore(state => state.setIsLoggedIn)
    const navigate = useNavigate()
    function logoutFunction() {
    
    
        setIsLoggedIn(false) // håll syncad med LS_key. 
              localStorage.removeItem(LS_KEY)
              navigate("/")
      }
      
    return (
        <main className="main-settings">
            <div className="settings-div">
        
                <h3>Settings</h3>
                <div className="user-div">
                    <img className="settings-pic" src={userObject?.image} />
                    <p>{userObject?.username}</p>
            </div>
            </div>
            <button onClick={logoutFunction} className="button logout-btn"> Logout</button>
                <div className="change-info-div">
                    <h4>Change: </h4>
                    <input type="text" placeholder="profile picture url" className="input"/>
                     <input type="text" placeholder="flair" className="input"/>
        
                <button className="button send-btn" > Spara</button>
             </div>
            <button className=" button delete-btn">delete account</button>
        </main>
    )
}

export default Settings