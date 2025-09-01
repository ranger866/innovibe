import { API_URL } from "./utils.js";

// Daftar entity valid (tabel + view)
const validEntities = [
  "users", "mahasiswa", "mata_kuliah", "nilai", "prodi",
  "v_dosen", "v_dosen_matkul_prodi", "v_mahasiswa_prodi",
  "v_nilai_mhs_dosen", "v_nilai_mhs_prodi"
];

// Helper untuk fetch dengan error handling
async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(url, { credentials: "include", ...options });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", url, err);
    return { success: false, message: "Gagal mengambil data" };
  }
}

/** 🔹 GET semua data */
export async function getAll(entity, query = "") {
  if (!validEntities.includes(entity)) return { success: false, message: `Unknown entity: ${entity}` };
  const url = query ? `${API_URL}?entity=${entity}&action=index&${query}` : `${API_URL}?entity=${entity}&action=index`;
  return await fetchJSON(url);
}

/** 🔹 GET data berdasarkan ID */
export async function getOne(entity, id) {
  if (!validEntities.includes(entity)) return { success: false, message: `Unknown entity: ${entity}` };
  const url = `${API_URL}?entity=${entity}&action=show&id=${id}`;
  return await fetchJSON(url);
}

/** 🔹 CREATE */
export async function create(entity, payload) {
  if (!validEntities.includes(entity)) return { success: false, message: `Unknown entity: ${entity}` };
  const url = `${API_URL}?entity=${entity}&action=store`;
  return await fetchJSON(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

/** 🔹 UPDATE */
export async function update(entity, id, payload) {
  if (!validEntities.includes(entity)) return { success: false, message: `Unknown entity: ${entity}` };
  const url = `${API_URL}?entity=${entity}&action=update&id=${id}`;
  return await fetchJSON(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

/** 🔹 DELETE */
export async function remove(entity, id) {
  if (!validEntities.includes(entity)) return { success: false, message: `Unknown entity: ${entity}` };
  const url = `${API_URL}?entity=${entity}&action=delete&id=${id}`;
  return await fetchJSON(url, { method: "DELETE" });
}
