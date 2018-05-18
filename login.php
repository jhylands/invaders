<?php
//cookie creation needed to keep single.php happy

//Check for the existance of the user session 
if(!isset($_SESSION['User'])){
    //the user has logged in
}else{

    //display some kind of login
}


?>
<script>
document.location.replace("single.php");	
</script>
