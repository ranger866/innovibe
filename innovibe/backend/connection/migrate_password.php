<?php
require 'database.php';

try {
    $stmt = $pdo->query("SELECT user_id, password FROM users");
    $users = $stmt->fetchAll();

    foreach ($users as $user) {
        $plainPassword = $user['password'];

        if (password_get_info($plainPassword)['algo'] !== 0) {
            continue;
        }

        $hashedPassword = password_hash($plainPassword, PASSWORD_DEFAULT);

        $update = $pdo->prepare("UPDATE users SET password=? WHERE user_id=?");
        $update->execute([$hashedPassword, $user['user_id']]);

        echo "Updated user_id {$user['user_id']}\n";
    }

} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage();
}
