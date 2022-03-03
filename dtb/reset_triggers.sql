USE waran_revision;

DROP TRIGGER IF EXISTS after_insert_cards;
DROP TRIGGER IF EXISTS after_update_cards;

DELIMITER ;;
CREATE TRIGGER `after_insert_cards` AFTER INSERT ON `cards` FOR EACH ROW BEGIN

	DECLARE last_user_revision_date datetime;
	DECLARE last_user_revision_id bigint unsigned;

	DECLARE CONTINUE HANDLER FOR 1292
		BEGIN
			INSERT INTO revisions (user_id, date) VALUES (NEW.user_id, NOW());
		END;
    
	SELECT MAX(date)
        INTO last_user_revision_date
        FROM revisions
        WHERE user_id = NEW.user_id;
    
    IF 	(SELECT COUNT(*)
			FROM revisions
            WHERE (user_id = NEW.user_id) AND (TIMEDIFF(NOW(), last_user_revision_date) < "01:00:00"))
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
			INSERT INTO cards_revisions (card_id, revision_id, new_level) VALUES (NEW.id, last_user_revision_id, NEW.level);
		END;
	else
		UPDATE cards_revisions
			SET new_level = NEW.level
			WHERE revision_id = last_user_revision_id
            AND card_id = NEW.id;
	END IF;
    
END ;;

CREATE TRIGGER `after_update_cards` AFTER UPDATE ON `cards` FOR EACH ROW BEGIN

	DECLARE last_user_revision_date datetime;
	DECLARE last_user_revision_id bigint unsigned;

	DECLARE CONTINUE HANDLER FOR 1292
		BEGIN
			INSERT INTO revisions (user_id, date) VALUES (NEW.user_id, NOW());
		END;
    
	SELECT MAX(date)
        INTO last_user_revision_date
        FROM revisions
        WHERE user_id = NEW.user_id;
    
    IF 	(SELECT COUNT(*)
			FROM revisions
            WHERE (user_id = NEW.user_id) AND (TIMEDIFF(NOW(), last_user_revision_date) < "01:00:00"))
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
			INSERT INTO cards_revisions (card_id, revision_id, new_level) VALUES (NEW.id, last_user_revision_id, NEW.level);
		END;
	else
		UPDATE cards_revisions
			SET new_level = NEW.level
			WHERE revision_id = last_user_revision_id
            AND card_id = NEW.id;
	END IF;
    
END ;;
DELIMITER ;