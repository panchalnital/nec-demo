<?php
//echo "test";exit;
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/database/Connection.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/app/Model/Users.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/database/request_config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/helper/Common.php';


class UserController
{
    
	public static function login($data)
	{
		try {
            if (!$data || empty($data['email']) || empty($data['password'])) 
            {
                return Common::createResponse('error', 'Missing required fields.', []);
            }
			$user= Users::selectUser($data);
            if(!empty($user) && password_verify($data['password'],$user[0]->password)){
                return Common::createResponse('success', 'Logged in successfully', $user);
            }else{
                return Common::createResponse('error', 'Incorrect login information.', []);
            }
		} catch (Exception $e) {
            return Common::createResponse('error', $e->getMessage(), []);
		}

	}

    public static function register($data)
	{
		try {
            if (!$data || empty($data['name']) || empty($data['email']) || empty($data['password'])) 
            {
                return Common::createResponse('error', 'Missing required fields.', []);
            }
            $checkAlrealyExit=$user= Users::fetchdata($data);
            if($checkAlrealyExit){
                return Common::createResponse('error', 'This user alreay sigup .', []);
            }
			$user= Users::save($data);
            if(!empty($user)){
                return Common::createResponse('success', 'sigup in successfully', $user);
            }else{
                return Common::createResponse('error', 'Incorrect register information.', []);
            }
		} catch (Exception $e) {
            return Common::createResponse('error', $e->getMessage(), []);
		}

	}
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if($data['action']=='login'){
        echo $data=UserController::login($data);
    }elseif($data['action']=='register'){
        echo $data=UserController::register($data);
    }
}

?>