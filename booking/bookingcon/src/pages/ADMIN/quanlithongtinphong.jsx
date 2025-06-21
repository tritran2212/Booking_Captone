import { getPhongThueAPI, deletePhongThueAPI, updatePhongThueAPI,addPhongThueAPI } from "../../services/vitri.service";
import { useEffect, useState } from "react";

export default function QuanLyThongTinPhong() {
    const [phongThueData, setPhongThueData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingPhong, setEditingPhong] = useState(null); // phòng đang sửa
    const [showEditForm, setShowEditForm] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editForm, setEditForm] = useState({
        tenPhong: "",
        hinhAnh: "",
        maViTri: "",
        khach: ""
    });
    const [addForm, setAddForm] = useState({
        tenPhong: "",
        khach: 0,
        phongNgu: 0,
        giuong: 0,
        phongTam: 0,
        moTa: "",
        giaTien: 0,
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        banUi: false,
        maViTri: 0,
        hinhAnh: ""
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

    // Khi click Sửa
    const handleEditClick = (phong) => {
        setEditingPhong(phong);
        setEditForm({
            tenPhong: phong.tenPhong || "",
            hinhAnh: phong.hinhAnh || "",
            maViTri: phong.maViTri || "",
            khach: phong.khach || ""
        });
        setShowEditForm(true);
    };

    // Khi thay đổi input trong form
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // Khi submit form sửa
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        if (!editingPhong) return;
        try {
            // Gửi dữ liệu cập nhật
            await updatePhongThueAPI(editingPhong.id, editForm);
            // Cập nhật lại danh sách phòng
            const res = await getPhongThueAPI();
            setPhongThueData(res.data.content || []);
            setShowEditForm(false);
            setEditingPhong(null);
            alert("Cập nhật phòng thành công!");
        } catch {
            alert("Cập nhật phòng thất bại!");
        }
    };

    const handleAddFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue;
        if (type === 'checkbox') {
            finalValue = checked;
        } else if (['khach', 'phongNgu', 'giuong', 'phongTam', 'giaTien', 'maViTri'].includes(name)) {
            // Chỉ cho phép nhập số và dấu chấm
            const numericValue = value.replace(/[^0-9]/g, '');
            finalValue = numericValue === '' ? '' : parseInt(numericValue, 10);
        } else {
            finalValue = value;
        }

        setAddForm((prev) => ({ ...prev, [name]: finalValue }));
    };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra các trường số phải lớn hơn 0
        const numericFields = ['khach', 'phongNgu', 'giuong', 'phongTam', 'giaTien', 'maViTri'];
        for (const field of numericFields) {
            if (!addForm[field] || addForm[field] <= 0) {
                alert(`Vui lòng nhập ${field} phải lớn hơn 0!`);
                return;
            }
        }

        try {
            await addPhongThueAPI(addForm);
            const res = await getPhongThueAPI();
            setPhongThueData(res.data.content || []);
            setShowAddForm(false);
            
            // Reset form về giá trị ban đầu
            setAddForm({
                tenPhong: "",
                khach: 0,
                phongNgu: 0,
                giuong: 0,
                phongTam: 0,
                moTa: "",
                giaTien: 0,
                mayGiat: false,
                banLa: false,
                tivi: false,
                dieuHoa: false,
                wifi: false,
                bep: false,
                doXe: false,
                hoBoi: false,
                banUi: false,
                maViTri: 0,
                hinhAnh: ""
            });
            
            alert("Thêm phòng thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm phòng:", error);
            alert("Thêm phòng thất bại!");
        }
    };

    const filteredData = phongThueData.filter((phong) =>
        phong.tenPhong.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">Quản Lý Thông Tin Phòng</h1>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    >
                        Thêm Phòng
                    </button>
                </div>
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
                                                onClick={() => handleEditClick(phong)}
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
                {/* Form thêm phòng */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative max-h-screen overflow-y-auto">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowAddForm(false)}
                            >
                                Đóng
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Thêm Phòng Mới</h2>
                            <form onSubmit={handleAddFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Tên Phòng</label>
                                        <input type="text" name="tenPhong" value={addForm.tenPhong} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Mã Vị Trí</label>
                                        <input type="text" name="maViTri" value={addForm.maViTri} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                    <div className="mb-4 col-span-1 md:col-span-2">
                                        <label className="block mb-1 font-medium">Mô Tả</label>
                                        <textarea name="moTa" value={addForm.moTa} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" required />
                                    </div>
                                    <div className="mb-4 col-span-1 md:col-span-2">
                                        <label className="block mb-1 font-medium">Hình Ảnh (URL)</label>
                                        <input type="text" name="hinhAnh" value={addForm.hinhAnh} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Giá Tiền</label>
                                        <input type="text" name="giaTien" value={addForm.giaTien} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Số Khách</label>
                                        <input type="text" name="khach" value={addForm.khach} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Số Phòng Ngủ</label>
                                        <input type="text" name="phongNgu" value={addForm.phongNgu} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Số Giường</label>
                                        <input type="text" name="giuong" value={addForm.giuong} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium">Số Phòng Tắm</label>
                                        <input type="text" name="phongTam" value={addForm.phongTam} onChange={handleAddFormChange} className="w-full border px-3 py-2 rounded" placeholder="Nhập số lớn hơn 0" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="mayGiat" checked={addForm.mayGiat} onChange={handleAddFormChange} /><span>Máy Giặt</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="banLa" checked={addForm.banLa} onChange={handleAddFormChange} /><span>Bàn Là</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="tivi" checked={addForm.tivi} onChange={handleAddFormChange} /><span>Tivi</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="dieuHoa" checked={addForm.dieuHoa} onChange={handleAddFormChange} /><span>Điều Hòa</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="wifi" checked={addForm.wifi} onChange={handleAddFormChange} /><span>Wifi</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="bep" checked={addForm.bep} onChange={handleAddFormChange} /><span>Bếp</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="doXe" checked={addForm.doXe} onChange={handleAddFormChange} /><span>Đỗ Xe</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="hoBoi" checked={addForm.hoBoi} onChange={handleAddFormChange} /><span>Hồ Bơi</span></label>
                                    <label className="flex items-center space-x-2"><input type="checkbox" name="banUi" checked={addForm.banUi} onChange={handleAddFormChange} /><span>Bàn Ủi</span></label>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4">
                                    Thêm Phòng
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {/* Form sửa */}
                {showEditForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowEditForm(false)}
                            >
                                Đóng
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Sửa Thông Tin Phòng</h2>
                            <form onSubmit={handleEditFormSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Tên Phòng</label>
                                    <input
                                        type="text"
                                        name="tenPhong"
                                        value={editForm.tenPhong}
                                        onChange={handleEditFormChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Hình Ảnh (URL)</label>
                                    <input
                                        type="text"
                                        name="hinhAnh"
                                        value={editForm.hinhAnh}
                                        onChange={handleEditFormChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Mã Vị Trí</label>
                                    <input
                                        type="text"
                                        name="maViTri"
                                        value={editForm.maViTri}
                                        onChange={handleEditFormChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Số Khách Tối Đa</label>
                                    <input
                                        type="number"
                                        name="khach"
                                        value={editForm.khach}
                                        onChange={handleEditFormChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Lưu
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}