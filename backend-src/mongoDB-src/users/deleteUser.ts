import { DeleteResult, ObjectId } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { User } from "../../models/User.js";
import { connectToDatabase } from "../connection.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 

export async function deleteUser(id: ObjectId) {
    try {

        x = await connectToDatabase<UserDocument>("users")
        const filter = {_id: id}
        const result: DeleteResult = await x.collection.deleteOne(filter)
        if (!result.acknowledged) {
            return
        } 

        return result
        
    }catch (error) {
        console.error('Error fetching Users', error);
        throw error;
    }finally {
        if(x) {
            await x.client.close()

        }
    }
    

} 