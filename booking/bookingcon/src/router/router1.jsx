import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { BaseTemplates } from "../templates/base/component/baseTemplates";
import{ Component , lazy} from "react";
const Login = lazy(()=> import('../pages/login'));
const Register = lazy(()=>import ('../pages/register'));
const PhongTheoViTri = lazy(()=> import ("../pages/PhongTheoViTri/phongtheovitri"));
const ChiTietPhong = lazy(()=> import ("../pages/ChiTietPhong/chitietphong"));
const  HoSoKhachHang =lazy(()=> import ("../templates/base/component/hosocanhan"));

const  Admin = lazy(()=>import ("../pages/ADMIN/admin"));
const QuanLiDatPhong = lazy(()=>import ("../pages/ADMIN/quanlidatphong"));
const QuanLiNguoiDung = lazy(()=>import ("../pages/ADMIN/quanlinguoidung"));
const QuanLiThongTinViTri = lazy(()=>import ("../pages/ADMIN/quanlithongtinvitri"));
const QuanLiThongTinPhong = lazy(()=>import ("../pages/ADMIN/quanlithongtinphong"));
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
        ,{

            path:"/admin",
            element:<Admin/>
        },{

            path:"/admin/QuanLyDatPhong",
            element:<QuanLiDatPhong/>
        },{
            path:"/admin/QuanLyNguoiDung",
            element:<QuanLiNguoiDung/>
        },{
            path:"/admin/QuanLyThongTinViTri",
            element:<QuanLiThongTinViTri/>
        },{
            path:"/admin/QuanLyThongTinPhong",
            element:<QuanLiThongTinPhong/>
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