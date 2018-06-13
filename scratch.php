<html>

<head>

</head>

<body>
<?php $connection=mysqli_connect("us-cdbr-iron-east-04.cleardb.net","ba0b60ac1d5620", "5364677") or die("Couldn't connect to server");

$db = mysqli_select_db("$connection", "users")
or die("Couldn't connect to database");

$uid = $_REQUEST["uid"];
$name = $_REQUEST["name"];
$pwd = $_REQUEST["pwd"];
$sql = "INSERT INTO users (name, uid, pwd)
VALUES ($uid, $name, $pwd)";

if(mysqli_query("$connection", "$sql")){
    echo 'perfect';
}
else
{
    echo "error";
}
mysqli_close("$connection");
?>

</body>

</html>