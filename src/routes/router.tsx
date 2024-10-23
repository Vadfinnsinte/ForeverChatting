import { createHashRouter } from "react-router-dom"
import App from "../App"
import LoginPage from "../components/loginPage.js"
import ChatHomePageLogedIn from "../components/ChatHomePageLogedIn.js"
import RenderPrivateDM from "../components/RenderPrivateDM.js"


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
                path: "private-dm/:name",
                element: <RenderPrivateDM />,
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
                // element: <ChatHomePageLogedIn/>
            }
        ]
    }
])
export {router}