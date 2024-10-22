import { FindCursor, WithId } from "mongodb";
import { ClientType } from "../../models/ClientType.js";
// import { User } from "../../models/User.js";
import { connectToDatabase } from "../connection.js";
import { DM } from "../../models/DM.js";

type DMDocument = DM & Document; 
let x: ClientType<DMDocument> 

async function getMatchingDmNames(userName: string): Promise<WithId<DM>[]> {
    
    try {

        
        
        x = await connectToDatabase<DMDocument>("dms")
        
        const cursor: FindCursor <WithId<DM>> = x.collection.find({ reciverName: userName})

        const found: WithId<DM>[] = await cursor.toArray()
        
        
        if(found.length < 1) {
            console.log( "No dms awailable today :/");
            
        }
        
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






export {getMatchingDmNames}