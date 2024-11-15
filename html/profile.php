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
    <link rel="stylesheet" href="../css/top_navigation.css">
    <style>
        .profile-container {
            background-color: #fbfff5;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .profile-info, .game-stats {
            margin-bottom: 20px;
        }

        .profile-info p, .game-stats p {
            color: #333;
        }

        .game-stats h2 {
            color: #444;
        }

        .profile-container table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        .profile-container table, .profile-container th, .profile-container td {
            border: 1px solid #ddd;
            padding: 8px;
            border-radius: 10px;
        }

        .profile-container th {
            background-color: #f4f4f9;
            color: #333;
        }

        .profile-container tr:nth-child(even) {
            background-color: #fbfff5;
        }

        .profile-container tr:hover {
            background-color: #f4f4f9;
        }
    </style>
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
        const gamesPlayed = document.getElementById('games-played');
        const gamesWon = document.getElementById('games-won');

        fetch('../php/get_game_stats.php')
        .then((response) => response.json())
        .then((data) => {
            gamesPlayed.textContent = data.gamesPlayed;
            gamesWon.textContent = data.gamesWon;
        }).catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    </script>
</body>
</html>
