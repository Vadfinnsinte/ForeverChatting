import { User } from "../data/models/User";

export const createUser = async (user: User) => {

    try {
        
        const data = user
        const response = await fetch('/api/users/new-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
    
        if(response.status !== 201) {
            return response
        }
        
    
    } catch (error) {
    console.log("try again later", error);
    
    }
}