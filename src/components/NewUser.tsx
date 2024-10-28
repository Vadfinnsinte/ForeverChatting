import { useState } from "react"
import { createUser } from "../functions/createUser"
import { User } from "../data/models/User"
import { useNavigate } from "react-router-dom"
// import { NavLink } from "react-router-dom"
const LS_KEY = 'JWT-DEMO--TOKEN'

const NewUser = () => {
    const [user, setUser] = useState<User>(
        {
            username: "", 
            password:"",
            dateOfCreation: new Date(),
            flair: "",
            image: ""
        }
        
    )
    const [isCreated, setIsCreated] = useState<boolean>(false)
    const navigate = useNavigate() 
    
    const  handleCreate = async () => {
        setUser({...user, dateOfCreation: new Date()})
        const userToSubmitt = {...user}
        
        if(userToSubmitt.flair === ""){
            delete userToSubmitt.flair
        }
        if(userToSubmitt.image === ""){
            delete userToSubmitt.image
        }
        const response = await createUser(userToSubmitt)
        if(!response){
            setUser
            (
                {
                    username: "", 
                    password:"",
                    dateOfCreation: new Date(),
                    flair: "",
                    image: ""
                }
            )
        }
        // if (response) {
            setIsCreated(true)

        // }
            try {
                const username = user.username
                const password  = user.password
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
                
               
            }catch (error) {
                console.log("Try again later", error);
                
            }
        

    }
    const handleLogin = () => {
        navigate("/chatrooms")
    }
    
    
    return (
        
        <main>
        <h3>New User</h3>
        
 {  !isCreated ?     
        (  
        <div className="login-box">
        <input onChange={(e) => setUser({ ...user, username: e.target.value })} value={user.username} className="input" placeholder="Username*"/>
        <input onChange={(e) => setUser({ ...user, password: e.target.value })} value={user.password} className="input" placeholder="Password*"/>
        
        <input onChange={(e) => setUser({ ...user, image: e.target.value })} value={user.image} className="input optional" placeholder="Profile picture url"/>
        
        <input onChange={(e) => setUser({ ...user, flair: e.target.value })} value={user.flair} className="input" placeholder="Flair"/>
        
        <button onClick={handleCreate} className="button login-btn">Create User</button>
        </div>
      ) 
        :(
            <div className="login-box"> 
                <h3>Thank you for creating an account!</h3>
                <button onClick={handleLogin}>Click here to login</button>
            </div>
        ) } 
        </main>
    )
}


export default NewUser