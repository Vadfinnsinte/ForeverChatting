import { ObjectId } from "mongodb";


export interface DM {
    messageText: string; 
    reciverName: string;
    senderName: string;
    deletedID?: ObjectId
    likes: number;
    date: Date;
}