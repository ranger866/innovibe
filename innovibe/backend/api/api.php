<?php
require_once '../connection/database.php';
require_once '../connection/migrate_password.php';
require_once '../controller/controller.php';

// mapping entitas
$entities = [
    "users"       => ["table" => "users", "pk" => "id_user"],
    "prodi"       => ["table" => "prodi", "pk" => "id_prodi"],
    "mahasiswa"   => ["table" => "mahasiswa", "pk" => "id_mhs"],
    "mata_kuliah" => ["table" => "mata_kuliah", "pk" => "id_matkul"],
    "nilai"       => ["table" => "nilai", "pk" => "id_nil"],
];

// ambil parameter dari URL
$entity = $_GET['entity'] ?? null;
$action = $_GET['action'] ?? 'index';
$id     = $_GET['id'] ?? null;

if (!$entity || !isset($entities[$entity])) {
    echo json_encode(["error" => "Entity not found"]);
    exit;
}

$config = $entities[$entity];
$controller = new BaseController($pdo, $config['table'], $config['pk']);

// routing
switch ($action) {
    case "index":
        $role = $_GET['role'] ?? null;
        $controller->index($role);
        break;

    case "show":
        $role = $_GET['role'] ?? null;
        $controller->show($id, $role);
        break;

    case "store":
        $data = json_decode(file_get_contents("php://input"), true);
        $role = $data['role_request'] ?? null;
        unset($data['role_request']);
        $controller->store($data, $role);
        break;

    case "update":
        $data = json_decode(file_get_contents("php://input"), true);
        $role = $data['role_request'] ?? null;
        unset($data['role_request']);
        $controller->update($id, $data, $role);
        break;

    case "delete":
        $role = $_GET['role'] ?? null;
        $controller->delete($id, $role);
        break;

    case "login":
        $data = json_decode(file_get_contents("php://input"), true);
        $result = $controller->login($data);
        echo json_encode($result);
        break;

    default:
        echo json_encode(["error" => "Invalid action"]);
}