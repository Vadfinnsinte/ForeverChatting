import { User } from "../data/models/User";

export const createUser = async (user: User) => {

    try {
        console.log("går in i try");
        
        const data = user
        const response = await fetch('/api/users/new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
    
        if(response.status !== 201) {
            console.log("try again 3")
            return response
        }
        
    
    } catch (error) {
    console.log("try again later", error);
    
    }
}