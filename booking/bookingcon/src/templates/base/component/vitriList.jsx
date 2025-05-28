import React, { useState, useEffect } from "react";
import { getVitriWithPagination } from "../../../services/vitri.service";

export function VitriList() {
    const [vitriList, setVitriList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getVitriWithPagination(1, 8, "")
            .then((res) => {
                let data = [];
                if (
                    res.data &&
                    res.data.content &&
                    Array.isArray(res.data.content.data)
                ) {
                    data = res.data.content.data;
                }
                setVitriList(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;
    }

    return (
        <>
        <div className="vitri-list px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 ">
                Khám phá những điểm đến gần đây
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {vitriList.slice(0, 8).map((item, index) => (
                    <div
                        key={item.id || index}
                        className="flex items-center bg-white rounded-xl shadow p-3"
                    >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 mr-3">
                            {item.hinhAnh ? (
                                <img
                                    src={item.hinhAnh}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image</span>
                            )}
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800 text-sm truncate w-28">{item.tenViTri || "Không có tên vị trí"}</div>
                            <div className="text-gray-500 text-xs mt-1 truncate w-28">
                                {item.tinhThanh || "Không có tỉnh thành"}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="w-full bg-white rounded-xl shadow px-4 py-8 mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                Ở bất cứ đâu
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center">
                    <img src="https://a0.muscache.com/im/pictures/a6839af0-6e82-4055-af61-e2a1324dcba8.jpg?im_w=720" alt="Toàn bộ nhà" className="w-44 h-44 object-cover rounded-xl mb-2" />
                    <span className="font-medium text-gray-800 text-center mt-1">Toàn bộ nhà</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://a0.muscache.com/im/pictures/67ef8796-2113-4803-b66e-6d7d0594ef7e.jpg?im_w=720" alt="Chỗ ở độc đáo" className="w-44 h-44 object-cover rounded-xl mb-2" />
                    <span className="font-medium text-gray-800 text-center mt-1">Chỗ ở độc đáo</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://a0.muscache.com/im/pictures/miso/Hosting-688813643465601440/original/2537aab2-fec1-454f-a5ec-0a9706472637.jpeg?im_w=720" alt="Trang trại và thiên nhiên" className="w-44 h-44 object-cover rounded-xl mb-2" />
                    <span className="font-medium text-gray-800 text-center mt-1">Chỗ ở hiện đại</span>
                </div>
                <div className="flex flex-col items-center">
                    <img src="https://a0.muscache.com/im/pictures/miso/Hosting-1198917988115254977/original/88618f9a-ddf4-4d54-a8e7-588355e697b7.jpeg?im_w=720" alt="Cho phép mang theo thú cưng" className="w-44 h-44 object-cover rounded-xl mb-2" />
                    <span className="font-medium text-gray-800 text-center mt-1">Chỗ ở đón ánh nắng</span>
                </div>
            </div>
        </div>
        </>
    );
}