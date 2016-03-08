<?php
include "core.php";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if ($_SERVER["REQUEST_METHOD"] == "GET"){
    if (ctype_digit($_GET["id"])){
        echo json_encode(db_select("StudentTutor", "google_id", $_GET["id"]));
    } else {
        echo "ERROR!!! You have included something strange with your request.";
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    if (db_select("Courses", "course_id", $data["course_id"]) != NULL){
        if (query("SELECT * FROM StudentCoursesRelation WHERE email='".$data["email"]."' AND course_id='".$data["course_id"]."';", connectSql()) != NULL){
             queryrun("UPDATE StudentCoursesRelation SET is_active=1 WHERE email='".$data["email"]."' AND course_id='".$data["course_id"]."';", connectSql());
        } else {
             db_insert("StudentCoursesRelation", $data);   
        }
       
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    db_update("StudentCourseRelation", $data, "email");
}

?>