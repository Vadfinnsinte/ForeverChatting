
export interface User {
    username: string; 
    password: string;
    image?: string;
    flair?: string;
    dateOfCreation: Date;
    _id?: string;
}

export interface TempUser {
    image?: string;
    flair?: string;
}