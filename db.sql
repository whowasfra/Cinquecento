-- Progettazione Web 
DROP DATABASE if exists cinquecento_db; 
CREATE DATABASE cinquecento_db; 
USE cinquecento_db; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: cinquecento_db
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `registration_date` date NOT NULL,
  `played_games` int(11) NOT NULL DEFAULT '0',
  `won_games` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','$2y$10$z5x/ECwCBYZPzeEYgJYOWu4nSxgVvursKrEbnE5AjSUdOFVQASUNK','2024-10-25',7,5),('francesco','$2y$10$s5EfQcksuYfsixdyKWPILuXMvFMpsnlYF9PtSgIatfbW/0ncqg182','2024-11-07',10,4),('luca','$2y$10$fg/hAq5.D3rDLfvFxzcaguExhoWkO7IuxeudzZ2RAzKqYTqZC.SfK','2024-11-15',9,3),('lorenzo','$2y$10$OqY12ueW1syyXVsISbI5vu1KBBow6dZQ4UyYA4GH/3fVyFn.L5sBq','2024-11-15',7,5),('depa','$2y$10$V62WhIqkKjwLB5R7.ZIVbeE3hDX8oDp53RjjAF6ZgquRAHvLE0wsi','2024-11-15',9,5),('peppe','$2y$10$T//BZPm/7G5vdI85gVfHAOrd6HDPWH/SGDwqge5VJ3aNclbqgn5cG','2024-11-15',9,1),('cate','$2y$10$0UV/AMkYZVYZ10NXaL71seIHlGKr3z1GuezVsfgGOBFtAWcfXJwrO','2024-11-15',8,3),('turiuntrillu','$2y$10$Qvt..1awUROJRUZQpX/XvOUkERxn5Kw2y8pEO6hFU0Hn1CnxLrgdu','2024-11-15',3,3),('nato','$2y$10$KtbztDyYrToph2JIfQHzsO1xs0SDFYvPELRf6oNgQexXXXj.G72z2','2024-11-15',4,1),('enzoSmith','$2y$10$8lOakIWmENL.VkOp.jqpxOiWOum/4I8sUj.TydyAmUGvwTGjGiNWm','2024-11-15',4,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-16 17:01:29
