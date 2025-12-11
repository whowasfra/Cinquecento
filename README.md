# Cinquecento

Implementazione web del classico gioco di carte italiano Cinquecento, popolare nel sud Italia. Il gioco è basato sulla Briscola con l'aggiunta delle dichiarazioni che aggiungono un livello strategico ulteriore.

## Descrizione

Questo progetto nasce come lavoro per il corso di Progettazione Web. L'applicazione permette di giocare contro il computer, registrare le proprie statistiche e confrontarsi con altri giocatori in una classifica.

## Funzionalità principali

- Gioco contro l'intelligenza artificiale
- Sistema di registrazione e autenticazione
- Tracciamento delle statistiche (partite giocate e vinte)
- Classifica generale dei giocatori
- Implementazione completa delle regole incluse le dichiarazioni
- Interfaccia grafica con canvas HTML5

## Tecnologie

**Frontend:**
- HTML5, CSS3, JavaScript
- Canvas per il rendering della grafica di gioco

**Backend:**
- PHP per la gestione server-side
- MySQL per il database

**Ambiente di sviluppo:**
- XAMPP (Apache + MySQL)

## Struttura del progetto

```
Cinquecento/
├── index.php                    # Entry point
├── db.sql                       # Schema database
├── css/                         # Stili
├── html/                        # Pagine (home, game, login, profile, classifica, regole)
├── php/                         # Script backend
├── scripts/                     # Logica JavaScript del gioco
└── images/                      # Grafica
```

## Database

Il database `cinquecento_db` contiene una tabella `users` con:
- username, password (hash bcrypt)
- registration_date
- played_games, won_games

## Installazione

1. Clonare il repository nella cartella htdocs di XAMPP
2. Avviare Apache e MySQL
3. Importare `db.sql` in phpMyAdmin per creare il database
4. Verificare le credenziali in `php/db_config.php`
5. Aprire http://localhost/Cinquecento

## Regole del gioco

Obiettivo: raggiungere 500 punti per primo.

Si gioca con un mazzo di 40 carte. Vengono distribuite 5 carte a testa.

**Ordine di presa** (dal più forte al più debole):
Asso, Tre, Re, Cavallo, Fante, Sette, Sei, Cinque, Quattro, Due

**Dichiarazioni:**
- Per dichiarare serve la coppia Cavallo-Re dello stesso seme
- La prima dichiarazione vale 40 punti e stabilisce il seme di briscola
- Le dichiarazioni successive valgono 20 punti
- Le carte di briscola possono essere battute solo da altre briscole

**Punteggio delle carte:**
- Asso: 11 punti
- Tre: 10 punti  
- Re: 4 punti
- Cavallo: 3 punti
- Fante: 2 punti
- Altre carte: 0 punti

In totale ci sono 120 punti distribuiti nel mazzo.

## Note tecniche

Le password sono criptate con bcrypt tramite `password_hash()` di PHP.
La gestione delle sessioni è implementata tramite le funzioni native di PHP.

## Possibili sviluppi futuri

- Multiplayer online
- Miglioramento dell'AI
- Ottimizzazione mobile
- Tutorial interattivo

## Autore

Francesco ([@whowasfra](https://github.com/whowasfra))

Progetto realizzato per Progettazione Web.
