import { Link } from "react-router";

export default function Admin() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">Admin Page</h1>
                <p className="mb-8 text-center text-gray-600">Welcome to the admin dashboard.</p>
                <div className="flex flex-col gap-4">
                    <Link
                        to="/admin/QuanLyNguoiDung"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center transition"
                    >
                        Quản Lý Người Dùng
                    </Link>
                    <Link
                        to="/admin/QuanLyThongTinViTri"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center transition"
                    >
                        Quản Lý Thông Tin Vị Trí
                    </Link>
                    <Link
                        to="/admin/QuanLyThongTinPhong"
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 text-center transition"
                    >
                        Quản Lý Thông Tin Phòng
                    </Link>
                    <Link
                        to="/admin/QuanLyDatPhong"
                        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 text-center transition"
                    >
                        Quản Lý Đặt Phòng
                    </Link>
                </div>
            </div>
        </div>
    );
}