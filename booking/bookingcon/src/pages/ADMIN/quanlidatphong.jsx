import {getDatPhongAPI,deleteDatPhongAPI,putDatPhongAPI} from "../../services/vitri.service"
import {useEffect, useState} from "react"

export default function QuanLyDatPhong(){
    const [datPhongData, setDatPhongData] = useState([])
    const [loading, setLoading] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editingBooking, setEditingBooking] = useState(null)
    const [editForm, setEditForm] = useState({
        maPhong: '',
        ngayDen: '',
        ngayDi: '',
        soLuongKhach: '',
        maNguoiDung: ''
    })

    const fetchData = () => {
        setLoading(true)
        getDatPhongAPI()
        .then((res)=>{
            console.log(res.data.content)   ;
            setDatPhongData(res.data.content)
        })
        .catch((error) => {
            console.error("Lỗi khi tải dữ liệu:", error)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đặt phòng này?")) {
            setLoading(true)
            deleteDatPhongAPI(id)
            .then((res) => {
                console.log("Xóa thành công:", res.data)
                alert("Xóa đặt phòng thành công!")
                fetchData() // Cập nhật lại dữ liệu
            })
            .catch((error) => {
                console.error("Lỗi khi xóa:", error)
                alert("Có lỗi xảy ra khi xóa đặt phòng!")
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }

    const handleEdit = (booking) => {
        setEditingBooking(booking)
        setEditForm({
            maPhong: booking.maPhong,
            ngayDen: booking.ngayDen.split('T')[0], // Chuyển đổi format ngày
            ngayDi: booking.ngayDi.split('T')[0],
            soLuongKhach: booking.soLuongKhach,
            maNguoiDung: booking.maNguoiDung
        })
        setShowEditModal(true)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        
        putDatPhongAPI(editingBooking.id, editForm)
        .then((res) => {
            console.log("Cập nhật thành công:", res.data)
            alert("Cập nhật đặt phòng thành công!")
            setShowEditModal(false)
            setEditingBooking(null)
            fetchData() // Cập nhật lại dữ liệu
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhật:", error)
            alert("Có lỗi xảy ra khi cập nhật đặt phòng!")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6">Quản Lý Đặt Phòng</h1>
                {loading && (
                    <div className="text-center py-4">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <p className="mt-2 text-gray-600">Đang tải...</p>
                    </div>
                )}
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 rounded-lg">
                        <thead>
                            <tr className="bg-blue-100 text-blue-700">
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">ID</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Mã phòng</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Ngày đến</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Ngày đi</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Số lượng khách</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Mã người dùng</th>
                                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {datPhongData.length > 0 ? (
                                datPhongData.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{booking.id}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{booking.maPhong}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{new Date(booking.ngayDen).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">{new Date(booking.ngayDi).toLocaleDateString()}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">{booking.soLuongKhach}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2 text-center">{booking.maNguoiDung}</td>
                                        <td className="border border-gray-300 px-2 sm:px-4 py-2">
                                            <button
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition mr-2"
                                                onClick={() => handleEdit(booking)}
                                                disabled={loading}
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                                onClick={() => handleDelete(booking.id)}
                                                disabled={loading}
                                            >
                                                {loading ? 'Đang xóa...' : 'Xóa'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                        Không có dữ liệu đặt phòng.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modal chỉnh sửa */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                type="button"
                                onClick={() => {
                                    setShowEditModal(false)
                                    setEditingBooking(null)
                                }}
                            >
                                Đóng
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-blue-600">Chỉnh Sửa Đặt Phòng</h2>
                            <form onSubmit={handleEditSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Mã phòng</label>
                                    <input
                                        type="text"
                                        name="maPhong"
                                        value={editForm.maPhong}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Ngày đến</label>
                                    <input
                                        type="date"
                                        name="ngayDen"
                                        value={editForm.ngayDen}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Ngày đi</label>
                                    <input
                                        type="date"
                                        name="ngayDi"
                                        value={editForm.ngayDi}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-1 font-medium">Số lượng khách</label>
                                    <input
                                        type="number"
                                        name="soLuongKhach"
                                        value={editForm.soLuongKhach}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                        min="1"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block mb-1 font-medium">Mã người dùng</label>
                                    <input
                                        type="text"
                                        name="maNguoiDung"
                                        value={editForm.maNguoiDung}
                                        onChange={handleInputChange}
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="mr-2 px-4 py-2 bg-gray-300 rounded"
                                        onClick={() => {
                                            setShowEditModal(false)
                                            setEditingBooking(null)
                                        }}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        disabled={loading}
                                    >
                                        {loading ? 'Đang cập nhật...' : 'Cập nhật'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
} 