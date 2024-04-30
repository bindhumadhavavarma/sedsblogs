<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/AuthMiddleware.php';

function generateRandomString($length = 16)
{
    $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    $randomString = '';
    $max = strlen($characters) - 1;

    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[mt_rand(0, $max)];
    }

    return $randomString;
}

$response['success'] = true;
try {
    $db_connection = new Database();
    $allHeaders = getallheaders();
    $post_data = json_decode(file_get_contents("php://input"));
    $pdo = $db_connection->dbConnection();
    $auth = new Auth($pdo, $allHeaders);
    $auth_data = $auth->isValid();
    $stmt = $pdo->prepare("select * from users where username=:username");
    $stmt->execute(array(
        ":username" => $post_data->username
    ));
    if ($stmt->fetch(PDO::FETCH_ASSOC)) {
        $response['success'] = false;
        $response['error'] = "Username already exists. Try again with different Username.";
    } else {

        $stmt = $pdo->prepare("insert into users values (:username,:fullname,:password,:email,:hash,:privilege)");
        $stmt->execute(array(
            ":username" => $post_data->username,
            ":fullname" => $post_data->fullname,
            ":password" => $post_data->password,
            ":email" => $post_data->email,
            ":hash" => generateRandomString(),
            ":privilege" => 'User',
        ));
    }
} catch (\Error $e) {
    $response['success'] = false;
    $response["error"] = $e->getMessage();
}
echo json_encode($response);
