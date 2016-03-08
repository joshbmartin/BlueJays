<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    
        echo json_encode(db_select("StudentTutor", "email", $_GET["email"]));   
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    if (db_select("StudentTutor", "google_id", $data["google_id"]) == NULL){
        db_insert("StudentTutor", $data);   
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("StudentTutor", $data, "google_id");
}

?>