<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>Login</title>
        <link rel="stylesheet" href="../css/style.css"/> 
        <link rel="stylesheet" href="../css/top_Navigation.css"/>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f9;
                color: #333;
                line-height: 1.6;
            }
            form {
                width: 300px;
                height: auto;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            form label {
                margin-top: 10px;
                color: #3E2723;
                font-weight: bold;
            }
            form input {
                margin-top: 10px;
                padding: 10px;
                border: 1px solid #e3cba2;
                border-radius: 12px;
                width: 100%;
                box-sizing: border-box;
            }
            form input[type="submit"] {
                background-color: #e3cba2;
                color: white;
                border: none;
                padding: 10px 20px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 10px 2px;
                cursor: pointer;
                border-radius: 12px;
                transition: background-color 0.3s ease;
                width: auto;
            }
            form input[type="submit"]:hover {
                background-color: #3E2723;
            }
        </style>
    </head>

    <body>
        <?php include '../php/top_Navigation.php' ?>
        <form method="post" action="login.php">
            <label>User</label><input type="text" name="user" placeholder="Franco" required>
            <label>Password</label><input type="password" name="password" placeholder="Password" required>
            <input type="submit" value="Login">
            <input type="submit" name="register" value="Register">
        </form>
    </body>
</html>