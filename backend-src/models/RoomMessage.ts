
export interface RoomMessage {
    senderName?: string;
    guest: string;
    messageText: string;
    roomName: string;
    date: Date;
    likes?: number;
}

// gör sendername sparar som guest när man inte är inloggad.