<?php
    include_once("../php/session_config.php");
    include_once("../php/db_config.php");

    // Query per ottenere la classifica dei giocatori in base al numero di partite vinte
    $sql_vittorie = "SELECT username as giocatore, won_games as vittorie FROM users ORDER BY vittorie DESC";
    $result_vittorie = $db_connection->query($sql_vittorie);

    // Query per ottenere la classifica di tutte le partite giocate
    $sql_partite = "SELECT username as giocatore, played_games as partite_giocate FROM users ORDER BY partite_giocate DESC";
    $result_partite = $db_connection->query($sql_partite);
?>

    <!DOCTYPE html>
    <html lang="it">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/top_navigation.css">
        <link rel="stylesheet" href="../css/statistiche.css">
        <title>Statistiche Giocatori</title>
    </head>
    <body>
        <?php include '../php/top_navigation.php'; ?>
        <div class="container">
            <h1>Classifica Giocatori per Partite Vinte</h1>
            <table border="1">
                <tr>
                    <th>Giocatore</th>
                    <th>Partite Vinte</th>
                </tr>
                <?php
                if ($result_vittorie->num_rows > 0) {
                    while($row = $result_vittorie->fetch_assoc()) {
                        echo "<tr><td>" . $row["giocatore"]. "</td><td>" . $row["vittorie"]. "</td></tr>";
                    }
                } else {
                    echo "<tr><td colspan='2'>Nessun risultato</td></tr>";
                }
                ?>
            </table>
        </div>

        <div class="container">
            <h1>Classifica Giocatori per Partite Giocate</h1>
            <table border="1">
                <tr>
                    <th>Giocatore</th>
                    <th>Partite Giocate</th>
                </tr>
                <?php
                if ($result_partite->num_rows > 0) {
                    while($row = $result_partite->fetch_assoc()) {
                        echo "<tr><td>" . $row["giocatore"]. "</td><td>" . $row["partite_giocate"]. "</td></tr>";
                    }
                } else {
                    echo "<tr><td colspan='2'>Nessun risultato</td></tr>";
                }
                ?>
            </table>
        </div>
    </body>
    </html>

<?php
    $db_connection->close();
?>