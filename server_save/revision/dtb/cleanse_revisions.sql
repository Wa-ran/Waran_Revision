USE waran_revision;

SET SQL_SAFE_UPDATES = 0;
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY,',''));

DROP TEMPORARY TABLE IF EXISTS StartOfChains;
CREATE TEMPORARY TABLE StartOfChains (
SELECT DISTINCT a.*
FROM revisions a
LEFT JOIN revisions b
ON (b.date >= a.date - INTERVAL 1 HOUR
	AND b.date < a.date
	AND a.user_id = b.user_id)
WHERE b.date IS NULL);

DROP TEMPORARY TABLE IF EXISTS GroupingQuery;
CREATE TEMPORARY TABLE GroupingQuery (
SELECT revisions.*, MAX(StartOfChains.date) AS ChainStartTime
FROM revisions
JOIN StartOfChains
ON revisions.date >= StartOfChains.date
GROUP BY revisions.id);

DROP TEMPORARY TABLE IF EXISTS updated_revisions;
CREATE TEMPORARY TABLE updated_revisions (
	SELECT revisions.*, COUNT(*)
	FROM revisions
	JOIN GroupingQuery
	ON revisions.id = GroupingQuery.id
	GROUP BY GroupingQuery.ChainStartTime);

DROP TEMPORARY TABLE IF EXISTS updated_revisions_bis;
CREATE TEMPORARY TABLE updated_revisions_bis (SELECT * FROM updated_revisions);

UPDATE IGNORE cards_revisions
LEFT OUTER JOIN updated_revisions
ON cards_revisions.revision_id = updated_revisions.id
SET cards_revisions.revision_id = IF (ISNULL(updated_revisions.id),
									(SELECT MAX(updated_revisions_bis.id)
										FROM updated_revisions_bis 
										WHERE updated_revisions_bis.id <= cards_revisions.revision_id),
                                    cards_revisions.revision_id);

DROP TEMPORARY TABLE IF EXISTS StartOfChains;
DROP TEMPORARY TABLE IF EXISTS GroupingQuery;
DROP TEMPORARY TABLE IF EXISTS updated_revisions;
DROP TEMPORARY TABLE IF EXISTS updated_revisions_bis;

DELETE FROM revisions
WHERE NOT EXISTS (
	SELECT * FROM cards_revisions
    WHERE cards_revisions.revision_id = revisions.id
);

SET sql_mode=(SELECT CONCAT(@@sql_mode, ',ONLY_FULL_GROUP_BY'));