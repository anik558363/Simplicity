<?php

/**
 * Contact Form Mail Handler
 * ---------------------------------------------------------
 * On a valid form submit this script sends TWO emails:
 *   1) A notification email to YOU (the business owner) with
 *      the submitted name, phone, email, subject and message.
 *   2) An automatic "Thank you" reply email back to the person
 *      who filled the form, sent to the email address they typed.
 *
 * Requires PHPMailer. Install it with Composer:
 *   composer require phpmailer/phpmailer
 *
 * If your hosting has no SSH/Composer access, download PHPMailer's
 * "src" folder manually from https://github.com/PHPMailer/PHPMailer
 * and require the 3 files directly instead of vendor/autoload.php
 * (see the commented alternative below).
 * ---------------------------------------------------------
 */

header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/vendor/autoload.php';

// --- Manual install alternative (no Composer) ---
// require __DIR__ . '/PHPMailer/src/Exception.php';
// require __DIR__ . '/PHPMailer/src/PHPMailer.php';
// require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/* =========================================================
   CONFIG — fill these in with your real mail account details
   ========================================================= */

$smtpHost     = 'mail.anikmondol.tech';    // cPanel-er default mail hostname
$smtpUsername = 'info@anikmondol.tech';    // tomar cPanel-e create kora email
$smtpPassword = 'yu$V.Zb[V~)S#!;;'; // ei email account-er REAL password (cPanel-e create korar shomoy je password disho)
$smtpPort     = 587;                       // 587 = TLS (age try koro)
$smtpSecure   = PHPMailer::ENCRYPTION_STARTTLS;

$adminEmail   = 'info@anikmondol.tech';    // submission ei email-e ashbe — nijer domain email
$adminName    = 'Anik Mondol';             // tomar naam, ba business naam

$fromEmail    = 'info@anikmondol.tech';    // smtpUsername-er shathe MATCH korte hobe
$fromName     = 'Anik Mondol Tech';        // sender name — email-e ei naam dekhabe

/* ========================================================= */


function respond(bool $success, string $message): void
{
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request.');
}

// Honeypot check — real visitors never fill this hidden field, bots often do
if (!empty($_POST['website'])) {
    respond(false, 'Submission rejected.');
}

$name    = trim(strip_tags($_POST['name']    ?? ''));
$email   = trim(filter_var($_POST['email']   ?? '', FILTER_SANITIZE_EMAIL));
$phone   = trim(strip_tags($_POST['phone']   ?? ''));
$subject = trim(strip_tags($_POST['subject'] ?? ''));
$message = trim(strip_tags($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $phone === '' || $subject === '' || $message === '') {
    respond(false, 'Please fill in all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please enter a valid email address.');
}

/* ---------------------------------------------------------
   1) Notification email -> goes to YOU (the admin)
   --------------------------------------------------------- */
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUsername;
    $mail->Password   = $smtpPassword;
    $mail->SMTPSecure = $smtpSecure;
    $mail->Port       = $smtpPort;

    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($adminEmail, $adminName);
    $mail->addReplyTo($email, $name); // hitting "Reply" in your inbox replies straight to the customer

    $mail->isHTML(true);
    $mail->Subject = 'New Contact Message: ' . $subject;
    $mail->Body    = '
        <h3>New message from your website contact form</h3>
        <p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>
        <p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>
        <p><strong>Phone:</strong> ' . htmlspecialchars($phone) . '</p>
        <p><strong>Subject:</strong> ' . htmlspecialchars($subject) . '</p>
        <p><strong>Message:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>
    ';
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone\nSubject: $subject\n\nMessage:\n$message";

    $mail->send();
} catch (Exception $e) {
    respond(false, 'Message could not be sent right now. Please try again later.');
}

/* ---------------------------------------------------------
   2) Auto-reply email -> goes back to the person who submitted
   --------------------------------------------------------- */
try {
    $reply = new PHPMailer(true);
    $reply->isSMTP();
    $reply->Host       = $smtpHost;
    $reply->SMTPAuth   = true;
    $reply->Username   = $smtpUsername;
    $reply->Password   = $smtpPassword;
    $reply->SMTPSecure = $smtpSecure;
    $reply->Port       = $smtpPort;

    $reply->setFrom($fromEmail, $fromName);
    $reply->addAddress($email, $name);

    $reply->isHTML(true);
    $reply->Subject = 'Thanks for reaching out, ' . $name . '!';
    $reply->Body    = '
        <p>Hi ' . htmlspecialchars($name) . ',</p>
        <p>Thank you for contacting <strong>Simplicity</strong>. We\'ve received your message and
        our team will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong><br>' . nl2br(htmlspecialchars($message)) . '</p>
        <br>
        <p>Best regards,<br>Simplicity by TracyINC</p>
    ';
    $reply->AltBody = "Hi $name,\n\nThank you for contacting Simplicity. We've received your message "
        . "and will get back to you within 24 hours.\n\nYour message:\n$message\n\nBest regards,\n"
        . "Simplicity by TracyINC";

    $reply->send();
} catch (Exception $e) {
    // The admin already got the notification successfully above — an auto-reply
    // failure (e.g. the visitor typed a bad email) should not fail the whole request.
}

respond(true, 'Thank you! Your message has been sent successfully.');
