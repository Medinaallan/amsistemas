<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Configuración del correo electrónico
    $to = "medinaallan569@gmail.com"; // Reemplaza con tu correo electrónico
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Asunto: $subject\n\n";
    $email_content .= "Mensaje:\n$message\n";
    
    // Guardar en archivo de texto
    $file_content = "Fecha: " . date('Y-m-d H:i:s') . "\n";
    $file_content .= "----------------------------------------\n";
    $file_content .= $email_content;
    $file_content .= "----------------------------------------\n\n";
    
    // Intentar guardar en archivo y enviar correo
    $file_success = file_put_contents('mensajes.txt', $file_content, FILE_APPEND);
    $email_success = mail($to, "Nuevo mensaje de contacto: $subject", $email_content, $headers);
    
    // Si al menos uno de los dos métodos funcionó, consideramos que fue exitoso
    if($file_success || $email_success) {
        header("Location: index.html#contacto?status=success");
    } else {
        header("Location: index.html#contacto?status=error");
    }
} else {
    // Si alguien intenta acceder directamente al archivo
    header("Location: index.html");
}
?> 