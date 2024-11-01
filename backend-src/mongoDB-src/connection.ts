import { Collection, Db, MongoClient } from "mongodb";

const con: string | undefined = process.env.CONNECTION_STRING

interface ClientType<T extends Document> {
    client: MongoClient;
    collection: Collection<T>;
}


export async function connectToDatabase<T extends Document>(dataPointer : string): Promise<ClientType<T>>{
    
    if(!con){
        console.log("Error: connection string not found");
        throw new Error("No connection!")
    }
    const client: MongoClient = new MongoClient(con)
    await client.connect()
    try {
    
        
        const db : Db = await client.db("foreverChatting")
        const collection: Collection <T> = db.collection<T>(dataPointer)
        
        
        return {client, collection}

    }catch (error) {
        console.error("Failed to connect to the database or retrieve collection", error);
        throw new Error("Database connection or query failed");

    } 
   

}