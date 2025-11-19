<?php
include "conexao.php";

$nome = $_POST['nome'] ?? '';
$email = $_POST['email'] ?? '';
$nasc = $_POST['nascimento'] ?? '';
$cep = $_POST['cep'] ?? '';
$sexo = $_POST['sexo'] ?? '';

$sql = "";


$sql = "INSERT INTO usuarios (nome, email, nascimento, cep, sexo) 
        VALUES ('$nome', '$email', '$nasc', '$cep', '$sexo')";

if ($conn->query($sql) === TRUE) {
    echo "<script>
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'site.html';
    </script>";
} else {
    echo "<script>
        alert('Erro ao cadastrar: " . addslashes($conn->error) . "');
        window.history.back();
    </script>";
}

$conn->close();



?>
