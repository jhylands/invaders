<?php
//check that the user has logged in
if(!isset($_COOKIE['User'])){
echo "<script>window.location.replace('login.php');</script>";
}
?>
