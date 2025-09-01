<?php 

$title = "";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/img/icon-tekad.png" type="image/x-icon">
    <link rel="stylesheet" href="/css/style.css">
    <title><?= $title ?></title>
</head>
<body>
    
    <div class="login">
        <div class="form-container">
            <div class="form-head">
                <img src="/img/logo-tekad.png" alt="TEKAD" class="logo">
                <h2>Selamat Datang di TEKAD</h2>
            </div>
            <form method="post" class="form" id="form">
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