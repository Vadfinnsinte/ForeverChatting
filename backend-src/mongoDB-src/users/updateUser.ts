import { ObjectId, UpdateResult } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { User } from "../../models/User.js";
import { connectToDatabase } from "../connection.js";


type UserDocument = User & Document; 
let x: ClientType<UserDocument> 

export async function updateUser(index: ObjectId, body: object) {
    
    try {
        const filter = {_id: index}
        x = await connectToDatabase<UserDocument>("users")
        const result: UpdateResult<User> = await x.collection.updateOne(filter, {$set: body } )
        
        
        if (!result.acknowledged) {
            console.log("Did not find a matching dokument");
            return
            
        } 
        console.log(`deleted: ${result.upsertedCount}`);
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