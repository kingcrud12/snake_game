# Snake Game 🐍

Un jeu Snake classique développé en JavaScript vanilla avec des contrôles adaptés aussi bien pour ordinateur que pour appareils mobiles.

## 📝 Table des matières
- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Comment jouer](#comment-jouer)
- [Structure du projet](#structure-du-projet)
- [Personnalisation](#personnalisation)

## 🎮 Aperçu
Un jeu Snake moderne avec une interface rétro, proposant différents niveaux de difficulté et un système de meilleurs scores. Le jeu est entièrement responsive et jouable aussi bien sur ordinateur que sur mobile.

## ✨ Fonctionnalités
- Interface rétro avec police "Press Start 2P"
- 3 niveaux de difficulté (Facile, Moyen, Difficile)
- Système de meilleurs scores persistant (stockage local)
- Contrôles adaptés :
  - Clavier (touches directionnelles) sur ordinateur
  - Boutons tactiles sur mobile
  - Support des swipes sur mobile
- Design responsive
- Animations de score
- Menu principal avec options

## 🛠 Technologies utilisées
- HTML5
- CSS3
- JavaScript (Vanilla)
- Canvas API
- LocalStorage API

## 📥 Installation
1. Clonez le repository :
```bash
git clone https://github.com/votre-nom-de-utilisateur/snake-game.git
```
2. Ouvrez le fichier `index.html` dans votre navigateur.

3. Lancez le jeu en ouvrant `index.html` dans votre navigateur ou utilisez un serveur local.

## 🎯 Comment jouer

### Sur ordinateur
- Utilisez les touches directionnelles (⬆️ ⬇️ ⬅️ ➡️) pour diriger le serpent
- Évitez les murs et votre propre queue
- Mangez la nourriture (carrés rouges) pour grandir et marquer des points

### Sur mobile
- Utilisez les boutons directionnels à l'écran
- Ou faites glisser votre doigt sur l'écran dans la direction souhaitée
- Mêmes règles que sur ordinateur

### Niveaux de difficulté
- **Facile** : Vitesse lente (100ms)
- **Moyen** : Vitesse moyenne (70ms)
- **Difficile** : Vitesse rapide (40ms)

## 📁 Structure du projet

snake-game/
│
├── index.html # Structure HTML principale
├── style.css # Styles et mise en page
├── game.js # Logique du jeu
└── README.md #


### Description des fichiers

#### index.html
- Structure de base du jeu
- Menu principal
- Zone de jeu
- Contrôles tactiles
- Affichage des scores

#### style.css
- Design responsive
- Thème rétro
- Animations
- Styles des contrôles tactiles
- Media queries pour mobile

#### game.js
- Logique du jeu
- Gestion des contrôles
- Système de score
- Stockage local des meilleurs scores
- Gestion des collisions
- Animation du serpent

## 🎨 Personnalisation

### Modification de la vitesse
Dans `game.js`, ajustez les valeurs de `gameSpeed` :

case 'easy': gameSpeed = 100; break;    // Plus lent

case 'medium': gameSpeed = 70; break;   // Normal

case 'hard': gameSpeed = 40; break;     // Plus rapide


### Modification de la taille
Dans `game.js`, ajustez les constantes :

const gridSize = 20;  // Taille des cellules

const tileCount = canvas.width / gridSize;  // Nombre de cellules


### Modification des couleurs
Dans `style.css`, modifiez les variables de couleur :

/* Couleurs principales */

#4ecca3  /* Vert - Couleur principale */

#ff6b6b  /* Rouge - Nourriture */


#1a1a2e  /* Bleu foncé - Arrière-plan */


## 🤝 Contribution
Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à proposer une pull request.

## 📄 Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Contact
Pour toute question ou suggestion, veuillez contacter [dipitay@gmail.com](dipitay@gmail.com).


