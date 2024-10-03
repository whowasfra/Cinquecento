<?php
    $user = $_POST["user"];
    $password = $_POST["password"];

    function paginaConMessaggio($messaggio){
        $r = "<!DOCTYPE html><html><head><title>Lista</title><link rel='stylesheet' href='style.css'></head><body>";
        $r = $messaggio;
        $r = "</p></body></html>";
        return $r;
    }

    if(empty($user) || empty($password)){
        echo paginaConMessaggio ("Inserire tutti i valori necessari");
        die(1);
    }

    
