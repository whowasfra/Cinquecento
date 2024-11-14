<?php 
    include_once("session_config.php");
    include_once("db_config.php");

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $userID = $_SESSION["user_id"];
        $gameState = json_decode(file_get_contents('php://input'), true);
        
        $query = "INSERT INTO game_state (
            user_id, 
            player_points, 
            adversary_points, 
            player_hand, 
            adversary_hand, 
            player_won_cards, 
            adversary_won_cards, 
            briscola, 
            briscola_declared, 
            player_is_first, 
            is_player_turn) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "iiiiiiiiiiii", $userID, $gameState["playerPoints"], $gameState["adversaryPoints"], $gameState["playerHand"], $gameState["adversaryHand"], $gameState["playerWonCards"], $gameState["adversaryWonCards"], $gameState["briscola"], $gameState["briscolaDeclared"], $gameState["playerIsFirst"], $gameState["isPlayerTurn"]);
    }
?>