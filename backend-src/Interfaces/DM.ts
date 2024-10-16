import { ObjectId } from "mongodb";

export interface DM {
    messageText: string; 
    reciverId: ObjectId;
    senderId: ObjectId;
    likes: number;
}