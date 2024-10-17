import { Collection, MongoClient } from "mongodb";

export interface ClientType<T extends Document> {
    client: MongoClient;
    collection: Collection<T>;
}