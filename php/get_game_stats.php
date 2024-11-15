<?php
    include_once('session_config.php');
    include_once('db_config.php');

    header('Content-Type: application/json');

    if (!isset($_SESSION['user'])) {
        echo json_encode(['error' => 'User not logged in']);
        exit();
    }

        $userId = $_SESSION['user'];

        $query = "SELECT played_games, won_games FROM users WHERE username = ?";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "s", $userId);

        if (mysqli_stmt_execute($statement)) {
            mysqli_stmt_bind_result($statement, $playedGames, $wonGames);
            mysqli_stmt_fetch($statement);

            echo json_encode([
                'gamesPlayed' => $playedGames,
                'gamesWon' => $wonGames
            ]);
        } else {
            echo json_encode(['error' => 'Failed to get game stats']);
        }
        mysqli_stmt_close($statement);
        mysqli_close($db_connection);
?>