import { ObjectId } from "mongodb";

export interface RoomMessage {
    senderName?: string;
    guest: string;
    messageText: string;
    roomName: ObjectId;
    date: Date;
    likes?: number;
}