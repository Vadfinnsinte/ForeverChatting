import { RoomMessage } from "../data/models/RoomMessages";


export async function getAllRoomMessages(): Promise<RoomMessage[] | null> {

    
    try {
        const response = await fetch("/api/room-messages", { method: "GET" });
        if (!response.ok) {
            console.error("Failed to fetch rooms, status:", response.status);
            return null;
        }

        const roomsMessages: RoomMessage[] = await response.json(); 

        return (roomsMessages)

    } catch (error) {
        console.error("Error fetching rooms:", error);
        return null
    }
 
}