import { getUserAPINoID, deleteUserAPI,putUserAPI } from "../../services/vitri.service";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function QuanLyNguoiDung() {
    const [user, setUser] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const fetchUsers = () => {
        getUserAPINoID().then((res) => {
            setUser(res.data.content);
        }).catch(err => {
            console.error("Failed to fetch users:", err);
            alert("Không thể tải danh sách người dùng.");
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = (id) => {
        if (window.confirm(`Bạn có chắc muốn xóa người dùng có ID: ${id} không?`)) {
            deleteUserAPI(id)
                .then(() => {
                    alert("Xóa người dùng thành công!");
                    fetchUsers(); 
                })
                .catch((err) => {
                    console.error("Lỗi khi xóa người dùng:", err);
                    alert("Có lỗi xảy ra khi xóa người dùng.");
                });
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowEditForm(true);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    const handleEditFormSubmit = (e) => {
        e.preventDefault();
        putUserAPI(editingUser.id, editingUser)
            .then(() => {
                alert("Cập nhật người dùng thành công!");
                setShowEditForm(false);
                setEditingUser(null);
                fetchUsers();
            })
            .catch((err) => {
                console.error("Lỗi khi cập nhật người dùng:", err);
                alert("Có lỗi xảy ra khi cập nhật người dùng.");
            });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">Quản Lý Người Dùng</h1>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 text-blue-700">
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Tên</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">SĐT</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Ngày sinh</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Giới tính</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.length > 0 ? (
                                user.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.id}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.name}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.email}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.phone || "-"}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.birthday}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.gender ? "Nam" : "Nữ"}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                            <button
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mr-2"
                                                title="Sửa"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                <FaEdit className="mr-1" /> Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(item.id)}
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                title="Xóa"
                                            >
                                                <FaTrash className="mr-1" /> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                        Không có dữ liệu người dùng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal sửa */}
                {showEditForm && editingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <form
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
                            onSubmit={handleEditFormSubmit}
                        >
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                type="button"
                                onClick={() => setShowEditForm(false)}
                            >
                                Đóng
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Sửa Người Dùng</h2>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Tên</label>
                                <input
                                    className="w-full border px-3 py-2 rounded"
                                    name="name"
                                    value={editingUser.name || ""}
                                    onChange={handleEditInputChange}
                                    placeholder="Tên"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Email</label>
                                <input
                                    className="w-full border px-3 py-2 rounded"
                                    name="email"
                                    value={editingUser.email || ""}
                                    onChange={handleEditInputChange}
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">SĐT</label>
                                <input
                                    className="w-full border px-3 py-2 rounded"
                                    name="phone"
                                    value={editingUser.phone || ""}
                                    onChange={handleEditInputChange}
                                    placeholder="SĐT"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Ngày sinh</label>
                                <input
                                    className="w-full border px-3 py-2 rounded"
                                    name="birthday"
                                    value={editingUser.birthday || ""}
                                    onChange={handleEditInputChange}
                                    placeholder="Ngày sinh"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-1 font-medium">Giới tính</label>
                                <select
                                    className="w-full border px-3 py-2 rounded"
                                    name="gender"
                                    value={editingUser.gender === true ? "true" : editingUser.gender === false ? "false" : ""}
                                    onChange={e => setEditingUser({ ...editingUser, gender: e.target.value === "true" })}
                                >
                                    <option value="true">Nam</option>
                                    <option value="false">Nữ</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded"
                                    onClick={() => setShowEditForm(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                >
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}