import axios from "axios";
import { Input } from "../components/input/input";
import { useFormik } from "formik";
import { z } from "zod";
import { useNavigate } from "react-router";

const RegisterSchema = z.object({
    email: z.string().email("Email is invalid").nonempty("Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
    confirmPassword: z.string().nonempty("Confirm Password is required"),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits").nonempty("Phone number is required"),
    name: z.string().min(2, "Name must be at least 2 characters long").nonempty("Name is required"),
}).superRefine((val, ctx) => {
    if (val.password && val.password.toLowerCase().includes("password")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password cannot contain the word 'password'",
            path: ["password"],
        });
    }
    if (val.password !== val.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ["confirmPassword"],
        });
    }
});

export function ErrorMessage({ message }) {
    return (
        <>
            <div className="text-red-500 text-sm">
                {message}
            </div>
        </>
    )
}
export function Register() {
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            name: "",
        },

        onSubmit(values) {
            console.log(values);
            axios.post("https://airbnbnew.cybersoft.edu.vn/api/auth/signup", {
                name: values.name,
                email: values.email,
                password: values.password,
                phone: values.phone,
                birthday: "2000-01-01",
                avatar: null,
                gender: true,
                role: "USER",
            }, {
                headers: {
                    tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
                }
            }).then((response) => {
                console.log("registration successfull", response.data);
                navigate("/login");
            }).catch((error) => {
                console.log("There was an  error registratering ", error.response?.data || error.message);
            })
        },
        validate(values) {
            try {
                RegisterSchema.parse(values);
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
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-blue-100 p-6">
                <form onSubmit={formik.handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm shadow-2xl rounded-xl max-w-4xl w-full border border-gray-200">
                    <h1 className="col-span-full text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 drop-shadow-md">
                        Đăng Ký Tài Khoản
                    </h1>
                    <div className="space-y-6 col-span-full md:col-span-1">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <Input
                                {...formik.getFieldProps("email")}
                                name="email"
                                placeholder="Nhập email của bạn"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <ErrorMessage message={formik.errors.email} />
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Mật khẩu
                            </label>
                            <Input
                                {...formik.getFieldProps("password")}
                                placeholder="Nhập mật khẩu"
                                type="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <ErrorMessage message={formik.errors.password} />
                            ) : null}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <Input
                                {...formik.getFieldProps("confirmPassword")}
                                placeholder="Xác nhận mật khẩu của bạn"
                                type="password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                <ErrorMessage message={formik.errors.confirmPassword} />
                            ) : null}
                        </div>
                    </div>
                    <div className="space-y-6 col-span-full md:col-span-1">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Họ và tên
                            </label>
                            <Input
                                {...formik.getFieldProps("name")}
                                placeholder="Nhập họ và tên"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            />
                            {formik.errors.name && formik.touched.name ? (
                                <ErrorMessage message={formik.errors.name} />
                            ) : null}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Số điện thoại
                            </label>
                            <Input
                                name="phone"
                                {...formik.getFieldProps("phone")}
                                placeholder="Nhập số điện thoại của bạn"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            />
                            {formik.errors.phone && formik.touched.phone ? (
                                <ErrorMessage message={formik.errors.phone} />
                            ) : null}

                        </div>
                        <button
                            type="submit"
                            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Đăng Ký
                        </button>
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Đã có tài khoản?{' '}
                            <button
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="text-blue-600 hover:underline font-semibold"
                            >
                                Đăng nhập ngay
                            </button>
                        </p>
                    </div>


                </form>
            </div>
        </>
    )
}