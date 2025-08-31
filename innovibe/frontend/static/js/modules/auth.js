import { API_URL } from "./utils.js";

export async function doLogin(username, password) {
    const res = await fetch(`${API_URL}?entity=users&action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    });
    return await res.json();
}

export async function doLogout() {
    const res = await fetch(`${API_URL}?entity=users&action=logout`, {
        credentials: "include"
    });
    return await res.json();
}
