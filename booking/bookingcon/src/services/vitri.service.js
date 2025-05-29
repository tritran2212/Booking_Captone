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