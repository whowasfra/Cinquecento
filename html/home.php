<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>Cinquecento</title>
        <link rel="stylesheet" href="../css/style.css" />
        <link rel="stylesheet" href="../css/top_navigation.css"/>

        <style>
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


        </style>
    </head>    
        
    <body>
        <?php include '../php/top_navigation.php' ?>
        <header>
            <div id="Cinquecento-logo">CINQUECENTO</div>
            <a class="toggle-menu" href="#"></a>
        </header>

        <div id="content-wrap">
            <!--Sezione introduttiva con tasti rapidi-->
            <section id="Intro">
                <div class="buttons">
                    <a class="button" href="game.php" title>Vai al gioco</a>
                    <a class="button" href="login.php" title>Accedi / Registrati</a>
                    <a class="button" href="regole.html" title>Regole</a>
                    <a class="button" href="statistiche.html" title>Statistiche</a>
                </div>
            </section>

            <!--Sezione storia del gioco-->
            <section id="Storia">

            </section>

            <!--Sezione info progetto-->
            <section id="Info">

            </section>
        </div>
    </body>

    <footer>
        <div id="main-footer">
            <div class="footer-info-wrap">
                
            </div>
        </div>
    </footer>
</html>