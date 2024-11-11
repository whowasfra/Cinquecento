<!-- LEFT NAVIGATION -->

<nav class="leftNavigation" id="leftNav">
    <div class="menuToggle" onclick="this.parentElement.classList.toggle('opened')"></div>
    <ul>
        <?php

        $links = [
            "Home"      => ["./home.php", "home"],
            "Games"     => ["./mygames.php", "games"],
            "Info"      => ["./regole.html", "info"],
        ];

        // Login cases
        if(isset($_SESSION['initiated']) && $_SESSION['initiated'] === true){

            $links += [
                "Profile"   => ["./profile.php", "profile"],
                "Change Account" => ["./login.php", "changeaccount"],
                "Logout"    => ["../php/logout.php", "logout"],
            ];

        }else{
            unset($links['Games']);
            $links += [
                "Login" => ["./login.php", "login"],
            ];
        
        }

        foreach ($links as $key => $list) {
            $link = $list[0];
            $icon = $list[1];
            // [$link, $icon] = $list;

            if (in_array($key, ["Tutorial", "Profile", "Login"])) {
                echo "<li class='line'> </li>";
            }
            $a = "
                <a href='$link'>
                    <span class='icon $icon'></span>
                    <p>$key</p>
                </a>
            ";
            echo "<li> $a</li>";
        };
        ?>

    </ul>

</nav>
<script>
    const nav = document.getElementById('leftNav');

    nav.tabIndex = 0;
    nav.onblur = () => {
        setTimeout(() => {
            nav.classList.toggle('opened', false)
        }, 200);
    };
</script>