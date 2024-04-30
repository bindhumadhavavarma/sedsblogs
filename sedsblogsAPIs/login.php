<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require __DIR__ . '/classes/Database.php';
require __DIR__ . '/classes/JwtHandler.php';

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

$db_connection = new Database();
$pdo = $db_connection->dbConnection();

$data = json_decode(file_get_contents("php://input"));
$returnData = [];

// IF REQUEST METHOD IS NOT EQUAL TO POST
if ($_SERVER["REQUEST_METHOD"] != "POST") :
    $returnData = msg(false, 404, 'Page Not Found!asd');

// CHECKING EMPTY FIELDS
elseif (
    !isset($data->username)
    || !isset($data->password)
    || empty(trim($data->username))
    || empty(trim($data->password))
) :

    $fields = ['fields' => ['username', 'password']];
    $returnData = msg(false, 422, 'Please Fill in all Required Fields!', $fields);

// IF THERE ARE NO EMPTY FIELDS THEN-
else :
    $username = trim($data->username);
    $password = trim($data->password);

    // IF PASSWORD IS LESS THAN 8 THE SHOW THE ERROR
    if (strlen($password) < 8) :
        $returnData = msg(false, 422, 'Your password must be at least 8 characters long!');

    // THE USER IS ABLE TO PERFORM THE LOGIN ACTION
    else :
        try {

            $query_stmt = $pdo->prepare("SELECT * FROM users WHERE users.username=:username");
            $query_stmt->execute(
                array(":username" => $username)
            );

            // IF THE USER IS FOUNDED BY EMAIL
            if ($query_stmt->rowCount()) :
                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);

                $check_password = ($password == $row['password']);

                // VERIFYING THE PASSWORD (IS CORRECT OR NOT?)
                // IF PASSWORD IS CORRECT THEN SEND THE LOGIN TOKEN
                if ($check_password) :
                    $jwt = new JwtHandler();
                    $token = $jwt->jwtEncodeData(
                        'http://localhost/FLICKAPIS/',
                        array("user_name" => $row['username'])
                    );
                    $userData = new stdClass();
                    $userData->id = $row['username'];
                    $userData->role = $row['privilege'];
                    $userData->fullName = $row['fullname'];
                    $userData->username = $row['username'];
                    $userData->email = $row['email'];
                    $returnData = [
                        'success' => true,
                        'message' => "you have successfully logged in",
                        'token' => $token,
                        'userData' => $userData,
                        "privilege" => $row['privilege']
                    ];


                // IF INVALID PASSWORD
                else :
                    $returnData = [
                        'success' => false,
                        'error' => "Invalid Username or Password!"
                    ];
                endif;

            // IF THE USER IS NOT FOUNDED BY EMAIL THEN SHOW THE FOLLOWING ERROR

            else :
                $returnData = [
                    'success' => false,
                    'error' => "Invalid Username or Password!"
                ];
            endif;
        } catch (PDOException $e) {
            $returnData = $returnData = [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }

    endif;

endif;

echo json_encode($returnData);
