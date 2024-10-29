import { DM } from "../data/models/DM.js";

const LS_KEY = 'JWT-DEMO--TOKEN'


export async function getDmMathingUser(): Promise<DM[] | undefined > {

    
    try {
        const token = localStorage.getItem(LS_KEY);
        if(!token) {
            return 
        }
        
        const response = await fetch('/api/dm/matching', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? token : ''
            },
        })

        if (!response.ok) {
            console.error("Failed to fetch users, status:", response.status);
           
        }

        const mathingDms: DM[] = await response.json(); 

        return (mathingDms)

    } catch (error) {
        console.error("Error fetching rooms:", error);
    
    }
 
}
