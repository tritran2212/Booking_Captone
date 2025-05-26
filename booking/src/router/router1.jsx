import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home"
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { BaseTemplates } from "../templates/base/component/baseTemplates";
export const router1 = createBrowserRouter([



    {

        element: <BaseTemplates />,
        children: [{
            path: "/",
            element: <Home />

        },

        ]
    },

    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <Register />
    }
])