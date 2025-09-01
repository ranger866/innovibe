<section class="card" id="mahasiswa" style="display: none;">
    <h2>📋 Mahasiswa</h2>
    <button class="button-add" onclick="openAddMhs()">➕ Tambah Mahasiswa</button>

    <div class="card">
      <table border="1" width="100%" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Mahasiswa</th>
            <th>Prodi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody id="mhsTable">
          <!-- Data mahasiswa akan dimuat lewat manage.js -->
        </tbody>
      </table>
    </div>
</section>