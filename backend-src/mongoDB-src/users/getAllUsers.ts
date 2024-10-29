import { FindCursor, WithId } from "mongodb";
import { User } from "../../models/User.js";
import { ClientType } from "../../models/ClientType.js";
import { connectToDatabase } from "../connection.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument> 

async function getAllUsers(): Promise<WithId<User>[]> {
    
    try {
        
        
        x = await connectToDatabase<UserDocument>("users")
        
        const cursor: FindCursor <WithId<User>> = x.collection.find({})
        const found: WithId<User>[] = await cursor.toArray()
        
        
        if(found.length < 1) {
            console.log( "No users awailable today :/");
            
        }
        
        return found
        
    }catch (error) {
        console.error('Error fetching users', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }

    }
}


export {getAllUsers}