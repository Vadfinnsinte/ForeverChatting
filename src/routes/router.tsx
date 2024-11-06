import { createHashRouter } from "react-router-dom"
import App from "../App"
import LoginPage from "../components/loginPage.js"
import ChatHomePageLogedIn from "../components/ChatHomePageLogedIn.js"
import RenderPrivateDM from "../components/RenderPrivateDM.js"
import ChatroomsGuest from "../components/ChatroomsGuest.js"
import ChatRoom from "../components/ChatRoom.js"
import NewUser from "../components/NewUser.js"
import Settings from "../components/Settings.js"


const router = createHashRouter([
    {
        path: "/",
        element: <App/>, 
        children: [
            {
                path: "/chatrooms",
                element: <ChatHomePageLogedIn/>
            },
            {
                path: "/chatrooms-guest",
                element: <ChatroomsGuest/>
            },
            {
                path: "private-dm/:name/:id",
                element: <RenderPrivateDM />,

            },
            {
                path: "/chat-room/:room",
                element: <ChatRoom />,

            },
            {
                path: "/settings",
                element: <Settings />,

            },
            {
                path: "/new-user",
                element: <NewUser />,

            },
            {
                path: "/",
                element: <LoginPage/>
            }
        ]
    }
])
export {router}