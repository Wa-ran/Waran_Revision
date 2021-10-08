-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: waran_revision
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `waran_revision`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `waran_revision` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `waran_revision`;

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
  `required_cards` varchar(50) DEFAULT NULL,
  `reverse` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `t_cards_t_users_fk` (`user_id`),
  CONSTRAINT `t_cards_t_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cards`
--

LOCK TABLES `cards` WRITE;
/*!40000 ALTER TABLE `cards` DISABLE KEYS */;
INSERT INTO `cards` VALUES (1,'363d56b024830180','462c5ce62b8848c5fa11cbafdcc0264f0511b24bb854ab3e686d216209a64dc99fd5f2e9fe5b8aebabde041beca637653a724e11938491f037c9405625ef5c5c8281a8790b387bcec7a19dc1d3d0e538bb212cfc4786033c44741de0dc03cedf012b824b62121b',0,'2021-10-06 17:56:08',1,NULL,0),(2,'372941be35860f8faa4b','3f3c15f370c04fd0bb4398acc9d76a594c4abc4fe61daa23696c627141ac45cd849de8abf85986ace7d51f4ea2a078673a75025496869cb521d5143f68a87946818af17616276fd3d9f182d1d291a12de984e9f60f649676177709fcc203dfdd5e798d5c7f1d49520333cf2fe7584bfaa223738974837c63ffa2214d6127ccc18a01313138986edd1bff2ac567ff5137fd614692183176198a8f623a9d61ab1f74997ebcf0fbb9976444b069743543c03f550ecc8ad664d0a5d427c4d9ae61d4abc53d711ba9817bcf9901c00ad8f785aaff1278b1131162312953f4561be5fd0dbafe3e10030a68aaf8d528a49f028a046a36d889eab0654f9e9b',7,'2021-10-11 05:50:06',2,NULL,1),(3,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',4,'2021-09-17 09:12:36',1,'',1),(4,'3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2','363d56b024830180',1,'2021-09-16 16:21:44',1,'',1),(5,'363d56b024830180','3e275bfe709455daee0ccbacc4cc390a5c56f04cb456e2',0,'2021-09-15 23:27:56',1,'',1),(6,'392d56f935c752d2f5168db5cd99264b1845b94ffbfc6538626a216348a94785ca87b9bcb05c8efdf9d60050bea03667306e0011394ad9e12080570269bf79f0429bbf3c49777ad28efdd1d8c5d0f238ee2b63e315c65633736d19fbce1fc9d91f74c8437e0d05464b748934fc0c07fee72f7a976fc09fa8bcee0facf620d6c7de27792f30cb6e96','302d54fe35850c8fa8',0,'2021-09-15 23:41:26',1,'',1),(7,'302d54fe35850c8fa8','392d56f935c752d2f5168db5cd99264b180fa35aba51ec3f7361236319e744ca9ed3e5bef25c85e6ad8d5042a3a93c2b6b761d54da2950e120d25a086bbd7d0fc39cbd380b692e87c7a08493c99cf27dfa3733e702c9517659705c4d421fd8c81f2bde5f6a0a05444a68c525b40e00e2a93e399665d03b69e4f4650d303fc796c0077e3337d9d9161dff2ac567ff5137fd61469209303f41694a6a758763b012338a2cadf6aef7c4604aab3d62321ac03f1b0cc484cc7992bcc26283d4ae7b95a5c5236619e1ac77c4884f8e59c4f7cba8a0427cab13017324305fe90508efb30de2a93a0a440772e6b7ce8461d700881173398a86eab47d4dc58869b7f84ec294ddcfe0622a31b8066e0bb3565d1208693dc26619c66168060fa8b1a5aeef3fc37c4530',7,'2021-10-11 05:50:19',2,NULL,1),(8,'2a3b1bb02d870184a3','2b3d50b061db4ec6bb0c8abfc0dc245e1842a54ffb4ba3252b382b694ab102c99587f4bae7548caeaac3094ca9f87a6f3a6e001c8d8f90f22dd40e4d65be7457ced1a33608776bce93f1bb770998ee2bfa2f7fba14d75e7d09285cfa971fc9de1337d940624456524b7d892cec0c5afeb72b7ac173cd256df5f36709303dd7998901783a31cc20980be2239d6ab2752450f7199f353e231975097c259568fb5e60892cecebe1bec3750ba97c313206de28430e83',6,'2021-10-08 17:50:59',2,NULL,1),(9,'2a3b1bb024840b8fa8','292956f870ce1bc4ee1acbe0dbc92b441840a453b75af16e6177217209b247cc97cfbcf3b7578de2bd954e6a0f6c306623611c119f998db501c951183bfe6b438d81f377451429d894a5d1d8d599a12cee2e63fb08d24c33562440fd925ec28d4c63d4436e590751517fdd6dfe490feaaf3e2ec162d63065b2f0230e3627d088d117613c378636980cf96f9727f95276ff2a0392412c260c27067c218d6aa043319a31a2eba3bcd2794cad692b6601c336420c9c8ad27ddeb9d36e8ad3b43289e8d93f6355e1c6',6,'2021-10-08 17:51:39',2,NULL,1),(10,'4b6865f970c649d0bb4cd1ed9c','378b9ffd709448dcbb0984a9db9939454d55b658be45ec3c686d3d2648a402cf85d4bca0f450ceaeafd80553ec06f27d307354599f9f8bf030d81a',4,'2021-10-08 20:59:29',2,NULL,1),(11,'392947b063db42d0e15fcafce2dc6a494af0794ffb4aa26c3b6b3f674ae551d189cbadf4b54187f6ad9a1445afaa2a6821691b5fc0ca8cfb21c546016ebf7d11d281a22c13326fc8c7b298d1ccccae2eeb262dab47c24b33426a19aede4cdccc5137de5b7208400a1c65cc38fd0102e8a425668074d0336faaee30013b36d1d8970a747f67d675cd1fe823952dac5533e12d0f8e522c260c27182f6ed469ab5e7d997ebffaaef7c4604aab3d62321ac03f1b0cc484cc7992bcc26283d4ae7b95a5c5236619e19a7fd18d16cd46d1e4c4b6fc036aff5f076568265ea60718f9b309f6fa28bacd076facf7c437a9951e9842662cc4c3f5ac615280db2ef1e149d3d7ced8e66b3665be557c05b1120c583bc6f18c310c894c745911beacfee9e87582701472f686dd430e36384340e37374f6b5cfb1d3723a21f8c3564af40f66854d15','333b1bb023810184ac',6,'2021-10-08 17:54:09',2,NULL,1),(12,'372941be35860f8fa94e','392947b074d854c7e85f82b088c06a4b4d41b10aae51a96c606a2e6840a002d182ceaabcfb5496e7b6d95043a3a8356c7569181194cd80b520ce140c27bb795e8d86be7900222ed982a184ddd3d0ed38bb242cf80ac25170526919e0961fc8d81f7ac2416f0105524a31ca2fe44103adae26348f27c07c64feee241a2d3283c492116273',6,'2021-10-08 17:54:22',2,NULL,1),(13,'2a2947b063db4fc7fe5fd7afd8d8240a4b47a946be02ee2a68763b2b53a04bc298d3f2e9f55a8eeafb89154ea8b02a683b63110dd59989f42b9e184d71be6d40ccd3be2904392ece93a89dd19dd2e732f5336ee202ce587b433e5cec8d53c88f0167dfeca21740454874db25f30c5aa2b43a758f3ecf3375e2ab65532c23c2dade17652435dd279a0fe2218d65fb443ff4371e885d3d39012d0431239d63f951608c3fa2a1a0','363d56b027850184a2',4,'2021-10-07 21:38:13',2,NULL,1),(14,'292115d47cd14e95fa5f9db3ddd53f0a555cbe5ea95abe6c74796f654ba9e10d82c2e8ace31584efb0c51500afaa366734c3da45888fd9e62480081e77b076139f9bb435006a2cdb88bf8599d795e83af33379b505c85377153a0cfb8b4cdfcc5174c81324175556502f8560ec5846fee02378c161996072e0af2b4f2c27dad89b59333b36d66e951ee8269e20f81b76f13006d65f6125183956602780c56c5e2fd32dbcfee0f5d6664ea63d732302d939495bd2cbc6689fbbc67f8dd9b422d0e7ce2a711bad2bb7c29403c84fdae2d6b6e80739bc5c0ed5e03753e9480efaf217b7fa2f00080721b2bed829bcd657d10b6430909cb9a26b4dc49775bc5489c4d0decbe7716221a5e5a610ad575f488103e0c3660392513c5b15aba4f7bfb06fcc351e70b2c5ce47422c741155ef7531e8f083b0817e96c6ad8e','282758be358d0187a9',4,'2021-10-07 21:39:22',2,NULL,1),(15,'333b1bb02186018d','463b45f17b9448c1e2138ee18adf25444c1ea74fb258a4383d382d6948a1009bbac2e8bae25c91ae9374d948a3b33961692f07419b84c7bb65e3130874a5385f2f4fed340a392ed388bcd18f809ae47df52263f108c9517617691daede4cdccc5137de5b7208400a1c77c62efd0111e8ae2d7c953a993e6efcaa6751383fccdd8c01319ef9986add1bfe209726e91d79e02f0bdc437f3804694b6e75c875b51f7ddc2db8e6e2ae8a324daa73656b14c9334146d6d1826fd0a7c329dad0b534d4a9cd2a225aaa903ed28912d55fd1e599b9ff1278b10d4c',6,'2021-10-11 08:59:58',2,NULL,1),(16,'b9dc15dad61d53daed1e83f088d32f0a4b52b959fb5da52969383e7341e54e8298c8a5a4f2158cebf9c71555b8e5647a25611a11899e80f9209d160b68bf6c1e9b8aa43e0d23349d85be9dd082cef13ce86737e708d2497645240fe18c1fcfc55a7ac4412b104a424a31da25fc405aa2b43a758f3e977c42f5ee2b483a20d7948e05627d9a183ad44ee5209425e90127e6364adf1c2d35052c066b30d43ab60e72927ebfebf7a7d22d09a3727f324edb3f4f49ca9f982ddda4cb6fc682be28c7aecd2a701bac8d6d818d12d2169be5d5f7e25c37','308b9ce23b940a85a14dd8',6,'2021-10-08 18:06:14',2,NULL,1),(17,'288b9ce63b940f8faa4e','2e3d15f5669407c6eb1e85fcdbcd33465d0ef24cb451b861707d26614cb1188592c8a4adb50b86e7bed9150cec8f9ba03d6f025092d6d6e635c15a5327bf77479e8aed1d0c327b91c7b59494d295e238ed282ae747cb5e33506813e7905a8cc84b37c108630b4b595b64db60ec5846e1a66a649469ca2f60fead20437f30c2c6de10647d38cb3a841afd2e9768ff552fff3a57901b30381964516a3c936eb144339e31a0fbacf5d462e86cdeb86617c32f524bd1cbc165d0b8c278d893a931d4a99463225eabc87d869800d50ac4f7d7b6b01169be5d42653c3c5aac495fecfc17e3a42c1c0d0574e4e29725a79744965c7739c4d0f6ac6b4fd476e2edb853c6d8c494a9743762e74a6001ac120c432cdeb4c7760493477354a57be5f5a6f937cb610f7bfcc786130a31385e4bfa26d22de1607dd3728d712472c300f451',5,'2021-10-08 21:39:33',2,NULL,1),(18,'37275bb073dd57c6b75fd7afd8d8240a4b47a946be02ee2a68763b2b53a04bc298d3f2e9f55a8eeafb891147a5b6786823651711898b9ef036d3515128a2685282d1e17900232e8194a190da8083f524f7227eb701c851671a7319e78557d8971f75c2436f461b45fdb8c32ffc4515adaa257ac1637ccf74e2f26a1c2f32cd8ad24461322cca3ac91ce86f932dac5123fa2c19d75d63251d28482f26807fa91b2ede38a3f1fae6c07542a275657c43ce354a4a80d5d0ce16bbc86580cebf6189e8d93f6355e12bbe819e16cd5fddb6d4e3e54274ba131264273359b80118a4','2a3a1bb027830184aa',6,'2021-10-08 18:15:24',2,NULL,1),(19,'2a3b1bb027860187a853d9e8','2c2740e335c54edcbb4398acc9d76a594c4abc4fe61daa23696c627141ac45cd849de8abf85986ace7d40241a5a2366c2f203ef2538296e324c8184d6bbe6d5696c2a13c4576329294a190da9ed0da73b5691e9f24c64d335e685ce0c55e8cc84a37c3462b09e69e4e63c033a9420fada389bd866f7ae775b0be2a1a2d73cfd5de177e283fde68d907ee2ad92ce9016ae02f0bdc5d2c2214254332779269ab0a3e8b3ba5f8e6bf8d3049aa7175645dc07d495ed299cb607c628737cbcfaa20dbf9916f6b57ff8639c0dd03c05994f2663ff80d6cad5da1bf683659a7541cfee71cf9fd32160a4278f5f8db32a1d500e51762368086f5e76b51d0c722bc548996d88a96fa75232ba255781db357420e24c5fac53e1d834b671c12e1e5fbeef02b802c186cfb674a130e30384240ed6964f6e69ffb80619edcb3911c00f50c27870652e8ff9e6bbd7d026f608172815333fef7c1dcc6fe08f53f606c7732870cd034054ac12fbf4d2d22be50f66acac91b9d4a9ad13fe76d35',5,'2021-10-08 21:40:11',2,NULL,1),(20,'2f2650b073d156d8fe5f9bb9ddcd674f545fb50ab44aae206e7d3d2657aa4c85ccd4b8a8f91591faa0db151deea33767212d0354938d91e17f8056026bb53a0d8280b82b173e7dce88bfd1888f83f13cf5792ce047c95a3347650fae905adfde5a79d946794441521e2dda30e84246feb33378843d9b3a6efeba68183a3ac4dc8a5e313f36d47e9a57ee209438ed5225fa3004924170251d284831259b73b75e7f997eaaf6e2b897615ee2787d2a068c3b065ecd99d6ce16eb982ba97f702cd0e7d9262258ba9b3ec7981ecc4fc7b699e5fc0377ff40166f24200beb1212e4e754e0ec321e0c1626b0bad82bacd91edb1761348dc7f0a56a559c9a38a1f64e88958a96fa75232ba255781db357420e24c5fac53e1d834b671c12e1e5fbeef02b802c1671fb8489564f2b7d1151a96964e6f9cab1817096c1addb0b08e61674c54f14b7af9669a3','333b1bb0218d0184ae',5,'2021-10-08 21:41:08',2,NULL,1),(21,'2e2141e2709407c6eb1e85fcdbcd33465d0ef24cb451b861707d26614cb1188592c8a4adb50b8ae1b7d80249aaac297c3020481e899a98fb7bd05b1875f124409c8ea379162377d182ecd3d2cf9ef570ec222af20fd30533556b10eac001e5de4d766e8467580a444e70c77ea50c07f8b4397dc174dc2e6cf5ee21483e35c5d19d1078323798329a0be42a9768ed483b50f6489b537f150869526a279963e51a768a3fa5ebaea7d26559e56f703613c936435c8287c778cdeb9b7894ddb461c6b3d3236706fd8e71cf895ed64fddf1cde2b6427bb05f0634763753a51509e3fc17b7f92910120b705371d02e0b5245884d702885c8a7e06557c5d66b9b5489ded6dccbe1296220f6066043b050134525cbe0d87c04c64665545aa8b5f8efbc3cd66b177baf86855c0131354640e76179f0af83b69c7d9b90b3d5180aee0b7299161bf8f08477fc721c326785728c1b8323eb83','232d46f87ac149daee11',6,'2021-10-08 18:22:55',2,NULL,1),(22,'2e2d4de470945fc0bb3584a9da9975','',0,'2021-09-08 14:52:01',1,'',1),(27,'463b45f17b9448c1e2138ee18adf25444c1ea74fb258a4383d382d6948a1009ba4c8bdbaab1a91feb8d94e00afa02d7175710158da8c9ce72ace404d3ba2685282cfbe2d1c3b6b80c5b79edad4ddf638f2202be15d875d7c5b605eb0834fdcc8532b825c7b054b091e70dc60e7430bada32f34dd73c93d6fb0bd311633369e96980b7f2974cf7fd10ee53bc368ee4e3af77d54f8bef63e023f476769db75b51f7dc27ebffafca4d9640bf96e61270d8c295257ce8e9f2fd9a4c97fc9cbbf28d2afde752259b0847a83c300c05fc2550ce5b04d6aaf520c2866','282758be35850b8faa4c',1,'2021-10-07 15:03:48',2,NULL,NULL),(28,'463b45f17b9448c1e2138ee18adf25444c1ea74fb258a4383d382d6948a1009ba4c8bdbdf2158fefb0c41f4ef0ea2b79346e4a119f998db526cf5a1e73a36d5a988aed2904252ecc92b49dc5d5d7f433b76726e147c45a7f426d5cff97568ccc1f74c241781057425765897cfa5c07e3e73960986cdc6123f6a12b1b7224c6dd990c656779da75d40daf718d27f95533e07f09da122c331e75097c259568fb52339f79a9ecfaebf3794eb033','328b9cf23b94088faf',1,'2021-10-07 15:02:45',2,NULL,NULL),(29,'362d43f56f944ddae85fd7afd8d8240a4b47a946be02ee2a68763b2b53a04bc298d3f2e9f55a8eeafb890945b9bd787f30720711968fd9f62cc5585128a2685282d1ed3c117778d29eb48b9a80ccf22dfa2963e613de53760a261ae18c4b81da5a7eca477f5e0555517dcd62b77d13e4e72b3482727af5c239f26a1c2f32cd8ade07742e79db72d71ae83cd977b0453fe5612995182c224d2a4363209d26b40b7adc32a9ecaeadd6795fb63d622911d833540ec184cf60daebd265819cbb33d804032a2e1bbc807fc2881dc40ad0b1c0fae0076aff430364683659a75413fffeba3efb34595f4275fcf8db22bbdb1cc7126236c4d5edb968449d972dbef9549bcecfc3ee6d367fa2446308bb10414d32daf1dd7f0fc6566f0112beb6a5aeef3fc37c453ee2c5911303206d4305e0697caaa98cb09a67c18ee9d81c5bc30a278d1252b0ff9362bd6f4373709e7f800033ebe2c899387500ff23732865779802ce251f0fd760b74c2f6fba1ee460d6ce0b810c84d12cec206839a3d3a9281cdd9d3bfd921544e311b260c7c0a4cee40b84f277de8d3d1373262952','333b1bb021840187ad',1,'2021-10-07 15:03:31',2,NULL,NULL);
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
INSERT INTO `cards_revisions` VALUES (1,2,1),(1,7,0),(1,8,0),(1,9,0),(1,10,0),(1,15,0),(2,1,5),(2,6,6),(2,11,7),(3,2,4),(4,2,0),(4,3,0),(4,5,1),(5,2,0),(5,4,0),(6,2,0),(6,4,0),(7,1,5),(7,6,6),(7,11,7),(8,1,5),(8,6,5),(8,11,6),(9,1,5),(9,6,6),(9,11,6),(10,1,4),(10,11,3),(10,12,2),(10,14,3),(10,16,4),(11,1,5),(11,11,6),(12,1,5),(12,11,6),(13,1,5),(13,11,4),(13,14,4),(14,1,5),(14,11,4),(14,14,4),(15,1,5),(15,11,5),(15,16,6),(16,1,5),(16,11,6),(17,1,5),(17,11,4),(17,14,5),(18,1,5),(18,11,6),(19,1,5),(19,11,4),(19,14,5),(20,1,5),(20,11,4),(20,14,5),(21,1,5),(21,11,6),(27,13,NULL),(27,14,1),(27,16,1),(28,13,NULL),(28,14,1),(28,16,1),(29,13,NULL),(29,14,1),(29,16,1);
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
INSERT INTO `cards_tags` VALUES (1,1),(1,2),(3,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `revisions`
--

LOCK TABLES `revisions` WRITE;
/*!40000 ALTER TABLE `revisions` DISABLE KEYS */;
INSERT INTO `revisions` VALUES (1,2,'2021-09-11 15:56:22'),(2,1,'2021-09-12 11:54:35'),(3,1,'2021-09-16 01:25:02'),(4,1,'2021-09-16 01:27:56'),(5,1,'2021-09-16 12:21:44'),(6,2,'2021-09-16 13:29:39'),(7,1,'2021-09-17 14:17:50'),(8,1,'2021-09-17 15:32:25'),(9,1,'2021-09-17 21:07:26'),(10,1,'2021-09-18 15:23:40'),(11,2,'2021-10-04 17:50:06'),(12,2,'2021-10-05 17:00:44'),(13,2,'2021-10-05 22:10:48'),(14,2,'2021-10-06 09:37:20'),(15,1,'2021-10-06 17:52:16'),(16,2,'2021-10-07 08:59:29');
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
  `name` varchar(50) NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `t_tags_t_users_fk` (`user_id`),
  CONSTRAINT `t_tags_t_users_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'0e2d46e424',1),(2,'0e2d46e43586',1);
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
  `pseudo` varchar(50) NOT NULL,
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-07 11:29:25
