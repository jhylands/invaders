
<?php
    session_start();

    require_once( 'Facebook/FacebookSession.php' );
    require_once( 'Facebook/FacebookRedirectLoginHelper.php' );
    require_once( 'Facebook/FacebookRequest.php' );
    require_once( 'Facebook/FacebookResponse.php' );
    require_once( 'Facebook/FacebookSDKException.php' );
    require_once( 'Facebook/FacebookRequestException.php' );
    require_once( 'Facebook/FacebookAuthorizationException.php' );
    require_once( 'Facebook/GraphObject.php' );

    use Facebook\FacebookSession;
    use Facebook\FacebookRedirectLoginHelper;
    use Facebook\FacebookRequest;
    use Facebook\FacebookResponse;
    use Facebook\FacebookSDKException;
    use Facebook\FacebookRequestException;
    use Facebook\FacebookAuthorizationException;
    use Facebook\GraphObject;

// init app with app id and secret
FacebookSession::setDefaultApplication('926962160664336', 'e1fa4d52846f8f4787cb25bd4da97308');

// login helper with redirect_uri
$helper = new FacebookRedirectLoginHelper( 'http://86.158.149.194/invaders/index.php' );

// see if a existing session exists
if ( isset( $_SESSION ) && isset( $_SESSION['fb_token'] ) ) {
  // create new session from saved access_token
  $session = new FacebookSession( $_SESSION['fb_token'] );
  echo $_SESSION['fb_token'];
// validate the access_token to make sure it's still valid
  try {
    if ( !$session->validate() ) {
      $session = null;
    }
  } catch ( Exception $e ) {
    // catch any exceptions
    echo "Error";
    $session = null;
  }

} else {
  // no session exists

  try {
    $session = $helper->getSessionFromRedirect();
  } catch( FacebookRequestException $ex ) {
    // When Facebook returns an error
    echo  $ex->message;
  } catch( Exception $ex ) {
    // When validation fails or other local issues
    echo $ex->message;
  }

}

// see if we have a session
if ( isset( $session ) ) {
  // save the session
  $_SESSION['fb_token'] = $session->getToken();
  // create a session using saved token or the new one we generated at login
  $session = new FacebookSession( $session->getToken() );

  // graph api request for user data
  $request = new FacebookRequest( $session, 'GET', '/me' );
  $response = $request->execute();
  // get response
  $graphObject = $response->getGraphObject()->asArray();

  // print profile data
  echo '<pre>' . print_r( $graphObject, 1 ) . '</pre>';

  // print logout url using session and redirect_uri (logout.php page should destroy the session)
  echo '<a href="' . $helper->getLogoutUrl( $session, 'http://86.158.149.194/invaders/logout.php' ) . '">Logout</a>';

} else {
  // show login url
  echo '<a href="' . $helper->getLoginUrl( array( 'email', 'user_friends' ) ) . '">Login</a>';
  }
?>
<h1>Text</h1>

