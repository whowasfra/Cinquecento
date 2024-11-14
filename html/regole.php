<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regole del Gioco 500</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/top_navigation.css">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
        }
        h1, h2 {
            color: #444;
        }
        h1 {
            text-align: center;
            margin-top: 20px;
            font-size: 2.5em;
        }
        h2 {
            margin-top: 20px;
            font-size: 1.8em;
        }
        p {
            margin: 20px;
            padding: 0;
            color: #666;
        }
        ul {
            list-style-type: disc;
            padding-left: 40px;
        }
       
        .container {
            max-width: 800px;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <?php include '../php/top_Navigation.php' ?> 
    <div class="container">
        <h1>Regole del Gioco 500</h1>
        <p>Il gioco del 500 è un gioco di carte tradizionale italiano. Ecco le regole principali:</p>
        <h2>Obiettivo del Gioco</h2>
        <p>L'obiettivo del gioco è raggiungere esattamente 500 punti.</p>
        <h2>Preparazione</h2>
        <ul>
            <li>Il gioco si gioca con un mazzo di 40 carte italiane.</li>
            <li>Si può giocare in 2, 3 o 4 giocatori.</li>
            <li>Ogni giocatore riceve 10 carte.</li>
        </ul>
        <h2>Svolgimento del Gioco</h2>
        <ul>
            <li>Il gioco si svolge in turni.</li>
            <li>Ad ogni turno, i giocatori giocano una carta a testa.</li>
            <li>Il giocatore che gioca la carta più alta vince il turno e prende le carte giocate.</li>
        </ul>
        <h2>Punteggio</h2>
        <ul>
            <li>Le carte hanno i seguenti valori: Asso (11 punti), Tre (10 punti), Re (4 punti), Cavallo (3 punti), Fante (2 punti).</li>
            <li>Le altre carte non hanno valore.</li>
            <li>Il punteggio totale di ogni giocatore viene calcolato sommando i valori delle carte vinte.</li>
        </ul>
        <h2>Vittoria</h2>
        <p>Il primo giocatore a raggiungere esattamente 500 punti vince la partita. Se un giocatore supera i 500 punti, il suo punteggio viene ridotto a 300 punti.</p>
        <h2>Dichiarazioni</h2>
        <p>Il gioco del 500 è simile alla Briscola. Il giocatore che ha in mano un Cavallo e un Re dello stesso seme può dichiarare.</p>
        <ul>
            <li>La prima dichiarazione indica la Briscola e il giocatore che ha dichiarato riceve 40 punti bonus.</li>
            <li>Le dichiarazioni successive non cambiano la Briscola e assegnano al giocatore solo 20 punti.</li>
        </ul>
    </div>
</body>
</html>