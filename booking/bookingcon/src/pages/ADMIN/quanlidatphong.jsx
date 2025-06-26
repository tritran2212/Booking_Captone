import { getDatPhongAPI, deleteDatPhongAPI, putDatPhongAPI } from "../../services/vitri.service"
import { useEffect, useState } from "react"

export default function QuanLyDatPhong() {
    const [datPhongData, setDatPhongData] = useState([])
    const [loading, setLoading] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingBooking, setEditingBooking] = useState(null)
    const [editForm, setEditForm] = useState({
        maPhong: '',
        ngayDen: '',
        ngayDi: '',
        soLuongKhach: '',
        maNguoiDung: ''
    })

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await getDatPhongAPI()
            setDatPhongData(res.data.content || [])
        } catch (err) {
            console.error("Lỗi tải dữ liệu:", err)
            alert("Không thể tải dữ liệu.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa đặt phòng này?")) return
        setDeletingId(id)
        try {
            await deleteDatPhongAPI(id)
            alert("Đã xóa đặt phòng.")
            fetchData()
        } catch (err) {
            console.error("Lỗi xóa:", err)
            alert("Không thể xóa đặt phòng.")
        } finally {
            setDeletingId(null)
        }
    }

    const handleEdit = (booking) => {
        setEditingBooking(booking)
        setEditForm({
            maPhong: booking.maPhong,
            ngayDen: booking.ngayDen.split("T")[0],
            ngayDi: booking.ngayDi.split("T")[0],
            soLuongKhach: booking.soLuongKhach,
            maNguoiDung: booking.maNguoiDung
        })
        setShowEditModal(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm(prev => ({ ...prev, [name]: value }))
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            await putDatPhongAPI(editingBooking.id, editForm)
            alert("Cập nhật thành công.")
            setShowEditModal(false)
            setEditingBooking(null)
            fetchData()
        } catch (err) {
            console.error("Lỗi cập nhật:", err)
            alert("Không thể cập nhật.")
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-2xl font-bold text-blue-700 mb-4">Quản Lý Đặt Phòng</h1>
                {loading ? (
                    <div className="text-center py-6 text-blue-600 animate-pulse">Đang tải dữ liệu...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border border-gray-300 rounded-md">
                            <thead className="bg-blue-100 text-blue-700 text-sm">
                                <tr>
                                    <th className="px-3 py-2 border">ID</th>
                                    <th className="px-3 py-2 border">Mã phòng</th>
                                    <th className="px-3 py-2 border">Ngày đến</th>
                                    <th className="px-3 py-2 border">Ngày đi</th>
                                    <th className="px-3 py-2 border">Số khách</th>
                                    <th className="px-3 py-2 border">Mã người dùng</th>
                                    <th className="px-3 py-2 border">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datPhongData.length > 0 ? datPhongData.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-slate-100 text-center">
                                        <td className="border px-3 py-2">{booking.id}</td>
                                        <td className="border px-3 py-2">{booking.maPhong}</td>
                                        <td className="border px-3 py-2">{new Date(booking.ngayDen).toLocaleDateString()}</td>
                                        <td className="border px-3 py-2">{new Date(booking.ngayDi).toLocaleDateString()}</td>
                                        <td className="border px-3 py-2">{booking.soLuongKhach}</td>
                                        <td className="border px-3 py-2">{booking.maNguoiDung}</td>
                                        <td className="border px-3 py-2">
                                            <button
                                                onClick={() => handleEdit(booking)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                disabled={deletingId === booking.id}
                                            >
                                                {deletingId === booking.id ? 'Đang xóa...' : 'Xóa'}
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4 text-gray-500">Không có dữ liệu đặt phòng.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal chỉnh sửa */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">Chỉnh sửa đặt phòng</h2>
                        <form onSubmit={handleEditSubmit}>
                            {['maPhong', 'ngayDen', 'ngayDi', 'soLuongKhach', 'maNguoiDung'].map((field) => (
                                <div className="mb-4" key={field}>
                                    <label className="block font-medium mb-1 capitalize">{field}</label>
                                    <input
                                        type={field.includes('ngay') ? 'date' : field === 'soLuongKhach' ? 'number' : 'text'}
                                        name={field}
                                        value={editForm[field]}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    onClick={() => {
                                        setShowEditModal(false)
                                        setEditingBooking(null)
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                    disabled={updating}
                                >
                                    {updating ? 'Đang cập nhật...' : 'Cập nhật'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}