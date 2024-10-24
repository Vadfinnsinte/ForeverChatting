import { Room } from "../data/models/Room";
// import { variableStore } from "../data/store";

const LS_KEY = 'JWT-DEMO--TOKEN'
export async function getAllRooms(): Promise<Room[] | null> {

    
    try {
        const response = await fetch("/api/rooms", { method: "GET" });
        if (!response.ok) {
            console.error("Failed to fetch rooms, status:", response.status);
            return null;
        }

        const rooms: Room[] = await response.json(); 

        // setAllRooms(rooms);  
        return (rooms)

    } catch (error) {
        console.error("Error fetching rooms:", error);
        return null
    }
 
}
export const getActiveUser = async () => {
    try {
    console.log("entered getactiveUser");
      const token = localStorage.getItem(LS_KEY);
    
      if(!token) {
          return 
      }
      
      const response = await fetch('/api/users/activeuser', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': token ? token : ''
          },
      })
  
      if (!response.ok) {
          console.error("Failed to fetch users, status:", response.status);
         
      }
      const username = await response.text()
      console.log("from getactiveUser.TSX: ", username);
      
      if(username !== null) {

        return username
        
      }
  
     
  
  } catch (error) {
      console.error("Error fetching rooms:", error);
  
  }

  }