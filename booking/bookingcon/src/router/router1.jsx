import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { BaseTemplates } from "../templates/base/component/baseTemplates";
import{ Component , lazy} from "react";
const Login = lazy(()=> import('../pages/login'));
const Register = lazy(()=>import ('../pages/register'));
const PhongTheoViTri = lazy(()=> import ("../pages/PhongTheoViTri/phongtheovitri"));
const ChiTietPhong = lazy(()=> import ("../pages/ChiTietPhong/chitietphong"));
const  HoSoKhachHang =lazy(()=> import ("../templates/base/component/hosocanhan"));
export const router1 = createBrowserRouter([
    {

        element: <BaseTemplates />,
        children: [
     {
            path: "/",
            Component:Home

        },
        {

            
            path:"vitri/:maViTri",
            element:<PhongTheoViTri/>
        },

        {
            path:"chi-tiet-phong/:id",
            element:<ChiTietPhong/>

        }
        ,{
            path:"profile/:id",
            element:<HoSoKhachHang/>
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