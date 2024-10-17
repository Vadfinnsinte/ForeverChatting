import { createHashRouter } from "react-router-dom"
import App from "../App"

const router = createHashRouter([
    {
        path: "/",
        element: <App/>, 
        children: [
            {
                path: "/rooms",
                element: "</>"
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
                element: "</>"
            }
        ]
    }
])
export {router}