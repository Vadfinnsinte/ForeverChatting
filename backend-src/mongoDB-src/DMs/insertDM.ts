import { InsertOneResult, ObjectId } from "mongodb";
import { ClientType } from "../../interfaces/ClientType";
import { connectToDatabase } from "../connection.js";
import { DM } from "../../interfaces/DM.js";

type DMDocument = DM & Document; 
let x: ClientType<DMDocument>

export async function insertDM(DM: DM) : Promise<ObjectId | null>{
    
    
    try {
        x = await connectToDatabase<DMDocument>("dms")
    
        const result: InsertOneResult<DM> = await x.collection.insertOne(DM as DMDocument)
    
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
