import { InsertOneResult, ObjectId } from "mongodb";
import { ClientType } from "../../models/ClientType";
import { User } from "../../models/User.js";
import { connectToDatabase } from "../connection.js";

type UserDocument = User & Document; 
let x: ClientType<UserDocument>

export async function insertUser(user: User) : Promise<ObjectId | null>{
    
    console.log("inne i insert User");
    
    try {
        x = await connectToDatabase<UserDocument>("users")
    
        const result: InsertOneResult<User> = await x.collection.insertOne( user as UserDocument)
    
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
