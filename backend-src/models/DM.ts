// import { ObjectId } from "mongodb";

export interface DM {
    messageText: string; 
    reciverName: string;
    senderName: string;
    likes: number;
    date: Date;
}