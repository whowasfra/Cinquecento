<?php 
    include_once("session_config.php");
        
    $centralList = '';
    $userbox = '';
    $userList = '';


    // Create central links list
    $links = [
        "Home"      => "./home.php",
    ];

    if (isset($_SESSION['login']) && $_SESSION['login'] === true) {
        $links += [
            "My Games " => "./mygames.php",
            "Profile"   => "./profile.php"
        ];
    }
    foreach ($links as $key => $link) {
        $a = "<a href='" . htmlspecialchars($link, ENT_QUOTES, 'UTF-8') . "'>  <p>" . htmlspecialchars($key, ENT_QUOTES, 'UTF-8') . "</p>  </a>";
        $centralList = $centralList . "<li> $a </li>";
    };


    // Check login for userbox
    if (isset($_SESSION['login']) && $_SESSION['login'] === true) {
        $userbox = htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8');
    } else {
        $userbox = "<a href='../html/login.php'>LOGIN</a>";
    }


    // Create user nav list
    if (isset($_SESSION['login']) && $_SESSION['login'] === true) {
        $userList = '';
        $links = [
            "Profile"   => "./profile.php",
            "Change Account" => "./login.php",
            "Logout"    => "../php/logout.php",
        ];

        foreach ($links as $key => $link) {
            $userList = $userList . "<li> <a href='" . htmlspecialchars($link, ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($key, ENT_QUOTES, 'UTF-8') . "</a> </li>";
        }
    } else {
        $userList = "<li>  Login to see more </li>";
    }


    ?>

    <nav class="topNavigation">
        <div class="logo">
            <h1>Simple Go</h1>
        </div>

        <ul class="center">
            <?php echo $centralList; ?>
        </ul>

        <div class="user" id="topNavUser">

            <section class="userBox">
                <h2>
                    <?php echo $userbox; ?>
                </h2>
                <div class="menutriangle"></div>
            </section>

            <nav class='userNav'>
                <ul>
                    <?php echo $userList ?>

                    <li class='close'>
                        <span> Close </span>
                    </li>
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

?>