<?php
//require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/database/Connection.php';
/*
The Model in php using the MVC design pattern will be responsible for connecting
and perform database queries.
In other words, the entire business rule is encapsulated in the Model
*/

class Users 
{
		public static function selectUser($data)
		{
			$con = Connection::getConn();
			$sql = "SELECT * FROM users WHERE email = :email";
			$sql = $con->prepare($sql);
			$sql->bindValue(':email', $data['email']);
			$sql->execute();

			$results = array();

			while ($row = $sql->fetchObject('users')) {
				$results[] = $row;
			}
			return $results;
		}

		public static function save($data)
		{
			
			$con = Connection::getConn();
            $passwordEncrpt=password_hash($data['password'],PASSWORD_DEFAULT);
			$sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
			$sql = $con->prepare($sql);
			$sql->bindValue(':name', $data['name']);
			$sql->bindValue(':email', $data['email']);
			$sql->bindValue(':password', $passwordEncrpt);
			$sql->execute();

			if ($sql->rowCount()) {
				$results =self::fetchdata($data);
			}
            return $results;

		}

        //fetch data
        public static function fetchdata($data)
		{
			$con = Connection::getConn();
			$sql = "SELECT * FROM users WHERE email = :email";
			$sql = $con->prepare($sql);
			$sql->bindValue(':email', $data['email']);
			$sql->execute();

			$results = array();

			while ($row = $sql->fetchObject('users')) {
				$results[] = $row;
			}
			return $results;
		}
	}

    //Users::selectUser(1);
?>