<?php 
    include_once("session_config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../src/css/game.css">
        <script type='module' src="./scripts/gameLogic.js"></script>
        <!-- <script src="./src/ui.js"></script> -->
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
            <div class="table-container" id ="table-container">
                <div class="adversary-cards-container">
                </div>
            
                <div class="deck-container">
                </div>

                <div class="briscola-container"></div>
            
                <div class="played-cards-container">
                </div>

                <div class="player-cards-container">
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
            
            