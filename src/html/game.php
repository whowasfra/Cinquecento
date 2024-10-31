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

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../css/game.css">
        <script src="../scripts/deck.js"></script>
        <script src="../scripts/player.js"></script>
        <script src="../scripts/gameLogic.js"></script>
        <script src="../scripts/ui.js"></script>
    </head>

    <body>
        <header>
            <div class="header-title-container">
                <h1>Cinquecento</h1>
            </div>

            <div class="user-info-container">
                <?php
                    if(isset($_SESSION["user"])){
                        echo("<p>Benvenuto, " . $_SESSION["user"] . " <a href='./logout.php'>Logout</a> </p>");
                    }
                    else{
                        echo("<p>Utente non autenticato</p>");
                    }
                ?>

            </div>
        </header>
        <main>
            <div class="menu-container">
                <div class="menu">
                    <button id="startGameButton" onclick="startGame()">Inizia partita</button>
                    <button id="endGameButton" onclick="endGame()">Fine partita</button>
                    <button id="saveGame" onclick="saveGame()"> Salva la partita</button>
                    <button id="loadGame" onclick= "loadGame()">Carica una partita</button>
                </div>
            </div>
            <div class="table">
                <canvas id = "gameCanvas" width="800" height="600" ></canvas>
            </div>    
                <div class="declaration-container">
                    <div class="declaration-bastoni"></div>
                    <div class="declaration-spade"></div>
                    <div class="declaration-oro"></div>
                    <div class="declaration-coppe"></div>
                </div>
        </main>
        <footer>
            <div class="footer-title-container">
                <h2>Realizzato da: <br> Francesco</h2>
            </div>
        </footer>
    </body>
</html>
            
            