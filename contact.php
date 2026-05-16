<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method not allowed"]);
    exit();
}

$input = json_decode(file_get_contents("php://input"), true);

$name    = trim($input["name"] ?? "");
$email   = trim($input["email"] ?? "");
$message = trim($input["message"] ?? "");

$errors = [];

if (empty($name)) {
    $errors[] = "Name is required.";
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "A valid email is required.";
}
if (empty($message)) {
    $errors[] = "Message is required.";
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(["success" => false, "errors" => $errors]);
    exit();
}

// In a real deployment you would send an email here via mail() or an SMTP library.
// For now we log the submission to a local file as proof of receipt.
$log_line = date("Y-m-d H:i:s") . " | Name: $name | Email: $email | Message: " . str_replace("\n", " ", $message) . PHP_EOL;
file_put_contents(__DIR__ . "/submissions.log", $log_line, FILE_APPEND | LOCK_EX);

http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Thanks $name! Your message has been received."
]);
