<?php
// Avvia la sessione solo se non è già stata avviata
if (session_status() == PHP_SESSION_NONE) {
    // Configurazione delle sessioni
    ini_set('session.cookie_httponly', 1); // Impedisce l'accesso ai cookie di sessione tramite JavaScript
    // ini_set('session.cookie_secure', 1); // Richiede HTTPS per i cookie di sessione
    ini_set('session.use_strict_mode', 1); // Impedisce l'uso di ID di sessione non validi
    ini_set('session.use_only_cookies', 1); // Disabilita l'uso di ID di sessione nei parametri URL
    session_name('secure_session');

    session_start();

    // Rigenera l'ID della sessione per prevenire attacchi di session fixation
    if (!isset($_SESSION['initiated'])) {
        session_regenerate_id(true);
        $_SESSION['initiated'] = true;
    }
}
?>