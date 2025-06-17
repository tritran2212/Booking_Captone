import { getPhongThueAPI, deletePhongThueAPI, updatePhongThueAPI } from "../../services/vitri.service";
import { useEffect, useState } from "react";

export default function QuanLyThongTinPhong() {
    const [phongThueData, setPhongThueData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPhong, setEditingPhong] = useState(null);
    const [editForm, setEditForm] = useState({
        tenPhong: "",
        hinhAnh: "",
        maViTri: "",
        khach: ""
    });

    useEffect(() => {
        getPhongThueAPI()
            .then((response) => {
                if (response.data?.content) {
                    setPhongThueData(response.data.content);
                } else {
                    console.log("Không có dữ liệu phòng thuê");
                }
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu phòng thuê:", error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phòng này?")) {
            deletePhongThueAPI(id)
                .then(() => {
                    setPhongThueData((prevData) => prevData.filter((phong) => phong.id !== id));
                    alert("Xóa phòng thành công!");
                })
                .catch((error) => {
                    console.error("Lỗi khi xóa phòng:", error);
                    alert("Xóa phòng thất bại!");
                });
        }
    };

    const handleEdit = (phong) => {
        setEditingPhong(phong);
        setEditForm({
            tenPhong: phong.tenPhong,
            hinhAnh: phong.hinhAnh,
            maViTri: phong.maViTri,
            khach: phong.khach
        });
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (!editingPhong) return;

        // Format the data according to the API requirements
        const formattedData = {
            id: editingPhong.id,
            tenPhong: editForm.tenPhong,
            hinhAnh: editForm.hinhAnh,
            maViTri: parseInt(editForm.maViTri),
            khach: parseInt(editForm.khach),
            giuong: editingPhong.giuong,
            phongNgu: editingPhong.phongNgu,
            phongTam: editingPhong.phongTam,
            moTa: editingPhong.moTa,
            giaTien: editingPhong.giaTien,
            mayGiat: editingPhong.mayGiat,
            banLa: editingPhong.banLa,
            tivi: editingPhong.tivi,
            dieuHoa: editingPhong.dieuHoa,
            wifi: editingPhong.wifi,
            bep: editingPhong.bep,
            doXe: editingPhong.doXe,
            hoBoi: editingPhong.hoBoi,
            banUi: editingPhong.banUi
        };

        updatePhongThueAPI(editingPhong.id, formattedData)
            .then(() => {
                setPhongThueData((prevData) =>
                    prevData.map((phong) =>
                        phong.id === editingPhong.id ? { ...phong, ...formattedData } : phong
                    )
                );
                setIsEditModalOpen(false);
                setEditingPhong(null);
                alert("Cập nhật phòng thành công!");
            })
            .catch((error) => {
                console.error("Lỗi khi cập nhật phòng:", error);
                alert("Cập nhật phòng thất bại!");
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    
    const filteredData = phongThueData.filter((phong) =>
        phong.tenPhong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-blue-600">Quản Lý Thông Tin Phòng</h1>
                {/* Ô tìm kiếm */}
                <div className="mb-4 sm:mb-6">
                    <label htmlFor="search" className="block text-gray-700 font-medium mb-2">
                        Nhập vào tên phòng
                    </label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Tìm kiếm phòng..."
                        className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Bảng hiển thị thông tin phòng */}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 text-blue-700">
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Mã Phòng</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Tên Phòng</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Hình Ảnh</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Vị Trí</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Số Khách Tối Đa</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((phong) => (
                                    <tr key={phong.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{phong.id}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{phong.tenPhong}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                            <img
                                                src={phong.hinhAnh}
                                                alt={phong.tenPhong}
                                                className="mx-auto rounded-lg"
                                                style={{ width: "80px", height: "80px" }}
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{phong.maViTri}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{phong.khach}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                            <button
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                onClick={() => handleDelete(phong.id)}
                                            >
                                                Xóa
                                            </button>
                                            <button 
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition ml-2"
                                                onClick={() => handleEdit(phong)}
                                            >
                                                Sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                        Không tìm thấy dữ liệu
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal chỉnh sửa */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4 text-blue-600">Chỉnh sửa thông tin phòng</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Tên Phòng</label>
                                <input
                                    type="text"
                                    name="tenPhong"
                                    value={editForm.tenPhong}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Hình Ảnh</label>
                                <input
                                    type="text"
                                    name="hinhAnh"
                                    value={editForm.hinhAnh}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Vị Trí</label>
                                <input
                                    type="text"
                                    name="maViTri"
                                    value={editForm.maViTri}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Số Khách Tối Đa</label>
                                <input
                                    type="number"
                                    name="khach"
                                    value={editForm.khach}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}