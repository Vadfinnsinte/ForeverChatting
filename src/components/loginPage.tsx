import { useState } from "react"
// import { variableStore } from "../data/store.js"
import { Navigate  } from "react-router-dom"

const LS_KEY = 'JWT-DEMO--TOKEN'




const LoginPage = () => {

    const [username, setUsernameInput] = useState<string>("")
    const [password, setPasswordInput] = useState<string>("")
    // const {setIsLoggedIn, isLoggedIn} = variableStore((state) => ({setIsLoggedIn: state.setIsLoggedIn,
    //     isLoggedIn: state.isLoggedIn
    // }))
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(false)
    
    async function handleLogin  () {

	
        try {
            // console.log("entered try, 1");
            
        const data = {username, password}
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
        console.log(2, username, password);
        if(response.status !== 200) {
			console.log("try again 3");
            return
        }

		setIsLoggedIn(!isLoggedIn)
        const token = await response.json()
        localStorage.setItem(LS_KEY, token.jwt)
		// return <Navigate to="/chatrooms" replace/>



    }catch (error) {
        console.log("Try again later", error);
        
    }
    }
    if(isLoggedIn) {
       return <Navigate to="/chatrooms" replace/>
	   
    }
	// if(localStorage.getItem(LS_KEY) !== null) {
	// 	return <Navigate to="/chatrooms" replace/>
		
	//  }
 

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