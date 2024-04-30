<?php
class Database{
    
    // CHANGE THE DB INFO ACCORDING TO YOUR DATABASE
    private $db_host = 'localhost';
    private $db_name = 'sedsblogs';
    private $db_username = 'root';
    private $db_password = '';
    
    
    public function dbConnection(){
        
        try{
            $pdo = new PDO('mysql:host='.$this->db_host.';dbname='.$this->db_name,$this->db_username,$this->db_password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        }
        catch(PDOException $e){
            echo "Connection error ".$e->getMessage(); 
            exit;
        }
          
    }
}