-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: waran_revision
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
-- Table structure for table `cards`
--

DROP TABLE IF EXISTS `cards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recto` text NOT NULL,
  `verso` text NOT NULL,
  `streak` tinyint DEFAULT '0',
  `next_revision` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` bigint unsigned NOT NULL DEFAULT '0',
  `required_cards` varchar(20) DEFAULT NULL,
  `reverse` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `t_cards_t_users_fk` (`user_id`),
  CONSTRAINT `t_cards_t_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',3,'2021-09-09 09:55:25',1,'',1),(2,'372941be35860f8faa4b','3f3c15f370c04fd0bb1d84b2c6dc6a445746a64fb753a96c636d6f544bbc43d09dc2e8baf24783aea9c5b38aafad9ba03020074488ca8dfa30d4514d6bb03847899dbf3c49776bd3c7a5321dcd9fe83af52624f047d75066452408e1974bc9de1f7bc85c2b0a4443577ec733a50c03f9e72b788e72ca7c77f9ab2b0b2d3283d89b4477343796',3,'2021-09-09 09:55:42',2,'',1),(3,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',6,'2021-09-12 09:55:29',1,'',1),(4,'3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2','363d56b024830180',1,'2021-09-08 17:53:23',1,'',1),(5,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456ec6d',0,'2021-09-08 09:53:26',1,'',1),(6,'392d56f935c752d2f5168db5cd99264b1845b94ffbfc6538626a216348a94785ca87b9bcb05c8efdf9d60050bea03667306e0011394ad9e12080570269bf79f0429bbf3c49777ad28efdd1d8c5d0f238ee2b63e315c65633736d19fbce1fc9d91f74c8437e0d05464b748934fc0c07fee72f7a976fc09fa8bcee0facf620d6c7de27792f30cb6e96','302d54fe35850c8fa8',0,'2021-09-08 09:53:28',1,'',1),(7,'302d54fe35850c8fa8','392d56f935c752d2f5168db5cd99264b1845b94ffbfc6538626a216348a94785ca87b9bcb05c8efdf9d60050bea03667306e0011394ad9e12080570269bf79f0429bbf3c49777ad28efdd1d8c5d0f238ee2b63e315c65633736d19fbce1fc9d91f74c8437e0d05464b748934fc0c07fee72f7a976fc09fa8bcee0facf620d6c7de27792f30cb6e96',3,'2021-09-09 09:55:47',2,'',1),(8,'2a3b1bb02d870184a3','2b3d50b061db4ec6bb0c8abfc0dc245e1842a54ffb4ba3252b382b694ab102c99587a6a6fa1587fdad973ae365ad377f346858118e9fd9f0368c141968b83840899aa17909322ee9951259c78db8e028ef6730e015874b7c427019ae8e5e8cd95a65df4a2b45',3,'2021-09-09 09:55:57',2,'',1),(9,'2a3b1bb024840b8fa8','292956f870ce1bc4ee1acb966b1022454e52b80abe4cb86c43712a730ae5618295d4bce9fb408baea8c21900a2aa2d7a756154579b838de66980511927bf77469fcfa12c0c776fcd97b083c0c59eee33e869',3,'2021-09-09 09:27:56',2,'',1),(10,'4b6865f970c649d0bb4cd1ed9c','378b9ffd709448dcbb0984a9db9939454d55b658be45ec3c686d3d2648a402cf85d4bca0f450ceaeafd80553ec06f27d307354599f9f8bf030d81a',1,'2021-09-09 01:46:13',2,'',1),(11,'333b1bb023810184ac','392947b063db42d0e15fcafcc2dc6a494af0794ffb4aa26c69773a7041a4578593ceada5b75096aeacd91500a2aa2d7f306c1854da9e9ce737c5145627be7613828aed2a00777cdc97a194d8cc95f33cbb3722e647cb5a60176714e1915adf8d4f76de5cc8cd40441231cc34a9490ae1a239348f65992a68f5a0211d303dd7948e05627d2bdd77cd0cff6f952dac4293002a189c',1,'2021-09-09 01:46:59',2,'',1),(12,'372941be35860f8fa94e','392947b074d854c7e85f82b088c06a4b4d41b10aae51a96c606a2e6840a002d182ceaabcfb5496e7b6d95043a3a8356c7569181194cd80b520ce140c27bb795e8d86be7900222ed982a184ddd3d0ed38bb242cf80ac25170526919e0961fc8d81f7ac2416f0105524a31ca2fe44103adae26348f27c07c64feee241a2d3283c492116273',2,'2021-09-09 05:44:04',2,'',1),(13,'363d56b027850184a2','2a2947b063db4fc7fe5f8eb2cccc384b5650b506fb49a33974383f74e76c51c082d1adbbf24fc2f8b6c30245ecb3316c7b',2,'2021-09-08 21:45:45',2,'',1),(14,'292115d47cd14e95fa5f9db3ddd53f0a555cbe5ea95abe6c74796f654ba9e10d82c2e8ace31584efb0c51500afaa366734c3da45888fd9e6248044186ea26b52828ca87545327a9d94f698d88091a12eee3733fa15d3fcba17650aeb811fcec85e62ce407e1405535b31d921fd4503e3a42f348565ca7c73536726062f3ac6da8a1731393c9879d7054ee78b2dac4c953a2d03c61c31224d2d01ccff8074a05e773ff7b8edfba2c36307e57336230d8c3b0b5a8f82ce2dcfaad42b88d9fa25c7a8c33b2204','282758be358d0187a9',2,'2021-09-08 21:47:45',2,'',1),(15,'333b1bb02186018d','302d15e360dd4895d1bc42b4c7cf2b421613930dbe4cb86c6bdbef2649aa4c859ec8a5e9ac1588ebf9d91500a8aa366730201950da8d95fa2cd2514dc4713843899dbe360b396b9d89b8d1d9c1d0ed32ee262df202875e664f240ffa834bd9c84c39',1,'2021-09-09 01:46:40',2,'',1),(16,'b9dc15dad61d53daed1e83f088d32f0a4b52b959fb5da52969383e7341e54e8298c8a5a4f2158cebf9c71555b8e5286826200043959f8ff03780470269f17b5b8982a437452361c893f182d1d59caf7dd82263fb40c24c6717741dfdc2fc0c8d5330c540660940174f64c060e44d14eeaf2f348565993868e2a7220a2d73d0d18d44613c2a96','308b9ce23b940a85a14dd8',2,'2021-09-08 22:28:43',2,'',1),(17,'2e3d15f566945fdcfc118ef088f38983505ca64bb31fa223736a2a2660ac47d0dc87acacb74787edbcc11f49bee534687567185e93989cb520d4140120b9775d828ab82b45327a9d8bb0d1c4d599f22efa2920f04b875c72452408fbc25edf8d5c656e86c8cd05435164dd25fa0c05e5a83971922c993975b0ad620a2c2783c49f16312938986cd705e2218d8b250127e6780fde113a254d3a496121d470a01066992dec5c2eebdb374ebd74623206c239430ec79f8262d1bf87c84dc819e895a4d88cabf8768d6d8f','288b9ce63b940f8faa4e',2,'2021-09-08 21:50:59',2,'',1),(18,'37275bb073dd57c6b75f8abbc1ca6a4b4e56b30aa85eab29746b2a2a04a05685826461a3f8408bfdf9da1f4eeca69d9a207258118a858ce765d1410827bb7d139c9aa42a16322ecf247881dbce94f338bb84e3b504c253665e240dfb8b1fc1c81f67df407d0b54425b3f','2a3a1bb027830184aa',2,'2021-09-08 21:51:07',2,'',1),(19,'2c2740e335c54edcbb1c99bdc1de244f42139ae97257a33a6670632648aa57c08a8aa4acb714c2d5f7995e7dc686397b7569181194cd98b520d514036ef175f0459fbf30167760d4c7b5321dc79f42e6ef6733fa12d51f7f56240fe19759cadf5e79ce4a2b0040175236c630f95e0fe004e334da20d03021fee9244f2f32d0949aa7b82936cd68d6aa246f8a27e20137e72b0fdc0936390369426a759873ac5033ad2badf1eaebdb3744b56d632f0e6ff3064f8288d0647c62876a919ca924d6a8df3d711ba98d6cd2dd1fd44398b6ccfaac0339ba5d1673262143e7','2a3b1bb027860187a853d9e8',2,'2021-09-09 05:45:25',2,'',1),(20,'333b1bb0218d0184ae','2f2650b073d156d8fe5f9bb9ddcd674f545fb50ab44aae206e7d3d2657aa4c859ec8bdbbe55c91fdb6d9504fb9e5366c75701542da989ce636c55a196ea3385789cfae3608276fce94b89eda8080ee28e9672ff047c1567f44240dfbc55ac0c15a37cc0f7b0b5743fdb8897fa961a527aa2f349269993f64e3ee230a323ec6c7de0b643f35d17bd10ce33bd568e14e3fb3350f92133a76196e497a37986fa00c72952decf5efa6d67958eb',2,'2021-09-09 05:45:45',2,'',1),(21,'2e2141e2709453daf51099b5ced03b5f5d13a045ae4dec05746a2ec58fa90e8591d2bbbafe1596ebabda1500a8e2396f33651745938597b56d82560462bf385285820ef0477e209da4b4d1c0c582ec38bb2326e306ce4b335b6109fcc24dcddd4f72c14a794449524b638932ec4007f9ae257ac170cb3577f9a286c6383a601d9b44702b3cdb3af2aa2427963eed497ab33a1e921178390f254f6834806faa1033983becfbfca4de645eb778312717d83b45466142c723','232d46f87ac149daee11',2,'2021-09-09 05:46:05',2,'',1),(22,'2e2d4de470945fc0bb3584a9da9975','',0,'2021-09-08 14:52:01',1,'',1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_cards` AFTER INSERT ON `cards` FOR EACH ROW BEGIN
	INSERT INTO revisions (card_id, new_streak, date) VALUES (NEW.id, NEW.streak, now());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_cards` AFTER UPDATE ON `cards` FOR EACH ROW BEGIN
	INSERT INTO revisions (card_id, new_streak, date) VALUES (NEW.id, NEW.streak, now());
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `cards_tags`
--

DROP TABLE IF EXISTS `cards_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards_tags` (
  `card_id` bigint unsigned NOT NULL,
  `tag_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`card_id`,`tag_id`),
  KEY `t_cards_tags_t_tags_fk` (`tag_id`),
  CONSTRAINT `t_cards_tags_t_cards_fk` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_cards_tags_t_tags_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards_tags`
--

LOCK TABLES `cards_tags` WRITE;
/*!40000 ALTER TABLE `cards_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `cards_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `revisions`
--

DROP TABLE IF EXISTS `revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `revisions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `card_id` bigint unsigned NOT NULL,
  `new_streak` tinyint DEFAULT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `t_revisions_t_cards_fk` (`card_id`),
  CONSTRAINT `t_revisions_t_cards_fk` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions`
--

LOCK TABLES `revisions` WRITE;
/*!40000 ALTER TABLE `revisions` DISABLE KEYS */;
/*!40000 ALTER TABLE `revisions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tag` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `user_idx_pseudo` (`pseudo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test'),(2,'Waran','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'waran_revision'
--

--
-- Dumping routines for database 'waran_revision'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-10 17:23:03
