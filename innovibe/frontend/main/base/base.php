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
            <form action="" method="post" class="form" id="form">
                <div class="form-body">
                    <label for="Role">Masuk Sebagai</label>
                    <div class="role-container">
                        <input type="checkbox" name="role" id="role" class="role">Admin
                        <input type="checkbox" name="role" id="role" class="role">Kepala Jurusan
                        <input type="checkbox" name="role" id="role" class="role">Dosen
                    </div>
                </div>
                <div class="form-body">
                    <label for="username">Username</label>
                    <input type="text" name="username" class="username" id="username">
                </div>
                <div class="form-body">
                    <label for="password">Password</label>
                    <input type="password" name="password" class="password" id="password">
                </div>
            </form>
        </div>
    </div>


    <script src="/js/script.js"></script>
</body>
</html>