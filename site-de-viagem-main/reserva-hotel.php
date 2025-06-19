<?php
require_once 'db.php';
$admin_email = 'seuemail@seudominio.com'; // Altere para o e-mail desejado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $hotel = trim($_POST['hotel'] ?? '');
    $checkin = $_POST['checkin'] ?? '';
    $checkout = $_POST['checkout'] ?? '';
    $hospedes = intval($_POST['hospedes'] ?? 1);

    if (!$nome || !$email || !$hotel || !$checkin || !$checkout || !$hospedes) {
        echo json_encode(['success'=>false,'msg'=>'Preencha todos os campos corretamente.']);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO reserva_hotel (nome, email, hotel, checkin, checkout, hospedes) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt) {
        $stmt->bind_param('sssssi', $nome, $email, $hotel, $checkin, $checkout, $hospedes);
        if ($stmt->execute()) {
            // Enviar e-mail de confirmação
            $assunto = 'Confirmação de Reserva de Hotel - TravelWorld';
            $mensagem = "Olá $nome,\n\nSua reserva no hotel '$hotel' foi realizada com sucesso!\n\nCheck-in: $checkin\nCheck-out: $checkout\nHóspedes: $hospedes\n\nObrigado por escolher a TravelWorld!";
            @mail($email, $assunto, $mensagem, "From: $admin_email");
            echo json_encode(['success'=>true,'msg'=>'Reserva realizada com sucesso! Verifique seu e-mail.']);
        } else {
            echo json_encode(['success'=>false,'msg'=>'Erro ao salvar reserva. Tente novamente.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success'=>false,'msg'=>'Erro no servidor. Tente novamente.']);
    }
    $conn->close();
    exit;
}
?> 