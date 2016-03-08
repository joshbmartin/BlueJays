<?php

function connectSql(){
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tutorme";
    
    $connection = new mysqli($servername, $username, $password, $dbname);
    
    if (!$connection){
        die("Connection failed: " . mysqli_connect_error());
    }
    
    return $connection;
    
}

function query($q, $conn) {
		$resultTmp = $conn->query($q);
		$result = array();

		if ($resultTmp->num_rows > 0) {
			while($row = $resultTmp->fetch_assoc()) {
				$result[] = $row;
			}
			return $result;
		}
		return null;
	}

	function queryrun($q, $conn) {
		$conn->query($q);
	}

function db_insert($table, $values) {
		date_default_timezone_set('America/New York');

		$q = "INSERT INTO " . $table . " (";
		foreach (array_keys($values) as $key) {
			$q .= $key . ",";
		}
		$q = rtrim($q, ",");
		$q .= ") VALUES (";

		foreach (array_values($values) as $val) {
			$d = DateTime::createFromFormat('m/d/Y', $val);
			if ($d != false) {
				$val = $d->format('Y-m-d');
			}
			$q .= "'" . htmlspecialchars($val, ENT_QUOTES) . "',";
		}
		$q = rtrim($q, ",");
		$q .= ");";

		queryrun($q, connectSql());
	}

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

	function db_select($table, $idcol, $idval) {
		$q = "SELECT * FROM " . $table . " WHERE " . $idcol . "='" . $idval . "'";
		return query($q, connectSql());
	}

	function db_delete($table, $idcol, $idval) {
		$q = "DELETE FROM " . $table . " WHERE " . $idcol . "='" . $idval . "'";
		queryrun($q, connectSql());
	}

?>