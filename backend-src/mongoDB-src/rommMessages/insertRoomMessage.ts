import { InsertOneResult, ObjectId } from "mongodb";
import { ClientType } from "../../models/ClientType.js";
import { RoomMessage } from "../../models/RoomMessage.js";
import { connectToDatabase } from "../connection.js";

type RoomMDocument = RoomMessage & Document; 
let x: ClientType<RoomMDocument>

export async function insertRoomMessage(message: RoomMessage) : Promise<ObjectId | null>{
        
    try {
        x = await connectToDatabase<RoomMDocument>("roomMessages")
    
        const result: InsertOneResult<RoomMessage> = await x.collection.insertOne(message as RoomMDocument)
    
        return result.insertedId

    }catch (error) {
        console.error('Error fetching dm,s', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }
    }
}


