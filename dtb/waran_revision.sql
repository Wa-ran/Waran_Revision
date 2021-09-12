DROP DATABASE IF EXISTS waran_revision;
CREATE DATABASE waran_revision;
USE waran_revision;

CREATE TABLE cards (
                id SERIAL,
                recto TEXT NOT NULL,
                verso TEXT NOT NULL,
                streak TINYINT DEFAULT 0,
                next_revision DATETIME DEFAULT now(),
                user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
                required_cards VARCHAR(20),
                reverse BOOLEAN DEFAULT false,
                PRIMARY KEY (id)
);

CREATE TABLE tags (
				id SERIAL,
				tag VARCHAR(20) NOT NULL,
				PRIMARY KEY (id)
);

CREATE TABLE users (
				id SERIAL,
                pseudo VARCHAR(20) NOT NULL,
                password VARCHAR(60) NOT NULL,
                PRIMARY KEY (id)
);

INSERT INTO users (pseudo, password)
VALUES ('test', 'test');

INSERT INTO users (pseudo, password)
VALUES ('Waran', '');

CREATE INDEX user_idx_pseudo
 ON users (pseudo);
 
CREATE TABLE revisions (
				id SERIAL,
				card_id BIGINT UNSIGNED NOT NULL,
                correct BOOLEAN NOT NULL,
                new_streak TINYINT,
                date DATETIME NOT NULL,
                PRIMARY KEY (id)
);

CREATE TABLE cards_tags (
                card_id BIGINT UNSIGNED NOT NULL,
                tag_id BIGINT UNSIGNED NOT NULL,
                PRIMARY KEY (card_id, tag_id)
);

ALTER TABLE cards_tags ADD CONSTRAINT t_cards_tags_t_cards_fk
FOREIGN KEY (card_id)
REFERENCES cards (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE cards_tags ADD CONSTRAINT t_cards_tags_t_tags_fk
FOREIGN KEY (tag_id)
REFERENCES tags (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE cards ADD CONSTRAINT t_cards_t_users_fk
FOREIGN KEY (user_id)
REFERENCES users (id)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE revisions ADD CONSTRAINT t_revisions_t_cards_fk
FOREIGN KEY (card_id)
REFERENCES cards (id)
ON DELETE CASCADE
ON UPDATE CASCADE;