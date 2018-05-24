<?php
//COMMAND:rescode;
//HELP:rescode #A program to get information about resource codes.;

//include a command line table maker
include 'scripts/LineTable.php';
/**
 * Description of RescourceHandler
 *Console program to find the codes of resources
 * @author jameshylands
 */
class RescourceHandler extends Handler{
    function __construct($con,$ship){
        $this->con = $con;
        $this->ship = $ship;
    }
    function handle($command){
        switch($command[1]){
            case 'all':
                return $this->all();
                break;
            case 'code2name':
                return $this->code2name($command[2]) . "<br />";
                break;
            case 'name2code':
                return $this->name2code($command[2]). "<br />";
                break;
            default :
               return "resode is a program that allows you to find out information about resources.<br />all # Shows all resource names and their codes.<br />code2name #given a code displays the name of that code.<br />name2code #Given a name gives the respective code for that name.<br />";
        }
    }
    /**
     * Function to display all the resources and their codes
     */
    function all(){
        //What we are tring to do is 
        $QRY = "SELECT Name,Code From resources";
        $result = mysqli_query($this->con,$QRY);
        $data = [['<b>Name</b>','<b>Code</b>']];
        while($row = mysqli_fetch_array($result)){
            $data[] = [$row['Name'],$row['Code']];
        }
        
        return "The codes are a follows:<br />" . table2HTML($data);
    }
    
    function code2name($Code){
        $res = new Resource($this->con);
        $res->fromCode($Code);
        return $res->getName();
    }
    
    function name2code($Name){
        $res = new Resource($this->con);
        $res->fromName($Name);
        return $res->getCode();
    }
}
