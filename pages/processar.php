<?php
include "conexao.php";

$tipo = $_POST['tipo_formulario'] ?? '';


if ($tipo == 'cadastro_usuario') {

    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $nasc = $_POST['nascimento'] ?? '';
    $cep = $_POST['cep'] ?? '';
    $sexo = $_POST['sexo'] ?? '';

    $sql = "INSERT INTO usuarios (nome, email, nascimento, cep, sexo) 
            VALUES ('$nome', '$email', '$nasc', '$cep', '$sexo')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
            alert('Usuário cadastrado com sucesso!');
            window.location.href = 'site.html';
        </script>";
    } else {
        echo "<script>
            alert('Erro ao cadastrar usuário: " . addslashes($conn->error) . "');
            window.history.back();
        </script>";
    }

} elseif ($tipo == 'cadastro_receita') {

    $descricao = $_POST['descricao'] ?? '';
    $arquivo = $_FILES['arquivo'];
    $nome_final = '';

    // Lógica de Upload
    if (isset($arquivo) && $arquivo['error'] === UPLOAD_ERR_OK) {
        $pasta_destino = "uploads/";
        
        // Cria a pasta se não existir
        if (!is_dir($pasta_destino)) {
            mkdir($pasta_destino, 0777, true);
        }
        
        $extensao = pathinfo($arquivo['name'], PATHINFO_EXTENSION);
        $nome_final = uniqid() . "." . $extensao;
        
        if (!move_uploaded_file($arquivo['tmp_name'], $pasta_destino . $nome_final)) {
            die("Erro ao salvar a imagem na pasta.");
        }
    } else {
        // Se não enviou foto, avisa e volta
        echo "<script>
                alert('Por favor, selecione uma imagem válida.'); 
                window.history.back();
              </script>";
        exit;
    }

    // Grava no banco (Tabela receitas_fotos)
    $sql = "INSERT INTO receitas_fotos (descricao, arquivo) 
            VALUES ('$descricao', '$nome_final')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
            alert('Receita enviada com sucesso!');
            window.location.href = 'receitas.html';
        </script>";
    } else {
        echo "<script>
            alert('Erro ao salvar receita: " . addslashes($conn->error) . "');
            window.history.back();
        </script>";
    }

} else {
    // Caso alguém tente acessar o arquivo direto sem enviar formulário
    echo "Erro: Nenhum formulário identificado.";
}

$conn->close();
?>