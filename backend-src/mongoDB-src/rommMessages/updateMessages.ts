import { UpdateResult } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { RoomMessage } from "../../models/RoomMessage.js";
import { connectToDatabase } from "../connection.js";

type RoomMDocument = RoomMessage & Document; 
let x: ClientType<RoomMDocument>

export async function updateMessage(username: string) {
    
    try {
   
        const filter = {senderName: username}
        const body = {senderName: "deleted"}
        x = await connectToDatabase<RoomMDocument>("roomMessages")
        
        const result: UpdateResult<RoomMessage> = await x.collection.updateOne(filter, {$set: body} )
        
        
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`update: ${result.upsertedCount}`);
        return result
        
    }catch (error) {
        console.error('Error updating flowers', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()
            
        }
        
    }
}