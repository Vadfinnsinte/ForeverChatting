import { ObjectId } from "mongodb";

export interface RoomMessage {
    senderName?: string;
    guest: string;
    messageText: string;
    roomName: string;
    date: Date;
    likes?: number;
}