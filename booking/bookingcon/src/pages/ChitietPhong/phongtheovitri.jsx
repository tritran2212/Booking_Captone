import { useEffect, useState } from "react";
import { useParams } from "react-router"; // Import để lấy tham số từ URL
import { getLayPhongTheoViTriAPI } from "../../services/vitri.service";

export default function PhongTheoViTri() {
    const { maViTri } = useParams(); // Lấy mã vị trí từ URL
    const [phongList, setPhongList] = useState([]);
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        if (!maViTri) {
            setError("Mã vị trí không hợp lệ.");
            setLoading(false);
            return;
        }

        // Gọi API và cập nhật state
        getLayPhongTheoViTriAPI(maViTri)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setPhongList(response.data); // Cập nhật danh sách phòng
                } else {
                    setError("Dữ liệu trả về không hợp lệ.");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
            })
            .finally(() => {
                setLoading(false); // Kết thúc trạng thái loading
            });
    }, [maViTri]);

    if (loading) {
        return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    if (phongList.length === 0) {
        return <div className="p-6 text-center">Không có phòng nào phù hợp.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Phòng theo vị trí</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {phongList.map((phong) => (
                    <div
                        key={phong.id} // Sử dụng `id` làm key
                        className="border rounded-lg shadow-md overflow-hidden bg-white"
                    >
                        <img
                            src={phong.hinhAnh} // Hiển thị hình ảnh từ API
                            alt={phong.tenPhong} // Hiển thị tên phòng
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{phong.tenPhong}</h3> {/* Hiển thị tên phòng */}
                            <p className="text-gray-600 text-sm mb-4">{phong.moTa}</p> {/* Hiển thị mô tả */}
                            <p className="text-lg font-bold text-blue-600">${phong.giaTien}/tháng</p> {/* Hiển thị giá tiền */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}