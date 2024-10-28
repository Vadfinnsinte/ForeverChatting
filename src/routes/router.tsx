import { createHashRouter } from "react-router-dom"
import App from "../App"
import LoginPage from "../components/loginPage.js"
import ChatHomePageLogedIn from "../components/ChatHomePageLogedIn.js"
import RenderPrivateDM from "../components/RenderPrivateDM.js"
import ChatroomsGuest from "../components/ChatroomsGuest.js"
import ChatRoom from "../components/ChatRoom.js"
import NewUser from "../components/NewUser.js"


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
                path: "private-dm/:name",
                element: <RenderPrivateDM />,

            },
            {
                path: "/chat-room/:room",
                element: <ChatRoom />,

            },
            {
                path: "/new-user",
                element: <NewUser />,

            },
            {
                path: "/",
                element: <LoginPage/>
                // element: <ChatHomePageLogedIn/>
            }
        ]
    }
])
export {router}