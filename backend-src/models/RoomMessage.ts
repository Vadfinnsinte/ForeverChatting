import { ObjectId } from "mongodb";

export interface RoomMessage {
    senderId?: ObjectId;
    messageText: string;
    RoomId: ObjectId;
    date: Date;
    likes: number;
}