<?php 

class Products 
{
    public static function save($userID,$file_name,$path)
    {
        
        $con = Connection::getConn();
        //$passwordEncrpt=password_hash($data['password'],PASSWORD_DEFAULT);
        $sql = "INSERT INTO products (user_id, file_name, file_path) VALUES (:user_id, :file_name, :file_path)";
        $sql = $con->prepare($sql);
        $sql->bindValue(':user_id', $userID);
        $sql->bindValue(':file_name', $file_name);
        $sql->bindValue(':file_path', $path);
        $sql->execute();

        if ($sql->rowCount()) {
            //$results =self::fetchdata($data);
            return 1;
        }
        

    }

    //fetch data
    public static function fetchdata($data)
    {
        $con = Connection::getConn();
        $sql = "SELECT * FROM products WHERE user_id = :user_id";
        $sql = $con->prepare($sql);
        $sql->bindValue(':user_id', $data['user_id']);
        $sql->execute();

        $results = array();

        while ($row = $sql->fetchObject('products')) {
            $results[] = $row;
        }
        return $results;
    }
}

?>