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
                color: #333;
                line-height: 1.6;
                margin: 0;
            }
            body::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('../images/background.jpeg') no-repeat center center fixed;
                background-size: cover;
                filter: blur(3px); 
                z-index: -1;
            }

            .intro {
                width: 80%;
                height: 10%;
                display: flex;
                flex-direction: column;
                margin: 0 auto;
                padding: 20px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 12px; 
                border : 2px solid #d4edda;
                align-items: center;
                justify-content: center;
                position: relative;
                z-index: 1;
            }

            .buttons a {
                background-color: #d4edda;
                color: black;
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
                background-color: #bdd4c2 ;
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
                <img src="../images/logo/logo-round-transparent.png" alt="Cinquecento">
                <div class="buttons">
                    <a class="button" href="game.php" title>Vai al gioco</a>
                    <a class="button" href="login.php" title>Accedi / Registrati</a>
                    <a class="button" href="regole.php" title>Regole</a>
                    <a class="button" href="classifica.php" title>Classifica</a>
                </div>
        </div>

    </body>

    <footer>
    </footer>
</html>