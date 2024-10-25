<?php
    // Configurazione delle sessioni
    include_once("session_config.php");

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
    $db_connection = mysqli_connect('localhost', 'root', '', 'chiera_564449');
    if( mysqli_connect_errno() ) {
        exit('Connessione a database non riuscita. (' . mysqli_connect_error() . ')');
    }
    
    // Devo registrare l'utente
    if(isset($_POST["register"])){
        $hash = password_hash($password, PASSWORD_BCRYPT);
        $query = "INSERT INTO USERS (Username, Password, Registration_Date) VALUES (?,?, NOW())";
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
        $query = "SELECT Password FROM USERS WHERE Username = ?";
        $statement = mysqli_prepare($db_connection, $query);
        mysqli_stmt_bind_param($statement, "s", $user);
        mysqli_stmt_execute($statement);

        //Binding del risultato alla variabile hash
        mysqli_stmt_bind_result($statement, $hash);
        if(mysqli_stmt_fetch($statement) && password_verify($password, $hash)){
            // Rigenera l'id di sessione per evitare attacchi di session fixation
            session_regenerate_id(true);
            $_SESSION["user"] = $user;
            header("Location: ./game.php");
            exit();
        } else{
        echo("<script>alert('Login fallito');
            window.history.back();
        </script>");
        }
    }

    // Chiudo la connessione al database
    mysqli_close($db_connection);
?>


