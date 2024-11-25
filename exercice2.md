## nombre de posts par auteur
```sql
SELECT
    CONCAT(a.first_name, ' ', a.last_name) AS author_name,
    COUNT(p.id) AS post_count
FROM authors AS a
LEFT JOIN posts AS p ON a.id = p.author_id
GROUP BY a.id, a.first_name, a.last_name;
```

## nombre de posts moyen par auteur
```sql
SELECT 
    AVG(post_count) AS average_post_count
FROM (
    SELECT 
        COUNT(p.id) AS post_count
    FROM authors AS a
    LEFT JOIN posts AS p ON a.id = p.author_id
    GROUP BY a.id
) AS post_counts;
```

## liste des auteurs (nom et prenom) dont les posts sont superieurs a 10 avec la clause having
```sql
SELECT 
    CONCAT(a.first_name, ' ', a.last_name) AS author_name,
    COUNT(p.id) AS post_count
FROM authors AS a
LEFT JOIN posts AS p ON a.id = p.author_id
GROUP BY a.id, a.first_name, a.last_name
HAVING COUNT(p.id) > 10;
```

## liste des auteurs (nom et prenom) dont les posts sont supérieurs à 10 avec une sous-requête
```sql
SELECT 
    CONCAT(a.first_name, ' ', a.last_name) AS author_name
FROM authors AS a
WHERE (
    SELECT COUNT(*)
    FROM posts AS p
    WHERE p.author_id = a.id
) > 10;
```

## Liste des auteurs qui ont créé plus de post que la moyenne
### j'ai afficher en plus leurs nombre de posts et le nombre de posts moyen
```sql
SELECT
CONCAT(a.first_name, ' ', a.last_name) AS author_name,
COUNT(p.id) AS post_count,
    (SELECT AVG(post_count)
    FROM (
        SELECT COUNT(p.id) AS post_count
        FROM authors AS a
        LEFT JOIN posts AS p ON a.id = p.author_id
        GROUP BY a.id) 
    AS subquery ) AS average_post_count
FROM authors AS a
LEFT JOIN posts AS p ON a.id = p.author_id
GROUP BY a.id, a.first_name, a.last_name
HAVING COUNT(p.id) > (
    SELECT AVG(post_count)
    FROM (
             SELECT COUNT(p.id) AS post_count
             FROM authors AS a
                      LEFT JOIN posts AS p ON a.id = p.author_id
             GROUP BY a.id
         ) AS subquery
);
```