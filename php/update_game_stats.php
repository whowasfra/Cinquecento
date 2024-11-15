<?php
    include_once('session_config.php');
    include_once('db_config.php');
    
    header('Content-Type: text/plain');
    
    if (!isset($_SESSION['user'])) {
        echo 'User not logged in';
        exit();
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $isPlayerWinner = $data['isPlayerWinner'] ? 1 : 0;
        $userId = $_SESSION['user'];
    
        if (!$db_connection) {
            echo 'Database connection failed';
            exit();
        }
    
        $query = "UPDATE users SET played_games = played_games + 1, won_games = won_games + ? WHERE username = ?";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "is", $isPlayerWinner, $userId);
    
        if (mysqli_stmt_execute($statement)) {
            echo 'Game stats updated';
        } else {
            echo 'Failed to update game stats';
        }
    
        mysqli_stmt_close($statement);
        mysqli_close($db_connection);
    }
    
?>