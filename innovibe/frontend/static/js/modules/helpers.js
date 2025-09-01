// helpers.js

// Simpan user ke localStorage
export function saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

// Ambil user dari localStorage
export function getUser() {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
}

// Hapus user dari localStorage
export function clearUser() {
    localStorage.removeItem("user");
}

// Cek apakah user sudah login
export function requireLogin() {
    const user = getUser();
    if (!user) {
        window.location.href = "http://50.50.50.150";
    }
    return user;
}

export function saveData() {
    const data = localStorage.setItem("data", JSON.stringify(data));
}

export function getData() {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : null
}