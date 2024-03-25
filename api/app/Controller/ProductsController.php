<?php
//echo "test";exit;
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/database/Connection.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/app/Model/Products.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/database/request_config.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/helper/Common.php';

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

class ProductsController
{
    
	public static function list($data)
	{
        try {
            if (!$data || empty($data['user_id'])) 
            {
                return Common::createResponse('error', 'Missing required fields.', []);
            }
            $data=Products::fetchdata($data);
            if(!empty($data)){
                return Common::createResponse('success', 'file list successfully', $data);
            }else{
                return Common::createResponse('error', 'Incorrect file not avaiable information.', []);
            }
        } catch (Exception $e) {
            return Common::createResponse('error', $e->getMessage(), []);
        }

    }

   
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if($data && $data['action']=='list'){
        $data = json_decode(file_get_contents('php://input'), true);
        echo $data=ProductsController::list($data);
    }elseif($_POST['action']=='saveFile'){
        try {
            if (empty($_FILES['file']['name']) || empty($_POST['user_id']))
            {
                return Common::createResponse('error', 'Missing required fields.', []);
            }
            $upload_directory = $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/upload/';
            $filename = $_FILES['file']['name'];

            // destination of the file on the server
            $destination = $_SERVER['DOCUMENT_ROOT'].'/nce-demo/api/upload/' . $filename;
        
            // get the file extension
            $extension = pathinfo($filename, PATHINFO_EXTENSION);
        
            // the physical file on a temporary uploads directory on the server
            $file_name_array = explode(".", $_FILES['file']['name']);
            $file_name = time() . '.' . end($file_name_array);

            $upload_file = $upload_directory . $file_name;
            $path='/nce-demo/api/upload/' . $file_name;
            if (!in_array($extension, ['png', 'jpg', 'jpeg'])) {
                echo Common::createResponse('error', 'You file extension must be .png, .jpg or .jpeg', []);
            } elseif ($_FILES['file']['size'] > 1000000) { // file shouldn't be larger than 1Megabyte
                echo Common::createResponse('error', 'File too large!', []);
            }

            $userID=$_POST['user_id'];
            if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) {
			    $user= Products::save($userID,$file_name,$path);
            }
            //var_dump($user);exit;
            if($user==1){
                echo Common::createResponse('success', 'Save file in successfully',[]);
            }else{
                echo Common::createResponse('error', 'Incorrect file format.', []);
            }

        } catch (Exception $e) {
            echo Common::createResponse('error', $e->getMessage(), []);
		}
        //echo $data=ProductsController::saveFile($_FILES['file'],$_POST);
    }
    
}

?>