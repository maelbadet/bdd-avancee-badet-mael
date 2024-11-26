# exercice 3 :

## fonction fullname_short
```sql
DELIMITER $$

CREATE FUNCTION fullname_short(first_name VARCHAR(50), last_name VARCHAR(50))
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    RETURN CONCAT(UPPER(SUBSTRING(first_name, 1, 1)), '. ', UPPER(LEFT(last_name, 1)), LOWER(SUBSTRING(last_name, 2)));
END$$

DELIMITER ;
```

##  procédure stockée last_post_from_author
```sql
DELIMITER $$

CREATE PROCEDURE last_post_from_author(author_id INT)
BEGIN
    SELECT title, description, date
    FROM posts
    WHERE author_id = author_id
    ORDER BY date DESC
    LIMIT 1;
END$$

DELIMITER ;
```

## procédure stockée is_top_author
```sql
DELIMITER $$

CREATE PROCEDURE is_top_author(author_id INT, OUT is_top BOOLEAN)
BEGIN
    DECLARE rank INT;

    SET rank = (
        SELECT COUNT(*)
        FROM (
            SELECT author_id
            FROM posts
            GROUP BY author_id
            ORDER BY COUNT(*) DESC
            LIMIT 5
        ) AS top_authors
        WHERE author_id = top_authors.author_id
    );

    SET is_top = (rank > 0);
END$$

DELIMITER ;
```

## creation de la table deleted_post : 
```sql
CREATE TABLE deleted_posts (
    id INT PRIMARY KEY,
    author_id INT,
    title VARCHAR(255),
    description VARCHAR(500),
    content TEXT,
    date DATE,
    deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
## trigger d'historisation des posts
```sql
DELIMITER $$

CREATE TRIGGER after_post_delete
AFTER DELETE ON posts
FOR EACH ROW
BEGIN
    INSERT INTO deleted_posts (id, author_id, title, description, content, date)
    VALUES (OLD.id, OLD.author_id, OLD.title, OLD.description, OLD.content, OLD.date);
END$$

DELIMITER ;
```
### pour tester il suffit de drop une ligne de la table post : 
```sql
DELETE FROM posts WHERE id = 500;
```
## creation de la table authors_logs:
```sql
CREATE TABLE authors_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50),
    author_id INT,
    user_id VARCHAR(100),
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    old_values TEXT,
    new_values TEXT
);
```
## trigger(s) de journalisation des actions
### trigger lors de l'ajout d'un auteur : 
```sql
DELIMITER $$

CREATE TRIGGER after_author_insert
    AFTER INSERT ON authors
    FOR EACH ROW
BEGIN
    INSERT INTO authors_logs (action, author_id, user_id, new_values)
    VALUES ('INSERT', NEW.id, USER(), CONCAT('First Name: ', NEW.first_name, ', Last Name: ', NEW.last_name));
END$$
DELIMITER ;
```
### pour le test : 
```sql
INSERT INTO authors (first_name, last_name, email, birthdate)
VALUES ('John', 'Doe', 'john.doe@example.com', '1980-01-01');
```
### trigger pour l'update d'un auteur
```sql
DELIMITER $$
CREATE TRIGGER after_author_update
AFTER UPDATE ON authors
FOR EACH ROW
BEGIN
    INSERT INTO authors_logs (action, author_id, user_id, old_values, new_values)
    VALUES ('UPDATE', OLD.id, USER(), 
            CONCAT('Old First Name: ', OLD.first_name, ', Old Last Name: ', OLD.last_name),
            CONCAT('New First Name: ', NEW.first_name, ', New Last Name: ', NEW.last_name));
END$$
DELIMITER ;
```
### pour le test :
```sql
UPDATE authors
SET first_name = 'Jane', last_name = 'Smith'
WHERE id = 1;
```

### trigger pour le delete sur un auteur
```sql
DELIMITER $$
CREATE TRIGGER after_author_delete
AFTER DELETE ON authors
FOR EACH ROW
BEGIN
    INSERT INTO authors_logs (action, author_id, user_id, old_values)
    VALUES ('DELETE', OLD.id, USER(), 
            CONCAT('First Name: ', OLD.first_name, ', Last Name: ', OLD.last_name));
END$$

DELIMITER ;
```
### pour le test : 
```sql
DELETE FROM authors WHERE id = 1;
```