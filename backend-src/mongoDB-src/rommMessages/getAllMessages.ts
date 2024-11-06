import { FindCursor, WithId } from "mongodb";
import { ClientType } from "../../models/ClientType.js";
import { connectToDatabase } from "../connection.js";
import { RoomMessage } from "../../models/RoomMessage.js";


type RoomDocument = RoomMessage & Document; 
let x: ClientType<RoomDocument> 

async function getAllMessages(): Promise<WithId<RoomMessage>[]> {
    
    try {  
        
        x = await connectToDatabase<RoomDocument>("roomMessages")
        
        const cursor: FindCursor <WithId<RoomMessage>> = x.collection.find({})
        const found: WithId<RoomMessage>[] = await cursor.toArray()
        
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

export {getAllMessages}