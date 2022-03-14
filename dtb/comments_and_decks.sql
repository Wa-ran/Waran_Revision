USE waran_revision;

DROP TRIGGER IF EXISTS after_insert_cards;
DROP TRIGGER IF EXISTS after_update_cards;

ALTER TABLE cards ADD deck_id BIGINT UNSIGNED NOT NULL, ADD comment TEXT;
ALTER TABLE cards MODIFY recto TEXT, MODIFY verso TEXT, MODIFY recto_image VARCHAR(50), MODIFY verso_image VARCHAR(50);
UPDATE cards SET verso_image = NULL, recto_image = NULL;
ALTER TABLE users ADD hide_card TINYINT(1) DEFAULT '1', ADD chrono_card TINYINT(1) DEFAULT '1', ADD fast_mode TINYINT(1) DEFAULT '1', ADD dark_mode TINYINT(1) DEFAULT NULL;

SET SQL_SAFE_UPDATES = 0;

UPDATE cards SET comment = CONCAT(COALESCE(recto_comment, ''), '_', COALESCE(verso_comment, ''));
UPDATE cards SET comment = NULL WHERE comment = '_';
ALTER TABLE cards DROP recto_comment, DROP verso_comment;

SET SQL_SAFE_UPDATES = ON;

#ALTER TABLE cards DROP recto_comment, DROP verso_comment, DROP has_image;
ALTER TABLE cards RENAME COLUMN streak TO level;
ALTER TABLE cards_revisions RENAME COLUMN new_streak TO new_level;

DROP TABLE IF EXISTS decks;
CREATE TABLE decks (
				id SERIAL,
                user_id BIGINT UNSIGNED,
				title VARCHAR(40),
                text TINYTEXT,
                sequence TINYINT(1) DEFAULT '0',
				PRIMARY KEY (id)
);

DROP TABLE IF EXISTS cards_tags;
DROP TABLE IF EXISTS tags;

DROP PROCEDURE IF EXISTS new_decks;

DELIMITER #
CREATE PROCEDURE new_decks()
BEGIN
	DECLARE start INT;
	DECLARE end INT;
	DECLARE user INT;
	
	SELECT MIN(id) FROM users INTO start;
	SELECT MAX(id) FROM users INTO end;
	SET user = start;

	START TRANSACTION;
	  WHILE user <= end DO
		INSERT INTO decks (user_id, title, text, sequence) VALUE(user, NULL, NULL, NULL);
        UPDATE decks SET user_id = user WHERE id = LAST_INSERT_ID();
        UPDATE cards SET deck_id = LAST_INSERT_ID() WHERE user_id = user;
		SELECT MIN(id) FROM users WHERE id > user INTO user;
	  END WHILE;
	COMMIT;
END #

DELIMITER ;

CALL new_decks();

ALTER TABLE decks MODIFY user_id BIGINT UNSIGNED NOT NULL;

ALTER TABLE cards ADD CONSTRAINT t_cards_t_decks_fk
FOREIGN KEY (deck_id)
REFERENCES decks (id)
ON DELETE CASCADE
ON UPDATE CASCADE;


DROP INDEX user_idx_pseudo ON users;
CREATE INDEX users_idx_pseudo
	ON users (pseudo);
CREATE INDEX cards_idx_next_revision
	ON cards (next_revision);

#SELECT cards.id, cards_tags.tag_id, cards.user_id FROM cards JOIN cards_tags ON cards_tags.card_id = cards.id WHERE cards.user_id = 16 ORDER BY cards.id;
