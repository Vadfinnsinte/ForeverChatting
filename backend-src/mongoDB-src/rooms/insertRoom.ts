import { InsertOneResult, ObjectId } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { Room } from "../../models/Room.js";
import { connectToDatabase } from "../connection.js";



type RoomDocument = Room & Document; 
let x: ClientType<RoomDocument>

export async function insertRoom(room: Room) : Promise<ObjectId | null>{
    
    
    try {
        x = await connectToDatabase<RoomDocument>("rooms")
    
        const result: InsertOneResult<Room> = await x.collection.insertOne( room as RoomDocument)
    
        return result.insertedId

    }catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }
    }
}
