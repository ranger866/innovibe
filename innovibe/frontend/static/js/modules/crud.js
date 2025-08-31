import { API_URL } from "./utils.js";

export async function getAll(entity) {
    const res = await fetch(`${API_URL}?entity=${entity}&action=index`, {
        credentials: "include"
    });
    return await res.json();
}

export async function getOne(entity, id) {
    const res = await fetch(`${API_URL}?entity=${entity}&action=show&id=${id}`, {
        credentials: "include"
    });
    return await res.json();
}

export async function create(entity, payload) {
    const res = await fetch(`${API_URL}?entity=${entity}&action=store`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
    });
    return await res.json();
}

export async function update(entity, id, payload) {
    const res = await fetch(`${API_URL}?entity=${entity}&action=update&id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
    });
    return await res.json();
}

export async function remove(entity, id) {
    const res = await fetch(`${API_URL}?entity=${entity}&action=delete&id=${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    return await res.json();
}
