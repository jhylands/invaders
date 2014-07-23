<?php

FacebookSession::setDefaultApplication('926962160664336', 'e1fa4d52846f8f4787cb25bd4da97308');
Facebook with the getSessionFromRedirect() method, which returns a FacebookSession.

$helper = new FacebookRedirectLoginHelper('your redirect URL here');
$loginUrl = $helper->getLoginUrl();
// Use the login url on a link or button to redirect to Facebook for authentication

$helper = new FacebookJavaScriptLoginHelper();
try {
  $session = $helper->getSession();
} catch(FacebookRequestException $ex) {
  // When Facebook returns an error
} catch(\Exception $ex) {
  // When validation fails or other local issues
}
if ($session) {
  // Logged in
}

use Facebook\FacebookRequest;
use Facebook\GraphUser;
use Facebook\FacebookRequestException;

if($session) {

  try {

    $user_profile = (new FacebookRequest(
      $session, 'GET', '/me'
    ))->execute()->getGraphObject(GraphUser::className());

    echo "Name: " . $user_profile->getName();

  } catch(FacebookRequestException $e) {

    echo "Exception occured, code: " . $e->getCode();
    echo " with message: " . $e->getMessage();

  }   

}
?>
