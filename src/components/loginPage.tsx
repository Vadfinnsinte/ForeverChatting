import { useEffect, useState } from "react"
import { Navigate, useNavigate  } from "react-router-dom"
import { useVariableStore } from "../data/store"
import { useShallow } from "zustand/react/shallow"
import { NavLink } from "react-router-dom"
import { getActiveUser } from "../functions/getActiveUser"


const LS_KEY = 'JWT-DEMO--TOKEN'

const LoginPage = () => {
    
    const [username, setUsernameInput] = useState<string>("")
    const [password, setPasswordInput] = useState<string>("")
    const [wrong, setIsWrong] = useState<boolean>(false)
    
    
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
                setIsWrong(true)
                return
            }
            
            
            const token = await response.json()
            localStorage.setItem(LS_KEY, token.jwt)
            setIsWrong(false)
            setIsLoggedIn(true)
            setActiveUser(data.username)
            
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
    const userinputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsernameInput(e.target.value)
        setIsWrong(false)
    }
    const passinputHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value)
        setIsWrong(false)
    }
    
    
    return (
        <>
        <header className='header'>
        <h1>ForeverChat</h1>
        
        </header>
        
        <main>
             <div className="login-box">
                <h2>Login:</h2>
                <input onChange={(e) => userinputHandler(e)} className="input" type="text" placeholder="Username"></input>
                <input onChange={(e) => passinputHandler(e)} className="input" type="text" placeholder="Password"></input>
                {/* <input onChange={(e) => setUsernameInput(e.target.value)} className="input" type="text" placeholder="Username"></input>
                <input onChange={(e) => setPasswordInput(e.target.value)} className="input" type="text" placeholder="Password"></input> */}
                <button onClick={handleLogin} className="login-btn button" >Login</button>
                <p className={!wrong ? "wrong-login" : "not-wrong"}>*Wrong password or username</p>
            </div>
            <NavLink to="/chatrooms-guest" className="navlink">Continue as guest</NavLink>
            <button onClick={handleCreateUser} className="create-user-btn button">Create user</button>
        </main>
        </>
    )
}

export default LoginPage