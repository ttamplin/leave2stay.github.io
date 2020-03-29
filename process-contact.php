<?php
$success = false;
$EmailFrom = "MFP Website <contact@mightyfinephotography.com>";
$EmailTo = "tristan@mightyfinephotography.com";
//$EmailTo = "tristan@versodesigncorp.com";

//remove escaping or magic quotes
$Subject = Trim(stripslashes($_POST['subject']));
$contactname = Trim(stripslashes($_POST['name']));
$contactemail = Trim(stripslashes($_POST['email'])); 
$message = Trim(stripslashes($_POST['message'])); 

// check for submission
//if ((!$Subject) || (!$contactname) || (!$contactemail)) {
//  print "<meta http-equiv=\"refresh\" content=\"0;URL=../index.php\">";
//  exit;
//}

if ( $Subject && $message ) {
// prepare email body text
$Body = "";
$Body .= "Sent from the website";
$Body .= "\n";
$Body .= "---------------------------------------\n\n";
$Body .= "Name: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "\n";
$Body .= "Message: \n";
$Body .= $message;
$Body .= "\n";
$Body .= "\n";

// send email 
	$success = mail($EmailTo, $Subject, $Body, "From: $EmailFrom");

//send response
	$result = array("status" => "1");
} else{
	$result = array("status" => "0");
}
//header( 'Content-Type: application/json' );
echo json_encode($result);
?>
