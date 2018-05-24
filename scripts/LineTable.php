<?php
/*
 * Big thankyou to Rick Jenks for the code
 * https://richjenks.com/php-cli-table/
 * 
 * 
 */
function table($data) {
 
    // Find longest string in each column
    $columns = [];
    foreach ($data as $row_key => $row) {
        foreach ($row as $cell_key => $cell) {
            $length = strlen($cell);
            if (empty($columns[$cell_key]) || $columns[$cell_key] < $length) {
                $columns[$cell_key] = $length;
            }
        }
    }
 
    // Output table, padding columns
    $table = '';
    foreach ($data as $row_key => $row) {
        foreach ($row as $cell_key => $cell)
            $table .= str_pad($cell, $columns[$cell_key]) . '   ';
        $table .= "<br />";
    }
    return $table;
 
}

function table2HTML($data){
    $HTML = "<table>";
    foreach($data as &$row){
        $HTML.="<tr>";
        foreach($row as &$cell){
            $HTML.="<td>$cell</td>";
        }
        $HTML.="</tr>";
    }
    $HTML .="</table>";
    return $HTML;
}
