<?php
require_once 'db.php';
$admin_email = 'seuemail@seudominio.com'; // Altere para o e-mail desejado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = trim($_POST['nome'] ?? '');
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $destino = trim($_POST['destino'] ?? '');
    $data_ida = $_POST['data_ida'] ?? '';
    $data_volta = $_POST['data_volta'] ?? '';
    $passageiros = intval($_POST['passageiros'] ?? 1);

    if (!$nome || !$email || !$destino || !$data_ida || !$data_volta || !$passageiros) {
        echo json_encode(['success'=>false,'msg'=>'Preencha todos os campos corretamente.']);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO reserva_destino (nome, email, destino, data_ida, data_volta, passageiros) VALUES (?, ?, ?, ?, ?, ?)');
    if ($stmt) {
        $stmt->bind_param('sssssi', $nome, $email, $destino, $data_ida, $data_volta, $passageiros);
        if ($stmt->execute()) {
            // Enviar e-mail de confirmação
            $assunto = 'Confirmação de Reserva de Destino - TravelWorld';
            $mensagem = "Olá $nome,\n\nSua reserva para o destino '$destino' foi realizada com sucesso!\n\nData de ida: $data_ida\nData de volta: $data_volta\nPassageiros: $passageiros\n\nObrigado por escolher a TravelWorld!";
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