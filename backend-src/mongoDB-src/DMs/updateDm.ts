import { ObjectId, UpdateResult } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { DM } from "../../models/DM.js";
import { connectToDatabase } from "../connection.js";


type DMDocument = DM & Document; 
let x: ClientType<DMDocument>

export async function updateDM( username :string,  id: ObjectId) {
    
    try {
   
        x = await connectToDatabase<DMDocument>("dms")
        const resultSender: UpdateResult<DMDocument> = await x.collection.updateMany(
            { senderName: username },
            { $set: { senderName: "deleted", deletedID: id } }
        );
        
        // Update `reciverName` if it matches `username`
        const resultReceiver: UpdateResult<DMDocument> = await x.collection.updateMany(
            { reciverName: username },
            { $set: { reciverName: "deleted", deletedID: id } }
        );
        if (!resultSender.acknowledged && !resultReceiver.acknowledged) {
            console.log("No matching documents were found.");
            return;
        }
        
        return { resultSender, resultReceiver }
    }catch (error) {
        console.error('Error updating flowers', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()
            
        }
        
    }
}