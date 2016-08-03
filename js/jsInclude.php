<?php
/*
 * File to compile the javascript MVC into a single include
 */

header('Content-Type: application/javascript');
$path = "MVC/";
list_all_files($path);

function list_all_files($path) {
  $handle = opendir($path);
  while ($file = readdir($handle)) {
    if($file != '.' && $file != '..') {
      if(is_dir("$path/$file")) {
	list_all_files("$path/$file");
      }else{
          readfile("$path/$file");
      }
    }
  }
  closedir($handle);
}
