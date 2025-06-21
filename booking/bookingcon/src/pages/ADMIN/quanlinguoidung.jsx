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
        <div className="container mx-auto mt-10 px-2">
            <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Quản lí người dùng</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="py-3 px-4 text-center font-semibold">ID</th>
                            <th className="py-3 px-4 text-center font-semibold">Tên</th>
                            <th className="py-3 px-4 text-center font-semibold">Email</th>
                            <th className="py-3 px-4 text-center font-semibold">SĐT</th>
                            <th className="py-3 px-4 text-center font-semibold">Ngày sinh</th>
                            <th className="py-3 px-4 text-center font-semibold">Giới tính</th>
                            <th className="py-3 px-4 text-center font-semibold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item, idx) => (
                            <tr
                                key={item.id}
                                className={idx % 2 === 0 ? "bg-gray-50 hover:bg-blue-50" : "bg-white hover:bg-blue-50"}
                            >
                                <td className="py-2 px-4 text-center">{item.id}</td>
                                <td className="py-2 px-4 text-center">{item.name}</td>
                                <td className="py-2 px-4 text-center">{item.email}</td>
                                <td className="py-2 px-4 text-center">{item.phone || "-"}</td>
                                <td className="py-2 px-4 text-center">{item.birthday}</td>
                                <td className="py-2 px-4 text-center">
                                    {item.gender ? "Nam" : "Nữ"}
                                </td>
                                <td className="py-2 px-4 text-center">
                                    <button
                                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full mr-2 transition"
                                        title="Sửa"
                                        onClick={() => handleEditUser(item)}
                                    >
                                        <FaEdit className="mr-1" /> Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDeleteUser(item.id)}
                                        className="inline-flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition"
                                        title="Xóa"
                                    >
                                        <FaTrash className="mr-1" /> Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {user.length === 0 && (
                            <tr>
                                <td colSpan={7} className="py-6 text-center text-gray-400">
                                    Không có dữ liệu người dùng.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showEditForm && editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <form
                        className="bg-white p-6 rounded-lg shadow-lg w-96"
                        onSubmit={handleEditFormSubmit}
                    >
                        <h2 className="text-xl font-bold mb-4">Sửa người dùng</h2>
                        <input
                            className="w-full mb-2 p-2 border rounded"
                            name="name"
                            value={editingUser.name || ""}
                            onChange={handleEditInputChange}
                            placeholder="Tên"
                        />
                        <input
                            className="w-full mb-2 p-2 border rounded"
                            name="email"
                            value={editingUser.email || ""}
                            onChange={handleEditInputChange}
                            placeholder="Email"
                        />
                        <input
                            className="w-full mb-2 p-2 border rounded"
                            name="phone"
                            value={editingUser.phone || ""}
                            onChange={handleEditInputChange}
                            placeholder="SĐT"
                        />
                        <input
                            className="w-full mb-2 p-2 border rounded"
                            name="birthday"
                            value={editingUser.birthday || ""}
                            onChange={handleEditInputChange}
                            placeholder="Ngày sinh"
                        />
                        <select
                            className="w-full mb-2 p-2 border rounded"
                            name="gender"
                            value={editingUser.gender === true ? "true" : editingUser.gender === false ? "false" : ""}
                            onChange={e => setEditingUser({ ...editingUser, gender: e.target.value === "true" })}
                        >
                            <option value="true">Nam</option>
                            <option value="false">Nữ</option>
                        </select>
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
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}