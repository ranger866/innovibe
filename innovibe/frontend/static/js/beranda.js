import { getAll } from "./modules/crud.js";
import { drawChart } from "./modules/chart.js";

const user = JSON.parse(sessionStorage.getItem("user"));
const roleUser = user?.role;
const roleUserId = user?.id_user;

export async function loadBeranda() {
  const content = document.getElementById("berandaContent");
  if (!content) return;
  content.innerHTML = "";

  try {
    // ===== ADMIN =====
    if (roleUser === "admin") {
      const [usersRes, mahasiswaRes, matkulRes] = await Promise.all([
        getAll("users"),
        getAll("v_mahasiswa_prodi"), // gunakan view untuk data mahasiswa
        getAll("mata_kuliah")
      ]);

      if (!usersRes.success || !mahasiswaRes.success || !matkulRes.success) return;

      content.innerHTML = `
        <div class="card"><h3>Total Users</h3><p>${usersRes.data.length}</p></div>
        <div class="card"><h3>Total Mahasiswa</h3><p>${mahasiswaRes.data.length}</p></div>
        <div class="card"><h3>Total Mata Kuliah</h3><p>${matkulRes.data.length}</p></div>
      `;
    }

    // ===== DOSEN =====
    else if (roleUser === "dosen") {
      const [matkulRes, nilaiRes] = await Promise.all([
        getAll("v_dosen_matkul_prodi"),
        getAll("v_nilai_mhs_dosen")
      ]);

      if (!matkulRes.success || !nilaiRes.success) return;

      // Filter mata kuliah dan mahasiswa sesuai dosen login
      const matkulByDosen = matkulRes.data.filter(m => m.id_dosen == roleUserId);
      const mahasiswaByDosen = nilaiRes.data.filter(n => matkulByDosen.some(m => m.id_matkul == n.id_matkul));

      content.innerHTML = `
        <div class="card"><h3>Mata Kuliah Diampu</h3><h3>${matkulByDosen.length}</h3></div>
        <div class="card"><h3>Mahasiswa Diajar</h3><p>${mahasiswaByDosen.length}</p></div>
      `;
    }

    // ===== KAJUR =====
    else if (roleUser === "kajur") {
      const [mahasiswaRes, nilaiRes] = await Promise.all([
        getAll("v_mahasiswa_prodi"),
        getAll("v_nilai_mhs_prodi")
      ]);

      if (!mahasiswaRes.success || !nilaiRes.success) return;

      const gradeCounts = { A: 0, B: 0, C: 0, D: 0, E: 0 };

      // Pastikan nilai ada sebelum dihitung
      nilaiRes.data.forEach(n => {
        const grade = n.nilai?.toString();
        if (gradeCounts[grade] !== undefined) gradeCounts[grade]++;
      });

      content.innerHTML = `
        <div class="card"><h3>Total Mahasiswa</h3><p>${mahasiswaRes.data.length}</p></div>
        <div class="card"><h3>Distribusi Nilai</h3><canvas id="chartNilai" width="400" height="200"></canvas></div>
      `;
      drawChart(gradeCounts);
    }
  } catch (err) {
    console.error("Error loadBeranda:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadBeranda);
