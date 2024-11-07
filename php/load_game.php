<?php
include_once("session_config.php");
include_once("db_config.php");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $userID = $_SESSION['user_id'];

    $query = "SELECT * FROM game_state WHERE user_id = ? ORDER BY created_at DESC LIMIT 1";
    $statement = $db_connection->prepare($query);
    $statement->bind_param("i", $userID);
    $statement->execute();
    $result = $statement->get_result();
    $gameState = $result->fetch_assoc();

    if ($gameState) {
        $gameState['deck'] = json_decode($gameState['deck']);
        $gameState['player'] = json_decode($gameState['player']);
        $gameState['adversary'] = json_decode($gameState['adversary']);
        $gameState['briscola'] = json_decode($gameState['briscola']);
        $gameState['briscola_declared'] = json_decode($gameState['briscola_declared']);
        $gameState['player_is_first'] = json_decode($gameState['player_is_first']);
        $gameState['is_player_turn'] = json_decode($gameState['is_player_turn']);
        echo json_encode($gameState);
    } else {
        echo json_encode(['status' => 'no_saved_game']);
    }
    $statement->close();
}
?>