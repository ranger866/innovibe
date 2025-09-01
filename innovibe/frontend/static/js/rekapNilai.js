import { getAll } from "./modules/crud.js";

export async function loadRekapNilai() {
  const content = document.getElementById("rekapNilaiContent");
  if (!content) return;
  content.innerHTML = "";

  try {
    // Ambil rekap nilai dari view
    const result = await getAll("v_nilai_mhs_prodi"); 

    if (!result.success) {
      content.innerHTML = `<p>${result.message}</p>`;
      return;
    }

    // Buat rekap nilai per mata kuliah
    const rekapMatkul = [];
    result.data.forEach(item => {
      let matkul = rekapMatkul.find(m => m.nama_matkul === item.nama_matkul);
      if (!matkul) {
        matkul = { 
          nama_matkul: item.nama_matkul, 
          A:0, B:0, C:0, D:0, E:0, total:0 
        };
        rekapMatkul.push(matkul);
      }
      const grade = item.nilai; // nilai berupa 'A'-'E'
      if (grade && matkul[grade] !== undefined) matkul[grade]++;
      matkul.total++;
    });

    let tableHTML = `
        <table class="table-rekap">
          <thead>
            <tr>
              <th>Mata Kuliah</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>E</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rekapMatkul.map(r => `
              <tr>
                <td>${r.nama_matkul}</td>
                <td>${r.A}</td>
                <td>${r.B}</td>
                <td>${r.C}</td>
                <td>${r.D}</td>
                <td>${r.E}</td>
                <td>${r.total}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

    content.innerHTML = tableHTML;

  } catch(err) {
    console.error("Error loadRekapNilai:", err);
    content.innerHTML = `<p>Gagal load rekap nilai</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadRekapNilai);
