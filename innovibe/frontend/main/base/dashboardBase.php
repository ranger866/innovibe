<?php ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard</title>
  <link rel="stylesheet" href="/css/dashboard.css">
  <link rel="stylesheet" href="/css/table.css">
</head>
<body>
  <!-- Overlay untuk mobile -->
  <div class="overlay" id="overlay"></div>

  <!-- Sidebar -->
  <aside id="sidebar">
    <!-- Menu akan di-render oleh dashboard.js -->
  </aside>

  <!-- Wrapper konten utama -->
  <div class="content-wrapper">
    <header>
      <!-- Logo -->
      <img src="/img/logo-tekad.png" alt="logo" class="logo">

      <!-- Tombol toggle untuk mobile -->
      <button id="menuToggle" class="menu-toggle">☰</button>

      <!-- Info user + tombol logout -->
      <div class="user-info">
        <span id="usernameDisplay"></span>
        <button class="logoutButton" onclick="doLogoutHandler()">Logout</button>
      </div>
    </header>

    <!-- Main content -->
    <main>
      <?php include "beranda.php"; ?>
      <?php include "users.php"; ?>
      <?php include "mataKuliah.php"; ?>
      <?php include "prodi.php"; ?>
      <?php include "mahasiswa.php"; ?>
      <?php include "inputNilai.php"; ?>
      <?php include "rekapNilai.php"; ?>
    </main>
  </div>

  <!-- Global Modal (untuk tambah/edit data) -->
  <div class="modal" id="globalModal" aria-hidden="true">
    <div class="modal-content">
      <!-- Judul modal akan diubah via JS -->
      <h3 id="globalModalTitle"></h3>

      <!-- Form modal akan diisi via JS -->
      <form id="globalModalForm">
        <!-- Form fields dinamis disisipkan oleh JS -->
        <div class="modal-actions">
          <button type="submit" class="save">💾 Simpan</button>
          <button type="button" class="cancel" id="closeModalBtn">❌ Batal</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Script utama -->
  <script type="module" src="/js/script.js"></script>
  <script type="module" src="/js/dashboard.js"></script>
  <script type="module" src="/js/manage.js"></script>
</body>
</html>
