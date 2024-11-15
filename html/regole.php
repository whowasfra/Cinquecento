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
        <p>Al Cinquecento si può giocare in due, tre o quattro persone. Le regole 
            sono piuttosto semplici e basate sul gioco Briscola a cui si aggiungono 
            la possibilità di effettuare le dichiarazioni, questo permette ai giocatori di 
            seguire diverse strategie.</p>
        
        <p><b>Le carte</b>:</p>
        <p>Per giocare al Cinquecento è necessario un mazzo di 40 carte, qualsiasi 
            di quelli regionali italiani è adatto, ma può andare bene anche 
            un mazzo di 52 carte francesi da cui vengano preventivamente rimossi gli Otto, 
            i Nove e i Dieci.</p>
        
        <p><b>Scopo del gioco</b>:</p>
        <p>Lo scopo del Cinquecento è quello di ottenere più 
            punti dell'avversario, mediante le prese e le dichiarazioni.<br>
            Il giocatore che per primo raggiunge i 500 punti vince la partita.</p>
        
        <p><b>Distribuzione delle carte</b>:</p>
        <p>Il ruolo del cartaio viene determinato a caso, mediante la regola del "<i>bàs 
            fà màs</i>" per esempio, e nel corso delle smazzate i giocatori 
            si alternano in questo ruolo, seguendo l'ordine di gioco.<br>
            Il cartaio distribuisce le carte in senso antiorario cinque carte a testa, 
            le carte che avanzano costituiscono il tallone.</p>
        
        <p><b>Svolgimento del gioco</b>:</p>
        <p>A questo punto inizia il gioco vero e proprio, il primo giocatore, a destra 
            del cartaio, gioca una carta.<br>
            I suoi avversari, seguendo l'ordine di gioco, devono, a loro volta giocare 
            una carta. Colui che cala la carta con il maggior valore di presa ottiene <br>
            tutte le carte giocate, e le mette in pila vicino a sè stesso.<br>
        </p><p>L'ordine di presa nel Cinquecento, dal più forte al più debole, 
            è il seguente:<br>
            Asso, Tre, Re, Cavallo, Fante, Sette, Sei, Cinque, Quattro, Due.</p>
        <p>Dopo che tutti i giocatori hanno fatto la propria giocata, si passa alla 
            fase di pescaggio.<br>
            Per primo pesca, colui che si è aggiudicato la presa, e poi gli altri, 
            seguendo l'ordine di gioco. Il giocatore che ha pescato per primo, sarà
            anche il primo a giocare.</p>

        <p>Durante la smazzata, quando il giocatore lo desidera può effettuare 
            una dichiarazione incassando subito 40 punti.<br>
            Per dichiarare è necessario possedere la coppia Cavallo - Re dello stesso
            seme, da questo momento fino al termine della smazzata questo seme sarà detto 
            di briscola.<br>
            Eventuali dichiarazioni successive forniranno solo 20 punti e non modificheranno
            il seme di briscola.<br>
            Le carte del seme di briscola potranno essere battute solo da altre carte dello stesso seme.<br>
            E.g.: <i>Il Fante di briscola può essere battuto dal Cavallo di briscola ma non dal 
            Cavallo di seme diverso, mentre un Asso di un seme qualsiasi può essere battuto anche dal 
            Due di briscola a meno che sia a sua volta di briscola.</i></p>
        
        <p><b>Conteggio dei punti</b>:</p>
        <p>In totale ci sono 120 punti che vengono suddivisi tra i giocatori durante 
            la smazzata, in base alle prese. Al termine della smazzata ogni giocatore 
            conta i punti che sono presenti nella pila delle carte da lui intascate.</p>
        <p>Verranno assegnati:</p>
        <ul>
            <li>11 punti per l'Asso</li>
            <li>10 punti per il Tre</li>
            <li>4 punti per il Re</li>
            <li>3 punti per il Cavallo</li>
            <li>2 punti per il Fante</li>
            <li>Le altre carte non danno punti.</li>
        </ul>
        <p>Inoltre verranno assegnati dei punti per le dichiarazioni effettuate.</p>
        <ul>
        <li>40 punti per la prima dichiarazione;</li>
        <li>20 punti per le successive.</li>
        </ul>
        <p>Il giocatore che per primo raggiunge il tetto di 500 punti vince la partita.</p>
        
        <p><b>Terminologia</b>:</p>
        <p>L'Asso e il Tre sono denominati in questo gioco "carichi".<br>
        Re, Donna e Fante sono ovviamente le "figure".<br>
        Le altre invece sono denominate "lisci" o "scartine" perchè
        non forniscono punti. </p>
    </div>
</body>
</html>