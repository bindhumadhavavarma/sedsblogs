<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/AuthMiddleware.php';

$response['success'] = true;
try {
    $db_connection = new Database();
    $allHeaders = getallheaders();
    $post_data = json_decode(file_get_contents("php://input"));
    $pdo = $db_connection->dbConnection();
    $auth = new Auth($pdo, $allHeaders);
    $auth_data = $auth->isValid();
    $stmt = $pdo->query("select * from blogs where blog_id='$post_data->blog_id'");
    $response['blog'] = $stmt->fetch(PDO::FETCH_ASSOC);
} catch (\Error $e) {
    $response['success'] = false;
    $response["error"] = $e->getMessage();
}
echo json_encode($response);
