-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentaire` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `contenu` text NOT NULL,
  `date_creation` datetime NOT NULL,
  `participation_id` int unsigned NOT NULL,
  `utilisateur_id` int unsigned DEFAULT NULL,
  `signaled` tinyint(1) NOT NULL DEFAULT '0',
  `is_img` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `t_commentaire_t_utilisateur_fk` (`utilisateur_id`),
  KEY `t_commentaire_t_participation_fk` (`participation_id`),
  CONSTRAINT `t_commentaire_t_participation_fk` FOREIGN KEY (`participation_id`) REFERENCES `participation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_commentaire_t_utilisateur_fk` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
INSERT INTO `commentaire` VALUES (117,'306f50fe35c74edce85fca','2021-05-20 13:12:19',15,16,0,0);
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departement`
--

DROP TABLE IF EXISTS `departement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departement` (
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departement`
--

LOCK TABLES `departement` WRITE;
/*!40000 ALTER TABLE `departement` DISABLE KEYS */;
INSERT INTO `departement` VALUES ('Comptabilité'),('Direction'),('Logistique'),('Marketing'),('Ressource Humaine'),('Service Informatique'),('Service Technique');
/*!40000 ALTER TABLE `departement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groupe` (
  `nom` varchar(200) NOT NULL,
  `description` text,
  `publique` tinyint(1) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groupe`
--

LOCK TABLES `groupe` WRITE;
/*!40000 ALTER TABLE `groupe` DISABLE KEYS */;
INSERT INTO `groupe` VALUES ('2f2650b065d14fdcef1acbaec9d72e45180c','2a2740e235d75ec0e35f9aa9c1992b435556f047ba4daf24626a6f587a',1),('362d46b07fdb4ed0ee0d98fcccdc6a6d77','2a2740e235c054c0e85f87b9db992c4b5640f04ebe1f8b0327773a2647a057ddd0d6bda0b74387fbb5d21e54eca4287927651a55888fd9b4',1),('3b265bff7bd75e95dc0d84a9d8d6274b565ab1','3e2d46b074da55daf51c8eaf88d0275a5741a44bb54ba93f276b2a744bab568594ceaeafe2462127bcc45c00baa0366c2f201a5e8f99d9e32cd35d1962a33840839abb3c0b232e9c',0);
/*!40000 ALTER TABLE `groupe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participation`
--

DROP TABLE IF EXISTS `participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participation` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `titre` varchar(400) NOT NULL,
  `preview` text,
  `article` text,
  `importance` tinyint DEFAULT NULL,
  `createur` varchar(100) DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `groupe_nom` varchar(200) NOT NULL,
  `prive` tinyint(1) NOT NULL,
  `publique` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `participation_idx_groupe_titre` (`titre`,`groupe_nom`),
  KEY `t_participation_t_groupe_fk` (`groupe_nom`),
  CONSTRAINT `t_participation_t_groupe_fk` FOREIGN KEY (`groupe_nom`) REFERENCES `groupe` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participation`
--

LOCK TABLES `participation` WRITE;
/*!40000 ALTER TABLE `participation` DISABLE KEYS */;
INSERT INTO `participation` VALUES (14,'382150fe63d155c0fe5fca','2a3a5af67cc05ecfbb1b9efcc6d63f5c5d52a50aa9fc653f62793a2657aa41cc91cbe8adf215a5fcb6c2004fa1a436603420553cf0e7f3d629c9451862ab3840999ded3a00232edc95a598d7cc95a12df43231b502c91f7247740eeb8c5bdec81f67c15a784456424c31c567fc580fe1ae39759569d63221f4ab65037832d3c4920d723c2dd175d647','2c2740e335c454c0ed1a91fcc9da29e99157b558fb5eb934277f3d6951b547d6d0c3adb9e25c91aeb5901f4eaba93d7d75223343959f89f03682140972f17556829aed3d007760dc91b896d5d499ee33bb6f26fb47cf5e6643240ffb901fc1c25d7ec14a224a283d7036c183205f0ff9a230349161ca7cc230ee261d9cfac6c6de117f7d3eca75cd19e86f8927f95376e33e18c61c38331f69506026d476a40d609531a2ecaeeaba1a26cf487f2343ca354f5d829ecc2dd8b9c87e94d9fa22c704038cab17ff8172818b1cd45994e5c0e4ed4269ad5c12793b869fe9105af3b318fde62e0d01103ce5b6d267b89a52c00b603194c7eda96b4f8eb8419df25396c9cbd8fd6c212cf247780db05c0c0c31c5fac53306835120180fbeb0e1a1f82a8276126df1d19040062a761d05f86964f7b5d3bb86679ac8add40445e40dc4421649e4be8273fc725673628476cf052ffffd8dcf94a902ff2b3a4c0a5ae42fdd304a03d060bf4c2f71be50f72fcacc18c80288d537e63d3b26a3c8b46902c68d61b89854f46a03bd6982c3a480fd4a8be061780a6559656f9cccb0718bfa0496b9928f78249e21f73e5287fb49f360ce0cdf16f9c6c0879cf7e28bc3ab0d17ff82a24850ed336d6a893d730435f605febbbf4d37640cab59e702e7d42f8377964c2917305d84c66131c5be9177619967a5b40cd7e30b3e7fd4e9c516b3459b14b8dfa7a379cbc959702d39f935500dc052023a850e9efe34c105ac86a5d5a893ebd1c8653c0cb7003d770d0bf06819f9e739fb9673233c2f7c8f083b',100,'15','2021-05-20 12:23:42','3b265bff7bd75e95dc0d84a9d8d6274b565ab1',0,0),(15,'332641e27ad04ed6ef1684b288d83f0a5256a50abf5aec0b48','362d15f77a945ec6ef5f9eb288d32f5f1857b50aa850af25c4b13bc58de54dd799c0a1a7f65c90ebf9d315008fad3167302e547896ca96e535cf470827b57d4694cfac3d13327cce86b883d1d3d0f028f26733f906c45a7d4324bf2ec24bc3d84d37c94a2b16e68352748924ec5f46fdae2f669365ca7021e2ab361f3a30d7dd88017c3837cc3ad606e43d9c3bac4422b33d06d3133c3e083a0a2f268174e512768f7ea5f1faaec5634ea66978290ddf7a4209d7858279dea9cb6281cefa30c0a6ce3d6b57b32bb7819c03d14fd8550cb6eb0d7bbe5d4c36042016ab0109aaf60ae3a93f1c440173feacc5847c9745c6426f3dc4d6f5a16a01c4d06bbbf25596dcc48af025212aec557816aa5b0c4d2cdeb4d57619c6e0ab5412beb7ebe8e820cb601e6db266581d4f097d4205fe6f74f6e7c6a7d37491d1e8c3090944d66298535fa1a99e62f372473d67d1778a006048258dc989b51df53f7a2865259d4b7afb134acf25f34e6e7bb55fec7b846ec7d50487d57ee5363b3aa3c8a23c0089996ebc8c0017b70ba8648bc7b22d204a86e622cbcf744f372b3a4ce46296fc1f87f68b8f7231d728a37b42c2b75ca164d207d81ef9c6c0d8928a87f3bb931458e585ad4a19e9727a3fc827700432b316b0adb84d79340ea158a846e6917c8777985e83d27750224e717ec5bd9177748866ada81dd7bd644706acc6c317e0069109a6692ef0','392d15f767db4ec5fe5f287c88c9255f4a13b25faf1fa829276a8caf51ab4bd7d0cbadbab75383e0aa971445eca237293074545d9f99d9f630d25d0872a9341386c8a22b023660d494b4d1d0c583a12ef42e3156cec24c3345c7d5e99753c56e9765c8426e0a51171f31',0,'14','2021-05-20 12:52:39','362d46b07fdb4ed0ee0d98fcccdc6a6d77',0,1),(20,'292747e47cd11bd9fe5fdaed87897c','2a2947f37ac149c6a15f86b3d1dc24273277a5581896a976272e272829cf2fafbcceadbcef15d8aebbdb1142a0a43a6534','352615e3709449d0ef0d84a9dedc6a485452b246ba5da02d',0,'16','2021-05-20 13:44:26','2f2650b065d14fdcef1acbaec9d72e45180c',0,1);
/*!40000 ALTER TABLE `participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `departement_nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `utilisateur_idx_nom_prenom` (`nom`,`prenom`),
  KEY `t_utilisateur_t_departement_fk` (`departement_nom`),
  CONSTRAINT `t_utilisateur_t_departement_fk` FOREIGN KEY (`departement_nom`) REFERENCES `departement` (`nom`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (14,'3d0179dc50e7','172f46be72dd57d9fe0cabbbc5d823461650bf47','$2b$10$fpVdUxgHouOfXRuvNQqWRuZz4XX/zSI35R0oPcctxNijLNTZj/xcO','Service Informatique','37294df57bd75e'),(15,'3b265bff7bd75ec0e9','1b265bff7bd75ec0e9518caec7cc3a455552be43ba7fb829746c616056','$2b$10$9w6DxHued7RYRwjOjkLI7e.zOm116OHrH2vgcYHYDwaYWViCG4IQS','Direction','3d3a5ae565db56d4f5168a'),(16,'368b9cf1','162d54be76dc5ec6f51aaba8cdca3e045b5cbd','$2b$10$LUMgUfe2OHbXIAHL6h/UXeHVwgjn1OkYTxjUPkzR.p7nGWUkjSCZC','Comptabilité','392050e37bd1');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_groupe`
--

DROP TABLE IF EXISTS `utilisateur_groupe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_groupe` (
  `utilisateur_id` int unsigned NOT NULL,
  `groupe_nom` varchar(200) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`utilisateur_id`,`groupe_nom`),
  KEY `t_utilisateur_groupe_t_groupe_fk` (`groupe_nom`),
  CONSTRAINT `t_utilisateur_groupe_t_groupe_fk` FOREIGN KEY (`groupe_nom`) REFERENCES `groupe` (`nom`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_utilisateur_groupe_t_utilisateur_fk` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_groupe`
--

LOCK TABLES `utilisateur_groupe` WRITE;
/*!40000 ALTER TABLE `utilisateur_groupe` DISABLE KEYS */;
INSERT INTO `utilisateur_groupe` VALUES (14,'362d46b07fdb4ed0ee0d98fcccdc6a6d77',1),(15,'3b265bff7bd75e95dc0d84a9d8d6274b565ab1',1),(16,'2f2650b065d14fdcef1acbaec9d72e45180c',1);
/*!40000 ALTER TABLE `utilisateur_groupe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_participation`
--

DROP TABLE IF EXISTS `utilisateur_participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_participation` (
  `utilisateur_id` int unsigned NOT NULL,
  `participation_id` int unsigned NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`utilisateur_id`,`participation_id`),
  KEY `t_utilisateur_participation_t_participation_fk` (`participation_id`),
  CONSTRAINT `t_utilisateur_participation_t_participation_fk` FOREIGN KEY (`participation_id`) REFERENCES `participation` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_utilisateur_participation_t_utilisateur_fk` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_participation`
--

LOCK TABLES `utilisateur_participation` WRITE;
/*!40000 ALTER TABLE `utilisateur_participation` DISABLE KEYS */;
INSERT INTO `utilisateur_participation` VALUES (14,15,1),(15,14,1),(16,20,1);
/*!40000 ALTER TABLE `utilisateur_participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'groupomania'
--
/*!50003 DROP PROCEDURE IF EXISTS `create_commentaire` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_commentaire`(p_user_id INT, p_participation_id INT, p_contenu TEXT, p_is_img BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO commentaire (participation_id, utilisateur_id, contenu, is_img, date_creation)
		VALUES (p_participation_id, p_user_id, p_contenu, p_is_img, CURRENT_TIMESTAMP());
        
        SELECT LAST_INSERT_ID();

    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_groupe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_groupe`(p_groupe_nom VARCHAR(200), p_groupe_description TEXT, p_id INT, p_publique BOOLEAN)
BEGIN

	DECLARE EXIT HANDLER FOR 1062
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Un autre groupe possède ce nom.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION;

		INSERT INTO groupe (nom, description, publique)
		VALUES (p_groupe_nom, p_groupe_description, p_publique);
		
		INSERT INTO utilisateur_groupe (utilisateur_id, groupe_nom, admin)
		VALUES (p_id, p_groupe_nom, 1);
		
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_participation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_participation`(p_groupe_nom VARCHAR(200), p_id INT, p_participation_titre VARCHAR(400), p_participation_preview TEXT, p_participation_article TEXT, p_importance TINYINT, p_publique BOOLEAN, p_prive BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO participation (groupe_nom, createur, titre, preview, article, date_creation, importance, publique, prive)
		VALUES (p_groupe_nom, p_id, p_participation_titre, p_participation_preview, p_participation_article, CURRENT_TIMESTAMP(), p_importance, p_publique, p_prive);
        		
		INSERT INTO utilisateur_participation (utilisateur_id, participation_id, admin)
		VALUES (p_id, LAST_INSERT_ID(), 1);
        
        SELECT LAST_INSERT_ID();
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_commentaire` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_commentaire`(p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		DELETE FROM commentaire
		WHERE id = p_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_groupe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_groupe`(p_nom INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		DELETE FROM groupe
		WHERE nom = p_nom;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_participation` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_participation`(p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		DELETE FROM participation
		WHERE id = p_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user`(p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		DELETE FROM utilisateur
		WHERE id = p_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `grant_groupe_right` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `grant_groupe_right`(p_groupe_nom VARCHAR(200), p_new_member_id INT, p_new_admin BOOLEAN)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO utilisateur_groupe (groupe_nom, utilisateur_id, admin)
		VALUES (p_groupe_nom, p_new_member_id, p_new_admin);
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `grant_participation_right` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `grant_participation_right`(p_participation_id INT, p_new_member_id INT, p_new_admin BOOLEAN)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO utilisateur_participation (participation_id, utilisateur_id, admin)
		VALUES (p_participation_id, p_new_member_id, p_new_admin);
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `groupe_comm_signaled` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_comm_signaled`(p_groupe_nom VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', commentaire.id, 'idUser', utilisateur.id, 'idParticipation', participation.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'contenu', commentaire.contenu, 'date', commentaire.date_creation, 'image', commentaire.is_img)
		FROM commentaire
        INNER JOIN utilisateur
        ON commentaire.utilisateur_id = utilisateur.id
        INNER JOIN participation
        ON participation.id = commentaire.participation_id
        WHERE participation.groupe_nom = p_groupe_nom
        AND commentaire.signaled = 1;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `groupe_content` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_content`(p_groupe_nom VARCHAR(200))
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'date_creation', date_creation, 'importance', importance, 'publique', publique, 'prive', prive, 'createur', createur)
		FROM participation
		WHERE groupe_nom = p_groupe_nom;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `groupe_member` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `groupe_member`(p_groupe_nom VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'admin', utilisateur_groupe.admin)
		FROM utilisateur_groupe
        JOIN utilisateur
        ON utilisateur.id = utilisateur_groupe.utilisateur_id
        WHERE utilisateur_groupe.groupe_nom = p_groupe_nom;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `last_annonce` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `last_annonce`()
BEGIN
	DECLARE last_annonce INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
		BEGIN
			ROLLBACK;
			RESIGNAL;
		END;
    
    START TRANSACTION READ ONLY;

		SELECT id
        INTO last_annonce
        FROM participation
        WHERE groupe_nom = '3b265bff7bd75e95dc0d84a9d8d6274b565ab1'
        AND date_creation = (SELECT MAX(date_creation)
							FROM participation
                            WHERE groupe_nom = '3b265bff7bd75e95dc0d84a9d8d6274b565ab1');

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'importance', importance, 'createur', createur)
		FROM participation
		WHERE id = last_annonce;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `last_articles` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `last_articles`()
BEGIN
   
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', id, 'titre', titre, 'preview', preview, 'article', article, 'date_creation', date_creation, 'groupe_nom', groupe_nom, 'importance', importance, 'createur', createur)
		FROM participation
		WHERE date_creation = (SELECT MAX(date_creation))
        LIMIT 5;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `log_in` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `log_in`(p_email VARCHAR(100))
BEGIN
	DECLARE check_email INT;
    
    DECLARE EXIT HANDLER FOR SQLSTATE '03000'
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email n\'est pas enregistré. Veuillez utiliser le mail avec lequel vous vous êtes inscrit.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT COUNT(*)
		INTO check_email 
		FROM utilisateur
		WHERE email = p_email;
		
		IF check_email = 0
		THEN BEGIN 
				SIGNAL SQLSTATE VALUE '03000';
			END;
		END IF;

		SELECT JSON_OBJECT('id', id, 'nom', nom, 'prenom', prenom, 'email', email, 'password', password, 'departement', departement_nom)
		FROM utilisateur
		WHERE email = p_email;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modif_user_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_email`(p_email VARCHAR(100), p_id INT)
BEGIN
    
    DECLARE EXIT HANDLER FOR 1062
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email est déjà utilisé.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET email = p_email
		WHERE id = p_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modif_user_infos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_infos`(p_nom VARCHAR(100), p_prenom VARCHAR(100), p_departement VARCHAR(50), p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET nom = p_nom,
			prenom = p_prenom,
			departement_nom = p_departement
		WHERE id = p_id;
		
		SELECT JSON_OBJECT('nom', nom, 'prenom', prenom, 'departement', departement_nom)
		FROM utilisateur
		WHERE id = p_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `modif_user_pass` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `modif_user_pass`(p_password VARCHAR(60), p_id INT)
BEGIN
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;

    START TRANSACTION READ WRITE;

		UPDATE utilisateur
		SET password = p_password
		WHERE id = p_id;
		
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `participation_comment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_comment`(p_participation_id INT)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', commentaire.id, 'userId', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'contenu', commentaire.contenu, 'date', commentaire.date_creation, 'image', commentaire.is_img, 'signaled', commentaire.signaled)
		FROM commentaire
        INNER JOIN utilisateur
        ON commentaire.utilisateur_id = utilisateur.id
        WHERE commentaire.participation_id = p_participation_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `participation_infos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_infos`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('id', participation.id, 'titre', participation.titre, 'preview', participation.preview, 'article', participation.article, 'importance', participation.importance, 'publique', participation.publique, 'createurId', participation.createur, 'createurNom', utilisateur.nom, 'createurPrenom', utilisateur.prenom, 'date_creation', participation.date_creation, 'groupe_nom', participation.groupe_nom)
        FROM participation
        JOIN utilisateur
        ON participation.createur = utilisateur.id
        WHERE participation.id = p_participation_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `participation_member` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `participation_member`(p_participation_id INT)
BEGIN

	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ ONLY;

		SELECT JSON_OBJECT('user', utilisateur.id, 'nom', utilisateur.nom, 'prenom', utilisateur.prenom, 'admin', utilisateur_participation.admin)
		FROM utilisateur_participation
        JOIN utilisateur
        ON utilisateur.id = utilisateur_participation.utilisateur_id
        WHERE utilisateur_participation.participation_id = p_participation_id;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sign_up` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sign_up`(p_nom VARCHAR(100), p_prenom VARCHAR(100), p_email VARCHAR(100), p_password VARCHAR(60), p_departement VARCHAR(50))
BEGIN

	DECLARE EXIT HANDLER FOR 1062
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE VALUE '03000'
		SET	MYSQL_ERRNO = 9999,
		MESSAGE_TEXT = 'Cet email est déjà utilisé.';
	END;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION, SQLWARNING
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
    START TRANSACTION READ WRITE;

		INSERT INTO utilisateur (nom, prenom, email, password, departement_nom)
		VALUES
			(p_nom, p_prenom, p_email, p_password, p_departement);
        
	COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-20 14:16:04
