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
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .profile-container h1 {
            text-align: center;
        }

        .game-stats {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }

        .chart-container{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin: 20px;
        }

        .chart {
            position: relative;
            width: 200px; 
            height: 200px; 
            border-radius: 50%;
            background: conic-gradient(#36a2eb 0% 0%, #cccccc 0% 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2em;
            color: #333;
        }

        .chart span {
            position: absolute;
        }
    </style>
</head>
<body>
    <?php include '../php/top_navigation.php'; ?>
    <main>
        <div class="profile-container">
            <h1>Statistiche di Gioco</h1>
            <div class="game-stats">
                <p>Partite Giocate: <span id="games-played">0</span></p>
                <p>Partite Vinte: <span id="games-won">0</span></p>
            </div>
            <div class="chart-container">
                <h2>Percentuale di Vittoria</h2>
                <div class="chart" id="gamesWonChart">
                    <span>0%</span>
                </div>
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

            const gamesWonPercentage = (data.gamesWon / data.gamesPlayed ) * 100;

            const gamesWonChart = document.getElementById('gamesWonChart');
            
            gamesWonChart.style.background = `conic-gradient(#4caf50 0% ${gamesWonPercentage}%, #cccccc ${gamesWonPercentage}% 100%)`;
            gamesWonChart.querySelector('span').textContent = `${gamesWonPercentage.toFixed(1)}%`;
        }).catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    </script>
</body>
</html>
