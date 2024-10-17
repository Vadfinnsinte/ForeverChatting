import { create } from "zustand";

interface VariableStore {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const variableStore = create<VariableStore>((set) => ({
    isLoggedIn: false,

    setIsLoggedIn: (value:boolean) => set({isLoggedIn: value})


}))


export {variableStore}