<?php
class BaseController {
    private $pdo;
    private $table;
    private $primaryKey;

    public function __construct($pdo, $table, $primaryKey) {
        $this->pdo = $pdo;
        $this->table = $table;
        $this->primaryKey = $primaryKey;
        header('Content-Type: application/json');
    }

    // 🔹 GET semua data
    public function index($role) {
        if ($this->table === "nilai" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only dosen can view nilai."]);
            return;
        }
        $stmt = $this->pdo->query("SELECT * FROM {$this->table}");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => $data]);
    }

    // 🔹 GET berdasarkan ID
    public function show($id, $role) {
        if ($this->table === "nilai" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only dosen can view nilai."]);
            return;
        }
        $stmt = $this->pdo->prepare("SELECT * FROM {$this->table} WHERE {$this->primaryKey}=?");
        $stmt->execute([$id]);
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => $data]);
    }

    // 🔹 CREATE (store) untuk users dengan hash password
    public function store($data, $role) {
        if (($this->table === "users" || $this->table === "mata_kuliah") && $role !== "admin") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only admin can create {$this->table}."]);
            return;
        }
        if ($this->table === "nilai" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only dosen can create nilai."]);
            return;
        }

        // Hash password jika table = users
        if ($this->table === "users" && isset($data['password'])) {
            $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);
        }

        $cols = implode(",", array_keys($data));
        $placeholders = implode(",", array_fill(0, count($data), "?"));
        $sql = "INSERT INTO {$this->table} ($cols) VALUES ($placeholders)";
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute(array_values($data));
        echo json_encode(["success" => $result, "id" => $this->pdo->lastInsertId()]);
    }

    // 🔹 UPDATE
    public function update($id, $data, $role) {
        if ($this->table === "nilai" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only dosen can update nilai."]);
            return;
        }
        $set = implode(",", array_map(fn($col) => "$col=?", array_keys($data)));
        $sql = "UPDATE {$this->table} SET $set WHERE {$this->primaryKey}=?";
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute([...array_values($data), $id]);
        echo json_encode(["success" => $result]);
    }

    // 🔹 DELETE
    public function delete($id, $role) {
        if ($this->table === "nilai" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized. Only dosen can delete nilai."]);
            return;
        }
        $stmt = $this->pdo->prepare("DELETE FROM {$this->table} WHERE {$this->primaryKey}=?");
        $result = $stmt->execute([$id]);
        echo json_encode(["success" => $result]);
    }

    // 🔑 LOGIN
    public function login($data) {
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE username=? LIMIT 1");
        $stmt->execute([$data['username']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data['password'], $user['password'])) {
            // Simpan session
            $_SESSION['id_user']  = $user['id_user'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['role']     = $user['role'];

            echo json_encode([
                "success" => true,
                "data"    => [
                    "id_user"  => $user['id_user'],
                    "username" => $user['username'],
                    "role"     => $user['role']
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Username atau password salah"]);
        }
    }

    // 🔑 LOGOUT
    public function logout() {
        session_unset();
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logout berhasil"]);
    }
}
