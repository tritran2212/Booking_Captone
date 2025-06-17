import { axiosWithAuthen } from "./config";

export function getAllVitriAPI() {
    return axiosWithAuthen("/api/vi-tri", {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}

export function getVitriWithPagination(pageIndex, pageSize, keyword = "") {
    return axiosWithAuthen(`/api/vi-tri/phan-trang-tim-kiem?pageIndex=${pageIndex}&pageSize=${pageSize}&keyword=${keyword}`, {
            headers: {
                tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
            }
    });
}
export function getLayPhongTheoViTriAPI(maViTri) {
    return axiosWithAuthen(
        `/api/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`,
        {
            headers: {
                tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
            }
        }
    );
}

export function getChiTietPhongAPI(id){
     return  axiosWithAuthen(`/api/phong-thue/${id}`, 
        {
            headers: {
                tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
            }
      }
    );
}

export  function getDatPhongAPI(){
    return axiosWithAuthen("/api/dat-phong", {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}

export function postDatPhongAPI(data) {
    return axiosWithAuthen.post("/api/dat-phong", data, {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}
export function getBinhLuanAPI(id) {
    return axiosWithAuthen(`/api/binh-luan/lay-binh-luan-theo-phong/${id}`, {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}

export function getUserAPI(id) {
    return axiosWithAuthen(`/api/users/${id}`, {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}
export function getdatPhongAPI(maNguoiDung) {
    return axiosWithAuthen(`/api/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`, {
        headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}

export function getPhongThueAPI(){

    return axiosWithAuthen("/api/phong-thue",{
            headers: {
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }

    })
}


export function deletePhongThueAPI(id) {
    return axiosWithAuthen.delete(`/api/phong-thue/${id}`, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMDAyIiwiZW1haWwiOiJob25neWVuMjIxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE3NTAxMzM0NDUsImV4cCI6MTc1MDczODI0NX0.TBPlTYGTuSSoLewQkc4j5gK4ptbHmlwdRXPIzoZIpVk",
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}

export function updatePhongThueAPI(id, data) {
    return axiosWithAuthen.put(`/api/phong-thue/${id}`, data, {
        headers: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMDAyIiwiZW1haWwiOiJob25neWVuMjIxMkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE3NTAxMzM0NDUsImV4cCI6MTc1MDczODI0NX0.TBPlTYGTuSSoLewQkc4j5gK4ptbHmlwdRXPIzoZIpVk",
            tokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBETiAxNCIsIkhldEhhblN0cmluZyI6IjE1LzEwLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc2MDQ4NjQwMDAwMCIsIm5iZiI6MTczMDMzMjgwMCwiZXhwIjoxNzYwNjU5MjAwfQ.P0-adChuwGt_dA8kRO_sxBjpC2NVGZr7B0F_3jou79s"
        }
    });
}