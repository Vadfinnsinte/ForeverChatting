import { TempUser } from "../data/models/User";

export const updateUser = async (object: TempUser, id: string) => {

    try {
        
        const data = object
        const response = await fetch(`/api/users/change-user/${id}`, {
            method: 'PUT',
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