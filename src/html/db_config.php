<?php
// Configurazione del database
$host = 'localhost';
$db_user = 'root';
$db_password = '';
$db_name = 'chiera_564449';

// Creazione della connessione al database
$db_connection = new mysqli($host, $db_user, $db_password, $db_name);

// Controllo della connessione
if ($db_connection->connect_error) {
    die("Connessione fallita: " . $db_connection->connect_error);
}
?>