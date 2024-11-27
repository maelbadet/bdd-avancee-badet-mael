# before installation
## project initialisation
don't forget to init the project with
`npm i`

then add your credential in your .env.exemple

## How to test my project
you just need to run `npm run dev` to run the project and see all authors, 
the last post from the author 1 and my function addition for 10+20

## procedure last_post_from_author : 
```sql
DELIMITER $$

CREATE PROCEDURE last_post_from_author(IN id_author INT)
BEGIN
    SELECT title, description, date
    FROM posts
    WHERE author_id = id_author
    ORDER BY date DESC
    LIMIT 1;
END$$

DELIMITER ;
```

## function addition
```sql
DELIMITER $$

CREATE FUNCTION addition(nombre1 INT, nombre2 INT)
RETURNS INT
BEGIN
    RETURN nombre1 + nombre2;
END$$

DELIMITER ;
```