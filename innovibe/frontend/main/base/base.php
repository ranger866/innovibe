<?php 

$title = "";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <title><?= $title ?></title>
</head>
<body>
    
    <div class="login">
        <div class="form-container">
            <div class="form-head">
                <img src="/img/logo-tekad-vertikal.png" alt="TEKAD" class="logo">
                <h2>Selamat Datang di TEKAD</h2>
            </div>
            <form method="post" class="form" id="form">
                <div class="role-body">
                    <h4 class="role-head">Pilih Role</h4>
                    <div class="role-container">
                        <span>
                            <input type="radio" id="admin" name="role" value="admin">
                            <label for="admin">Admin</label>
                        </span>
                        <span>
                            <input type="radio" id="kajur" name="role" value="kajur">
                            <label for="kajur">Kepala Jurusan</label>
                        </span>
                        <span>
                            <input type="radio" id="dosen" name="role" value="dosen">
                            <label for="dosen">Dosen</label>
                        </span>
                    </div>
                </div>
                <div class="form-body">
                    <label for="username">Username</label><br>
                    <input type="text" name="username" class="username" id="username">
                </div>
                <div class="form-body">
                    <label for="password">Password</label><br>
                    <input type="password" name="password" class="password" id="password">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    </div>


    <script type="module" src="/js/script.js"></script>
</body>
</html>