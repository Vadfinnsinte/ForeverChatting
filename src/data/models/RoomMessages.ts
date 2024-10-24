export interface RoomMessage {
    senderName?: string;
    guest: string;
    messageText: string;
    roomName: string;
    date: Date;
    likes?: number;
    _id : string
}