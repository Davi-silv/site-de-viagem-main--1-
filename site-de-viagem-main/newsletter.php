<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        echo '<script>alert("E-mail inválido!"); window.history.back();</script>';
        exit;
    }
    
    // Prepara e executa o insert
    $stmt = $conn->prepare('INSERT INTO newsletter (email) VALUES (?)');
    if ($stmt) {
        $stmt->bind_param('s', $email);
        if ($stmt->execute()) {
            echo '<script>alert("Inscrição realizada com sucesso!"); window.location.href="index.html";</script>';
        } else {
            if ($conn->errno === 1062) {
                echo '<script>alert("Este e-mail já está cadastrado."); window.history.back();</script>';
            } else {
                echo '<script>alert("Erro ao cadastrar. Tente novamente."); window.history.back();</script>';
            }
        }
        $stmt->close();
    } else {
        echo '<script>alert("Erro no servidor. Tente novamente."); window.history.back();</script>';
    }
}
$conn->close();
?> 