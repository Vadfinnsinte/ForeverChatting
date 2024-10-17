import { useState } from "react"
import { variableStore } from "../data/store.js"
import { Navigate, HashRouter as Router } from "react-router-dom"

const LS_KEY = 'JWT-DEMO--TOKEN'




const LoginPage = () => {

    const [usenameInput, setUsernameInput] = useState<string>("")
    const [passwordInput, setPasswordInput] = useState<string>("")
    // const {setIsLoggedIn, isLoggedIn} = variableStore((state) => ({setIsLoggedIn: state.setIsLoggedIn,
    //     isLoggedIn: state.isLoggedIn
    // }))
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    
    async function handleLogin  () {
    const data = {usenameInput, passwordInput}
    try {
        const response = await fetch('/login', {
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
        setIsLoggedIn(!isLoggedIn)

    }catch (error) {
        console.log("Try again later", error);
        
    }
    }
    if(isLoggedIn) {
       return <Navigate to="/protected" replace/>
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
        <p className="purple-p">Continue as guest</p>
        <button className="create-user-btn button">Create user</button>
      </main>
    </>
    )
}

export default LoginPage