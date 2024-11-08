<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Login</title>
        <link rel="stylesheet" href="../css/style.css"> 
    </head>

    <body>
        <?php include '../php/leftNavigation.php' ?>
        <form method="post" action="login.php">
            <label>User:</label><input type="text" name="user" placeholder="Franco" required>
            <label>Password:</label><input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
            <input type="submit" name="register" value="Register">
        </form>
    </body>
</html>