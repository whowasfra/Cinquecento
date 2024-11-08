<?php 
    include_once("../php/session_config.php");
    include_once("db_config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../css/style.css">
        <script src="../scripts/deck.js"></script>
        <script src="../scripts/player.js"></script>
        <script src="../scripts/gameLogic.js"></script>
        <script src="../scripts/ui.js"></script>
    </head>

    <body>
        <?php include '../php/leftNavigation.php' ?>
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
            
            