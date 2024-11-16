<?php 
    include_once("../php/session_config.php");
    include_once("../php/db_config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../css/style.css"/>
        <link rel="stylesheet" href="../css/top_navigation.css"/>
        <script src="../scripts/deck.js"></script>
        <script src="../scripts/player.js"></script>
        <script src="../scripts/gameLogic.js"></script>
        <script src="../scripts/ui.js"></script>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f9;
                color: #333;
                line-height: 1.6;
            }
            .menu{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 20px;
                gap: 10px;
            }
            .table {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                margin-top: 20px;
            }

            #gameCanvas {
                background-color: green;
                border: 2px solid #006400;
                box-shadow: inset 0 0 10px #004d00;
                border-radius: 15px;
            }

            .menu button {
                background-color: #d4edda;
                color: black;
                border: none;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 10px 2px;
                cursor: pointer;
                border-radius: 12px;
                transition: background-color 0.3s ease;
            }

            .menu button:hover {
                background-color: #bdd4c2 ;
            }

            .info-panel {
                margin-left: 20px;
                padding: 10px;
                background-color: #fff;
                border: 2px solid #d4edda;
                border-radius: 8px;
                width: 250px;
                height: 400px; 
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .info-panel p {
                text-align: center;
                margin: 5px;
                color: #333;
                padding: 5px;
                font-weight: bold;
            }

            .info-panel h3 {
                text-align: center;
                margin: 5px;
                color: #333; 
                font-size: 1.2em;
                margin-bottom: 5px; 
            }

            .message-panel {
                margin: 10px auto;
                padding: 10px;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 8px;
                width: 80%;
                text-align: center;
                height: 100px;
                overflow-y: auto;
                color: #333; 
            }

            .message {
                background-color: yellow;
                font-weight: bold;
                transition: background-color 1s ease, font-weight 1s ease;
            }

            .message.highlight {
                background-color: white;
                font-weight: normal;
            }
        </style>
    </head>

    <body>
        <?php include '../php/top_navigation.php' ?>
        <header>
        </header>
        <main>
            
            <div class="table">
                <canvas id="gameCanvas" width="800" height="600"></canvas>
                <div class="info-panel" id="infoPanel">
                    <h3>Info Partita</h3>
                    <div class="message-panel" id="messagePanel"></div>
                    <p id="playerPoints">Punti Giocatore: 0</p>
                    <p id="adversaryPoints">Punti Avversario: 0</p>

                    <div class="menu">
                        <button id="startGameButton" onclick="startGame()">Inizia partita</button>
                        <button id="endGameButton" onclick="stopGame()">Fine partita</button>
                        <!-- <button id="saveGame" onclick="saveGame()">Salva la partita</button>
                        <button id="loadGame" onclick="loadGame()">Carica una partita</button> -->
                    </div>
                </div>
                
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

