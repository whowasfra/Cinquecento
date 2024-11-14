<?php 
    include_once("../php/session_config.php");
    include_once("../php/db_config.php");

    $userId = $_SESSION['user'];

    $query = "SELECT played_games, won_games FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $stmt->bind_result($gamesPlayed, $gamesWon);
    $stmt->fetch();
    $stmt->close();

    $response = array(
        'games_played' => $gamesPlayed,
        'games_won' => $gamesWon
    );

    echo json_encode($response);
?>

