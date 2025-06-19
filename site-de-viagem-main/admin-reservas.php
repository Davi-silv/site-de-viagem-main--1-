<?php
// Personalização de e-mail e senha do admin
$admin_email = 'davi.benigo@gmail.com'; // Altere para o e-mail desejado
$admin_senha = '280418My@'; // Altere para a senha desejada

session_start();
if (!isset($_SESSION['admin'])) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['senha'] === $admin_senha) {
        $_SESSION['admin'] = true;
    } else {
        echo '<form method="POST" style="max-width:300px;margin:100px auto;text-align:center;"><h2>Login Admin</h2><input type="password" name="senha" placeholder="Senha" required style="padding:10px;width:100%;margin-bottom:10px;"><button type="submit" style="padding:10px 20px;">Entrar</button></form>';
        exit;
    }
}
require_once 'db.php';
$res1 = $conn->query('SELECT * FROM reserva_destino ORDER BY data_reserva DESC');
$res2 = $conn->query('SELECT * FROM reserva_hotel ORDER BY data_reserva DESC');
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Admin - Reservas</title>
    <link rel="stylesheet" href="css/style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">
    <style>
        table {width:100%;border-collapse:collapse;margin-bottom:40px;}
        th,td {border:1px solid #ddd;padding:8px;text-align:left;}
        th {background:#2196F3;color:#fff;}
        h2 {margin-top:40px;}
        .logout {float:right;}
    </style>
</head>
<body>
    <div class="container" style="margin-top:40px;">
        <form method="post" action="?logout=1" class="logout"><button type="submit">Sair</button></form>
        <h1>Reservas de Destinos</h1>
        <table>
            <tr><th>ID</th><th>Nome</th><th>Email</th><th>Destino</th><th>Data Ida</th><th>Data Volta</th><th>Passageiros</th><th>Data Reserva</th></tr>
            <?php while($r = $res1->fetch_assoc()): ?>
            <tr>
                <td><?= $r['id'] ?></td><td><?= htmlspecialchars($r['nome']) ?></td><td><?= htmlspecialchars($r['email']) ?></td><td><?= htmlspecialchars($r['destino']) ?></td><td><?= $r['data_ida'] ?></td><td><?= $r['data_volta'] ?></td><td><?= $r['passageiros'] ?></td><td><?= $r['data_reserva'] ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
        <h1>Reservas de Hotéis</h1>
        <table>
            <tr><th>ID</th><th>Nome</th><th>Email</th><th>Hotel</th><th>Check-in</th><th>Check-out</th><th>Hóspedes</th><th>Data Reserva</th></tr>
            <?php while($r = $res2->fetch_assoc()): ?>
            <tr>
                <td><?= $r['id'] ?></td><td><?= htmlspecialchars($r['nome']) ?></td><td><?= htmlspecialchars($r['email']) ?></td><td><?= htmlspecialchars($r['hotel']) ?></td><td><?= $r['checkin'] ?></td><td><?= $r['checkout'] ?></td><td><?= $r['hospedes'] ?></td><td><?= $r['data_reserva'] ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
    </div>
</body>
</html>
<?php
if (isset($_POST['logout']) || isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin-reservas.php');
    exit;
}
?> 