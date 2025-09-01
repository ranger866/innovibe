<?php
require_once "../connection/database.php";
require_once "../controller/controller.php";
session_start();

$entity = $_GET['entity'] ?? null;
$action = $_GET['action'] ?? null;
$id     = $_GET['id'] ?? null;
$role   = $_SESSION['role'] ?? "guest";

// Validasi dasar
if (!$entity || !$action) {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
    exit;
}

// Daftar views
$views = [
    "v_dosen", "v_dosen_matkul", "v_dosen_matkul_prodi",
    "v_mahasiswa_prodi", "v_matkul_prodi",
    "v_nilai_mhs_dosen", "v_nilai_mhs_matkul", "v_nilai_mhs_prodi"
];

// Jika request untuk view
if (in_array($entity, $views)) {
    if ($action === "index") {
        if ($entity === "v_nilai_mhs_prodi" && $role !== "kajur") {
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            exit;
        }
        if ($entity === "v_nilai_mhs_dosen" && $role !== "dosen") {
            echo json_encode(["success" => false, "message" => "Unauthorized"]);
            exit;
        }
        $stmt = $pdo->query("SELECT * FROM {$entity}");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode(["success" => true, "data" => $data]);
    }
    exit;
}

// Map tabel
$tableMap = [
    "users"       => "id_user",
    "mahasiswa"   => "id_mhs",
    "mata_kuliah" => "id_matkul",
    "nilai"       => "id_nil",
    "prodi"       => "id_prodi"
];

if (!isset($tableMap[$entity])) {
    echo json_encode(["success" => false, "message" => "Unknown entity"]);
    exit;
}

$controller = new BaseController($pdo, $entity, $tableMap[$entity]);

// Tangani aksi
switch ($action) {
    case "index":  
        $controller->index($role); 
        break;
    case "show":   
        $controller->show($id, $role); 
        break;
    case "store":  
        $controller->store(json_decode(file_get_contents("php://input"), true), $role); 
        break;
    case "update": 
        $controller->update($id, json_decode(file_get_contents("php://input"), true), $role); 
        break;
    case "delete": 
        $controller->delete($id, $role); 
        break;
    case "login":  
        $controller->login(json_decode(file_get_contents("php://input"), true)); 
        break;
    case "logout":
        // Logout: hapus session dan kirim respon JSON
        session_unset();
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logout berhasil"]);
        break;
    default: 
        echo json_encode(["success" => false, "message" => "Unknown action"]);
}
