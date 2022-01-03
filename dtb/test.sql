USE waran_revision;

#STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
SET GLOBAL sql_mode=(SELECT CONCAT(@@sql_mode, ',ONLY_FULL_GROUP_BY'));

SHOW VARIABLES LIKE 'sql_mode';

SELECT * FROM cards_revisions
LEFT OUTER JOIN (
	SELECT *, COUNT(*)
	FROM revisions 
	GROUP BY user_id, FLOOR(DATE(date)), FLOOR(HOUR(date))
) updated_revisions
ON cards_revisions.revision_id = updated_revisions.id
WHERE cards_revisions.revision_id > 270;