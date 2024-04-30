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
    if ($auth_data['success']) {
        $fileData = $_FILES['imagefile'];
        $filename = $fileData['name'];
        $destination = "uploads/" . $filename; 
        if (move_uploaded_file($fileData['tmp_name'], $destination)) {
            $stmt = $pdo->prepare("insert into blogs (title,description,content,author,username,imagelink) values (:title,:description,:content,:author,:username,:imagelink)");
            $stmt->execute(array(
                ":title" => $_POST["title"],
                ":description" => $_POST["description"], 
                ":content" => $_POST["content"], 
                ":author" => $_POST["author"], 
                ":username" => $_POST["username"], 
                ":imagelink" => $filename
            ));

            if ($stmt->rowCount() > 0) {
                $response['success'] = true;
            } else {
                $response['success'] = false;
                $response['error'] = "Failed to insert data into database";
            }
        } else {
            $response['success'] = false;
            $response['error'] = "Failed to upload file: $filename";
        }
    } else {
        $response['success'] = false;
        $response['error'] = "Invalid User Token. Access Forbidden.";
    }
} catch (\Error $e) {
    $response['success'] = false;
    $response["error"] = $e->getMessage();
}
echo json_encode($response);
?>
