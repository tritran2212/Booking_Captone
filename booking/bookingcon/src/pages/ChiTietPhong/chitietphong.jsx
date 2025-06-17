import { getChiTietPhongAPI, postDatPhongAPI, getBinhLuanAPI } from "../../services/vitri.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tv, Snowflake, BrickWallFire, CircleParking, Refrigerator } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// Hàm tính số ngày ở
function tinhSoNgay(ngayDen, ngayDi) {
    return Math.ceil((ngayDi - ngayDen) / (1000 * 60 * 60 * 24));
}

// Hàm tạo dữ liệu đặt phòng
function taoDataDatPhong({ id, phong, checkInDate, checkOutDate, soLuongKhach, maNguoiDung }) {
    return {
        id,
        maPhong: phong.id,
        ngayDen: new Date(checkInDate).toISOString(),
        ngayDi: new Date(checkOutDate).toISOString(),
        soLuongKhach,
        maNguoiDung,
    };
}

export default function ChiTietPhong() {
    const { id } = useParams();
    const [phong, setPhong] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [soLuongKhach, setSoLuongKhach] = useState(1);
    const [tongTien, setTongTien] = useState(0);
    const [binhLuan, setBinhLuan] = useState([]);

    useEffect(() => {
        getChiTietPhongAPI(id)
            .then((response) => {
                if (response.data?.content) {
                    setPhong(response.data.content);
                } else {
                    setError("Không tìm thấy thông tin phòng.");
                }
            })
            .catch((error) => {
                setError(
                    error.response?.data?.message || "Không thể kết nối tới server. Vui lòng thử lại sau."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (phong && checkInDate && checkOutDate) {
            const ngayDen = new Date(checkInDate);
            const ngayDi = new Date(checkOutDate);
            const soNgay = tinhSoNgay(ngayDen, ngayDi);
            if (soNgay > 0) {
                const phiDichVu = 5;
                setTongTien(soNgay * phong.giaTien + soNgay * phiDichVu);
            } else {
                setTongTien(0);
            }
        } else {
            setTongTien(0);
        }
    }, [phong, checkInDate, checkOutDate]);


    useEffect(() => {
        getBinhLuanAPI(id)
            .then((response) => {
                if (response.data?.content) {
                    console.log("Bình luận:", response.data.content);
                    setBinhLuan(response.data.content); 
                } else {
                    console.error("Không tìm thấy bình luận.");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy bình luận:", error);
            });
    }, [id]);

    const handleDatPhong = () => {
    if (!checkInDate || !checkOutDate) {
        alert("Vui lòng chọn ngày nhận và trả phòng.");
        return;
    }

    const ngayDen = new Date(checkInDate);
    const ngayDi = new Date(checkOutDate);
    const soNgay = tinhSoNgay(ngayDen, ngayDi);

    if (soNgay <= 0) {
        alert("Ngày trả phòng phải sau ngày nhận phòng!");
        return;
    }

    // Lấy thông tin người dùng từ localStorage hoặc sessionStorage
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (!user || !user.id) {
        alert("Vui lòng đăng nhập để đặt phòng.");
        return;
    }

    const maNguoiDung = user.id; // Lấy id của người dùng đã đăng nhập

    const dataDatPhong = taoDataDatPhong({
        id,
        phong,
        checkInDate,
        checkOutDate,
        soLuongKhach,
        maNguoiDung, // Sử dụng id của người dùng đã đăng nhập
    });

    postDatPhongAPI(dataDatPhong)
        .then(() => alert("Đặt phòng thành công!"))
        .catch(() => alert("Đặt phòng thất bại. Vui lòng thử lại."));
};

    if (loading) {
        return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    if (!phong) {
        return <div className="p-6 text-center">Không có thông tin phòng.</div>;
    }

    let phiDichVu = 0;
    let soNgay = 0;
    if (checkInDate && checkOutDate) {
        const ngayDen = new Date(checkInDate);
        const ngayDi = new Date(checkOutDate);
        soNgay = tinhSoNgay(ngayDen, ngayDi);
        phiDichVu = soNgay > 0 ? soNgay * 5 : 0;
    }

    return (
        <div className="mb-6">
            {/* Large main image */}
            <div className="mb-6">
                {phong.hinhAnh ? (
                    <img
                        src={phong.hinhAnh}
                        alt="Hình ảnh lớn của phòng"
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                ) : (
                    <p className="text-gray-700">Không có hình ảnh nào.</p>
                )}
            </div>

            {/* Room details */}
            <div className="flex">
                <div className="mt-8 p-6 border rounded-lg shadow-md ">
                    <h3 className="text-xl font-semibold mb-4">{phong.tenPhong || "Toàn bộ căn hộ"}</h3>
                    <p className="text-gray-700 mb-4">
                        {phong.khach} khách · {phong.phongNgu} phòng ngủ · {phong.giuong} giường · {phong.phongTam} phòng tắm
                    </p>
                    <ul className="space-y-2">
                        <li>
                            <strong>Toàn bộ nhà:</strong> <br />
                            {phong.moTa || "Bạn sẽ có chung cư cao cấp cho riêng mình."}
                        </li>
                        <li>
                            <strong>Vệ sinh tăng cường:</strong> <br />
                            Chủ nhà đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước.
                        </li>
                        <li>
                            <strong>Chủ nhà siêu cấp:</strong> <br />
                            {phong.banLa
                                ? "Chủ nhà có kinh nghiệm, được đánh giá cao và mang lại trải nghiệm tuyệt vời."
                                : "Chủ nhà chưa được đánh giá là siêu cấp."}
                        </li>
                        <li>
                            <strong>Miễn phí hủy trong 48 giờ:</strong> <br />
                            Linh hoạt cho kế hoạch của bạn.
                        </li>
                    </ul>
                    {/* Translate button */}
                    <div className="mt-4">
                        <label htmlFor="language-select" className="block text-gray-700 mb-2">Chọn ngôn ngữ:</label>
                        <select
                            id="language-select"
                            className="px-4 py-2 border rounded-lg shadow-md"
                            onChange={(e) => alert(`Bạn đã chọn: ${e.target.value}`)}
                        >
                            <option value="vi">Tiếng Việt</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>

                <div className="p-6 border rounded-lg shadow-md max-w-sm mx-auto">
                    {/* Giá phòng */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">{phong.giaTien}$ / đêm</span>
                        <span className="text-sm text-gray-500">
                            <span className="text-red-500">★</span> 4.83 (18 đánh giá)
                        </span>
                    </div>

                    {/* Ngày nhận và trả phòng */}
                    <div className="border rounded-lg p-4 mb-4">
                        <div className="flex justify-between mb-2">
                            <div>
                                <label className="block text-sm text-gray-500">Nhận phòng</label>
                                <DatePicker
                                    selected={checkInDate}
                                    onChange={(date) => setCheckInDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày nhận phòng"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500">Trả phòng</label>
                                <DatePicker
                                    selected={checkOutDate}
                                    onChange={(date) => setCheckOutDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Chọn ngày trả phòng"
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500">Khách</label>
                            <select
                                className="w-full border rounded-lg px-3 py-2"
                                value={soLuongKhach}
                                onChange={(e) => setSoLuongKhach(Number(e.target.value))}
                            >
                                <option value="1">1 khách</option>
                                <option value="2">2 khách</option>
                                <option value="3">3 khách</option>
                            </select>
                        </div>
                    </div>

                    {/* Nút đặt phòng */}
                    <button
                        onClick={handleDatPhong}
                        className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
                    >
                        Đặt phòng
                    </button>

                    {/* Chi tiết giá */}
                    <div className="mt-4 text-sm">
                        <div className="flex justify-between mb-2">
                            <span>Phí dịch vụ</span>
                            <span>{phiDichVu ? `$${phiDichVu}` : "$0"}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Tổng</span>
                            <span>{tongTien ? `$${tongTien}` : "$0"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Amenities */}
            <div className="mt-8 p-6 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Tiện nghi</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <Tv className="mr-2" />
                        <span>Tivi</span>
                    </div>
                    <div className="flex items-center">
                        <Snowflake className="mr-2" />
                        <span>Điều hòa</span>
                    </div>
                    <div className="flex items-center">
                        <BrickWallFire className="mr-2" />
                        <span>Lò sưởi</span>
                    </div>
                    <div className="flex items-center">
                        <CircleParking className="mr-2" />
                        <span>Bãi đỗ xe</span>
                    </div>
                    <div className="flex items-center">
                        <Refrigerator className="mr-2" />
                        <span>Tủ lạnh</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 p-6 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Bình luận</h3>
                {binhLuan.length > 0 ? (
                    <>
                        <ul className="grid grid-cols-2 gap-6">
                            {binhLuan.slice(0, 4).map((item, id) => (
                                <li key={id} className="flex items-start space-x-4">
                                    {/* Avatar */}
                                    <img
                                        src={item.avatar}
                                        alt={item.tenNguoiDung}
                                        className="w-12 h-12 rounded-full"
                                    />
                                    {/* Content */}
                                    <div>
                                        <p className="font-semibold">{item.tenNguoiDung}</p>
                                        <p className="text-sm text-gray-500">{item.ngayBinhLuan}</p>
                                        <p className="mt-2">{item.noiDung}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {binhLuan.length > 4 && (
                            <button
                                className="mt-4 text-blue-500 hover:underline"
                                onClick={() => alert("Hiển thị thêm bình luận")}
                            >
                                Hiển thị thêm
                            </button>
                        )}
                    </>
                ) : (
                    <p>Không có bình luận nào.</p>
                )}
            </div>
        </div>


    );
}

