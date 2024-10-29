export interface RoomMessage {
    senderName: string;
    messageText: string;
    roomName: string;
    date: Date;
    likes?: number;
    _id : string
}