<?php

/*

Common helper class for log error and error return

*/

class Common
{
	public static function createResponse($status, $message, $data = []) 
    {
        $response = 
        [
            'status' => $status,
            'message' => $message,
            'data' => $data
        ];
        return json_encode($response);
    }
	
}
