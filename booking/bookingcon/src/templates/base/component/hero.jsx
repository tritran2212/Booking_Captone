import React, { useState, useEffect } from "react";
import { getAllVitriAPI } from "../../../services/vitri.service";
import { Search } from 'lucide-react';
import "./hero.css";
import { MapPin } from 'lucide-react';
import { useNavigate } from "react-router";
export function Hero() {
    const [vitriList, setvitriList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedVitriId, setSelectedVitriId] = useState(null);
    const navigate = useNavigate();
     useEffect(() => {
        getAllVitriAPI({
            headers: {
                tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
            }
        }).then((res) => {
            console.log("Danh sách vị trí:", res.data.content); 
            setvitriList(res.data.content);
        });
    }, []);

    // Lọc danh sách theo tenViTri
    const filteredVitri = vitriList.filter(
        (item) =>
            item.tenViTri?.toLowerCase().includes(searchText.toLowerCase())
    );
    const handleSearch = () => {
        if (selectedVitriId) {
            navigate(`/vitri/${selectedVitriId}`);
        } else {
            alert("Vui lòng chọn vị trí từ danh sách gợi ý!");
        }
    };

    return (
        <div className="relative w-full h-[520px] md:h-[650px] flex flex-col justify-end bg-black overflow-hidden py-8">
            {/* Ảnh nền lớn, căn giữa, không full screen */}
            <div className="flex justify-center items-end h-full w-full">
                <div className="w-full max-w-5xl mx-auto">
                    <img
                        className="max-h-[580px] md:max-h-[600px] w-full object-cover rounded-2xl"
                        aria-hidden="true"
                        alt="Hình ảnh Ảnh bổ sung 1"
                        src="https://a0.muscache.com/im/pictures/miso/Hosting-1079384091881034805/original/c8b77271-360a-40c9-bde0-5249fc391248.png?im_w=1200"
                    />
                </div>
            </div>

            {/* Thanh tìm kiếm nổi trên ảnh */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-[96%] max-w-4xl z-10">
                <div className="flex flex-row items-center rounded-2xl shadow-xl bg-yellow-50 bg-opacity-90 px-2 py-1 divide-x divide-gray-200">
                    {/* Địa điểm */}
                    <div className="flex-1 flex flex-col px-4 py-2 relative min-w-[160px]">
                        <span className="text-xs font-semibold text-gray-700 mb-1">Địa điểm</span>
                        <input
                            type="text"
                            placeholder="Bạn sắp đi đâu?"
                            className="bg-transparent outline-none text-base font-medium placeholder-gray-400"
                            value={searchText}
                            onChange={e => {
                                setSearchText(e.target.value);
                                setShowSuggestions(true);
                                 setSelectedVitriId(null);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        />
                        {/* Menu gợi ý */}
                        {showSuggestions && searchText && filteredVitri.length > 0 && (
                            <div className="absolute top-16 left-0 w-full bg-white rounded-xl shadow-2xl max-h-72 overflow-y-auto z-20 border border-gray-200">
                                {filteredVitri.map((item, idx) => (
                                    <div
                                        key={String(item.id) || idx}
                                        className="flex items-center px-5 py-4 hover:bg-yellow-200 cursor-pointer transition rounded-lg mx-2 my-1 text-lg font-medium text-gray-800 gap-3"
                                        onMouseDown={() => {
                                            setSearchText(
                                                `${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`
                                            );
                                            setSelectedVitriId(item.id);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        <span className="text-pink-500">
                                            <MapPin size={26} />
                                        </span>
                                        <span>
                                            {item.tenViTri}, {item.tinhThanh}, {item.quocGia}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Nhận phòng */}
                    <div className="flex-1 flex flex-col px-4 py-2 min-w-[120px]">
                        <span className="text-xs font-semibold text-gray-700 mb-1">Nhận phòng</span>
                        <span className="text-base text-gray-500 font-medium">Thêm ngày</span>
                    </div>
                    {/* Trả phòng */}
                    <div className="flex-1 flex flex-col px-4 py-2 min-w-[120px]">
                        <span className="text-xs font-semibold text-gray-700 mb-1">Trả phòng</span>
                        <span className="text-base text-gray-500 font-medium">Thêm ngày</span>
                    </div>
                    {/* Khách */}
                    <div className="flex-1 flex flex-col px-4 py-2 min-w-[100px]">
                        <span className="text-xs font-semibold text-gray-700 mb-1">Khách</span>
                        <span className="text-base text-gray-500 font-medium">Thêm khách</span>
                    </div>
                    {/* Nút tìm kiếm */}
                    <button onClick={handleSearch} className="ml-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-3 flex items-center justify-center shadow-lg transition-all" style={{marginRight: 8, marginLeft: 8}}>
                        <Search size={22} />
                    </button>
                </div>
            </div>
            {/* Dòng chữ dưới ảnh, vẫn nằm trong nền đen hero */}
            <div className="w-full text-center text-white text-2xl font-semibold mt-6 mb-2 drop-shadow-lg">
                Nhờ có Host, mọi điều đều có thể
            </div>
        </div>
    );
}

