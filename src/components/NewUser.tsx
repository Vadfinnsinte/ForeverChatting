import { useState } from "react"
import { createUser } from "../functions/createUser"
import { User } from "../data/models/User"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { listOfPictures } from "../assets/listOfPictures"

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
    const [isMarked, setIsMarked] = useState<boolean>(false)
    const [usernameNotavailable, setUsernameNotavailable] = useState<boolean>(false)
    const [passwordToShort, setPasswordToShort] = useState<boolean>(false)
    const [flairToLong, setFlairToLong] = useState<boolean>(false)
    const navigate = useNavigate() 
    console.log(isMarked);
    
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
        if(user.password.length < 10){
            setPasswordToShort(true)
        }
        if(user.flair && user.flair.length > 30){
            setFlairToLong(true)
        }
        if( response?.status === 409) {
            setUsernameNotavailable(true)
        }
        
         
        else {

            setIsCreated(true)
    
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
                    return
                }
                
                
                const token = await response.json()
                localStorage.setItem(LS_KEY, token.jwt)
                
               
            }catch (error) {
                console.log("Try again later", error);
                
            }
        }

        

    }
    const handleLogin = () => {
        navigate("/chatrooms")
    }
    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, username: e.target.value })
        setUsernameNotavailable(false)
    }
    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) =>  {
        setUser({ ...user, password: e.target.value })
        setPasswordToShort(false)
    }
    const handleFlair = (e:React.ChangeEvent<HTMLInputElement>)  => {
        setUser({ ...user, flair: e.target.value })
        setFlairToLong(false)

    }
    const handleImage = (picture: string) => {
        setIsMarked(true)
        setUser({ ...user, image: picture})
    }
    
    return (
        <>
        <header className='header'>
        <h1>ForeverChat</h1>
        
        </header>
        <main>
        <h3 className="h3-create"> Create New User</h3>
        
 {  !isCreated ?     
        (  
        <>
        <div className="login-box create-box">
        <p className={usernameNotavailable ? "visible": "invisible"} >*username is taken</p>
        <input onChange={(e) => handleUsername(e)} value={user.username} className="input" placeholder="Username*"/>
        <p className={passwordToShort ? "visible": "invisible"} >*must be 10 charakters</p>
        <input onChange={(e) => handlePassword(e)} value={user.password} className="input" placeholder="Password(min 10)* "/>
        
        <input onChange={(e) => setUser({ ...user, image: e.target.value })} value={user.image} className="input optional" placeholder="Profile picture url"/>
        <p className="no-margin">No Url? Choose a picture:</p>
            <div className="create-pic-div">
            {listOfPictures.map(picture => (
                <img key={picture} className={user.image === picture ? "profile-pic border" : "profile-pic"}src={picture} onClick={() => handleImage(picture)} /> 
            )) }

            </div>
        
        <p className={flairToLong ? "visible": "invisible"} >*must be 10 charakters</p>
        <input onChange={(e) => handleFlair(e)} value={user.flair} className="input" placeholder="Flair"/>
  
        <button onClick={handleCreate} className="button login-btn">Create User</button>
        </div>
         <NavLink to="/" className="navlink">Go back to login</NavLink>
            </>
      ) 
        :(
            <div className="login-box"> 
                <h3>Thank you for creating an account!</h3>
                <button className="new-login-btn" onClick={handleLogin}>Continue to chatrooms</button>
            </div>
        ) } 
            
        </main>
        </>
    )
}


export default NewUser