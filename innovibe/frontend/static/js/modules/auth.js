import { API_URL } from "./utils.js";

// 🔑 Login user
export async function doLogin(username, password) {
    try {
        const res = await fetch(`${API_URL}?entity=users&action=login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Login gagal");
        return data;
    } catch (err) {
        console.error("Login error:", err.message);
        return { success: false, message: err.message };
    }
}

// 🔓 Logout user
export async function doLogout() {
    try {
        const res = await fetch(`${API_URL}?entity=users&action=logout`, {
            method: "POST",
            credentials: "include"
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Logout gagal");
        return data;
    } catch (err) {
        console.error("Logout error:", err.message);
        return { success: false, message: err.message };
    }
}
