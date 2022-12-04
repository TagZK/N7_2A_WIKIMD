# N7_2A_WIKIMD

Projet Application Internet consistant à créer un wiki.

## Projet

### Description

Ce projet vise à créer un wiki. Les pages du wiki sont identifiées par la partie pathname de l’url, par exemple `/my/page` dans l’url `http://localhost:8080/my/page`.

Lorsque l’utilisateur tentera d’ouvrir avec son navigateur une page du wiki telle que `/my/page`, celle-ci sera affichée si elle existe déjà, sinon il sera proposé à l’utilisateur de la créer.

Le contenu d’une page sera saisi/édité avec la syntaxe markdown. À l’ouverture une page est en mode ‘visualisation’, c’est à dire que son contenu est non éditable et présenté sous sa forme stylisée ; l’appui sur un contrôle ‘éditer’ fait passer la page en mode ‘édition’, l’affichage stylisé étant alors remplacé par une zone de texte éditable contenant le texte source markdown, qui peut être modifié et sauvegardé.

### Back-end

Les pages du wiki sont une ressource au sens REST.
FeathersJS sera utilisé pour créer une API REST vers cette ressource, sauvegardée dans une base de données.

### Front-end

- [x] Utiliser VueJS 3 pour développer le front-end et la mise en oeuvre des différents modes ‘création’, ‘visualisation’ et ‘édition’ du wiki.
- [x] L’application doit fonctionner aussi bien avec un mobile qu’avec un écran large.
- [x] L’impression d’une page doit faire apparaitre uniquement le contenu, sans les contrôles d’édition.
- [x] Optionnel : les modifications d’une page par un utilisateur doivent conduire à une mise à jour du contenu pour tous les utilisateurs chez qui cette page est ouverte
- [ ] Optionnel : déploiement en production sur un cloud, un VPS ou des environnement gratuits type Surge / Heroku

## Vidéo démonstration

https://youtu.be/OHjmMZkG9M4

## Utilisation

### Procédure d’installation

```
cd ./back
npm i
npx knex migrate:latest
cd ..
cd ./front
npm i
```

### Procédure de lancement

**Une fois la procédure d'installation faite.**

Dans un ***premier*** terminal :
```
cd ./back
node src/app.js
```

Dans un ***second*** terminal :
```
cd ./front
npm run dev
```
