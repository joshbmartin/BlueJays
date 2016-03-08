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
        db_insert("StudentCoursesRelation", $data);   
    }
    
    
} else if ($_SERVER["REQUEST_METHOD"] == "PUT"){
    //db_update("StudentCoursesRelation", $data, "email");
    //queryrun($q, connectSql());
    //"UPDATE SCR SET is_active=0 WHERE email='' AND course_id=''"
  
  /*
  
  function db_update($table, $values, $idcol) {
		date_default_timezone_set('America/New York');

		$q = "UPDATE " . $table . " SET ";
		foreach ($values as $key => $val) {
			if ($key != $idcol) {
				$d = DateTime::createFromFormat('m/d/Y', $val);
				if ($d != false) {
					$val = $d->format('Y-m-d');
				}
				$q .= $key . "='" . htmlspecialchars($val, ENT_QUOTES) . "',";
			}
		}
		$q = rtrim($q, ",");
		$q .= " WHERE " . $idcol . "='" . $values[$idcol] . "'";

		queryrun($q, connectSql());
	}
  
  */
  
  
    //queryrun("UPDATE StudentCoursesRelation SET is_active='".htmlspecialchars(false, ENT_QUOTES)."' WHERE email='".$data["email"]."' AND course_id='"+$data["course_id"]."'", connectSql());
    //queryrun("UPDATE StudentCoursesRelation SET is_active='".false."' WHERE email='".$data["email"]."' AND course_id='"+$data["course_id"]."'", connectSql());
    queryrun("UPDATE StudentCoursesRelation SET is_active=0 WHERE email='".$data["email"]."' AND course_id='".$data["course_id"]."';", connectSql());
}

?>