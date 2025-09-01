import { openModal } from "./modules/utils.js";
import { getAll, update } from "./modules/crud.js";

const user = JSON.parse(sessionStorage.getItem("user"));
const idDosen = user?.id_user;

const matkulSelect = document.getElementById("matkulSelect");
const mahasiswaTable = document.getElementById("mahasiswaTable").querySelector("tbody");

/* ===== LOAD MATA KULIAH ===== */
export async function loadMatkul() {
  try {
    const res = await getAll("mata_kuliah");
    matkulSelect.innerHTML = `<option value="">-- Pilih Mata Kuliah --</option>`;
    if (!res.success) return;

    res.data
      .filter(m => m.id_dosen == idDosen)
      .forEach(m => {
        const option = document.createElement("option");
        option.value = m.id_matkul;
        option.textContent = m.nama_matkul;
        matkulSelect.appendChild(option);
      });
  } catch (err) {
    console.error("Gagal load mata kuliah:", err);
  }
}

/* ===== LOAD MAHASISWA PER MATKUL ===== */
export async function loadMahasiswa(matkulId) {
  mahasiswaTable.innerHTML = "";
  if (!matkulId) return;

  try {
    const res = await getAll("v_mahasiswa_prodi"); // ganti sesuai API mahasiswa
    if (!res.success) return;

    const mahasiswaByMatkul = res.data.filter(m => m.id_matkul == matkulId);

    mahasiswaByMatkul.forEach(m => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${m.id_mhs}</td>
        <td>${m.nama_mhs}</td>
        <td>${m.nilai ?? "-"}</td>
        <td>
          <button class="button-add">Input / Edit</button>
        </td>
      `;

      const btn = tr.querySelector("button");
      btn.onclick = () => openModal(`Input Nilai - ${m.nama_mhs}`, `
        <label>Nilai:</label>
        <input type="number" name="nilai" min="0" max="100" value="${m.nilai ?? ''}" required>
      `, async (payload) => {
        const resUpdate = await update(`nilai/${m.id_nil}`, { nilai: payload.nilai });
        if (resUpdate.success) {
          alert("Nilai berhasil disimpan!");
          loadMahasiswa(matkulId); // refresh tabel
        } else {
          alert("Gagal menyimpan nilai!");
        }
      });

      mahasiswaTable.appendChild(tr);
    });
  } catch (err) {
    console.error("Gagal load mahasiswa:", err);
  }
}

/* ===== EVENT ===== */
matkulSelect.addEventListener("change", () => loadMahasiswa(matkulSelect.value));

/* ===== INITIAL LOAD ===== */
document.addEventListener("DOMContentLoaded", loadMatkul);
