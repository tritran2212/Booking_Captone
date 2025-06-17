import React, { useEffect, useState } from 'react';
import { getUserAPI } from '../../../services/vitri.service';
import { useParams } from 'react-router';
import { getdatPhongAPI } from '../../../services/vitri.service';

export default function HoSoKhachHang() {
    const { id } = useParams();
    const maNguoiDung = id;
    const [user, setUser] = useState(null);
    const [bookedRooms, setBookedRooms] = useState([]); // State để lưu danh sách phòng đã đặt

    useEffect(() => {
        getUserAPI(id)
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data.content);
                }
            });
    }, [id]);

    useEffect(() => {
        getdatPhongAPI(maNguoiDung)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Booked rooms data:", res.data.content);
                    setBookedRooms(res.data.content); // Lưu danh sách phòng đã đặt
                }
            })
            .catch((err) => console.error("Error fetching booked rooms:", err));
    }, [maNguoiDung]);

    if (!user) return <div className="text-center py-10">Đang tải...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <div className="flex items-center">
                <img
                    src={user.avatar || "https://api.dicebear.com/7.x/adventurer/svg?seed=anime"} 
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover mr-8 border"
                />
                <div>
                    <h2 className="text-2xl font-semibold mb-1">Xin chào {user.name || user.ten || 'Người dùng'}</h2>
                    
                    <a
                        href={`/hosocanhan/chinhsua/${user.id}`}
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        Chỉnh sửa hồ sơ
                    </a>
                </div>
            </div>
            <hr className="my-6" />

            {/* Hiển thị danh sách phòng đã đặt */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Danh sách phòng đã đặt</h3>
                {bookedRooms.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {bookedRooms.map((room, index) => (
                            <li key={index} className="mb-4">
                                <div className="font-medium">Mã phòng: {room.maPhong}</div>
                                <div>Ngày đến: {room.ngayDen}</div>
                                <div>Ngày đi: {room.ngayDi}</div>
                                <div>Số lượng khách: {room.soLuongKhach}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Không có phòng nào được đặt.</p>
                )}
            </div>
        </div>
    );
}