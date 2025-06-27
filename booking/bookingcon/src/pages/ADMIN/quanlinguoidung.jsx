import { getUserAPINoID, deleteUserAPI, putUserAPI } from "../../services/vitri.service";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function QuanLyNguoiDung() {
  const [userList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUserAPINoID();
      setUserList(res.data.content);
    } catch (error) {
      console.error("Lỗi khi tải người dùng:", error);
      alert("Không thể tải danh sách người dùng.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng có ID: ${id}?`)) {
      try {
        await deleteUserAPI(id);
        alert("Xóa người dùng thành công!");
        fetchUsers();
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
        alert("Có lỗi xảy ra khi xóa người dùng.");
      }
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditForm(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (e) => {
    setEditingUser((prev) => ({ ...prev, gender: e.target.value === "true" }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await putUserAPI(editingUser.id, editingUser);
      alert("Cập nhật người dùng thành công!");
      setShowEditForm(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi cập nhật người dùng:", error);
      alert("Có lỗi khi cập nhật người dùng.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Quản Lý Người Dùng</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Tên</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">SĐT</th>
                <th className="border px-4 py-2">Ngày sinh</th>
                <th className="border px-4 py-2">Giới tính</th>
                <th className="border px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{user.id}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone || "-"}</td>
                    <td className="border px-4 py-2">{user.birthday}</td>
                    <td className="border px-4 py-2">{user.gender ? "Nam" : "Nữ"}</td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        onClick={() => handleEditUser(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    Không có dữ liệu người dùng.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showEditForm && editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleEditFormSubmit}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-4">Sửa Người Dùng</h2>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Tên</label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name || ""}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email || ""}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">SĐT</label>
                <input
                  type="text"
                  name="phone"
                  value={editingUser.phone || ""}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Ngày sinh</label>
                <input
                  type="date"
                  name="birthday"
                  value={editingUser.birthday || ""}
                  onChange={handleEditInputChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-medium">Giới tính</label>
                <select
                  name="gender"
                  value={editingUser.gender ? "true" : "false"}
                  onChange={handleGenderChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => setShowEditForm(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
