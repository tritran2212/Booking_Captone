import React, { useEffect, useState } from 'react';
import { getUserAPI } from '../../../services/vitri.service';
import { useParams } from 'react-router';
import {getdatPhongAPI} from '../../../services/vitri.service';

export default function HoSoKhachHang() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUserAPI(id)
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data.content);
                }
            });
    }, [id]);


    useEffect(() => {
        getdatPhongAPI(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("data",res.data.content);
                    setUser(res.data.content);
                }
            });
    }, [id]);

    if (!user) return <div className="text-center py-10">Đang tải...</div>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <div className="flex items-center">
                <img
                    src={user.avatar }
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
            
        </div>
    );
}