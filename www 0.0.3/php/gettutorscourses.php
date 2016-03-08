<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    //if (strlen($_GET["course_id"]) <= 4) {
        echo json_encode(db_select("TutorCoursesRelation", "email", $_GET["id"]));
//}
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
        db_insert("Request", $data);  
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("Request", $data, "to_email");
}

?>