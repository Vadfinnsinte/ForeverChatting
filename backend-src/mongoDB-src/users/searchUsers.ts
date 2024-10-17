import { WithId } from "mongodb";
import { ClientType } from "../../interfaces/ClientType.js";
import { User } from "../../interfaces/User.js";
import { connectToDatabase } from "../connection.js";


type UserDocument = User & Document; 
let x: ClientType<UserDocument> 


export async function searchUser(searchString: string): Promise<WithId<User>[] > {
    try {
       
        x = await connectToDatabase<UserDocument>("users")
        
        const searchterm = searchString.split(" ").map(term => term.trim()).filter(term => term.length > 0)
        const userQueries = searchterm.map(term => ({
            username: {$regex: new RegExp(term, "i")}
        }))
        
        const users = await x.collection
        .find({ $or: userQueries}).toArray()
        
        return users;
        
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    } finally {
        if(x) {
            await x.client.close()

        }
    }
   
}