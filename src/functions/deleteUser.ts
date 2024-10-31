



export const updeteMesageName =  async ( username: string) => {

    try {
        
        const data = {username}
        const changeResponse = await fetch(`/api/room-messages/delete-username`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
    
        if(changeResponse.status !== 204) {
            return changeResponse
        }
        
    
    } catch (error) {
    console.log("try again later", error);
    
    }


}
export const updeteDM =  async ( username: string, id: string) => {

    try {
        
        const data = {username}
        const changeResponse = await fetch(`/api/dm/change-senders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
    
        if(changeResponse.status !== 204) {
            return changeResponse
        }
        
    
    } catch (error) {
    console.log("try again later", error);
    
    }


}
export const deleteUser =  async (id: string) => {

    try {
        
        const response = await fetch(`/api/users/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if(response.status !== 201) {
            return response
        }        
    } catch (error) {
    console.log("try again later", error);
    
    }


}
// skapa en ändra roomMessage och DM i MongoDB och Express. 
// kolla varflr jag får 404 när det fungerar