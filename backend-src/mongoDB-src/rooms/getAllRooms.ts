import { FindCursor, WithId } from "mongodb";
import { ClientType } from "../../models/ClientType.js";
import { Room } from "../../models/Room.js";
import { connectToDatabase } from "../connection.js";


type RoomDocument = Room & Document; 
let x: ClientType<RoomDocument> 

async function getAllRooms(): Promise<WithId<Room>[]> {
    
    try {
        
        
        x = await connectToDatabase<RoomDocument>("rooms")
        
        const cursor: FindCursor <WithId<Room>> = x.collection.find({})
        const found: WithId<Room>[] = await cursor.toArray()
        
        
        if(found.length < 1) {
            console.log( "No Rooms awailable today :/");
            
        }
        
        return found
        
    }catch (error) {
        console.error('Error fetching Rooms', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }

    }
}




export {getAllRooms}