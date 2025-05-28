import { Input } from "../components/input/input";
import {useFormik} from "formik";
import axios from "axios";
import { managerStorage } from "../common/utils/localstorage";
import { KEY_ACCESS_TOKEN } from "../common/constants";
import {z} from "zod"
import { useNavigate } from "react-router";
import { axiosWithAuthen } from "../services/config";
import {ErrorMessage} from "./register";
import {setUser} from "../store/user.slice";
import { useDispatch } from "react-redux"

export function Login(){
    const LoginSchema = z.object({
        email: z.string().email("Email is invalid").nonempty("Email is required"),
        password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
        
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({

         
            initialValues:{
                email: "",
                password: "",
                
            },
            onSubmit(values){
                console.log(values);
                axios.post("https://airbnbnew.cybersoft.edu.vn/api/auth/signin",{
                    email : values.email,
                    password:values.password,
                },{
                headers: {
                    tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
                }
            }).then((response)=>{
                    console.log("registration successfull",response.data);
                    navigate("/")
                    managerStorage.set(KEY_ACCESS_TOKEN,response.data.content.token);
                    managerStorage.set("user", response.data.content.user);
                    dispatch(setUser(response.data.content.user))
                    // lưu vào redux
                    //  axiosWithAuthen.get("https://airbnbnew.cybersoft.edu.vn/api/auth/signin")
                }).catch((error)=>{
                    console.log("There was an  error registratering ",error)
                })
            },
           validate(values) {
            try {
                LoginSchema.parse(values);
            } catch (error) {
                console.log(error)
                const errors = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});

                return errors;
            }

            return {}
        }

    })

    return (

        <>
        <div  className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-6">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-sm bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-2xl space-y-6 border border-gray-200">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mb-6 drop-shadow-md">
                Đăng Nhập
            </h1>

                <Input
                {...formik.getFieldProps("email")}
                type="text"
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ease-in-out duration-150"
                />
                 {formik.errors.email && formik.touched.email ? (
                    <ErrorMessage message={formik.errors.email} />
                ) : null}
                <Input
                        {...formik.getFieldProps("password")}
                        type="password"
                        placeholder="Nhập mật khẩu của bạn"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ease-in-out duration-150"

                    />
                     {formik.errors.password && formik.touched.password ? (
                        <ErrorMessage message={formik.errors.password} />
                    ) : null}

                    <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Đăng Nhập
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">
                Chưa có tài khoản?{' '}
                <button
                    onClick={()=>{
                        navigate("/register");
                    }}
                className="text-green-600 hover:underline font-semibold">
                Đăng ký ngay
                </button>
            </p>
            </form>
        </div>

        </>
    )
}