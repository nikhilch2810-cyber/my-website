
<?php
// submit_demo.php

// -----------------------------
// 1. ERROR REPORTING (DEV ONLY)
// -----------------------------
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Always return JSON
header('Content-Type: application/json');

// -----------------------------
// 2. DATABASE CONFIG
// -----------------------------
$host     = "localhost";
$dbname   = "website";
$user     = "postgres";
$password = "1234"; // change on server
$port     = "5433";

// -----------------------------
// 3. CONNECT TO POSTGRES
// -----------------------------
$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";
$db = pg_connect($conn_string);

if (!$db) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

// -----------------------------
// 4. HANDLE POST REQUEST
// -----------------------------
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

// -----------------------------
// 5. COLLECT FORM DATA
// -----------------------------
$firstName      = trim($_POST['firstName'] ?? '');
$lastName       = trim($_POST['lastName'] ?? '');
$address        = trim($_POST['address'] ?? '');
$email          = trim($_POST['email'] ?? '');
$contactNumber  = trim($_POST['contactNumber'] ?? '');
$region         = trim($_POST['region'] ?? '');
$message        = trim($_POST['message'] ?? '');

// -----------------------------
// 6. INSERT INTO DATABASE
// -----------------------------
$query = "
    INSERT INTO demo_requests
    (first_name, last_name, address, email, contact_number, region, message)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
";

$result = pg_query_params($db, $query, [
    $firstName,
    $lastName,
    $address,
    $email,
    $contactNumber,
    $region,
    $message
]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save data"
    ]);
    exit;
}

// -----------------------------
// 7. EMAIL LOGIC (COMPANY MAIL)
// -----------------------------
$to = "nikhilch2810@gmail.com";
$subject = "New Demo Request - $firstName $lastName";

$body = "New Demo Request Received

Name: $firstName $lastName
Email: $email
Phone: $contactNumber
Region: $region
Address: $address

Message:
$message
";

$headers  = "From: kaptaan653@gmail.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send mail
$mailSent = mail($to, $subject, $body, $headers);

// -----------------------------
// 8. FINAL RESPONSE
// -----------------------------
if ($mailSent) {
    echo json_encode([
        "status" => "success",
        "message" => "Demo request submitted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "warning",
        "message" => "Data saved, but email could not be sent"
    ]);
}

// -----------------------------
// 9. CLOSE CONNECTION
// -----------------------------
pg_close($db);
?>
