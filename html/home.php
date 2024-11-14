<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../css/style.css" />
        <link rel="stylesheet" href="../css/top_navigation.css"/>

        <style>
            body {
                font-family: 'Arial', sans-serif;
                background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('../images/background.jpeg') no-repeat center center fixed;
                background-size: cover;
                color: #333;
                line-height: 1.6;
                
            }

            main {
                display: flex;
                flex-direction: row;
            }

            main section {
                display: flex;
                justify-content: space-around;
            }

            main > div {
                width: 50%;
            }

            .intro {
                width: 45%;
                height: 15%;
                display: flex;
                flex-direction: column;
                margin: 0 auto;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                align-items: center;
                justify-content: center;
            }

            .buttons a {
                background-color: red;
                color: white;
                border: none;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 10px 2px;
                cursor: pointer;
                border-radius: 12px;
                transition: background-color 0.3s ease;
            }

            .buttons a:hover {
                background-color: black ;
            }

            .intro-heading {
                text-align: center;
                font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
                font-size: 2em;
                margin-bottom: 20px;
                
            }
        </style>
    </head>    
        
    <body>
        <?php include '../php/top_navigation.php' ?>

        <div class="intro">
                <h1 class="intro-heading">Cinquecento</h1>
                <div class="buttons">
                    <a class="button" href="game.php" title>Vai al gioco</a>
                    <a class="button" href="login.php" title>Accedi / Registrati</a>
                    <a class="button" href="regole.html" title>Regole</a>
                    <a class="button" href="statistiche.html" title>Statistiche</a>
                </div>
        </div>

        <div id="content-wrap">

            <!--Sezione storia del gioco-->
            <section id="Storia">

            </section>

            <!--Sezione info progetto-->
            <section id="Info">
                
            </section>
        </div>
    </body>

    <footer>
    </footer>
</html>