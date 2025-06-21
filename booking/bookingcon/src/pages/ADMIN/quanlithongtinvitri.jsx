import { useEffect, useState } from "react";
import { getViTriAPI,deleteViTriAPI, putViTriAPI, addViTriAPI } from "../../services/vitri.service";

export default function QuanLyThongTinViTri() {
    const [viTriData, setViTriData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingViTri, setEditingViTri] = useState(null);
    const [editForm, setEditForm] = useState({
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: ""
    });
    const [showAddForm, setShowAddForm] = useState(false);
    const [addForm, setAddForm] = useState({
        tenViTri: "",
        tinhThanh: "",
        quocGia: "",
        hinhAnh: ""
    });

    useEffect(() => {
        getViTriAPI()
            .then((res) => {
                setViTriData(res.data.content || []);
            })
            .catch(() => {
                alert("Lỗi khi lấy dữ liệu vị trí!");
            });
    }, []);

    const filteredData = viTriData.filter((item) =>
        item.tenViTri.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xử lý xóa vị trí
    const handleDelete = async (id) => {
        if(window.confirm("Bạn có chắc chắn muốn xóa vị trí này?")) {
            try {
                await deleteViTriAPI(id);
                setViTriData(prev => prev.filter(item => item.id !== id));
                alert("Xóa thành công!");
            } catch {
                alert("Xóa thất bại!");
            }
        }
    };

    // Xử lý sửa vị trí
    const handleEditClick = (item) => {
        setEditingViTri(item);
        setEditForm({
            tenViTri: item.tenViTri,
            tinhThanh: item.tinhThanh,
            quocGia: item.quocGia,
            hinhAnh: item.hinhAnh
        });
    };
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        if (!editingViTri) return;
        try {
            await putViTriAPI(editingViTri.id, editForm);
            setViTriData((prev) => prev.map((item) =>
                item.id === editingViTri.id ? { ...item, ...editForm } : item
            ));
            setEditingViTri(null);
            alert("Cập nhật thành công!");
        } catch {
            alert("Cập nhật thất bại!");
        }
    };

    const handleAddFormChange = (e) => {
        const { name, value } = e.target;
        setAddForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addViTriAPI(addForm);
            // Thêm vị trí mới vào bảng
            setViTriData(prev => [...prev, res.data.content]);
            setShowAddForm(false);
            // Reset form
            setAddForm({ tenViTri: "", tinhThanh: "", quocGia: "", hinhAnh: "" });
            alert("Thêm mới thành công!");
        } catch {
            alert("Thêm mới thất bại!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">Quản Lý Thông Tin Vị Trí</h1>
                <div className="flex justify-end mb-4">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        onClick={() => setShowAddForm(true)}
                    >
                        Thêm vị trí
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Tìm kiếm vị trí..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 text-blue-700">
                                <th className="border px-4 py-2">Mã</th>
                                <th className="border px-4 py-2">Tên vị trí</th>
                                <th className="border px-4 py-2">Tỉnh thành</th>
                                <th className="border px-4 py-2">Quốc gia</th>
                                <th className="border px-4 py-2">Hình ảnh</th>
                                <th className="border px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">{item.id}</td>
                                        <td className="border px-4 py-2">{item.tenViTri}</td>
                                        <td className="border px-4 py-2">{item.tinhThanh}</td>
                                        <td className="border px-4 py-2">{item.quocGia}</td>
                                        <td className="border px-4 py-2">
                                            <img src={item.hinhAnh} alt={item.tenViTri} style={{ width: 80, height: 80, objectFit: "cover" }} />
                                        </td>
                                        <td className="border px-4 py-2">
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition mr-2"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Xóa
                                            </button>
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                                                onClick={() => handleEditClick(item)}
                                            >Sửa</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-500 py-4">Không tìm thấy dữ liệu</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Form sửa vị trí */}
            {editingViTri && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setEditingViTri(null)}
                        >
                            Đóng
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-blue-600">Sửa Thông Tin Vị Trí</h2>
                        <form onSubmit={handleEditFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tên vị trí</label>
                                <input
                                    type="text"
                                    name="tenViTri"
                                    value={editForm.tenViTri}
                                    onChange={handleEditFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tỉnh thành</label>
                                <input
                                    type="text"
                                    name="tinhThanh"
                                    value={editForm.tinhThanh}
                                    onChange={handleEditFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Quốc gia</label>
                                <input
                                    type="text"
                                    name="quocGia"
                                    value={editForm.quocGia}
                                    onChange={handleEditFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Hình ảnh (URL)</label>
                                <input
                                    type="text"
                                    name="hinhAnh"
                                    value={editForm.hinhAnh}
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
            {/* Form thêm vị trí */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowAddForm(false)}
                        >
                            Đóng
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-blue-600">Thêm Vị Trí Mới</h2>
                        <form onSubmit={handleAddFormSubmit}>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tên vị trí</label>
                                <input
                                    type="text"
                                    name="tenViTri"
                                    value={addForm.tenViTri}
                                    onChange={handleAddFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tỉnh thành</label>
                                <input
                                    type="text"
                                    name="tinhThanh"
                                    value={addForm.tinhThanh}
                                    onChange={handleAddFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Quốc gia</label>
                                <input
                                    type="text"
                                    name="quocGia"
                                    value={addForm.quocGia}
                                    onChange={handleAddFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Hình ảnh (URL)</label>
                                <input
                                    type="text"
                                    name="hinhAnh"
                                    value={addForm.hinhAnh}
                                    onChange={handleAddFormChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                            >
                                Thêm
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}