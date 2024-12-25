// utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // Tambahkan logika validasi token di sini jika perlu
    return !!token; // return true jika token ada
};

export const logout = () => {
    localStorage.clear()
}