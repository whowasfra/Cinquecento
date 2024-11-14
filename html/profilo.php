<?php 
    include_once("../php/session_config.php");
    include_once("../php/db_config.php");
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profilo Utente</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <?php include '../php/top_navigation.php'; ?>
    <main>
        <div class="profile-container">
            <h1>Profilo Utente</h1>
            <div class="profile-info">
                <p>Nome: <?php echo $_SESSION['user']; ?></p>
                
            </div>
            <div class="game-stats">
                <h2>Statistiche di Gioco</h2>
                <p>Partite Giocate: <span id="games-played">0</span></p>
                <p>Partite Vinte: <span id="games-won">0</span></p>
            </div>
        </div>
    </main>
    <script>
        fetch("../php/getGameStats.php")
            .then(response => response.json())
            .then(data => {
                document.getElementById('games-played').textContent = data.gamesPlayed;
                document.getElementById('games-won').textContent = data.gamesWon;
            })
            .catch(error => console.error('Error fetching game stats:', error));
    </script>
</body>
</html>
