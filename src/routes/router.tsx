import { createHashRouter } from "react-router-dom"
import App from "../App"
import LoginPage from "../components/loginPage.js"
import ChatHomePageLogedIn from "../components/chatHomePageLogedIn.js"

const router = createHashRouter([
    {
        path: "/",
        element: <App/>, 
        children: [
            {
                path: "/protected",
                element: <ChatHomePageLogedIn/>
            },
            {
                path: "login",
                element: "</>",
                // children: [
                //     {
                //         path: "",
                //         element: "</>"
                //     }
                // ] 
            },
            {
                path: "/",
                element: <LoginPage/>
            }
        ]
    }
])
export {router}