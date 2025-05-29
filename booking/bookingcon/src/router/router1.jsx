import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home"


import { BaseTemplates } from "../templates/base/component/baseTemplates";

import{ Component , lazy} from "react";
const Login = lazy(()=> import('../pages/login'));
const Register = lazy(()=>import ('../pages/register'));
const PhongTheoViTri = lazy(()=> import ("../pages/ChitietPhong/phongtheovitri"));
export const router1 = createBrowserRouter([



    {

        element: <BaseTemplates />,
        children: [
     {
            path: "/",
            Component:Home

        },
        {

            
            path:"vitri/:tenViTri",
            element:<PhongTheoViTri/>
        }

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