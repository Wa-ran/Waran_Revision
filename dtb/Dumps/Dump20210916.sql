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
  `user_id` bigint unsigned DEFAULT '0',
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
INSERT INTO `cards` VALUES (1,'363d56b024830180','462c5ce62b8848c5fa11cbafdcc0264f0511b24bb854ab3e686d216209a64dc99fd5f2e9fe5b8aebabde041beca637653a724e11938491f037c9405625ef5c5c8281a8790b387bcec7a19dc1d3d0e538bb212cfc4786033c44741de0dc03cedf012b824b62121b',1,'2021-09-16 05:21:21',1,'',1),(2,'3f3c15f370c04fd0bb4398acc9d76a594c4abc4fe61daa23696c627141ac45cd849de8abf85986ace7d51f4ea2a078673a75025496869cb521d5143f68a87946818af17616276fd3d9f182d1d291a12de984e9f60f649676177709fcc203dfdd5e798d5c7f1d49520333cf2fe7584bfaa223738974837c63ffa2214d6127ccc18a01313138986edd1bff2ac567ff5137fd614692183176198a8f623a9d61ab1f74997ebcf0fbb9976444b069743543c03f550ecc8ad664d0a5d427c4d9ae61d4abc53d711ba9817bcf9901c00ad8f785aaff1278b1131162312953f4561be5fd0dbafe3e10030a68aaf8d528a49f028a046a36d889eab0654f9e9b','372941be35860f8faa4b',6,'2021-09-20 11:29:39',2,'',1),(3,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',4,'2021-09-17 09:12:36',1,'',1),(4,'3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2','363d56b024830180',1,'2021-09-16 16:21:44',1,'',1),(5,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',0,'2021-09-15 23:27:56',1,'',1),(6,'392d56f935c752d2f5168db5cd99264b1845b94ffbfc6538626a216348a94785ca87b9bcb05c8efdf9d60050bea03667306e0011394ad9e12080570269bf79f0429bbf3c49777ad28efdd1d8c5d0f238ee2b63e315c65633736d19fbce1fc9d91f74c8437e0d05464b748934fc0c07fee72f7a976fc09fa8bcee0facf620d6c7de27792f30cb6e96','302d54fe35850c8fa8',0,'2021-09-15 23:41:26',1,'',1),(7,'392d56f935c752d2f5168db5cd99264b180fa35aba51ec3f7361236319e744ca9ed3e5bef25c85e6ad8d5042a3a93c2b6b761d54da2950e120d25a086bbd7d0fc39cbd380b692e87c7a08493c99cf27dfa3733e702c9517659705c4d421fd8c81f2bde5f6a0a05444a68c525b40e00e2a93e399665d03b69e4f4650d303fc796c0077e3337d9d9161dff2ac567ff5137fd61469209303f41694a6a758763b012338a2cadf6aef7c4604aab3d62321ac03f1b0cc484cc7992bcc26283d4ae7b95a5c5236619e1ac77c4884f8e59c4f7cba8a0427cab13017324305fe90508efb30de2a93a0a440772e6b7ce8461d700881173398a86eab47d4dc58869b7f84ec294ddcfe0622a31b8066e0bb3565d1208693dc26619c66168060fa8b1a5aeef3fc37c4530','302d54fe35850c8fa8',6,'2021-09-20 11:30:13',2,'',1),(8,'2b3d50b061db4ec6bb0c8abfc0dc245e1842a54ffb4ba3252b382b694ab102c99587a6a6fa1587fdad973ae365ad377f346858118e9fd9f0368c141968b83840899aa17909322ee9951259c78db8e028ef6730e015874b7c427019ae8e5e8cd95a65df4a2b45','2a3b1bb02d870184a3',5,'2021-09-18 23:30:35',2,'',1),(9,'292956f870ce1bc4ee1acbe0dbc92b441840a453b75af16e6177217209b247cc97cfbcf3b7578de2bd954e6a0f6c306623611c119f998db501c951183bfe6b438d81f377451429d894a5d1d8d599a12cee2e63fb08d24c33562440fd925ec28d4c63d4436e590751517fdd6dfe490feaaf3e2ec162d63065b2f0230e3627d088d117613c378636980cf96f9727f95276ff2a0392412c260c27067c218d6aa043319a31a2eba3bcd2794cad692b6601c336420c9c8ad27ddeb9d36e8ad3b43289e8d93f6355e1c6','2a3b1bb024840b8fa8',6,'2021-09-20 11:32:29',2,'',1),(10,'4b6865f970c649d0bb4cd1ed9c','378b9ffd709448dcbb0984a9db9939454d55b658be45ec3c686d3d2648a402cf85d4bca0f450ceaeafd80553ec06f27d307354599f9f8bf030d81a',4,'2021-09-16 20:50:47',2,'',1),(11,'333b1bb023810184ac','392947b063db42d0e15fcafcc2dc6a494af0794ffb4aa26c69773a7041a4578593ceada5b75096aeacd91500a2aa2d7f306c1854da9e9ce737c5145627be7613828aed2a00777cdc97a194d8cc95f33cbb3722e647cb5a60176714e1915adf8d4f76de5cc8cd40441231cc34a9490ae1a239348f65992a68f5a0211d303dd7948e05627d2bdd77cd0cff6f952dac4293002a189c',5,'2021-09-17 20:50:54',2,'',1),(12,'392947b074d854c7e85f82b088c06a4b4d41b10aae51a96c606a2e6840a002d182ceaabcfb5496e7b6d95043a3a8356c7569181194cd80b520ce140c27bb795e8d86be7900222ed982a184ddd3d0ed38bb242cf80ac25170526919e0961fc8d81f7ac2416f0105524a31ca2fe44103adae26348f27c07c64feee241a2d3283c492116273','372941be35860f8fa94e',5,'2021-09-16 19:29:37',2,'',1),(13,'2a2947b063db4fc7fe5f8eb2cccc384b5650b506fb49a33974383f74e76c51c082d1adbbf24fc2f8b6c30245ecb3316c7b','363d56b027850184a2',5,'2021-09-16 19:30:31',2,'',1),(14,'292115d47cd14e95fa5f9db3ddd53f0a555cbe5ea95abe6c74796f654ba9e10d82c2e8ace31584efb0c51500afaa366734c3da45888fd9e6248044186ea26b52828ca87545327a9d94f698d88091a12eee3733fa15d3fcba17650aeb811fcec85e62ce407e1405535b31d921fd4503e3a42f348565ca7c73536726062f3ac6da8a1731393c9879d7054ee78b2dac4c953a2d03c61c31224d2d01ccff8074a05e773ff7b8edfba2c36307e57336230d8c3b0b5a8f82ce2dcfaad42b88d9fa25c7a8c33b2204','282758be358d0187a9',5,'2021-09-17 20:51:13',2,'',1),(15,'333b1bb02186018d','302d15e360dd4895d1bc42b4c7cf2b421613930dbe4cb86c6bdbef2649aa4c859ec8a5e9ac1588ebf9d91500a8aa366730201950da8d95fa2cd2514dc4713843899dbe360b396b9d89b8d1d9c1d0ed32ee262df202875e664f240ffa834bd9c84c39',5,'2021-09-17 20:51:21',2,'',1),(16,'308b9ce23b940a85a14dd8','b9dc15dad61d53daed1e83f088d32f0a4b52b959fb5da52969383e7341e54e8298c8a5a4f2158cebf9c71555b8e5286826200043959f8ff03780470269f17b5b8982a437452361c893f182d1d59caf7dd82263fb40c24c6717741dfdc2fc0c8d5330c540660940174f64c060e44d14eeaf2f348565993868e2a7220a2d73d0d18d44613c2a96',5,'2021-09-16 19:30:58',2,'',1),(17,'288b9ce63b940f8faa4e','2e3d15f566945fdcfc118ef088f38983505ca64bb31fa223736a2a2660ac47d0dc87acacb74787edbcc11f49bee534687567185e93989cb520d4140120b9775d828ab82b45327a9d8bb0d1c4d599f22efa2920f04b875c72452408fbc25edf8d5c656e86c8cd05435164dd25fa0c05e5a83971922c993975b0ad620a2c2783c49f16312938986cd705e2218d8b250127e6780fde113a254d3a496121d470a01066992dec5c2eebdb374ebd74623206c239430ec79f8262d1bf87c84dc819e895a4d88cabf8768d6d8f',5,'2021-09-16 19:31:10',2,'',1),(18,'2a3a1bb027830184aa','37275bb073dd57c6b75f8abbc1ca6a4b4e56b30aa85eab29746b2a2a04a05685826461a3f8408bfdf9da1f4eeca69d9a207258118a858ce765d1410827bb7d139c9aa42a16322ecf247881dbce94f338bb84e3b504c253665e240dfb8b1fc1c81f67df407d0b54425b3f',5,'2021-09-16 19:31:19',2,'',1),(19,'2a3b1bb027860187a853d9e8','2c2740e335c54edcbb1c99bdc1de244f42139ae97257a33a6670632648aa57c08a8aa4acb714c2d5f7995e7dc686397b7569181194cd98b520d514036ef175f0459fbf30167760d4c7b5321dc79f42e6ef6733fa12d51f7f56240fe19759cadf5e79ce4a2b0040175236c630f95e0fe004e334da20d03021fee9244f2f32d0949aa7b82936cd68d6aa246f8a27e20137e72b0fdc0936390369426a759873ac5033ad2badf1eaebdb3744b56d632f0e6ff3064f8288d0647c62876a919ca924d6a8df3d711ba98d6cd2dd1fd44398b6ccfaac0339ba5d1673262143e7',5,'2021-09-16 19:31:35',2,'',1),(20,'2f2650b073d156d8fe5f9bb9ddcd674f545fb50ab44aae206e7d3d2657aa4c859ec8bdbbe55c91fdb6d9504fb9e5366c75701542da989ce636c55a196ea3385789cfae3608276fce94b89eda8080ee28e9672ff047c1567f44240dfbc55ac0c15a37cc0f7b0b5743fdb8897fa961a527aa2f349269993f64e3ee230a323ec6c7de0b643f35d17bd10ce33bd568e14e3fb3350f92133a76196e497a37986fa00c72952decf5efa6d67958eb','333b1bb0218d0184ae',5,'2021-09-16 19:31:55',2,'',1),(21,'232d46f87ac149daee11','2e2141e2709453daf51099b5ced03b5f5d13a045ae4dec05746a2ec58fa90e8591d2bbbafe1596ebabda1500a8e2396f33651745938597b56d82560462bf385285820ef0477e209da4b4d1c0c582ec38bb2326e306ce4b335b6109fcc24dcddd4f72c14a794449524b638932ec4007f9ae257ac170cb3577f9a286c6383a601d9b44702b3cdb3af2aa2427963eed497ab33a1e921178390f254f6834806faa1033983becfbfca4de645eb778312717d83b45466142c723',5,'2021-09-16 19:32:04',2,'',1),(22,'2e2d4de470945fc0bb3584a9da9975','',0,'2021-09-08 14:52:01',1,'',1);
/*!40000 ALTER TABLE `cards` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_cards` AFTER INSERT ON `cards` FOR EACH ROW BEGIN
	
	DECLARE last_user_revision_id bigint unsigned;
    
    IF 	(SELECT COUNT(*)
			FROM revisions
            WHERE (user_id = NEW.user_id) AND (TIMEDIFF(NOW(), date) < "0000-00-00 01:00:00"))
		= 0
		THEN BEGIN 
			INSERT INTO revisions (user_id, date) VALUES (NEW.user_id, NOW());
		END;
	END IF;

	SELECT MAX(id)
        INTO last_user_revision_id
        FROM revisions
        WHERE user_id = NEW.user_id;
        
	IF 	(SELECT COUNT(*)
			FROM cards_revisions
			WHERE card_id = NEW.id
            AND revision_id = last_user_revision_id)
        = 0
		THEN BEGIN 
			INSERT INTO cards_revisions (card_id, revision_id, new_streak) VALUES (NEW.id, last_user_revision_id, NEW.streak);
		END;
	else
		UPDATE cards_revisions
			SET new_streak = NEW.streak
			WHERE revision_id = last_user_revision_id
            AND card_id = NEW.id;
	END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_cards` AFTER UPDATE ON `cards` FOR EACH ROW BEGIN
	
	DECLARE last_user_revision_id bigint unsigned;
    
    IF 	(SELECT COUNT(*)
			FROM revisions
            WHERE (user_id = NEW.user_id) AND (TIMEDIFF(NOW(), date) < "0000-00-00 01:00:00"))
		= 0
		THEN BEGIN 
			INSERT INTO revisions (user_id, date) VALUES (NEW.user_id, NOW());
		END;
	END IF;

	SELECT MAX(id)
        INTO last_user_revision_id
        FROM revisions
        WHERE user_id = NEW.user_id;
        
	IF 	(SELECT COUNT(*)
			FROM cards_revisions
			WHERE card_id = NEW.id
            AND revision_id = last_user_revision_id)
        = 0
		THEN BEGIN 
			INSERT INTO cards_revisions (card_id, revision_id, new_streak) VALUES (NEW.id, last_user_revision_id, NEW.streak);
		END;
	else
		UPDATE cards_revisions
			SET new_streak = NEW.streak
			WHERE revision_id = last_user_revision_id
            AND card_id = NEW.id;
	END IF;
    
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `cards_revisions`
--

DROP TABLE IF EXISTS `cards_revisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cards_revisions` (
  `card_id` bigint unsigned NOT NULL,
  `revision_id` bigint unsigned NOT NULL,
  `new_streak` tinyint DEFAULT NULL,
  PRIMARY KEY (`card_id`,`revision_id`),
  KEY `t_revisions_t_cards_fk` (`card_id`),
  KEY `t_cards_revisions_t_revisions_fk` (`revision_id`),
  CONSTRAINT `t_cards_revisions_t_cards_fk` FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `t_cards_revisions_t_revisions_fk` FOREIGN KEY (`revision_id`) REFERENCES `revisions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards_revisions`
--

LOCK TABLES `cards_revisions` WRITE;
/*!40000 ALTER TABLE `cards_revisions` DISABLE KEYS */;
INSERT INTO `cards_revisions` VALUES (1,2,1),(2,1,5),(2,6,6),(3,2,4),(4,2,0),(4,3,0),(4,5,1),(5,2,0),(5,4,0),(6,2,0),(6,4,0),(7,1,5),(7,6,6),(8,1,5),(8,6,5),(9,1,5),(9,6,6),(10,1,4),(11,1,5),(12,1,5),(13,1,5),(14,1,5),(15,1,5),(16,1,5),(17,1,5),(18,1,5),(19,1,5),(20,1,5),(21,1,5);
/*!40000 ALTER TABLE `cards_revisions` ENABLE KEYS */;
UNLOCK TABLES;

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
  `user_id` bigint unsigned NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `t_revisions_t_users_fk` (`user_id`),
  CONSTRAINT `t_revisions_t_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions`
--

LOCK TABLES `revisions` WRITE;
/*!40000 ALTER TABLE `revisions` DISABLE KEYS */;
INSERT INTO `revisions` VALUES (1,2,'2021-09-11 15:56:22'),(2,1,'2021-09-12 11:54:35'),(3,1,'2021-09-16 01:25:02'),(4,1,'2021-09-16 01:27:56'),(5,1,'2021-09-16 12:21:44'),(6,2,'2021-09-16 13:29:39');
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
  `name` varchar(20) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  CONSTRAINT `t_tags_t_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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

-- Dump completed on 2021-09-16 15:06:18
