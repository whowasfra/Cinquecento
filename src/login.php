<?php
    $user = $_POST["user"];
    $password = $_POST["password"];

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

        //Binding del risultato alla variabile $hash
        mysqli_stmt_bind_result($statement, $hash);
        while(mysqli_stmt_fetch($statement)){
            if(password_verify($password, $hash)){
                echo("<script>alert('Login avvenuto con successo');
                    window.history.back();
                </script>");
                exit();
            }
        }
        echo("<script>alert('Login fallito');
            window.history.back();
        </script>");
    }


