import { useEffect, useState } from "react";
import { getLayPhongTheoViTriAPI } from "../../services/vitri.service";

export default function PhongTheoViTri() {
    const [phongList, setPhongList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getLayPhongTheoViTriAPI(1)
            .then((response) => {
                if (response.data && Array.isArray(response.data.content)) {
                    setPhongList(response.data.content);
                } else {
                    setPhongList([]);
                    setError("Dữ liệu trả về không hợp lệ.");
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
    }, []);

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
        <div className="flex p-6 gap-6">
            {/* Card list - 2/3 width */}
            <div className="w-2/3">
                <h1 className="text-2xl font-bold text-center mb-6">Phòng theo vị trí</h1>
                <div>
                    {phongList.map((phong) => (
                       <div
                       key={phong.id}
                       className="flex flex-row border rounded-xl shadow-lg overflow-hidden bg-white mb-6 items-center h-60 p-8"
                     >
                       {/* Ảnh bên trái nhỏ lại, có border, margin phải */}
                       <img
                         src={phong.hinhAnh}
                         alt={phong.tenPhong}
                         className="w-1/3 h-40 object-cover rounded-lg border-2 border-gray-300 mr-8"
                       />
                       {/* Nội dung bên phải chiếm 2/3 */}
                       <div className="w-2/3 flex flex-col justify-center h-full">
                         <div>
                           <div className="text-xs text-gray-500 mb-1">Toàn bộ căn hộ dịch vụ tại Bình Thạnh</div>
                           <h3 className="text-lg font-semibold mb-2 truncate">{phong.tenPhong}</h3>
                           <div className="text-sm text-gray-600 mb-4">
                             2 khách · Phòng studio · 1 giường · 1 phòng tắm<br />
                             Wifi · Bếp · Điều hòa nhiệt độ · Máy giặt
                           </div>
                         </div>
                         <div className="text-right">
                           <span className="text-xl font-bold text-gray-800">${phong.giaTien}</span>
                           <span className="text-base text-gray-500"> / tháng</span>
                         </div>
                       </div>
                     </div>
                    ))}
                </div>
            </div>
            {/* Map - 1/3 width */}
            <div className="w-1/3">
                <div className="h-full min-h-[500px] rounded-lg shadow-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9934439807485!2d108.19783419999999!3d16.06583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219accc5afc61%3A0x8142dee562e6d0b2!2zQmlkYSBRdcO9IC0gVOG7lE5HIMSQ4bqgSSBMw50gQklMTElBUkRTIE1J4buATiBUUlVORw!5e0!3m2!1svi!2s!4v1748592417382!5m2!1svi!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '12px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </div>
    );
}