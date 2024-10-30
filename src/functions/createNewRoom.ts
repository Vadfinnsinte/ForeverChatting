import { Room } from "../data/models/Room";


export const createNewRoom = async (room: Room) => {

    try {
        
        const data = room
        const response = await fetch('/api/rooms/new-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
            
        })
    
        if(response.status !== 201) {
            return response
        }
        return response
    
    } catch (error) {
    console.log("try again later", error);
    
    }
}