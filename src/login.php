<?php
    // Configurazione delle sessioni
    ini_set('session.cookie_httponly', 1); // Impedisce l'accesso ai cookie di sessione tramite JavaScript
    ini_set('session.cookie_secure', 1); // Richiede HTTPS per i cookie di sessione
    ini_set('session.use_strict_mode', 1); // Impedisce l'uso di ID di sessione non validi
    ini_set('session.use_only_cookies', 1); // Disabilita l'uso di ID di sessione nei parametri URL
    session_name('secure_session'); // Imposta un nome di sessione personalizzato

    $user = trim($_POST["user"]);
    $password = trim($_POST["password"]);

    // Controllo che i campi non siano vuoti
    if(empty($user) || empty($password)){
        echo ("<scrip>alert('Errore: i campi non possono essere vuoti');
            window.history.back();
        </script>");
        exit();
    }

    // Connessione al database
    $db_connection = mysqli_connect('localhost', 'root', '', 'Users');
    if( mysqli_connect_errno() ) {
        exit('Connessione a database non riuscita. (' . mysqli_connect_error() . ')');
    }
    
    // Devo registrare l'utente
    if(isset($_POST["register"])){
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO Users (Username, Password, Registration_Date) VALUES (?,?, NOW())";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "ss", $user, $hash);
        
        
        if(!mysqli_stmt_execute($statement)){
            echo("script>alert('Registrazione fallita, utente già presente');
                window.history.back();
            </script>");
            exit();
        }
        else{
            echo("<script>alert('Registrazione avvenuta con successo');
                window.history.back();
            </script>");
            exit();
        }
    }
    // Devo loggare l'utente
    else{
        $query = "SELECT Password FROM Users WHERE Username = ?";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "s", $user);
        mysqli_stmt_execute($statement);

        //Binding del risultato alla variabile hash
        mysqli_stmt_bind_result($statement, $hash);
        if(mysqli_stmt_fetch($statement) && password_verify($password, $hash)){
            // Rigenera l'id di sessione per evitare attacchi di session fixation
            session_regenerate_id(true);
            $_SESSION["user"] = $user;
            echo("<script>alert('Login avvenuto con successo');
                window.history.back();
            </script>");
            exit();
        } else{
        echo("<script>alert('Login fallito');
            window.history.back();
        </script>");
        }
    }
?>


