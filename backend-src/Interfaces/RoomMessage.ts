import { ObjectId } from "mongodb";

export interface RoomMessage {
    senderId: ObjectId;
    messageTesxt: string;
    RoomId: ObjectId;
    date: Date;
    likes: number;
}