<?php
/**
 * Description of Table
 *
 * @author jameshylands
 */
class Table {
    private $data;
    private $refresh;
    protected $link;
    public static $tableName;
    //protected static $ColumnPosibility;


    
   /* public static function get($type ,$link, $condition =""){
        $table = $type::$tableName;
        $query = "SELECT * FROM $table";
        $results = mysqli_query($link, $query);
        if(!$results){echo "GT:" . $query;array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));return False;}
        foreach($resultss as &$result){
            $objects[] = new $type($link, $result,true);
        }
        return $objects;
    }*/
    
    /**
     * public facing function to insert into a table
     * @param SQL_connection $link
     * @param Dictionary $data
     * @param Class $type
     * @return INT  The id of the insert
     */
    /*
    public static function insert($link,$data,$type){
        //array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));
        $cleanData = array();
        foreach ($type::$ColumnPosibility as $pos){
            if(isset($data[$pos])){
                $cleanData[$pos]=  mysqli_real_escape_string($link,$data[$pos]);
            }
        }
        if(self::runInsert($link,$cleanData,$type)){
            return mysqli_insert_id($link);
        }else{
            return FALSE;
        }
    }*/
    
    /**
     * Public facing function to update information in a table
     * @param SQL_connection $link
     * @param Dictionary $data
     * @param Class $type
     * @return Boolean If the update worked
     */
    /*
    public static function update($link,$data,$type){
        //array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));
        $cleanData = array();
        foreach ($type::$ColumnPosibility as $pos){
            if(isset($data[$pos])){
                $cleanData[$pos]=  mysqli_real_escape_string($link,$data[$pos]);
            }
        }
        \debug($cleanData);
        return self::runUpdate($link,$cleanData,$type);
        
    }*/
    
    /**
     * Function to insert new user into a table
     * Requires the keys in data to be Columns in the table
     * @param SQL_connection $link Description
     * @param Dictionary $data Must have cleaned Strings
     * @param Class $type Static class object
     * @return Boolean Result of insertion
     */
    /*
    private static function runInsert($link,$data,$type){
        $columns = "(";
        $values = " values(";
        $query = "Insert Into " . $type::$tableName . " ";
        foreach($data as $column =>$value){
            $columns .=  $column . "," ;
            $values .= "'" . $value . "',";
        }
        $values = substr($values, 0,-1);
        $values .=")";
        $columns = substr($columns, 0, -1);
        $columns .=")";
        $query .= $columns . $values;
        //\debug($query);
        return  mysqli_query($link, $query);      
    }*/
    
    /**
     * Function to update a table
     * Requires the keys in data to be columns in the table
     * @param SQL_connection $link
     * @param Dictionary $data Must have cleaned strings
     * @param Class $type Static class object
     * @return Boolean Result of Update
     */
    /*
    private static function runUpdate($link,$data,$type){
        //check that the ID field is in the key so that the entry can be identified
        if(isset($data[$type::$IDName])){
            $query = "Update " . $type::$tableName . " set ";
            foreach($data as $column =>$value){
                $query .= $column . "='$value' ,";
            }
            $query=substr($query,0,-1);//trim the last comma of the list
            $query .= "where " . $type::$IDName . "='" . $data[$type::$IDName] . "' limit 1";
            \debug($query);
            return  mysqli_query($link, $query);  
        }else{
            return FALSE;
        }
        
    }
    
     */
   public function __construct($link ,$data,$type) {
       //if type is true the data is SQL_row, otherwise it is ID
       if($type){
           $this->data = $data;
       }
       $this->refresh = !$type;
       $this->link=$link;
   }
   
   //abstract function getID();
   
    protected function getRow($table,$column,$columnValue){ 
        if($this->refresh){
            $this->table = $table;
            $this->columnName = $column;
            $query = "select * from %s where %s=%s limit 1";
            //echo $query . "<br />";
            $results = $db->query( $query,[$table,$column,$columnValue]);
            if(!$results){echo "GR:" . $query;array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));return False;}
            $this->data =  mysqli_fetch_array($results);
            $this->refresh = false;
        }
        return $this->data;
    }
    
    

    
    
    /**
     * 
     * @param String $table
     * @param String $column
     * @param String $thisColumn
     * @param INT $id
     * @param Class $make
     * @return boolean|\make
     */
    protected function getForeign($table,$thisColumn,$id,$make){
        $query = "select * from %s where %s=%d";
        $results = $db->query( $query,[$table,$thisColumn,$id]);
        if(!$results){echo "GF:" . $query ;array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));return False;}
        $things = array();
        foreach($resultss as &$result){
            $things[] = new $make($this->link,$result,true);
        }
        return $things;
    }
    public function getLink(){
        return "error.php?error=getLinkFunctonNotOverwitten";
    }
    
    //attempt at generalisation
    function getForiegnkey(){
        $query = "SHOW INDEXES IN <tablename>";
    }
    
    public function getColumn($column){
        if( isForiegnKey($column)){
            //get from other table
        }elseif(isset($this->data[$column])){
            return $this->data[$column];
        }else{
            throw new Exception("column doesn't exist");
        }
    }
    
    protected function set($column,$value){
        //clean $value
        //clean($value)
        $table = $this->table;
        $idColumn = $this->columnName;
        $query = "Update %s SET %s='?' WHERE %s=%d";
        echo $query;
        return $db->query($query,[$table,$column,$value,$idColumn,$this->getID()]);
    }
    /*
       //does this need column?
    protected function getRow($table,$column,$columnValue){ 
        if(isset($this->data)){
            $query = "select * from $table where $column=$columnValue limit 1";
            $results = $db->query( $query);
            if(!$results){echo "GR:" . $query;array_walk(debug_backtrace(),create_function('$a,$b','print "{$a[\'function\']}()(".basename($a[\'file\']).":{$a[\'line\']}); ";'));return False;}
            $this->data = mysqli_fetch_array($results);
        }
        return $this->data;
    }*/
}
