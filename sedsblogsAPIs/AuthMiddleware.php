<?php
require __DIR__ . '/classes/JwtHandler.php';

class Auth extends JwtHandler
{
    protected $db;
    protected $headers;
    protected $token;

    public function __construct($db, $headers)
    {
        parent::__construct();
        $this->db = $db;
        $this->headers = $headers;
    }

    public function isValid()
    {

        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {

            $data = $this->jwtDecodeData($matches[1]);
            if (
                isset($data['data']->user_name) &&
                $user = $this->fetchUser($data['data']->user_name)
            ) :
                return [
                    "success" => true,
                    "userData" => $user,
                ];
            else :
                return [
                    "success" => false,
                    "message" => $data["message"],
                ];
            endif;
        } else {
            return [
                "success" => false,
                "message" => "Token not found in request"
            ];
        }
    }

    protected function fetchUser($user_id)
    {
        try {
            $query_stmt = $this->db->prepare("SELECT * FROM users WHERE users.username=:id");
            $query_stmt->execute(
                array(
                    ":id" => $user_id
                )
            );
            if ($query_stmt->rowCount()) {

                $row = $query_stmt->fetch(PDO::FETCH_ASSOC);
                $userData = new stdClass();
                $userData->id = $row['username'];
                $userData->role = $row['privilege'];
                $userData->fullName = $row['fullname'];
                $userData->username = $row['username'];
                $userData->email = $row['email'];
                return $userData;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return null;
        }
    }
}
