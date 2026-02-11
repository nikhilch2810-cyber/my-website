<?php
// submit_quote.php

/* --------------------------------
   1. ERROR REPORTING (DEV ONLY)
--------------------------------- */
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Always return JSON
header('Content-Type: application/json');

/* --------------------------------
   2. DATABASE CONFIG
--------------------------------- */
$host     = "localhost";
$dbname   = "website";
$user     = "postgres";
$password = "1234"; // change in production
$port     = "5433";

/* --------------------------------
   3. CONNECT TO POSTGRES
--------------------------------- */
$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";
$db = pg_connect($conn_string);

if (!$db) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

/* --------------------------------
   4. ALLOW ONLY POST
--------------------------------- */
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}

/* --------------------------------
   5. COLLECT & SANITIZE FORM DATA
--------------------------------- */
$firstName       = trim($_POST['first_name'] ?? '');
$lastName        = trim($_POST['last_name'] ?? '');
$address         = trim($_POST['address'] ?? '');
$mobileNo        = trim($_POST['mobile_no'] ?? '');
$email           = trim($_POST['email'] ?? '');
$productCategory = trim($_POST['product_category'] ?? '');
$productName     = trim($_POST['product_name'] ?? '');
$message         = trim($_POST['message'] ?? '');

/* --------------------------------
   6. BASIC VALIDATION
--------------------------------- */
if (
    empty($firstName) ||
    empty($lastName) ||
    empty($mobileNo) ||
    empty($email) ||
    empty($productName)
) {
    echo json_encode([
        "status" => "error",
        "message" => "Required fields are missing"
    ]);
    exit;
}

/* --------------------------------
   7. INSERT INTO DATABASE
--------------------------------- */
$query = "
    INSERT INTO quote_requests
    (
        first_name,
        last_name,
        address,
        mobile_no,
        email,
        product_category,
        product_name,
        message
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
";

$result = pg_query_params($db, $query, [
    $firstName,
    $lastName,
    $address,
    $mobileNo,
    $email,
    $productCategory,
    $productName,
    $message
]);

if (!$result) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save quote request"
    ]);
    exit;
}

/* --------------------------------
   8. EMAIL NOTIFICATION (OPTIONAL)
--------------------------------- */
$to = "nikhilch2810@gmail.com";
$subject = "New Quote Request - $productName";

$body = "
New Quote Request Received

Name: $firstName $lastName
Email: $email
Mobile: $mobileNo

Product Category: $productCategory
Product: $productName

Address:
$address

Message:
$message
";

$headers  = "From: no-reply@sarbusiness.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = mail($to, $subject, $body, $headers);

/* --------------------------------
   9. FINAL RESPONSE
--------------------------------- */
if ($mailSent) {
    echo json_encode([
        "status" => "success",
        "message" => "Quote request submitted successfully"
    ]);
} else {
    echo json_encode([
        "status" => "warning",
        "message" => "Quote saved, but email notification failed"
    ]);
}

/* --------------------------------
   10. CLOSE CONNECTION
--------------------------------- */
pg_close($db);
?>
