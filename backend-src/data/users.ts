import { User } from "../interfaces/User"

const users: User[] = [

    {
        username: "john_doe",
        password: "password123",
        image: "https://example.com/johndoe.jpg",
        flair: "JavaScript Enthusiast",
        dateOfCreation: new Date("2023-01-15")
    },
    
    {
        username: "jane_smith",
        password: "securePass789",
        dateOfCreation: new Date("2024-05-22")
    },
    
    {
        username: "mike_w",
        password: "mike12345",
        image: "https://example.com/mikew.jpg",
        flair: "Fullstack Developer",
        dateOfCreation: new Date("2022-11-30")
    },
    
     {
        username: "lisa_m",
        password: "lisaSecure321",
        flair: "UI/UX Designer",
        dateOfCreation: new Date("2021-09-10")
    },
    
     {
        username: "chris_p",
        password: "chris987",
        image: "https://example.com/chrisp.jpg",
        dateOfCreation: new Date("2020-02-18")
    },

]
