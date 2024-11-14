<?php
    include_once("session_config.php");

    // Cancella il cookie di sessione

    // if (ini_get("session.use_cookies")) {
    //     $params = session_get_cookie_params();
    //     setcookie(session_name(), '', time() - 42000,
    //         $params["path"], $params["domain"],
    //         $params["secure"], $params["httponly"]
    //     );
    // }

    session_unset(); // Cancella tutte le variabili di sessione
    session_destroy(); // Cancella la sessione
    echo("<script>alert('Logout avvenuto con successo');</script>");
    header("Location: ../../index.php");
?>
