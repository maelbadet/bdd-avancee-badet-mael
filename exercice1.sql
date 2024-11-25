
-- Selectionner toutes les classes et afficher le libellé de celle-ci.

SELECT c.libelle_lang
FROM classe AS c

-- Selectionner toutes les classes dont le titre professionnel est CDA.

SELECT c.id, tp.libelle
FROM classe AS c
INNER JOIN titre_professionnelle AS tp ON c.titre_professionnelle_id = tp.id
WHERE tp.libelle LIKE '%CDA%';


-- Selectionner toutes les classes qui n'ont pas de titre professionnel lié

SELECT c.id
FROM classe AS c
LEFT JOIN titre_professionnelle AS tp ON c.titre_professionnelle_id = tp.id
WHERE tp.id IS NULL;


-- Selectionner touts les titres professionnels qui n'ont pas de classe liée.

SELECT tp.id, tp.libelle
FROM titre_professionnelle AS tp
LEFT JOIN classe AS c ON tp.id = c.titre_professionnelle_id
WHERE c.id IS NULL;


-- Selectionner tous les tous les tuteurs (Nom et prénom) dont les étudiants sont en CDA

SELECT t.nom AS tuteur_nom, t.prenom AS tuteur_prenom
FROM tuteur AS t
LEFT JOIN etudiant AS e ON t.id = e.tuteur_id
INNER JOIN integrer AS i ON e.id = i.etudiant_id
INNER JOIN classe AS c ON i.classe_id = c.id
INNER JOIN titre_professionnelle AS tp ON c.titre_professionnelle_id = tp.id
WHERE tp.libelle LIKE '%CDA%';
