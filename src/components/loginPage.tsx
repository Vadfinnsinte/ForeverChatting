import { useEffect, useState } from "react"
import { Navigate, useNavigate  } from "react-router-dom"
import { useVariableStore } from "../data/store"
import { useShallow } from "zustand/react/shallow"
import { NavLink } from "react-router-dom"
import { getActiveUser } from "../functions/getActiveUser"


const LS_KEY = 'JWT-DEMO--TOKEN'

// Lägg till att user sparas som guest!! 
const LoginPage = () => {
    
    const [username, setUsernameInput] = useState<string>("")
    const [password, setPasswordInput] = useState<string>("")
    
    
    const {setIsLoggedIn, isLoggedIn, setActiveUser} = useVariableStore(useShallow((state) => ({
        setIsLoggedIn: state.setIsLoggedIn,
        isLoggedIn: state.isLoggedIn,
        setActiveUser: state.setActiveUser
    })))
    const navigate = useNavigate()
    
    const handleGetUser = async () => {
        const loggedIn = await getActiveUser()
        if(loggedIn) {
            setIsLoggedIn(true)
        }
        
    }
    
    async function handleLogin  () {
        
        
        try {
            
            const data = {username, password}
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( data )
                
            })
            
            if(response.status !== 200) {
                console.log("try again");
                return
            }
            
            
            const token = await response.json()
            localStorage.setItem(LS_KEY, token.jwt)
            setIsLoggedIn(true)
            setActiveUser(data.username) // få den att sparas efter omladdning av sidan.? 
            
        }catch (error) {
            console.log("Try again later", error);
            
        }
    } // handleLogin
    
    useEffect(() => {
        handleGetUser();
    }, [handleGetUser]);
    
    if(isLoggedIn) {
        return <Navigate to="/chatrooms" replace/>
    }
    const handleCreateUser = () => {
        navigate("/new-user")
    }
    
    
    return (
        <>
        <header className='header'>
        <h1>ForeverChat</h1>
        
        </header>
        
        <main>
             <div className="login-box">
                <h2>Login:</h2>
                <input onChange={(e) => setUsernameInput(e.target.value)} className="input" type="text" placeholder="Username"></input>
                <input onChange={(e) => setPasswordInput(e.target.value)} className="input" type="text" placeholder="Password"></input>
                <button onClick={handleLogin} className="login-btn button" >Login</button>
            </div>
            <NavLink to="/chatrooms-guest" className="navlink">Continue as guest</NavLink>
            <button onClick={handleCreateUser} className="create-user-btn button">Create user</button>
        </main>
        </>
    )
}

export default LoginPage