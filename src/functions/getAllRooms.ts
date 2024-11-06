import { Room } from "../data/models/Room";



export async function getAllRooms(): Promise<Room[] | null> {

    
    try {
        const response = await fetch("/api/rooms", { method: "GET" });
        if (!response.ok) {
            console.error("Failed to fetch rooms, status:", response.status);
            return null;
        }

        const rooms: Room[] = await response.json(); 

      
        return (rooms)

    } catch (error) {
        console.error("Error fetching rooms:", error);
        return null
    }
 
}