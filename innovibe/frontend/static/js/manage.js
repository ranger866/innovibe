import { openModal } from "./modules/utils.js";
import { getAll, create, update, remove } from "./modules/crud.js";

/* ======== USERS ======== */
export function openAddUser() {
  openModal("Tambah User", `
    <input type="text" name="username" placeholder="Username" required>
    <input type="password" name="password" placeholder="Password" required>
    <select name="role" required>
      <option value="">-- Pilih Role --</option>
      <option value="admin">Admin</option>
      <option value="dosen">Dosen</option>
      <option value="kajur">Kajur</option>
    </select>
  `, async (formData) => {
    const res = await create("users", formData);
    if (!res.success) return alert(res.message || "Gagal menambahkan user");
    loadUsers();
  });
}

export function editUser(id, username, role) {
  openModal("Edit User", `
    <input type="text" name="username" value="${username}" required>
    <select name="role" required>
      <option value="admin" ${role === "admin" ? "selected" : ""}>Admin</option>
      <option value="dosen" ${role === "dosen" ? "selected" : ""}>Dosen</option>
      <option value="kajur" ${role === "kajur" ? "selected" : ""}>Kajur</option>
    </select>
  `, async (formData) => {
    const res = await update("users", id, formData);
    if (!res.success) return alert(res.message || "Gagal update user");
    loadUsers();
  });
}

export async function deleteUser(id) {
  if (confirm("Yakin hapus user ini?")) {
    const res = await remove("users", id);
    if (!res.success) return alert(res.message || "Gagal hapus user");
    loadUsers();
  }
}

export async function loadUsers() {
  const res = await getAll("users");
  const tbody = document.getElementById("usersTable");
  if (!tbody) return;
  tbody.innerHTML = "";
  res.data.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.id_user}</td>
        <td>${u.username}</td>
        <td>${u.role}</td>
        <td>
          <button onclick="editUser(${u.id_user}, \`${u.username}\`, \`${u.role}\`)">✏️</button>
          <button onclick="deleteUser(${u.id_user})">🗑️</button>
        </td>
      </tr>
    `;
  });
}


/* ======== MATA KULIAH ======== */
export async function openAddMatkul() {
  // ambil daftar dosen dan prodi
  const dosens = await getAll("v_dosen"); 
  const prodis = await getAll("prodi"); 

  const dosenOptions = dosens.data.map(d => `<option value="${d.id_user}">${d.username}</option>`).join("");
  const prodiOptions = prodis.data.map(p => `<option value="${p.id_prodi}">${p.nama_prodi}</option>`).join("");

  openModal("Tambah Mata Kuliah", `
    <input type="text" name="nama_matkul" placeholder="Nama Mata Kuliah" required>
    <select name="id_dosen" required>
      <option value="">-- Pilih Dosen Pengampu --</option>
      ${dosenOptions}
    </select>
    <select name="id_prodi" required>
      <option value="">-- Pilih Prodi --</option>
      ${prodiOptions}
    </select>
  `, async (formData) => {
    const res = await create("mata_kuliah", formData);
    if (!res.success) return alert(res.message || "Gagal menambahkan mata kuliah");
    loadMatkul();
  });
}

export async function editMatkul(id, nama, idDosen, idProdi) {
  const dosens = await getAll("v_dosen");
  const prodis = await getAll("prodi");

  const dosenOptions = dosens.data.map(d => `<option value="${d.id_user}" ${d.id_user == idDosen ? "selected" : ""}>${d.username}</option>`).join("");
  const prodiOptions = prodis.data.map(p => `<option value="${p.id_prodi}" ${p.id_prodi == idProdi ? "selected" : ""}>${p.nama_prodi}</option>`).join("");

  openModal("Edit Mata Kuliah", `
    <input type="text" name="nama_matkul" value="${nama}" required>
    <select name="id_dosen" required>
      <option value="">-- Pilih Dosen Pengampu --</option>
      ${dosenOptions}
    </select>
    <select name="id_prodi" required>
      <option value="">-- Pilih Prodi --</option>
      ${prodiOptions}
    </select>
  `, async (formData) => {
    const res = await update("mata_kuliah", id, formData);
    if (!res.success) return alert(res.message || "Gagal update mata kuliah");
    loadMatkul();
  });
}

export async function deleteMatkul(id) {
  if (confirm("Yakin hapus mata kuliah ini?")) {
    const res = await remove("mata_kuliah", id);
    if (!res.success) return alert(res.message || "Gagal hapus mata kuliah");
    loadMatkul();
  }
}

export async function loadMatkul() {
  const res = await getAll("v_dosen_matkul_prodi"); // view menampilkan matkul + dosen + prodi
  const tbody = document.getElementById("matkulTable");
  if (!tbody) return;

  tbody.innerHTML = "";
  res.data.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td>${m.id_matkul}</td>
        <td>${m.nama_matkul}</td>
        <td>${m.dosen}</td>
        <td>${m.nama_prodi}</td>
        <td>
          <button onclick="editMatkul(${m.id_matkul}, \`${m.nama_matkul}\`, ${m.id_dosen}, ${m.id_prodi})">✏️</button>
          <button onclick="deleteMatkul(${m.id_matkul})">🗑️</button>
        </td>
      </tr>
    `;
  });
}


/* ======== PRODI ======== */
export function openAddProdi() {
  openModal("Tambah Prodi", `
    <input type="text" name="nama_prodi" placeholder="Nama Prodi" required>
  `, async (formData) => {
    const res = await create("prodi", formData);
    if (!res.success) return alert(res.message || "Gagal menambahkan prodi");
    loadProdi();
  });
}

export function editProdi(id, nama) {
  openModal("Edit Prodi", `
    <input type="text" name="nama_prodi" value="${nama}" required>
  `, async (formData) => {
    const res = await update("prodi", id, formData);
    if (!res.success) return alert(res.message || "Gagal update prodi");
    loadProdi();
  });
}

export async function deleteProdi(id) {
  if (confirm("Yakin hapus prodi ini?")) {
    const res = await remove("prodi", id);
    if (!res.success) return alert(res.message || "Gagal hapus prodi");
    loadProdi();
  }
}

export async function loadProdi() {
  const res = await getAll("prodi");
  const tbody = document.getElementById("prodiTable");
  if (!tbody) return;

  tbody.innerHTML = "";
  res.data.forEach(p => {
    tbody.innerHTML += `
      <tr>
        <td>${p.id_prodi}</td>
        <td>${p.nama_prodi}</td>
        <td>
          <button onclick="editProdi(${p.id_prodi}, \`${p.nama_prodi}\`)">✏️</button>
          <button onclick="deleteProdi(${p.id_prodi})">🗑️</button>
        </td>
      </tr>
    `;
  });
}

/* ======== MAHASISWA ======== */
export async function openAddMhs() {
  // ambil daftar prodi
  const prodis = await getAll("prodi");
  const prodiOptions = prodis.data.map(p => `<option value="${p.id_prodi}">${p.nama_prodi}</option>`).join("");

  openModal("Tambah Mahasiswa", `
    <input type="text" name="nama_mhs" placeholder="Nama Mahasiswa" required>
    <select name="id_prodi" required>
      <option value="">-- Pilih Prodi --</option>
      ${prodiOptions}
    </select>
  `, async (formData) => {
    const res = await create("mahasiswa", formData);
    if (!res.success) return alert(res.message || "Gagal menambahkan mahasiswa");
    loadMhs();
  });
}

export async function editMhs(id, nama, idProdi) {
  const prodis = await getAll("prodi");
  const prodiOptions = prodis.data.map(p => `<option value="${p.id_prodi}" ${p.id_prodi == idProdi ? "selected" : ""}>${p.nama_prodi}</option>`).join("");

  openModal("Edit Mahasiswa", `
    <input type="text" name="nama_mhs" value="${nama}" required>
    <select name="id_prodi" required>
      <option value="">-- Pilih Prodi --</option>
      ${prodiOptions}
    </select>
  `, async (formData) => {
    const res = await update("mahasiswa", id, formData);
    if (!res.success) return alert(res.message || "Gagal update mahasiswa");
    loadMhs();
  });
}

export async function deleteMhs(id) {
  if (confirm("Yakin hapus mahasiswa ini?")) {
    const res = await remove("mahasiswa", id);
    if (!res.success) return alert(res.message || "Gagal hapus mahasiswa");
    loadMhs();
  }
}

export async function loadMhs() {
  const res = await getAll("v_mahasiswa_prodi"); // view menampilkan mahasiswa + prodi
  const tbody = document.getElementById("mhsTable");
  if (!tbody) return;

  tbody.innerHTML = "";
  res.data.forEach(m => {
    tbody.innerHTML += `
      <tr>
        <td>${m.id_mhs}</td>
        <td>${m.nama_mhs}</td>
        <td>${m.nama_prodi}</td>
        <td>
          <button onclick="editMhs(${m.id_mhs}, \`${m.nama_mhs}\`, ${m.id_prodi})">✏️</button>
          <button onclick="deleteMhs(${m.id_mhs})">🗑️</button>
        </td>
      </tr>
    `;
  });
}



/* ======== BINDING SAAT LOAD ======== */
window.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadMatkul();
  loadProdi();
  loadMhs();

  window.openAddUser = openAddUser;
  window.editUser = editUser;
  window.deleteUser = deleteUser;

  window.openAddMatkul = openAddMatkul;
  window.editMatkul = editMatkul;
  window.deleteMatkul = deleteMatkul;

  window.openAddProdi = openAddProdi;
  window.editProdi = editProdi;
  window.deleteProdi = deleteProdi;

  window.openAddMhs = openAddMhs;
  window.editMhs = editMhs;
  window.deleteMhs = deleteMhs;
});
