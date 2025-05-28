export const managerStorage = {
    set(key, value) {
        if (value === undefined) {
            console.warn(`managerStorage: Không thể lưu giá trị 'undefined' cho key '${key}'`);
            return;
        }
        if (typeof value === "string") {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    get(key) {
        const result = localStorage.getItem(key);

        if (result === "undefined") {
            console.warn(`managerStorage: Giá trị của key '${key}' là 'undefined', trả về null`);
            return null;
        }

        try {
            // Kiểm tra nếu giá trị là JSON hợp lệ
            return result && result.startsWith("{") || result.startsWith("[")
                ? JSON.parse(result)
                : result; // Trả về giá trị gốc nếu không phải JSON
        } catch (error) {
            console.error("Error parsing:", error);
            return result; // Trả về giá trị gốc nếu parse thất bại
        }
    },
    clear() {
        localStorage.clear();
    },
    remove(key) {
        localStorage.removeItem(key);
    },
};