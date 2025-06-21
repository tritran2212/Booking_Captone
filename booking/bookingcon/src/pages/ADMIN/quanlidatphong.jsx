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
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Quản lý đặt phòng</h1>
            {loading && (
                <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Đang tải...</p>
                </div>
            )}
            <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">ID</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Mã phòng</th>
                        <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">Ngày đến</th>
                        <th className="w-3/12 py-3 px-4 uppercase font-semibold text-sm">Ngày đi</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Số lượng khách</th>
                        <th className="w-1/12 py-3 px-4 uppercase font-semibold text-sm">Mã người dùng</th>
                        <th className="w-2/12 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {datPhongData.map((booking) => (
                        <tr key={booking.id}>
                            <td className="w-1/12 py-3 px-4">{booking.id}</td>
                            <td className="w-1/12 py-3 px-4">{booking.maPhong}</td>
                            <td className="w-3/12 py-3 px-4">{new Date(booking.ngayDen).toLocaleDateString()}</td>
                            <td className="w-3/12 py-3 px-4">{new Date(booking.ngayDi).toLocaleDateString()}</td>
                            <td className="w-1/12 py-3 px-4 text-center">{booking.soLuongKhach}</td>
                            <td className="w-1/12 py-3 px-4 text-center">{booking.maNguoiDung}</td>
                            <td className="w-2/12 py-3 px-4">
                                <button 
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={() => handleEdit(booking)}
                                    disabled={loading}
                                >
                                    Sửa
                                </button>
                                <button 
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => handleDelete(booking.id)}
                                    disabled={loading}
                                >
                                    {loading ? 'Đang xóa...' : 'Xóa'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96 max-w-full">
                        <h2 className="text-xl font-bold mb-4">Chỉnh sửa đặt phòng</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mã phòng:
                                </label>
                                <input
                                    type="text"
                                    name="maPhong"
                                    value={editForm.maPhong}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Ngày đến:
                                </label>
                                <input
                                    type="date"
                                    name="ngayDen"
                                    value={editForm.ngayDen}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Ngày đi:
                                </label>
                                <input
                                    type="date"
                                    name="ngayDi"
                                    value={editForm.ngayDi}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Số lượng khách:
                                </label>
                                <input
                                    type="number"
                                    name="soLuongKhach"
                                    value={editForm.soLuongKhach}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    min="1"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Mã người dùng:
                                </label>
                                <input
                                    type="text"
                                    name="maNguoiDung"
                                    value={editForm.maNguoiDung}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditModal(false)
                                        setEditingBooking(null)
                                    }}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                    disabled={loading}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    )
} 