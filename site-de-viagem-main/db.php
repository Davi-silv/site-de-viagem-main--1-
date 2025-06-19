<?php
// Configurações do banco de dados
$host = 'localhost';
$user = 'root'; // Altere para seu usuário do MySQL
$pass = '';
$dbname = 'travelworld';

// Conexão
$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
}
?> 