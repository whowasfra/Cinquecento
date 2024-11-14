<?php
    include_once("../php/session_config.php");
    include_once("../php/db_config.php");
?>

<nav class="topNavigation">
    <div class="logo">
        <h1>Cinquecento</h1>
    </div>

    <ul class="center">
        <li><a href="home.php">Home</a></li>
        <li><a href="regole.php">Regole</a></li>
        <li><a href="statistiche.php">Statistiche</a></li> 
    </ul>

    <div class="user" id="topNavUser">
        <section class="userBox">
            <h2>
                <?php if (isset($_SESSION['user']) && $_SESSION['user'] == true): ?>
                    <?php echo $_SESSION['user']; ?>
                <?php else: ?>
                    <a href="login.php">LOGIN</a>
                <?php endif; ?>
            </h2>
            <div class="menutriangle"></div>
        </section>

        <nav class='userNav'>
            <ul>
                <?php if (isset($_SESSION['user']) && $_SESSION['user'] == true): ?>
                    <li><a href="profile.php">Profilo</a></li>
                    <li><a href="../php/logout.php">Logout</a></li>
                <?php else: ?>
                    <li>Login to see more</li>
                <?php endif; ?>
                <li class='close'><span>Close</span></li>
            </ul>
        </nav>
    </div>
</nav>

<script>
    try {
        const navUser = document.getElementById('topNavUser');
        const userbox = navUser.querySelector('.userBox');
        const usernav = navUser.querySelector('.userNav');
        const closebtn = navUser.querySelector('.close');

        navUser.tabIndex = 0;

        userbox.onclick = () => {
            navUser.classList.toggle('opened');
        };

        closebtn.onclick = () => {
            navUser.classList.toggle('opened', false);
        };
        navUser.onblur = () => {
            setTimeout(() => {
                navUser.classList.toggle('opened', false);
            }, 200);
        };

    } catch (e) {
        console.log(e);
    }
</script>