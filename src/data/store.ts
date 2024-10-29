import { create } from "zustand";
import { Room } from "./models/Room.js";
import { DM } from "./models/DM.js";
import { User } from "./models/User.js";

interface VariableStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    allRooms: Room[] | null;
    setAllRooms: (rooms: Room[] | null) => void;
    activeUser: string;
    setActiveUser: (user: string) => void;
    userObject: User | null;
    setUserObject: (user: User) => void;
    dmObjects: DM[];
    setDmObjects: (dms: DM[]) => void
    
}
// setUserThenNavigate: (user, callback) => {
//     // set user
//     callback()
//   }

const useVariableStore = create<VariableStore>((set) => ({
    isLoggedIn: false,

    setIsLoggedIn: (value:boolean) => set({isLoggedIn: value}), 

    allRooms: null, 
    
    setAllRooms: (rooms: Room[] | null) => set ({
        allRooms: rooms
    }),

    activeUser: "",
    setActiveUser: (user: string) => set({activeUser: user}),
    
    dmObjects: [], 

    setDmObjects: (dms: DM[]) => set ( { dmObjects: dms}),

    userObject: null, 

    setUserObject: (user: User) => set({userObject: user}) 



}))



export {useVariableStore}