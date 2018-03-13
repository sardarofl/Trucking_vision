<?php
// connect to the database

//// if this page was not called by AJAX, die
//if (!$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') die('Invalid request');

// get variable sent from client-side page
$my_variable = isset($_POST['my_variable']) ? strip_tags($_POST['my_variable']) :null;

$forms_id = $_GET['id'];
//$forms_rate = 156;
echo $forms_id;
//////////////////////got a number? now put it on database/////////
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "trucking";
// Create connection




// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$sql = "DELETE FROM categories WHERE id = '$forms_id'";
if (mysqli_query($conn, $sql)) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . mysqli_error($conn);
}




mysqli_close($conn);


header("Location: Categories.php");

?>
