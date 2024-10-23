import { create } from "zustand";
import { Room } from "./models/Room.js";

interface VariableStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    allRooms: Room[] | null;
    setAllRooms: (rooms: Room[] | null) => void;
    
}

const useVariableStore = create<VariableStore>((set) => ({
    isLoggedIn: false,

    setIsLoggedIn: (value:boolean) => set({isLoggedIn: value}), 

    allRooms: null, 
    
    setAllRooms: (rooms: Room[] | null) => set ({
        allRooms: rooms
    }),
    


}))



export {useVariableStore}