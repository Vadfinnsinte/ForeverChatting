import { User } from "../data/models/User";

interface ErrorMessage {
    message: string
}

async function searchUsers(query: string): Promise<User[] | undefined> {

    try {
    const response = await fetch(`/api/users/search?q=${query}`, {
        method: "GET",
      });

      if (!response.ok) {
        console.log("Found no user!");
        
    }
    const users: User[] | ErrorMessage = await response.json();

    if("message" in users) {
        console.log("Error: ", users.message)
        return undefined
    }
    
    return users

    } catch (error) {
      console.error("Nätverksfel: ", error);
      
    }
  }
  
export {searchUsers}