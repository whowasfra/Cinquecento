<!-- <?php
include 'session_config.php';

// Verifica se l'utente è loggato
$loggedInUser = isset($_SESSION['user']) ? $_SESSION['user'] : null;
?> -->

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Cinquecento</title>
        <link rel="stylesheet" href="game.css">
        <script type='module' src="./scripts/gameLogic.js"></script>
    </head>

    <body>
        <header>
            <div class="header-title-container">
                <h1>Cinquecento</h1>
            </div>
        </header>
        <main>
            <!-- <div class="reset-button-container">
                <button id="reset-button" onclick="restartGame();">Reset</button>
            </div>
            <div class="play-button-container">
                <button id="play-button" onclick="startGame();">Gioca!</button>
            </div> -->

            <div class="table-container">
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
            
            