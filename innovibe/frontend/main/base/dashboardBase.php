<?php
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="shortcut icon" href="/img/icon-tekad.png" type="image/x-icon">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/dashboard_style.css">
    <script type="module" src="/js/script.js"></script>
    <script type="module" src="/js/dashboard.js"></script>
</head>
<body>
    <!-- Overlay untuk mobile -->
    <div class="overlay" id="overlay"></div>

    <!-- Sidebar -->
    <aside id="sidebar">
    <!-- isi menu akan digenerate di dashboard.js -->
    </aside>

    <!-- Konten utama -->
    <div class="content-wrapper">
        <header>
            <!-- Tombol toggle sidebar -->
            <img src="/img/logo-tekad.png" alt="TEKAD" class="logo">
            <button class="menu-toggle" id="menuToggle">&#9776;</button>
            <div>
                <span id="usernameDisplay"></span>
                <button class="logoutButton" onclick="doLogoutHandler()">Logout</button>
            </div>
        </header>

        <main>
            <?php include "beranda.php"?>
        </main>
    </div>
</body>
</html>

