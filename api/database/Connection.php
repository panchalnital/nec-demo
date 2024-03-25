<?php

/*

Singleton Design Pattern

Using singleton pattern to connect to the database.
This means that there is only one instance of the Connection class in the entire app
*/

abstract class Connection
{
	private static $conn;

	public static function getConn()
	{
		// the self keyword is for referencing static variables
        // because it is static, it is not possible to call using the word $this
		if (self::$conn == null) {
			self::$conn = new PDO(
				dsn: 'mysql: host=localhost; dbname=necsystem;',
				username:'root',
				password:'',
				options: array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING)); // https://www.php.net/manual/en/pdo.error-handling.php
				// ↑ This setting is useful during debugging/testing, if you just want to see what problems occurred without interrupting the flow of the application.
		}

		return self::$conn;
	}
}

// var_dump(Connection::getConn());
// var_dump(Connection::getConn());