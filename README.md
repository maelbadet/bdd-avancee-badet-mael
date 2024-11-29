# evalutation BDD avancée

## initier la base de donnée et insérer des données
pour initier la base de donnée du projet et insérer des données, 
il faut utiliser le script present 
dans `Documentation/scriptCreateBDD.sql`
## premiere partie du devoir 
le but de la premiere partie de ce devoir est de ce tester sur 
des requetes SQL. Toutes les requetes sont dans le fichier 
`Documentation/scriptRequestBDD.sql`. Dedans il y a les requetes pour : 
- nombre d'employés total
- Moyenne des salaires de l'entreprise
- Moyenne des salaires par service 

De créer les procédures stockées permettant de retrouver les données suivantes :
- Le classement du nombre d'employés par service 
- Le top 5 des services par masse salariale 
- La liste des managers et le service dont ils s'occupent 

De créer une fonction permettant de trouver l'écart entre le plus gros et le plus petit salaire de
  l'entreprise

## Deuxieme partie du devoir (projet nodeJS)
### Creation du projet
pour creer le projet il faut faire un `npm init -y`

### installer express, mysql2, dotenv et jest
`express` est utiliser pour creer une petite api et gerer les routes.

`mysql` est quand a lui utiliser pour les relations avec la base de donnee

`dotenv` est la librarie utiliser pour lire le fichier .env

`jest` est utiliser pour les test unitaires

`npm install express dotenv mysql2 jest`

### configurer le dotenv (.env)
```dotenv
PORT=3000
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=myPassword
DB_NAME=myDatabase
```
### Lancement du projet
pour lancer le projet, il suffit de faire un `npm run dev`

### lancer les test unitaires
pour lancer les differents tests unitaires que j'ai fais, il suffit
de faire un `npm run test`