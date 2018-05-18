
<?php
ob_start();
header('X-Frame-Options: SAMEORIGIN');
/*
UserSpice 4
An Open Source PHP User Management System
by the UserSpice Team at http://UserSpice.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
?>
<?php require_once $abs_us_root.$us_url_root.'users/helpers/helpers.php'; ?>
<?php require_once $abs_us_root.$us_url_root.'users/includes/user_spice_ver.php'; ?>

<?php
//check for a custom page
$currentPage = currentPage();
if(isset($_GET['err'])){
	$err = Input::get('err');
}

if(isset($_GET['msg'])){
	$msg = Input::get('msg');
}

if(file_exists($abs_us_root.$us_url_root.'usersc/'.$currentPage)){
	if(currentFolder() == 'users'){
		$url = $us_url_root.'usersc/'.$currentPage;
		if(isset($_GET)){
			$url .= '?'; //add initial ?
			foreach ($_GET as $key=>$value){
				$url .= '&'.$key.'='.$value;
			}
		}
		Redirect::to($url);
	}
}

$db = DB::getInstance();
$settingsQ = $db->query("Select * FROM settings");
$settings = $settingsQ->first();

//dealing with logged in users
if($user->isLoggedIn() && !checkMenu(2,$user->data()->id)){
	if (($settings->site_offline==1) && (!in_array($user->data()->id, $master_account)) && ($currentPage != 'login.php') && ($currentPage != 'maintenance.php')){
		//:: force logout then redirect to maint.page
		logger($user->data()->id,"Offline","Landed on Maintenance Page."); //Lggger
		$user->logout();
		Redirect::to($us_url_root.'users/maintenance.php');
	}
}

//deal with guests
if(!$user->isLoggedIn()){
	if (($settings->site_offline==1) && ($currentPage != 'login.php') && ($currentPage != 'maintenance.php')){
		//:: redirect to maint.page
		logger(1,"Offline","Guest Landed on Maintenance Page."); //Logger
		Redirect::to($us_url_root.'users/maintenance.php');
	}
}

//notifiy master_account that the site is offline
if($user->isLoggedIn()){
	if (($settings->site_offline==1) && (in_array($user->data()->id, $master_account)) && ($currentPage != 'login.php') && ($currentPage != 'maintenance.php')){
		err("<br>Maintenance Mode Active");
	}
}

if($settings->glogin==1 && !$user->isLoggedIn()){
	require_once $abs_us_root.$us_url_root.'users/includes/google_oauth.php';
}

if ($settings->force_ssl==1){

	if (!isset($_SERVER['HTTPS']) || !$_SERVER['HTTPS']) {
		// if request is not secure, redirect to secure url
		$url = 'https://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		Redirect::to($url);
		exit;
	}
}
require_once $abs_us_root.$us_url_root.'usersc/includes/security_headers.php';

//if track_guest enabled AND there is a user logged in
if($settings->track_guest == 1 && $user->isLoggedIn()){
	if ($user->isLoggedIn()){
		$user_id=$user->data()->id;
	}else{
		$user_id=0;
	}
	new_user_online($user_id);

}

if($user->isLoggedIn() && $currentPage != 'user_settings.php' && $user->data()->force_pr == 1) Redirect::to($us_url_root.'users/user_settings.php?err=You+must+change+your+password!');

if(substr($us_url_root,1).$currentPage == currentFolder().'/'.$currentPage){
	$find = $currentPage;
}else{
	$find = currentFolder().'/'.$currentPage;
}
$titleQ = $db->query('SELECT title FROM pages WHERE page = ?', array($find));
if ($titleQ->count() > 0) {
    $pageTitle = $titleQ->first()->title;
}
else $pageTitle = '';
?>
