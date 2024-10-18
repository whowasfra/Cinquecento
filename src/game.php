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
        <script src="./scripts/game.js"></script>
    </head>

    <body>
        <header>
            <div class="header-title-container">
                <h1>Cinquecento</h1>
            </div>
        </header>
        <main>
            <div class="reset-button-container">
                <button id="reset-button" onclick="restartGame();">Reset</button>
            </div>
            <div class="play-button-container">
                <button id="play-button" onclick="startGame();">Gioca!</button>
            </div>

            <div class="table-container">
                <div class="adversary-cards-container">
                    <div class="adversary-card-pos-a">
                    </div>
                    <div class="adversary-card-pos-b">
                    </div>
                    <div class="adversary-card-pos-c">
                    </div>
                    <div class="adversary-card-pos-d">
                    </div>
                    <div class="adversary-card-pos-e">
                    </div>
                </div>
        
                <div class="remaining-cards-container">
                    <div class="remaining-cards">
                        <img src="images/carte/dorso.bmp" alt="dorso">
                    </div>
                </div>
        
                <div class="played-cards-container">
                    <div class="played-card-pos-a">
                    </div>
                    <div class="played-card-pos-b">
                    </div>
                </div>

                <div class="player-cards-container">
                    <div class="player-card-pos-a">
                    </div>
                    <div class="player-card-pos-b">
                    </div>
                    <div class="player-card-pos-c">
                    </div>
                    <div class="player-card-pos-d">
                    </div>
                    <div class="player-card-pos-e">
                    </div>
                </div>
            </div>
        </main>
        <footer>
            <div class="footer-title-container">
                <h2>Realizzato da: <br> Francesco Cipolla</h2>
            </div>
        </footer>
    </body>
</html>
            
            