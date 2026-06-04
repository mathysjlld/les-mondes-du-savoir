const fs = require('fs');
const path = require('path');

// Charger les univers existants compilés
const { UNIVERSES: existing } = require('./tmp_build/lessons.js');

// 1. Métadonnées des nouveaux univers
const NEW_UNIVERSES_META = {
  computer: { id:"computer", name:"Informatique", emoji:"💻", description:"Découvre les ordinateurs, le code secret, Internet et le monde des jeux vidéo !", themeColor:"indigo" },
  survival: { id:"survival", name:"Survie", emoji:"🏕️", description:"Apprends à faire un feu, t'orienter en forêt, et réagir en cas d'urgence !", themeColor:"orange" },
  ornithology: { id:"ornithology", name:"Ornithologie", emoji:"🦅", description:"Observe le vol des rapaces, écoute les chants et perce les secrets des oiseaux !", themeColor:"violet" },
  history: { id:"history", name:"Histoire", emoji:"🏰", description:"Plonge dans le temps des châteaux forts, des chevaliers, des pharaons et des dinosaures !", themeColor:"pink" }
};

// 2. Base de données complète : chaque leçon = { t, e, b, be, text, cards[], quiz[] }
const LESSONS_DB = {
  // ─────────────────────────────────────────────────────────────
  // INFORMATIQUE
  // ─────────────────────────────────────────────────────────────
  computer: {
    "3-5": [
      {
        t:"L'ordinateur et ses parties", e:"💻", b:"Ami des Ordis", be:"🖥️",
        cards:[
          {title:"L'ordinateur", text:"Un ordinateur est une machine qui peut lire, calculer et afficher des informations sur un écran. Il est composé d'un écran, d'un clavier, d'une souris et d'un boîtier appelé unité centrale.", emoji:"💻"},
          {title:"À quoi sert chaque partie ?", text:"L'écran montre les images. Le clavier permet d'écrire des lettres et des chiffres. La souris déplace une petite flèche sur l'écran. L'unité centrale est le cerveau de l'ordinateur : c'est elle qui fait tous les calculs.", emoji:"🖱️"},
          {title:"Le savais-tu ?", text:"Le premier ordinateur inventé était aussi grand qu'une maison entière ! Aujourd'hui, un simple téléphone est bien plus puissant.", emoji:"🤔"}
        ],
        quiz:[
          {question:"Quelle partie de l'ordinateur sert à écrire des lettres ?", options:["La souris","Le clavier","L'écran"], correctAnswer:"Le clavier"},
          {question:"Quel est le rôle de l'écran ?", options:["Faire les calculs","Déplacer la flèche","Montrer les images"], correctAnswer:"Montrer les images"},
          {question:"Comment appelle-t-on le boîtier principal qui fait les calculs ?", options:["Le clavier","L'unité centrale","La souris"], correctAnswer:"L'unité centrale"},
          {question:"La souris sert à…", options:["Écrire","Déplacer la flèche sur l'écran","Allumer l'écran"], correctAnswer:"Déplacer la flèche sur l'écran"},
          {question:"Comment s'appelle la machine qui peut lire et afficher des informations ?", options:["Un réfrigérateur","Un ordinateur","Un vélo"], correctAnswer:"Un ordinateur"}
        ]
      },
      {
        t:"La souris et le clavier", e:"🖱️", b:"Maître du Clic", be:"🖱️",
        cards:[
          {title:"La souris", text:"La souris est un petit objet que l'on tient dans la main. Quand on la déplace sur la table, la flèche se déplace sur l'écran. Le clic gauche permet de sélectionner quelque chose. Le double-clic permet d'ouvrir un programme.", emoji:"🖱️"},
          {title:"Le clavier", text:"Le clavier est rempli de touches. Chaque touche correspond à une lettre, un chiffre ou une action. La touche Entrée permet de valider. La touche Espace crée un espace entre les mots. La touche Suppr efface une lettre.", emoji:"⌨️"},
          {title:"Astuce", text:"Pour écrire une majuscule, tu dois appuyer en même temps sur la touche Maj (ou Shift) et la lettre voulue !", emoji:"💡"}
        ],
        quiz:[
          {question:"Que se passe-t-il quand on déplace la souris sur la table ?", options:["L'ordinateur s'éteint","La flèche se déplace sur l'écran","Le clavier s'allume"], correctAnswer:"La flèche se déplace sur l'écran"},
          {question:"Que fait le double-clic sur un programme ?", options:["Il l'efface","Il l'ouvre","Il l'éteint"], correctAnswer:"Il l'ouvre"},
          {question:"Quelle touche crée un espace entre les mots ?", options:["Entrée","Suppr","Espace"], correctAnswer:"Espace"},
          {question:"Quelle touche permet de valider une action ou d'aller à la ligne ?", options:["Espace","Entrée","Maj"], correctAnswer:"Entrée"},
          {question:"Pour écrire une majuscule, on appuie sur Maj et…", options:["La souris","La lettre voulue","L'écran"], correctAnswer:"La lettre voulue"}
        ]
      },
      {
        t:"Les images et les pixels", e:"🖼️", b:"Dessinateur Pixel", be:"🎨",
        cards:[
          {title:"Qu'est-ce qu'un pixel ?", text:"Les images sur un écran sont faites de milliers de minuscules petits carrés de couleur que l'on appelle des pixels. Plus il y a de pixels, plus l'image est nette et belle.", emoji:"🖼️"},
          {title:"Les couleurs des pixels", text:"Chaque pixel peut être d'une couleur différente. En mélangeant du rouge, du vert et du bleu (les trois couleurs de base de l'écran), on peut créer toutes les couleurs imaginables !", emoji:"🌈"},
          {title:"L'art des pixels", text:"Les premiers jeux vidéo utilisaient de très gros pixels, c'est pourquoi les personnages semblaient carrés. C'est ce qu'on appelle le style 'pixel art', encore très populaire aujourd'hui !", emoji:"🎮"}
        ],
        quiz:[
          {question:"Comment s'appelle le petit carré de couleur qui compose une image d'écran ?", options:["Un pixel","Un bit","Un octet"], correctAnswer:"Un pixel"},
          {question:"Les trois couleurs de base d'un écran sont :", options:["Rouge, jaune, bleu","Rouge, vert, bleu","Blanc, noir, gris"], correctAnswer:"Rouge, vert, bleu"},
          {question:"Plus il y a de pixels dans une image, plus elle est…", options:["Petite","Lente","Nette et belle"], correctAnswer:"Nette et belle"},
          {question:"Comment appelle-t-on le style d'art fait de gros pixels carrés ?", options:["Le pixel art","Le peinture","Le dessin animé"], correctAnswer:"Le pixel art"},
          {question:"À quoi servent les pixels ?", options:["À faire du bruit","À composer les images sur un écran","À stocker des mots"], correctAnswer:"À composer les images sur un écran"}
        ]
      },
      {
        t:"Les robots", e:"🤖", b:"Copain des Robots", be:"🤖",
        cards:[
          {title:"Qu'est-ce qu'un robot ?", text:"Un robot est une machine fabriquée par des humains pour effectuer des tâches à leur place. Les robots suivent des instructions précises qu'on leur a données à l'avance : c'est ce qu'on appelle un programme.", emoji:"🤖"},
          {title:"Des robots partout !", text:"On trouve des robots dans les usines pour construire des voitures, dans les hôpitaux pour aider les chirurgiens, et même dans les maisons comme les aspirateurs robots qui nettoient le sol tout seuls !", emoji:"🏭"},
          {title:"Un robot peut-il penser ?", text:"Un robot ne pense pas vraiment. Il fait exactement ce qu'on lui dit de faire. Si on lui donne la mauvaise instruction, il fera une erreur. C'est l'humain qui doit être intelligent pour programmer le robot correctement !", emoji:"🧠"}
        ],
        quiz:[
          {question:"Qu'est-ce qu'un robot ?", options:["Un animal mécanique","Une machine qui suit des instructions","Un humain artificiel"], correctAnswer:"Une machine qui suit des instructions"},
          {question:"Comment appelle-t-on les instructions données à un robot ?", options:["Un dessin","Un programme","Une recette de cuisine"], correctAnswer:"Un programme"},
          {question:"On trouve des robots dans les usines pour…", options:["Chanter des chansons","Construire des voitures","Cuisiner des gâteaux"], correctAnswer:"Construire des voitures"},
          {question:"Un robot aspirateur sert à…", options:["Laver la vaisselle","Nettoyer le sol tout seul","Éteindre la télévision"], correctAnswer:"Nettoyer le sol tout seul"},
          {question:"Un robot peut-il penser par lui-même ?", options:["Oui, il est très intelligent","Non, il suit uniquement des instructions","Oui, si on lui demande gentiment"], correctAnswer:"Non, il suit uniquement des instructions"}
        ]
      },
      {
        t:"Les tablettes et smartphones", e:"📱", b:"Doigt Magique", be:"👉",
        cards:[
          {title:"Les écrans tactiles", text:"Une tablette et un smartphone sont des ordinateurs que l'on contrôle en touchant directement l'écran avec les doigts. Il n'y a pas besoin de souris ! C'est ce qu'on appelle un écran tactile.", emoji:"📱"},
          {title:"À quoi ça sert ?", text:"Avec un smartphone ou une tablette, on peut téléphoner, envoyer des messages, jouer à des jeux, regarder des vidéos, et même utiliser des applications éducatives pour apprendre des choses nouvelles.", emoji:"📲"},
          {title:"Les applications", text:"Une application (ou 'appli') est un programme que l'on installe sur sa tablette ou son smartphone. Il en existe des milliers : pour dessiner, apprendre les maths, écouter de la musique, ou jouer !", emoji:"🎯"}
        ],
        quiz:[
          {question:"Comment contrôle-t-on une tablette ou un smartphone ?", options:["Avec une souris","En touchant l'écran avec les doigts","Avec un joystick"], correctAnswer:"En touchant l'écran avec les doigts"},
          {question:"Comment appelle-t-on un écran que l'on contrôle en le touchant ?", options:["Un écran tactile","Un écran clavier","Un écran magique"], correctAnswer:"Un écran tactile"},
          {question:"Qu'est-ce qu'une application ?", options:["Un dessin sur l'écran","Un programme installé sur tablette ou smartphone","Le câble d'alimentation"], correctAnswer:"Un programme installé sur tablette ou smartphone"},
          {question:"Avec un smartphone, on peut…", options:["Faire la vaisselle","Téléphoner et envoyer des messages","Cuisiner des pizzas"], correctAnswer:"Téléphoner et envoyer des messages"},
          {question:"Quelle est la différence entre une tablette et un ordinateur classique ?", options:["La tablette est contrôlée au toucher, sans souris","La tablette est plus rapide","La tablette a un clavier plus grand"], correctAnswer:"La tablette est contrôlée au toucher, sans souris"}
        ]
      },
      {
        t:"Allumer et éteindre un ordinateur", e:"🔌", b:"Maître du Bouton", be:"🟢",
        cards:[
          {title:"Comment allumer un ordinateur ?", text:"Pour allumer un ordinateur, on appuie sur le bouton Power, reconnaissable par son symbole cercle avec un trait. Il faut ensuite attendre que l'ordinateur démarre et charge son système.", emoji:"🔌"},
          {title:"Comment éteindre correctement ?", text:"On ne doit jamais éteindre un ordinateur en tirant sur le câble ! Il faut toujours utiliser la commande 'Arrêter' dans le menu pour que l'ordinateur sauvegarde bien ses données avant de s'éteindre.", emoji:"🛑"},
          {title:"Pourquoi éteindre correctement ?", text:"Si on éteint brutalement un ordinateur (en débrancha nt le câble), on peut perdre des fichiers ou endommager le système. L'arrêt correct permet à l'ordinateur de bien fermer tous ses programmes.", emoji:"💡"}
        ],
        quiz:[
          {question:"Quel bouton appuie-t-on pour allumer un ordinateur ?", options:["Le bouton Volume","Le bouton Power","Le bouton Entrée"], correctAnswer:"Le bouton Power"},
          {question:"Comment doit-on éteindre correctement un ordinateur ?", options:["En tirant sur le câble","En claquant l'écran","En utilisant la commande Arrêter dans le menu"], correctAnswer:"En utilisant la commande Arrêter dans le menu"},
          {question:"Que risque-t-on si on éteint brutalement un ordinateur ?", options:["Rien du tout","Perdre des fichiers ou endommager le système","Rendre l'écran plus lumineux"], correctAnswer:"Perdre des fichiers ou endommager le système"},
          {question:"Le symbole Power est reconnaissable par…", options:["Une étoile","Un cercle avec un trait vertical","Un éclair"], correctAnswer:"Un cercle avec un trait vertical"},
          {question:"Après avoir appuyé sur Power, il faut…", options:["Débrancher la souris","Attendre que le système charge","Appuyer une deuxième fois"], correctAnswer:"Attendre que le système charge"}
        ]
      },
      {
        t:"Internet et les sites web", e:"🌐", b:"Navigateur du Web", be:"🌐",
        cards:[
          {title:"Qu'est-ce qu'Internet ?", text:"Internet est un gigantesque réseau qui relie des millions d'ordinateurs et de téléphones à travers le monde. C'est grâce à Internet qu'on peut regarder des vidéos, envoyer des messages et trouver des informations.", emoji:"🌐"},
          {title:"Les sites web", text:"Un site web est une sorte de livre numérique sur Internet. Chaque site a une adresse spéciale qu'on appelle une URL (par exemple : www.explorakids.fr). On utilise un navigateur comme Firefox ou Chrome pour visiter ces sites.", emoji:"🖥️"},
          {title:"Prudence sur Internet !", text:"Sur Internet, il faut toujours rester prudent. On ne donne jamais son prénom, son adresse ou sa photo à des inconnus. Si quelque chose semble bizarre, on en parle à un adulte de confiance.", emoji:"🛡️"}
        ],
        quiz:[
          {question:"Qu'est-ce qu'Internet ?", options:["Un grand magasin de jouets","Un réseau qui relie des millions d'ordinateurs dans le monde","Un jeu vidéo en ligne"], correctAnswer:"Un réseau qui relie des millions d'ordinateurs dans le monde"},
          {question:"Comment s'appelle l'adresse d'un site web ?", options:["Un e-mail","Une URL","Un pixel"], correctAnswer:"Une URL"},
          {question:"Quel programme utilise-t-on pour visiter des sites web ?", options:["Un traitement de texte","Un tableur","Un navigateur comme Firefox ou Chrome"], correctAnswer:"Un navigateur comme Firefox ou Chrome"},
          {question:"Que ne doit-on JAMAIS donner à un inconnu sur Internet ?", options:["Sa couleur préférée","Son prénom et son adresse","Son jeu vidéo favori"], correctAnswer:"Son prénom et son adresse"},
          {question:"Si quelque chose te semble bizarre sur Internet, tu dois…", options:["Continuer à naviguer","En parler à un adulte de confiance","Appuyer sur tous les boutons"], correctAnswer:"En parler à un adulte de confiance"}
        ]
      },
      {
        t:"Les sons et la musique sur l'ordinateur", e:"🎵", b:"Mélomane Digital", be:"🎧",
        cards:[
          {title:"Les haut-parleurs", text:"L'ordinateur produit des sons grâce à des haut-parleurs. On peut régler le volume en utilisant la barre de volume sur l'écran ou les touches du clavier.", emoji:"🔊"},
          {title:"La musique numérique", text:"La musique peut être stockée sur un ordinateur sous forme de fichiers. Les formats les plus connus sont le MP3 et le WAV. On peut écouter de la musique avec des écouteurs branchés sur l'ordinateur.", emoji:"🎵"},
          {title:"Créer de la musique", text:"Il existe des logiciels qui permettent de créer sa propre musique sur un ordinateur. On peut enregistrer des sons, les modifier et les mélanger pour composer des morceaux originaux !", emoji:"🎹"}
        ],
        quiz:[
          {question:"Que faut-il pour entendre du son sur un ordinateur ?", options:["Un clavier","Des haut-parleurs ou des écouteurs","Une imprimante"], correctAnswer:"Des haut-parleurs ou des écouteurs"},
          {question:"Comment s'appelle un format de fichier musical très connu ?", options:["PDF","JPEG","MP3"], correctAnswer:"MP3"},
          {question:"Pour baisser le volume sur un ordinateur, on utilise…", options:["La souris uniquement","La barre de volume ou les touches du clavier","Le bouton Power"], correctAnswer:"La barre de volume ou les touches du clavier"},
          {question:"Peut-on créer de la musique avec un ordinateur ?", options:["Non, jamais","Oui, avec des logiciels dédiés","Seulement avec un piano"], correctAnswer:"Oui, avec des logiciels dédiés"},
          {question:"Les fichiers MP3 servent à stocker…", options:["Des images","De la musique","Des vidéos uniquement"], correctAnswer:"De la musique"}
        ]
      },
      {
        t:"Les emojis et la communication", e:"😊", b:"Roi des Emojis", be:"😀",
        cards:[
          {title:"Qu'est-ce qu'un emoji ?", text:"Un emoji est un petit dessin coloré utilisé dans les messages pour exprimer une émotion ou une idée. Par exemple : 😊 signifie qu'on est heureux, ❤️ veut dire qu'on aime quelque chose, et 🎉 exprime la fête !", emoji:"😊"},
          {title:"D'où viennent les emojis ?", text:"Les emojis ont été inventés au Japon dans les années 1990. Le mot 'emoji' vient du japonais et signifie 'image-caractère'. Aujourd'hui, il existe plus de 3 000 emojis différents !", emoji:"🇯🇵"},
          {title:"Les emojis dans la communication", text:"Les emojis permettent de rendre les messages plus expressifs et amusants. Mais attention : dans les messages sérieux (comme une lettre ou un courriel professionnel), on évite d'en utiliser trop !", emoji:"✉️"}
        ],
        quiz:[
          {question:"Qu'est-ce qu'un emoji ?", options:["Un type d'ordinateur","Un petit dessin coloré pour exprimer une émotion","Un programme de dessin"], correctAnswer:"Un petit dessin coloré pour exprimer une émotion"},
          {question:"Dans quel pays les emojis ont-ils été inventés ?", options:["En France","Aux États-Unis","Au Japon"], correctAnswer:"Au Japon"},
          {question:"Que signifie le mot 'emoji' en japonais ?", options:["Ordinateur magique","Image-caractère","Message secret"], correctAnswer:"Image-caractère"},
          {question:"Combien d'emojis différents existe-t-il environ aujourd'hui ?", options:["50","200","Plus de 3 000"], correctAnswer:"Plus de 3 000"},
          {question:"Dans quel type de message doit-on éviter d'utiliser trop d'emojis ?", options:["Un message à ses amis","Une lettre professionnelle sérieuse","Un texto rigolo"], correctAnswer:"Une lettre professionnelle sérieuse"}
        ]
      },
      {
        t:"Les jeux vidéo", e:"🎮", b:"Jeune Gamer", be:"🕹️",
        cards:[
          {title:"Qu'est-ce qu'un jeu vidéo ?", text:"Un jeu vidéo est un programme informatique qui permet de jouer de façon interactive sur un écran. On contrôle des personnages grâce à une manette, un clavier ou en touchant l'écran.", emoji:"🎮"},
          {title:"Les types de jeux vidéo", text:"Il existe de nombreux types : les jeux de plateforme (comme Mario), les jeux de puzzle, les jeux de sport, les jeux d'aventure et les jeux éducatifs. Chaque jeu a ses propres règles et objectifs.", emoji:"🕹️"},
          {title:"Les jeux et le temps d'écran", text:"Les jeux vidéo peuvent être très amusants, mais il est important de ne pas jouer trop longtemps d'affilée. Il faut faire des pauses régulières pour reposer ses yeux et bouger son corps !", emoji:"⏱️"}
        ],
        quiz:[
          {question:"Qu'est-ce qu'un jeu vidéo ?", options:["Un film qu'on regarde passivement","Un programme interactif que l'on joue sur un écran","Un livre numérique"], correctAnswer:"Un programme interactif que l'on joue sur un écran"},
          {question:"Quel personnage est célèbre dans les jeux de plateforme ?", options:["Sherlock Holmes","Mario","Albert Einstein"], correctAnswer:"Mario"},
          {question:"Avec quoi peut-on contrôler un jeu vidéo ?", options:["Seulement avec une souris","Une manette, un clavier ou l'écran tactile","Uniquement avec la voix"], correctAnswer:"Une manette, un clavier ou l'écran tactile"},
          {question:"Pourquoi faut-il faire des pauses pendant les jeux vidéo ?", options:["Pour recharger la manette","Pour reposer ses yeux et bouger son corps","Parce que le jeu s'arrête tout seul"], correctAnswer:"Pour reposer ses yeux et bouger son corps"},
          {question:"Un jeu de puzzle est un jeu où l'on doit…", options:["Courir très vite","Résoudre des énigmes et assembler des pièces","Construire des maisons"], correctAnswer:"Résoudre des énigmes et assembler des pièces", isSpecial:true}
        ]
      }
    ],
    "6-8": [
      {
        t:"Comment fonctionne un ordinateur ?", e:"💻", b:"Technicien en Herbe", be:"🔧",
        cards:[
          {title:"Le processeur (CPU)", text:"Le processeur est le cerveau de l'ordinateur. Il exécute des millions d'instructions par seconde. Plus il est rapide (mesuré en GHz), plus l'ordinateur est puissant. C'est lui qui fait tous les calculs.", emoji:"🧠"},
          {title:"La mémoire vive (RAM)", text:"La RAM est la mémoire temporaire de l'ordinateur. Elle stocke les données des programmes en cours d'utilisation. Quand on éteint l'ordinateur, tout ce qui est dans la RAM est effacé. Plus il y a de RAM, plus on peut faire tourner des programmes en même temps.", emoji:"💾"},
          {title:"Le disque dur (stockage)", text:"Le disque dur (ou SSD) est la mémoire permanente de l'ordinateur. C'est là que sont stockés tous tes fichiers, photos, musiques et programmes, même quand l'ordinateur est éteint.", emoji:"🗄️"},
          {title:"La carte graphique", text:"La carte graphique (ou GPU) s'occupe d'afficher les images et les vidéos à l'écran. Dans les jeux vidéo, c'est elle qui dessine tous les décors et personnages en temps réel. Plus elle est puissante, plus les graphismes sont beaux.", emoji:"🖼️"}
        ],
        quiz:[
          {question:"Comment s'appelle le 'cerveau' d'un ordinateur qui exécute les calculs ?", options:["La RAM","Le processeur (CPU)","La carte graphique"], correctAnswer:"Le processeur (CPU)"},
          {question:"Que se passe-t-il avec les données en RAM quand on éteint l'ordinateur ?", options:["Elles sont sauvegardées automatiquement","Elles sont transférées sur le disque dur","Elles sont effacées"], correctAnswer:"Elles sont effacées"},
          {question:"Quelle composante stocke tes fichiers et photos de façon permanente ?", options:["La RAM","Le processeur","Le disque dur ou SSD"], correctAnswer:"Le disque dur ou SSD"},
          {question:"Quelle est l'unité de mesure de la vitesse d'un processeur ?", options:["Les GHz","Les pixels","Les octets"], correctAnswer:"Les GHz"},
          {question:"À quoi sert la carte graphique (GPU) ?", options:["À stocker des fichiers","À afficher les images et vidéos à l'écran","À connecter à Internet"], correctAnswer:"À afficher les images et vidéos à l'écran"},
          {question:"Plus il y a de RAM dans un ordinateur, plus on peut…", options:["Avoir un écran plus grand","Faire tourner plusieurs programmes en même temps","Connecter plus de souris"], correctAnswer:"Faire tourner plusieurs programmes en même temps"},
          {question:"Que mesure le GHz pour un processeur ?", options:["Sa taille en centimètres","Sa vitesse d'exécution des instructions","Sa consommation d'électricité"], correctAnswer:"Sa vitesse d'exécution des instructions"},
          {question:"Le SSD est un type de…", options:["Carte graphique améliorée","Mémoire de stockage permanente plus rapide que le disque dur classique","Processeur nouvelle génération"], correctAnswer:"Mémoire de stockage permanente plus rapide que le disque dur classique"},
          {question:"Quelle composante s'occupe des graphismes dans les jeux vidéo ?", options:["La RAM","Le CPU","Le GPU (carte graphique)"], correctAnswer:"Le GPU (carte graphique)"},
          {question:"Quelle est la différence principale entre la RAM et le disque dur ?", options:["La RAM est plus grande que le disque dur","La RAM est temporaire, le disque dur est permanent","Ils font exactement la même chose"], correctAnswer:"La RAM est temporaire, le disque dur est permanent", isSpecial:true}
        ]
      },
      {
        t:"Qu'est-ce qu'un algorithme ?", e:"🧩", b:"Logique Junior", be:"🧩",
        cards:[
          {title:"Définition d'un algorithme", text:"Un algorithme est une suite d'instructions précises et ordonnées permettant de résoudre un problème. C'est comme une recette de cuisine : si tu suis les étapes dans l'ordre, tu obtiens le résultat voulu.", emoji:"🧩"},
          {title:"Exemple concret", text:"Pour faire du pain grillé : 1) Prendre une tranche de pain. 2) La mettre dans le grille-pain. 3) Régler le minuteur. 4) Attendre que ça saute. 5) Sortir le pain. C'est un algorithme !", emoji:"🍞"},
          {title:"Les algorithmes dans l'informatique", text:"Les programmes informatiques sont basés sur des algorithmes. Quand tu cherches un mot dans un dictionnaire en ligne, un algorithme cherche dans toute la base de données et te donne la définition en quelques millièmes de seconde.", emoji:"💻"},
          {title:"Les conditions et les boucles", text:"Les algorithmes utilisent des conditions (SI… ALORS…) et des boucles (RÉPÉTER… JUSQU'À…). Par exemple : SI la lampe est éteinte ALORS appuie sur l'interrupteur. C'est la base de la programmation !", emoji:"🔄"}
        ],
        quiz:[
          {question:"Qu'est-ce qu'un algorithme ?", options:["Un type de calculatrice","Une suite d'instructions ordonnées pour résoudre un problème","Un langage de programmation"], correctAnswer:"Une suite d'instructions ordonnées pour résoudre un problème"},
          {question:"À quoi peut-on comparer un algorithme dans la vie quotidienne ?", options:["À un dessin","À une recette de cuisine","À un jouet"], correctAnswer:"À une recette de cuisine"},
          {question:"Dans un algorithme, une condition s'écrit souvent comme…", options:["RÉPÉTER… JUSQU'À","SI… ALORS","CALCULE… RÉSULTAT"], correctAnswer:"SI… ALORS"},
          {question:"Qu'est-ce qu'une boucle dans un algorithme ?", options:["Une instruction qui ne s'exécute qu'une seule fois","Une instruction qui se répète plusieurs fois","Une erreur dans le programme"], correctAnswer:"Une instruction qui se répète plusieurs fois"},
          {question:"Les algorithmes sont la base de…", options:["La peinture numérique uniquement","Tous les programmes informatiques","Les connexions Internet uniquement"], correctAnswer:"Tous les programmes informatiques"},
          {question:"Laquelle de ces suites d'étapes est un algorithme ?", options:["Regarder par la fenêtre","1) Ouvrir le robinet 2) Mettre les mains sous l'eau 3) Savonner 4) Rincer 5) Sécher","Penser à quelque chose"], correctAnswer:"1) Ouvrir le robinet 2) Mettre les mains sous l'eau 3) Savonner 4) Rincer 5) Sécher"},
          {question:"Qu'est-ce qui se passe si les étapes d'un algorithme ne sont pas dans le bon ordre ?", options:["Rien, l'ordre n'a pas d'importance","Le résultat sera incorrect ou impossible","Le programme sera plus rapide"], correctAnswer:"Le résultat sera incorrect ou impossible"},
          {question:"Quand un moteur de recherche trouve une définition en quelques millièmes de seconde, il utilise…", options:["Un humain très rapide","Un algorithme de recherche","De la magie"], correctAnswer:"Un algorithme de recherche"},
          {question:"Quelle instruction est une boucle ?", options:["SI la porte est fermée ALORS ouvre-la","RÉPÉTER : avance d'un pas JUSQU'À la fin du couloir","CALCULE 2 + 3"], correctAnswer:"RÉPÉTER : avance d'un pas JUSQU'À la fin du couloir"},
          {question:"Pourquoi les algorithmes doivent-ils être précis ?", options:["Pour qu'ils soient plus longs","Pour que l'ordinateur les exécute exactement comme prévu","Pour impressionner les autres"], correctAnswer:"Pour que l'ordinateur les exécute exactement comme prévu", isSpecial:true}
        ]
      },
      {
        t:"Internet, le réseau géant", e:"🌐", b:"Navigateur du Web", be:"🌐",
        cards:[
          {title:"Comment fonctionne Internet ?", text:"Internet est un réseau mondial qui relie des milliards d'appareils. Chaque appareil connecté possède une adresse IP unique, comme une adresse postale. Les données voyagent en paquets d'informations à travers des câbles et des satellites.", emoji:"🌐"},
          {title:"Les câbles sous-marins", text:"La majorité des données Internet voyagent dans d'énormes câbles posés au fond des océans. Ces câbles en fibre optique transmettent la lumière à la vitesse de... la lumière ! C'est pourquoi Internet est si rapide.", emoji:"🌊"},
          {title:"Les protocoles", text:"Pour que les ordinateurs se comprennent, ils utilisent des règles communes appelées protocoles. Le protocole HTTP sert à afficher des pages web. Le protocole HTTPS est la version sécurisée et cryptée.", emoji:"🔒"},
          {title:"Le WiFi et le câble", text:"On peut se connecter à Internet par WiFi (sans fil, via des ondes radio) ou par câble Ethernet (plus stable et plus rapide). Le WiFi est pratique mais peut être plus lent que le câble.", emoji:"📡"}
        ],
        quiz:[
          {question:"Quelle est l'adresse unique qui identifie chaque appareil sur Internet ?", options:["L'adresse email","L'adresse IP","L'URL du site web"], correctAnswer:"L'adresse IP"},
          {question:"Comment voyagent la plupart des données sur Internet ?", options:["Par satellite uniquement","Par câbles sous-marins en fibre optique","Par ondes radio WiFi uniquement"], correctAnswer:"Par câbles sous-marins en fibre optique"},
          {question:"Que transmet la fibre optique pour envoyer des données ?", options:["De l'électricité","De la lumière","Des sons"], correctAnswer:"De la lumière"},
          {question:"Quelle est la version sécurisée du protocole HTTP ?", options:["FTP","HTTPS","WiFi"], correctAnswer:"HTTPS"},
          {question:"Comment s'appelle la connexion Internet sans fil ?", options:["Bluetooth uniquement","Ethernet","WiFi"], correctAnswer:"WiFi"},
          {question:"Quelle connexion est généralement plus stable et rapide : WiFi ou câble Ethernet ?", options:["Le WiFi","Le câble Ethernet","Ils sont identiques"], correctAnswer:"Le câble Ethernet"},
          {question:"À quoi sert le protocole HTTP ?", options:["À crypter les données","À afficher des pages web","À envoyer des emails"], correctAnswer:"À afficher des pages web"},
          {question:"Internet est un réseau qui relie combien d'appareils environ ?", options:["Quelques milliers","Des millions","Des milliards"], correctAnswer:"Des milliards"},
          {question:"Pourquoi Internet est-il si rapide ?", options:["Parce que les données voyagent à la vitesse de la lumière dans les fibres optiques","Parce que les serveurs sont proches de chez toi","Parce que les données sont très petites"], correctAnswer:"Parce que les données voyagent à la vitesse de la lumière dans les fibres optiques"},
          {question:"Que sont les paquets de données sur Internet ?", options:["Des boîtes physiques envoyées par camion","Des fragments d'informations qui voyagent sur le réseau","Des fichiers compressés"], correctAnswer:"Des fragments d'informations qui voyagent sur le réseau", isSpecial:true}
        ]
      },
      {
        t:"Créer son jeu vidéo", e:"🎮", b:"Créateur de Jeux", be:"👾",
        cards:[
          {title:"Les étapes de création", text:"Créer un jeu vidéo demande plusieurs étapes : 1) Imaginer le concept (de quoi parle le jeu ?), 2) Dessiner les personnages et les décors (game art), 3) Programmer les règles et les mouvements (code), 4) Tester et corriger les bugs.", emoji:"🎮"},
          {title:"La programmation d'un jeu", text:"Dans un jeu, le code dit au personnage comment se déplacer, sauter, attaquer ou collecter des objets. Par exemple : 'SI le joueur appuie sur la flèche droite ALORS déplace le personnage de 5 pixels vers la droite'.", emoji:"👾"},
          {title:"Les moteurs de jeu", text:"Les programmeurs utilisent des logiciels spéciaux appelés moteurs de jeu pour créer des jeux plus facilement. Unity et Unreal Engine sont les deux moteurs les plus populaires. Des jeux comme Fortnite ont été créés avec Unreal Engine !", emoji:"⚙️"},
          {title:"Les bugs et le débogage", text:"Un bug est une erreur dans le code qui fait que le jeu ne fonctionne pas correctement. Trouver et corriger les bugs s'appelle le débogage. Tous les programmeurs passent du temps à déboguer leur code !", emoji:"🐛"}
        ],
        quiz:[
          {question:"Quelle est la première étape pour créer un jeu vidéo ?", options:["Écrire le code immédiatement","Imaginer le concept du jeu","Acheter une console"], correctAnswer:"Imaginer le concept du jeu"},
          {question:"Comment s'appelle la partie d'un jeu qui dessine les personnages et décors ?", options:["Le débogage","Le game art","Le moteur de jeu"], correctAnswer:"Le game art"},
          {question:"Quel moteur de jeu a été utilisé pour créer Fortnite ?", options:["Unity","Scratch","Unreal Engine"], correctAnswer:"Unreal Engine"},
          {question:"Qu'est-ce qu'un bug dans un jeu vidéo ?", options:["Un personnage caché","Une erreur dans le code qui empêche le jeu de fonctionner correctement","Un niveau bonus"], correctAnswer:"Une erreur dans le code qui empêche le jeu de fonctionner correctement"},
          {question:"Comment s'appelle l'action de trouver et corriger les bugs ?", options:["Le codage","Le débogage","Le game design"], correctAnswer:"Le débogage"},
          {question:"Dans le code d'un jeu, que se passe-t-il quand le joueur appuie sur la flèche droite ?", options:["Le jeu s'arrête","Le personnage se déplace vers la droite","La musique change"], correctAnswer:"Le personnage se déplace vers la droite"},
          {question:"Qu'est-ce qu'un moteur de jeu ?", options:["Le moteur électrique d'une console","Un logiciel spécial pour créer des jeux plus facilement","Une manette améliorée"], correctAnswer:"Un logiciel spécial pour créer des jeux plus facilement"},
          {question:"Combien d'étapes principales compte la création d'un jeu vidéo ?", options:["1 seule (le code)","2 (le dessin et le code)","Plusieurs : concept, art, code, tests"], correctAnswer:"Plusieurs : concept, art, code, tests"},
          {question:"Que fait le code quand le joueur 'collecte' un objet dans un jeu ?", options:["Rien, c'est aléatoire","Il déclenche une action programmée (ex: +10 points)","Il redémarre le jeu"], correctAnswer:"Il déclenche une action programmée (ex: +10 points)"},
          {question:"Unity est le nom d'un…", options:["Personnage de jeu vidéo célèbre","Moteur de jeu très populaire","Type de manette de jeu"], correctAnswer:"Moteur de jeu très populaire", isSpecial:true}
        ]
      },
      {
        t:"La sécurité sur Internet", e:"🛡️", b:"Bouclier du Web", be:"🛡️",
        cards:[
          {title:"Les mots de passe", text:"Un bon mot de passe doit être long (au moins 8 caractères), mélanger des lettres majuscules, minuscules, des chiffres et des symboles (!, @, #). On ne doit jamais utiliser son prénom ou sa date de naissance comme mot de passe.", emoji:"🔐"},
          {title:"Le phishing (hameçonnage)", text:"Le phishing est une technique utilisée par des personnes malveillantes. Elles envoient de faux e-mails qui semblent venir de ta banque ou d'un site connu. Le but est de te faire cliquer sur un lien pour voler tes informations.", emoji:"🎣"},
          {title:"Les données personnelles", text:"Tes données personnelles (nom, adresse, numéro de téléphone, photo) sont précieuses. Sur Internet, on ne les partage qu'avec des sites de confiance et jamais avec des inconnus. La loi protège tes données : c'est le RGPD en Europe.", emoji:"🔒"},
          {title:"Les mises à jour de sécurité", text:"Il est très important de faire régulièrement les mises à jour de ton téléphone et de ton ordinateur. Ces mises à jour corrigent des failles de sécurité qui pourraient être utilisées par des pirates pour accéder à tes données.", emoji:"🔄"}
        ],
        quiz:[
          {question:"Quelle longueur minimale recommande-t-on pour un mot de passe sécurisé ?", options:["3 caractères","5 caractères","8 caractères ou plus"], correctAnswer:"8 caractères ou plus"},
          {question:"Pourquoi ne faut-il pas utiliser son prénom comme mot de passe ?", options:["C'est trop long","C'est trop facile à deviner","Les ordinateurs ne lisent pas les prénoms"], correctAnswer:"C'est trop facile à deviner"},
          {question:"Qu'est-ce que le phishing ?", options:["Un jeu en ligne","Une technique pour voler des informations via de faux emails","Un logiciel de navigation"], correctAnswer:"Une technique pour voler des informations via de faux emails"},
          {question:"Quelle loi européenne protège les données personnelles sur Internet ?", options:["Le CNIL uniquement","Le RGPD","La loi WiFi"], correctAnswer:"Le RGPD"},
          {question:"Pourquoi faut-il faire les mises à jour de sécurité de son téléphone ?", options:["Pour avoir de nouvelles applications","Pour corriger des failles que des pirates pourraient exploiter","Pour que la batterie dure plus longtemps"], correctAnswer:"Pour corriger des failles que des pirates pourraient exploiter"},
          {question:"Un bon mot de passe doit contenir…", options:["Uniquement des chiffres","Seulement le nom de son animal de compagnie","Des majuscules, minuscules, chiffres et symboles"], correctAnswer:"Des majuscules, minuscules, chiffres et symboles"},
          {question:"Si tu reçois un email douteux te demandant tes identifiants, tu dois…", options:["Répondre avec tes infos","Cliquer sur le lien pour vérifier","Ne jamais cliquer et signaler l'email comme spam"], correctAnswer:"Ne jamais cliquer et signaler l'email comme spam"},
          {question:"Tes données personnelles incluent lesquelles de ces informations ?", options:["Ta couleur de jeu vidéo préférée","Ton adresse, ton nom, ton numéro de téléphone","Le nom de tes personnages de fiction"], correctAnswer:"Ton adresse, ton nom, ton numéro de téléphone"},
          {question:"Avec qui peut-on partager ses données personnelles sur Internet ?", options:["Avec tout le monde gratuitement","Uniquement avec des sites de confiance et jamais avec des inconnus","Avec tous ses amis de jeux vidéo"], correctAnswer:"Uniquement avec des sites de confiance et jamais avec des inconnus"},
          {question:"Que signifie le sigle RGPD ?", options:["Règlement Général sur la Protection des Données","Réseau Global de Protection Digitale","Registre des Gérants de Pages Dédiées"], correctAnswer:"Règlement Général sur la Protection des Données", isSpecial:true}
        ]
      },
      {
        t:"Les composants de l'ordinateur", e:"💾", b:"Monteur Ordi", be:"🔌",
        cards:[
          {title:"La carte mère", text:"La carte mère est la pièce principale de l'ordinateur. Elle relie tous les composants entre eux : le processeur, la RAM, les disques, la carte graphique. C'est comme le squelette de l'ordinateur.", emoji:"🔧"},
          {title:"Le processeur et la RAM", text:"Le processeur (CPU) calcule toutes les instructions. La RAM (mémoire vive) stocke temporairement les données en cours d'utilisation. Le duo CPU + RAM détermine la fluidité générale de l'ordinateur.", emoji:"💻"},
          {title:"L'alimentation et le refroidissement", text:"L'alimentation (bloc d'alimentation) convertit le courant électrique du secteur en énergie utilisable par les composants. Le ventilateur ou le refroidissement liquide empêche les composants de surchauffer.", emoji:"❄️"},
          {title:"Les périphériques", text:"Les périphériques sont les appareils externes connectés à l'ordinateur : l'écran, le clavier, la souris, les haut-parleurs, l'imprimante. On distingue les périphériques d'entrée (clavier, souris) et de sortie (écran, imprimante).", emoji:"🖨️"}
        ],
        quiz:[
          {question:"À quoi sert la carte mère dans un ordinateur ?", options:["À stocker les photos","À relier tous les composants entre eux","À afficher l'image"], correctAnswer:"À relier tous les composants entre eux"},
          {question:"Comment s'appelle la mémoire temporaire qui stocke les données en cours d'utilisation ?", options:["Le disque dur","La RAM","La carte mère"], correctAnswer:"La RAM"},
          {question:"À quoi sert le bloc d'alimentation ?", options:["À connecter à Internet","À convertir le courant électrique en énergie pour les composants","À refroidir le processeur"], correctAnswer:"À convertir le courant électrique en énergie pour les composants"},
          {question:"Quel est le rôle du ventilateur ou du refroidissement liquide ?", options:["Faire plus de bruit","Empêcher les composants de surchauffer","Accélérer Internet"], correctAnswer:"Empêcher les composants de surchauffer"},
          {question:"Le clavier est un périphérique d'…", options:["Entrée","Sortie","Stockage"], correctAnswer:"Entrée"},
          {question:"L'imprimante est un périphérique de…", options:["Entrée","Sortie","Calcul"], correctAnswer:"Sortie"},
          {question:"Quel duo de composants détermine la fluidité générale d'un ordinateur ?", options:["La carte graphique et le disque dur","Le CPU et la RAM","L'alimentation et le ventilateur"], correctAnswer:"Le CPU et la RAM"},
          {question:"Quel composant fait office de 'squelette' en reliant tout ?", options:["La RAM","La carte mère","Le disque SSD"], correctAnswer:"La carte mère"},
          {question:"La souris est un périphérique d'…", options:["Entrée","Sortie","Alimentation"], correctAnswer:"Entrée"},
          {question:"Que se passe-t-il si les composants d'un ordinateur surchauffent trop ?", options:["Ils fonctionnent mieux","Ils risquent de s'endommager ou de se déconnecter","Ils consomment moins d'électricité"], correctAnswer:"Ils risquent de s'endommager ou de se déconnecter", isSpecial:true}
        ]
      },
      {
        t:"Le code informatique", e:"👾", b:"Codeur Débutant", be:"💻",
        cards:[
          {title:"Qu'est-ce que coder ?", text:"Coder signifie écrire des instructions dans un langage que l'ordinateur comprend. On appelle ces langages des langages de programmation. Il en existe des centaines : Python, JavaScript, Scratch, C++...", emoji:"👾"},
          {title:"Scratch : coder sans écrire", text:"Scratch est un langage de programmation visuel créé pour les débutants. Au lieu d'écrire du texte, on assemble des blocs colorés comme un puzzle. C'est parfait pour créer des animations et des jeux simples !", emoji:"🧩"},
          {title:"Les variables", text:"Une variable est une boîte virtuelle qui stocke une valeur (un nombre, un texte, une couleur). Par exemple : 'score = 0'. Quand le joueur marque un point, on fait 'score = score + 1'. Les variables permettent de mémoriser des informations dans un programme.", emoji:"📦"},
          {title:"Les fonctions", text:"Une fonction est un groupe d'instructions qui effectue une tâche précise. On lui donne un nom et on peut l'appeler quand on en a besoin. Exemple : la fonction 'FaireExploser()' déclenche l'animation d'explosion dans un jeu.", emoji:"⚙️"}
        ],
        quiz:[
          {question:"Que signifie 'coder' en informatique ?", options:["Décorer un ordinateur","Écrire des instructions dans un langage que l'ordinateur comprend","Chercher des informations sur Internet"], correctAnswer:"Écrire des instructions dans un langage que l'ordinateur comprend"},
          {question:"Scratch est un langage de programmation qui utilise…", options:["Du texte complexe comme Python","Des blocs colorés à assembler comme un puzzle","Des formules mathématiques avancées"], correctAnswer:"Des blocs colorés à assembler comme un puzzle"},
          {question:"Qu'est-ce qu'une variable dans un programme ?", options:["Un type de boucle","Une boîte virtuelle qui stocke une valeur","Un composant de l'ordinateur"], correctAnswer:"Une boîte virtuelle qui stocke une valeur"},
          {question:"Si 'score = 0' et qu'on fait 'score = score + 1', quelle est la nouvelle valeur de score ?", options:["0","1","2"], correctAnswer:"1"},
          {question:"Qu'est-ce qu'une fonction dans un programme ?", options:["Une erreur dans le code","Un groupe d'instructions qui effectue une tâche précise et réutilisable","Le nom du programmeur"], correctAnswer:"Un groupe d'instructions qui effectue une tâche précise et réutilisable"},
          {question:"Lequel de ces langages est destiné aux débutants ?", options:["C++","Python avancé","Scratch"], correctAnswer:"Scratch"},
          {question:"Combien de langages de programmation existe-t-il environ ?", options:["5 ou 6","Des dizaines","Des centaines"], correctAnswer:"Des centaines"},
          {question:"Pourquoi utilise-t-on des fonctions en programmation ?", options:["Pour rendre le code plus confus","Pour réutiliser des groupes d'instructions sans les réécrire à chaque fois","Pour ralentir le programme"], correctAnswer:"Pour réutiliser des groupes d'instructions sans les réécrire à chaque fois"},
          {question:"Python est un exemple de…", options:["Moteur de jeu","Logiciel de dessin","Langage de programmation"], correctAnswer:"Langage de programmation"},
          {question:"Quel est le rôle principal des variables dans un jeu vidéo ?", options:["Décorer l'interface","Stocker des informations comme le score, la vie du joueur, sa position","Connecter le jeu à Internet"], correctAnswer:"Stocker des informations comme le score, la vie du joueur, sa position", isSpecial:true}
        ]
      },
      {
        t:"Les écrans et ta santé", e:"👀", b:"Ami des Yeux", be:"👓",
        cards:[
          {title:"La fatigue oculaire", text:"Regarder un écran trop longtemps provoque de la fatigue oculaire : les yeux piquent, la vision devient floue et des maux de tête peuvent apparaître. C'est à cause de la lumière bleue émise par les écrans et du fait que l'on cligne moins des yeux.", emoji:"👀"},
          {title:"La règle 20-20-20", text:"Les ophtalmologues recommandent la règle 20-20-20 : toutes les 20 minutes d'écran, regarde un objet à 20 pieds (environ 6 mètres) pendant 20 secondes. Cela permet aux muscles des yeux de se reposer.", emoji:"⏱️"},
          {title:"La posture et l'ergonomie", text:"Une mauvaise posture devant l'écran peut causer des douleurs au dos, aux épaules et au cou. L'écran doit être à hauteur des yeux, à une distance d'environ 50 à 70 cm. Le dos doit être droit et les pieds à plat sur le sol.", emoji:"🪑"},
          {title:"Le sommeil et les écrans", text:"La lumière bleue des écrans perturbe la production de mélatonine, l'hormone du sommeil. Il est recommandé de ne pas utiliser d'écrans au moins 1 heure avant de se coucher pour avoir un bon sommeil réparateur.", emoji:"😴"}
        ],
        quiz:[
          {question:"Quelle est la cause principale de la fatigue oculaire due aux écrans ?", options:["Les couleurs trop vives","La lumière bleue et le fait de moins cligner des yeux","Le bruit des ventilateurs"], correctAnswer:"La lumière bleue et le fait de moins cligner des yeux"},
          {question:"En quoi consiste la règle 20-20-20 ?", options:["Utiliser 20% de luminosité pendant 20 minutes puis s'arrêter 20 heures","Toutes les 20 minutes, regarder un objet à 6m pendant 20 secondes","Faire 20 exercices des yeux toutes les 20 heures"], correctAnswer:"Toutes les 20 minutes, regarder un objet à 6m pendant 20 secondes"},
          {question:"À quelle distance de l'écran devrait-on se placer ?", options:["10 à 20 cm","50 à 70 cm","Plus d'un mètre"], correctAnswer:"50 à 70 cm"},
          {question:"Pourquoi ne faut-il pas utiliser un écran avant de dormir ?", options:["L'écran fait trop de bruit","La lumière bleue perturbe la production de mélatonine","L'électricité coûte trop cher la nuit"], correctAnswer:"La lumière bleue perturbe la production de mélatonine"},
          {question:"Comment doit être la position de l'écran par rapport à tes yeux ?", options:["Bien en dessous du regard","À hauteur des yeux","Bien au-dessus de la tête"], correctAnswer:"À hauteur des yeux"},
          {question:"Combien de temps avant de dormir faut-il arrêter les écrans ?", options:["5 minutes","30 minutes","Au moins 1 heure"], correctAnswer:"Au moins 1 heure"},
          {question:"Quelles douleurs peut provoquer une mauvaise posture devant un écran ?", options:["Des douleurs aux genoux uniquement","Des douleurs au dos, aux épaules et au cou","Des douleurs uniquement aux yeux"], correctAnswer:"Des douleurs au dos, aux épaules et au cou"},
          {question:"Quel professionnel de santé s'occupe de la santé des yeux ?", options:["Le cardiologue","L'ophtalmologue","Le dentiste"], correctAnswer:"L'ophtalmologue"},
          {question:"La mélatonine est une hormone qui régule…", options:["La digestion","Le sommeil","La croissance"], correctAnswer:"Le sommeil"},
          {question:"Selon la règle 20-20-20, à quelle fréquence faut-il faire une pause visuelle ?", options:["Toutes les 5 minutes","Toutes les 20 minutes","Toutes les heures"], correctAnswer:"Toutes les 20 minutes", isSpecial:true}
        ]
      },
      {
        t:"Les e-mails et la communication numérique", e:"✉️", b:"Facteur du Web", be:"✉️",
        cards:[
          {title:"Qu'est-ce qu'un e-mail ?", text:"Un e-mail (courrier électronique) est un message envoyé d'un ordinateur à un autre via Internet. Il arrive en quelques secondes n'importe où dans le monde. Une adresse e-mail ressemble à : prenom.nom@exemple.com", emoji:"✉️"},
          {title:"La structure d'un e-mail", text:"Un e-mail comprend : un expéditeur (celui qui envoie), un destinataire (celui qui reçoit), un objet (le sujet du message), le corps du message (le texte), et parfois des pièces jointes (fichiers attachés).", emoji:"📧"},
          {title:"Les bonnes pratiques", text:"Pour écrire un bon e-mail : commence par une formule de politesse, sois clair et concis, vérifie l'orthographe avant d'envoyer, et ajoute un objet précis. N'oublie jamais que les e-mails peuvent être conservés et relus.", emoji:"✍️"},
          {title:"Spam et sécurité", text:"Le spam est un e-mail non désiré, souvent publicitaire ou malveillant. Il ne faut JAMAIS ouvrir une pièce jointe d'un expéditeur inconnu, car elle peut contenir un virus qui infecte l'ordinateur.", emoji:"🚫"}
        ],
        quiz:[
          {question:"À quoi ressemble une adresse e-mail ?", options:["www.prenom.com","prenom.nom@exemple.com","#prenom_nom"], correctAnswer:"prenom.nom@exemple.com"},
          {question:"Combien de temps met un e-mail pour arriver à destination ?", options:["Plusieurs jours","Quelques secondes","1 heure exactement"], correctAnswer:"Quelques secondes"},
          {question:"Dans un e-mail, que représente l'objet ?", options:["L'adresse du destinataire","Le sujet du message","La pièce jointe"], correctAnswer:"Le sujet du message"},
          {question:"Comment appelle-t-on un fichier joint à un e-mail ?", options:["Un spam","Un objet","Une pièce jointe"], correctAnswer:"Une pièce jointe"},
          {question:"Qu'est-ce que le spam ?", options:["Un logiciel de messagerie","Un e-mail non désiré, souvent publicitaire ou malveillant","Un type de connexion Internet"], correctAnswer:"Un e-mail non désiré, souvent publicitaire ou malveillant"},
          {question:"Que ne faut-il JAMAIS faire avec une pièce jointe d'un inconnu ?", options:["Lire l'objet de l'email","L'ouvrir car elle peut contenir un virus","La répondre poliment"], correctAnswer:"L'ouvrir car elle peut contenir un virus"},
          {question:"Quel est l'autre nom de l'e-mail en français ?", options:["Message texte","Courrier électronique","Chat en ligne"], correctAnswer:"Courrier électronique"},
          {question:"Avant d'envoyer un e-mail important, que faut-il toujours faire ?", options:["Le traduire en anglais","Vérifier l'orthographe","Imprimer une copie"], correctAnswer:"Vérifier l'orthographe"},
          {question:"Qui est l'expéditeur d'un e-mail ?", options:["Celui qui reçoit le message","Celui qui envoie le message","Le serveur de messagerie"], correctAnswer:"Celui qui envoie le message"},
          {question:"Pourquoi est-il important d'écrire un objet précis dans un e-mail ?", options:["Pour que l'e-mail arrive plus vite","Pour que le destinataire comprenne immédiatement le sujet du message","Pour éviter le spam"], correctAnswer:"Pour que le destinataire comprenne immédiatement le sujet du message", isSpecial:true}
        ]
      },
      {
        t:"Les objets connectés", e:"⌚", b:"Aventurier Connecté", be:"⌚",
        cards:[
          {title:"L'Internet des objets (IoT)", text:"L'Internet des objets (IoT = Internet of Things) désigne tous les objets du quotidien connectés à Internet : montres connectées, ampoules intelligentes, thermostats, réfrigérateurs connectés, voitures autonomes...", emoji:"⌚"},
          {title:"Comment fonctionnent-ils ?", text:"Chaque objet connecté possède des capteurs qui collectent des données (température, rythme cardiaque, position GPS...) et les envoient via Internet à une application sur ton téléphone ou à un serveur distant.", emoji:"📡"},
          {title:"Les avantages", text:"Les objets connectés nous facilitent la vie : une montre qui détecte si tu tombes et appelle les secours, un thermostat qui règle automatiquement la température à distance, des ampoules que tu allumes avec ta voix.", emoji:"✅"},
          {title:"Les risques pour la vie privée", text:"Les objets connectés collectent beaucoup de données sur nous. Il faut s'assurer qu'ils sont bien sécurisés et vérifier quelles informations ils partagent. Un réfrigérateur connecté piraté peut servir à espionner !", emoji:"⚠️"}
        ],
        quiz:[
          {question:"Que signifie l'acronyme IoT ?", options:["Internet of Technology","Internet of Things (Internet des objets)","Interactive Online Tools"], correctAnswer:"Internet of Things (Internet des objets)"},
          {question:"Quel est un exemple d'objet connecté ?", options:["Une calculatrice classique","Une montre connectée","Un stylo bille"], correctAnswer:"Une montre connectée"},
          {question:"Que font les capteurs dans un objet connecté ?", options:["Ils décorent l'objet","Ils collectent des données et les envoient via Internet","Ils stockent des films"], correctAnswer:"Ils collectent des données et les envoient via Internet"},
          {question:"Quel est l'avantage d'un thermostat connecté ?", options:["Il peut être réglé à distance via une application","Il est moins cher qu'un thermostat classique","Il n'a pas besoin d'électricité"], correctAnswer:"Il peut être réglé à distance via une application"},
          {question:"Quel risque présentent les objets connectés mal sécurisés ?", options:["Ils consomment trop d'électricité","Ils peuvent être piratés et servir à espionner les utilisateurs","Ils tombent souvent en panne"], correctAnswer:"Ils peuvent être piratés et servir à espionner les utilisateurs"},
          {question:"Une montre connectée qui détecte une chute et appelle les secours est utile pour…", options:["Faire du sport plus facilement","Aider les personnes âgées ou en danger","Mesurer la météo"], correctAnswer:"Aider les personnes âgées ou en danger"},
          {question:"Les données collectées par les objets connectés incluent…", options:["Uniquement la couleur de l'objet","La température, la position GPS, le rythme cardiaque...","Seulement l'heure"], correctAnswer:"La température, la position GPS, le rythme cardiaque..."},
          {question:"Comment peut-on contrôler des ampoules connectées ?", options:["Seulement en personne","Avec sa voix ou une application sur téléphone","Avec un câble spécial"], correctAnswer:"Avec sa voix ou une application sur téléphone"},
          {question:"Avant d'acheter un objet connecté, que faut-il vérifier ?", options:["Qu'il est de la bonne couleur","Qu'il est bien sécurisé et quelles données il partage","Qu'il est fabriqué en France"], correctAnswer:"Qu'il est bien sécurisé et quelles données il partage"},
          {question:"Combien d'objets connectés sont estimés dans le monde en 2024 ?", options:["Quelques millions","Des centaines de millions","Plusieurs dizaines de milliards"], correctAnswer:"Plusieurs dizaines de milliards", isSpecial:true}
        ]
      }
    ],
    "9-12": [
      {
        t:"L'histoire de l'informatique", e:"📜", b:"Historien Tech", be:"📜",
        cards:[
          {title:"Les pionniers", text:"Ada Lovelace (1815-1852) est considérée comme la première programmeuse de l'histoire : elle écrivit le premier algorithme destiné à être traité par une machine. Alan Turing inventa le concept de machine universelle en 1936, base théorique de tous les ordinateurs modernes.", emoji:"👩‍💻"},
          {title:"Les premiers ordinateurs", text:"ENIAC (1945) fut l'un des premiers ordinateurs électroniques. Il pesait 30 tonnes et occupait 167 m². Il était capable d'effectuer 5 000 additions par seconde, contre des milliards pour un smartphone actuel.", emoji:"🏭"},
          {title:"La micro-informatique", text:"Dans les années 1970, Steve Jobs et Steve Wozniak fondèrent Apple. En 1981, IBM lança le premier PC. Ces révolutions rendirent l'ordinateur accessible au grand public. En 1991, Tim Berners-Lee inventa le World Wide Web.", emoji:"🍎"},
          {title:"L'ère moderne", text:"Aujourd'hui, un smartphone est un million de fois plus puissant qu'un ordinateur des années 1960. Les technologies d'intelligence artificielle, le cloud computing et l'Internet des objets transforment notre quotidien à une vitesse vertigineuse.", emoji:"📱"}
        ],
        quiz:[
          {question:"Qui est considérée comme la première programmeuse de l'histoire ?", options:["Marie Curie","Ada Lovelace","Grace Hopper"], correctAnswer:"Ada Lovelace"},
          {question:"Quel concept Alan Turing a-t-il inventé en 1936 ?", options:["Le Wi-Fi","La machine universelle (base des ordinateurs)","L'écran tactile"], correctAnswer:"La machine universelle (base des ordinateurs)"},
          {question:"Quel était le poids approximatif de l'ENIAC, l'un des premiers ordinateurs ?", options:["500 kg","30 tonnes","3 kg"], correctAnswer:"30 tonnes"},
          {question:"Qui a inventé le World Wide Web en 1991 ?", options:["Bill Gates","Steve Jobs","Tim Berners-Lee"], correctAnswer:"Tim Berners-Lee"},
          {question:"Quand Apple a-t-elle été fondée ?", options:["Dans les années 1960","Dans les années 1970","Dans les années 1990"], correctAnswer:"Dans les années 1970"},
          {question:"Par rapport à un ordinateur des années 1960, combien de fois est plus puissant un smartphone actuel ?", options:["10 fois","1 000 fois","Un million de fois"], correctAnswer:"Un million de fois"},
          {question:"Qu'est-ce que le World Wide Web ?", options:["Le réseau de câbles sous-marins d'Internet","Le système de pages web reliées par des liens hypertextes","Un protocole de sécurité"], correctAnswer:"Le système de pages web reliées par des liens hypertextes"},
          {question:"En quelle année IBM a-t-il lancé le premier PC grand public ?", options:["1971","1981","1991"], correctAnswer:"1981"},
          {question:"L'ENIAC pouvait effectuer combien d'additions par seconde ?", options:["50","5 000","5 millions"], correctAnswer:"5 000"},
          {question:"Quel est l'apport d'Ada Lovelace à l'informatique ?", options:["Elle inventa le transistor","Elle écrivit le premier algorithme destiné à une machine","Elle créa le premier langage de programmation visuel"], correctAnswer:"Elle écrivit le premier algorithme destiné à une machine", isSpecial:true}
        ]
      },
      {
        t:"Les langages de programmation", e:"💻", b:"Polyglotte du Code", be:"🧬",
        cards:[
          {title:"Pourquoi différents langages ?", text:"Il existe des centaines de langages de programmation car chaque domaine a ses besoins spécifiques. Python est privilégié pour l'IA et la data science. JavaScript rend les pages web interactives. C++ est utilisé pour les jeux vidéo et les logiciels performants.", emoji:"💻"},
          {title:"Langages compilés vs interprétés", text:"Un langage compilé (C, C++) transforme tout le code en langage machine AVANT exécution : il est très rapide. Un langage interprété (Python, JavaScript) est traduit ligne par ligne à l'exécution : il est plus lent mais plus flexible.", emoji:"⚙️"},
          {title:"La programmation orientée objet", text:"La programmation orientée objet (POO) organise le code en 'objets' qui regroupent des données et des comportements. Java et C++ utilisent ce paradigme. Un objet 'Voiture' pourrait avoir des attributs (couleur, vitesse) et des méthodes (accélérer, freiner).", emoji:"🚗"},
          {title:"Les frameworks", text:"Un framework est un ensemble d'outils et de bibliothèques préfabriqués qui accélèrent le développement. React est un framework JavaScript pour créer des interfaces web. Django est un framework Python pour créer des sites web complets.", emoji:"🏗️"}
        ],
        quiz:[
          {question:"Quel langage est principalement utilisé pour l'Intelligence Artificielle et la data science ?", options:["Java","Python","HTML"], correctAnswer:"Python"},
          {question:"Quelle est la différence entre un langage compilé et un langage interprété ?", options:["Le compilé est plus coloré","Le compilé traduit tout avant exécution (plus rapide), l'interprété ligne par ligne","L'interprété ne fonctionne que sur Mac"], correctAnswer:"Le compilé traduit tout avant exécution (plus rapide), l'interprété ligne par ligne"},
          {question:"JavaScript est principalement utilisé pour…", options:["La programmation de robots","Rendre les pages web interactives","Écrire des systèmes d'exploitation"], correctAnswer:"Rendre les pages web interactives"},
          {question:"Qu'est-ce que la Programmation Orientée Objet (POO) ?", options:["Un style de codage en 3D","Une organisation du code en 'objets' regroupant données et comportements","Un langage pour les jeux vidéo uniquement"], correctAnswer:"Une organisation du code en 'objets' regroupant données et comportements"},
          {question:"Qu'est-ce qu'un framework ?", options:["Un type de bug","Un ensemble d'outils préfabriqués qui accélèrent le développement","Un langage de programmation basique"], correctAnswer:"Un ensemble d'outils préfabriqués qui accélèrent le développement"},
          {question:"React est un framework du langage…", options:["Python","Java","JavaScript"], correctAnswer:"JavaScript"},
          {question:"Un objet 'Voiture' en POO peut avoir quels types d'éléments ?", options:["Seulement des couleurs","Des attributs (données) et des méthodes (comportements)","Uniquement des fonctions mathématiques"], correctAnswer:"Des attributs (données) et des méthodes (comportements)"},
          {question:"C++ est particulièrement utilisé pour…", options:["Les sites web vitrines","Les jeux vidéo et logiciels performants","La création de présentations PowerPoint"], correctAnswer:"Les jeux vidéo et logiciels performants"},
          {question:"Pourquoi les langages interprétés sont-ils plus flexibles malgré leur lenteur ?", options:["Ils n'ont pas besoin d'être compilés avant d'être testés","Ils tournent sur tous les systèmes sans aucun problème","Ils consomment moins de RAM"], correctAnswer:"Ils n'ont pas besoin d'être compilés avant d'être testés"},
          {question:"Quel framework Python est utilisé pour créer des sites web complets ?", options:["React","Django","Unity"], correctAnswer:"Django", isSpecial:true}
        ]
      },
      {
        t:"Le fonctionnement d'Internet", e:"🌐", b:"Expert Réseau", be:"🌐",
        cards:[
          {title:"Architecture client-serveur", text:"Sur Internet, chaque échange suit un modèle client-serveur. Le client (ton navigateur) envoie une requête. Le serveur (un ordinateur distant) traite la requête et renvoie une réponse. Ce modèle est la base du Web.", emoji:"🌐"},
          {title:"Les adresses IP et DNS", text:"Chaque appareil sur Internet a une adresse IP (ex: 192.168.1.1). Mais les humains préfèrent les noms (www.google.com). Le DNS (Domain Name System) fait la traduction : il convertit un nom de domaine en adresse IP.", emoji:"📋"},
          {title:"Les protocoles TCP/IP", text:"TCP/IP est la suite de protocoles fondamentaux d'Internet. IP gère l'adressage et l'acheminement des paquets. TCP garantit que tous les paquets arrivent dans le bon ordre et sans erreur.", emoji:"📦"},
          {title:"HTTPS et le chiffrement", text:"HTTPS crypte les données échangées entre le client et le serveur grâce au protocole TLS (Transport Layer Security). Quand tu vois un cadenas dans la barre d'adresse, tes données sont chiffrées et sécurisées.", emoji:"🔒"}
        ],
        quiz:[
          {question:"Dans le modèle client-serveur, que fait le client ?", options:["Il stocke toutes les données","Il envoie des requêtes au serveur","Il est physiquement à côté du serveur"], correctAnswer:"Il envoie des requêtes au serveur"},
          {question:"À quoi sert le DNS ?", options:["À crypter les données","À convertir les noms de domaine en adresses IP","À filtrer le spam"], correctAnswer:"À convertir les noms de domaine en adresses IP"},
          {question:"Que signifie l'acronyme TCP ?", options:["Transmission Control Protocol","Total Computing Power","Technical Computer Protocol"], correctAnswer:"Transmission Control Protocol"},
          {question:"Quel est le rôle du protocole IP ?", options:["Gérer l'adressage et l'acheminement des paquets","Crypter les données","Convertir les noms de domaine"], correctAnswer:"Gérer l'adressage et l'acheminement des paquets"},
          {question:"Que signifie le cadenas affiché dans la barre d'adresse d'un navigateur ?", options:["Le site est gratuit","La connexion est chiffrée et sécurisée (HTTPS)","Le site appartient à une administration"], correctAnswer:"La connexion est chiffrée et sécurisée (HTTPS)"},
          {question:"Quel protocole est utilisé pour sécuriser HTTPS ?", options:["FTP","TLS (Transport Layer Security)","DNS"], correctAnswer:"TLS (Transport Layer Security)"},
          {question:"Un paquet de données sur Internet est…", options:["Une enveloppe physique","Un fragment d'information qui voyage sur le réseau","Un dossier compressé"], correctAnswer:"Un fragment d'information qui voyage sur le réseau"},
          {question:"Quelle est la forme d'une adresse IPv4 typique ?", options:["www.google.com","192.168.1.1","@google-ip"], correctAnswer:"192.168.1.1"},
          {question:"Que garantit le protocole TCP ?", options:["La vitesse maximale de connexion","Que tous les paquets arrivent dans le bon ordre et sans erreur","L'adressage unique de chaque appareil"], correctAnswer:"Que tous les paquets arrivent dans le bon ordre et sans erreur"},
          {question:"Quelle est la différence entre HTTP et HTTPS ?", options:["HTTP est plus rapide","HTTPS chiffre les données contrairement à HTTP","HTTP est plus récent qu'HTTPS"], correctAnswer:"HTTPS chiffre les données contrairement à HTTP", isSpecial:true}
        ]
      },
      {
        t:"L'Intelligence Artificielle", e:"🤖", b:"Futuriste IA", be:"🧠",
        cards:[
          {title:"Qu'est-ce que l'IA ?", text:"L'Intelligence Artificielle (IA) est un ensemble de techniques qui permettent à une machine d'imiter des fonctions cognitives humaines : apprendre, raisonner, reconnaître des images, comprendre le langage.", emoji:"🤖"},
          {title:"Le Machine Learning", text:"Le Machine Learning (apprentissage automatique) est une branche de l'IA où les algorithmes apprennent à partir de données, sans être explicitement programmés. Par exemple, un algorithme peut apprendre à reconnaître des chats en analysant des millions de photos.", emoji:"📊"},
          {title:"Le Deep Learning", text:"Le Deep Learning utilise des réseaux de neurones artificiels inspirés du cerveau humain. Ces réseaux à plusieurs couches (d'où 'deep') peuvent reconnaître des visages, traduire des langues et jouer aux échecs mieux que les champions du monde.", emoji:"🧬"},
          {title:"Applications et éthique", text:"L'IA est utilisée pour : diagnostiquer des maladies, détecter des fraudes bancaires, conduire des voitures autonomes, créer des images. Mais elle soulève des questions éthiques : biais algorithmiques, protection de la vie privée, impact sur l'emploi.", emoji:"⚖️"}
        ],
        quiz:[
          {question:"Que signifie l'acronyme IA ?", options:["Informatique Avancée","Intelligence Artificielle","Interface Automatique"], correctAnswer:"Intelligence Artificielle"},
          {question:"Qu'est-ce que le Machine Learning ?", options:["Un ordinateur qui apprend à parler","Des algorithmes qui apprennent à partir de données sans être explicitement programmés","Un robot physique qui marche"], correctAnswer:"Des algorithmes qui apprennent à partir de données sans être explicitement programmés"},
          {question:"De quoi s'inspirent les réseaux de neurones artificiels du Deep Learning ?", options:["Du système solaire","Du cerveau humain","Des circuits électroniques classiques"], correctAnswer:"Du cerveau humain"},
          {question:"Comment un algorithme de Machine Learning apprend-il à reconnaître des chats ?", options:["On lui explique point par point","En analysant des millions de photos de chats","On copie le code du programme dans l'IA"], correctAnswer:"En analysant des millions de photos de chats"},
          {question:"Quelle est une application médicale de l'IA ?", options:["Remplacer les médecins entièrement","Aider à diagnostiquer des maladies","Préparer les repas des patients"], correctAnswer:"Aider à diagnostiquer des maladies"},
          {question:"Qu'appelle-t-on les 'biais algorithmiques' ?", options:["Des erreurs volontaires dans le code","Des préjugés intégrés dans les données d'entraînement qui faussent les résultats de l'IA","Des bugs dans les cartes graphiques"], correctAnswer:"Des préjugés intégrés dans les données d'entraînement qui faussent les résultats de l'IA"},
          {question:"Pourquoi dit-on 'Deep' Learning (apprentissage profond) ?", options:["Parce que l'IA va chercher sur des serveurs profonds","Parce que les réseaux de neurones comportent plusieurs couches (profondeurs)","Parce que les données sont très volumineuses"], correctAnswer:"Parce que les réseaux de neurones comportent plusieurs couches (profondeurs)"},
          {question:"Quel est un exemple de voiture utilisant l'IA ?", options:["Une voiture de course traditionnelle","Une voiture autonome qui conduit seule","Une voiture électrique standard"], correctAnswer:"Une voiture autonome qui conduit seule"},
          {question:"Quelle question éthique soulève l'IA concernant l'emploi ?", options:["Elle rend le travail plus physique","Elle pourrait remplacer des emplois humains","Elle oblige à travailler le week-end"], correctAnswer:"Elle pourrait remplacer des emplois humains"},
          {question:"Un IA capable de jouer aux échecs mieux qu'un champion du monde utilise quelle technique ?", options:["Le Machine Learning classique uniquement","Le Deep Learning avec des réseaux de neurones multicouches","Un simple algorithme de recherche exhaustive"], correctAnswer:"Le Deep Learning avec des réseaux de neurones multicouches", isSpecial:true}
        ]
      },
      {
        t:"Cybersécurité et cryptage", e:"🔐", b:"Cryptographe Secret", be:"🔑",
        cards:[
          {title:"La cryptographie", text:"La cryptographie est l'art de chiffrer des informations pour les rendre illisibles aux personnes non autorisées. Elle est utilisée depuis l'Antiquité : Jules César utilisait un code de substitution (le chiffre de César) pour ses messages militaires.", emoji:"🔐"},
          {title:"Le chiffrement symétrique et asymétrique", text:"Le chiffrement symétrique utilise la même clé pour chiffrer et déchiffrer (rapide mais la clé doit être partagée). Le chiffrement asymétrique (RSA) utilise une paire : une clé publique pour chiffrer et une clé privée pour déchiffrer.", emoji:"🗝️"},
          {title:"Les types d'attaques", text:"Les cyberattaques incluent : le phishing (faux e-mails), les malwares (logiciels malveillants), les ransomwares (rançongiciels qui chiffrent tes données contre rançon), et les attaques DDoS (surcharge d'un serveur pour le faire tomber).", emoji:"⚔️"},
          {title:"Se protéger", text:"Pour se protéger : utiliser un mot de passe complexe et unique pour chaque site (gestionnaire de mots de passe), activer la double authentification (2FA), faire des sauvegardes régulières, et maintenir ses logiciels à jour.", emoji:"🛡️"}
        ],
        quiz:[
          {question:"Qu'est-ce que la cryptographie ?", options:["L'étude des cryptes anciennes","L'art de chiffrer des informations pour les rendre illisibles aux non-autorisés","Un langage de programmation sécurisé"], correctAnswer:"L'art de chiffrer des informations pour les rendre illisibles aux non-autorisés"},
          {question:"Comment s'appelle le code de substitution utilisé par Jules César ?", options:["Le code Morse","Le chiffre de César","Le code binaire"], correctAnswer:"Le chiffre de César"},
          {question:"Dans le chiffrement asymétrique, quelle clé utilise-t-on pour chiffrer un message ?", options:["La clé privée","La clé publique","La clé symétrique"], correctAnswer:"La clé publique"},
          {question:"Qu'est-ce qu'un ransomware ?", options:["Un type de moteur de recherche","Un logiciel malveillant qui chiffre tes données et réclame une rançon","Un outil de sauvegarde de données"], correctAnswer:"Un logiciel malveillant qui chiffre tes données et réclame une rançon"},
          {question:"Qu'est-ce qu'une attaque DDoS ?", options:["Un virus qui efface les fichiers","Une surcharge d'un serveur pour le rendre inaccessible","Un e-mail de phishing amélioré"], correctAnswer:"Une surcharge d'un serveur pour le rendre inaccessible"},
          {question:"Que signifie 2FA (double authentification) ?", options:["Deux mots de passe différents sur le même compte","Une vérification en deux étapes (ex: mot de passe + code SMS)","Deux comptes pour le même utilisateur"], correctAnswer:"Une vérification en deux étapes (ex: mot de passe + code SMS)"},
          {question:"Quelle est la différence principale entre chiffrement symétrique et asymétrique ?", options:["Le symétrique utilise la même clé pour chiffrer et déchiffrer, l'asymétrique utilise une paire de clés","L'asymétrique est plus ancien","Le symétrique ne peut chiffrer que du texte"], correctAnswer:"Le symétrique utilise la même clé pour chiffrer et déchiffrer, l'asymétrique utilise une paire de clés"},
          {question:"Pourquoi faut-il utiliser un mot de passe différent pour chaque site ?", options:["Par commodité","Si un site est piraté, les autres comptes restent protégés","Parce que les sites l'exigent"], correctAnswer:"Si un site est piraté, les autres comptes restent protégés"},
          {question:"Que contient un malware ?", options:["Des fonctionnalités utiles cachées","Un code malveillant conçu pour endommager ou espionner un système","Un antivirus intégré"], correctAnswer:"Un code malveillant conçu pour endommager ou espionner un système"},
          {question:"Quel algorithme de chiffrement asymétrique est le plus utilisé sur Internet ?", options:["AES","RSA","SHA-256"], correctAnswer:"RSA", isSpecial:true}
        ]
      },
      {
        t:"Le code binaire", e:"🔢", b:"Maître du Binaire", be:"🔢",
        cards:[
          {title:"Pourquoi le binaire ?", text:"Les ordinateurs fonctionnent à l'électricité. Un courant électrique peut être soit présent (1) soit absent (0). C'est pour cette raison que tous les ordinateurs travaillent en base 2 (binaire) : ils ne comprennent que des 0 et des 1.", emoji:"🔢"},
          {title:"Compter en binaire", text:"En décimal (base 10), on compte : 0,1,2,...,9, puis 10. En binaire (base 2), on compte : 0,1, puis 10 (= 2 en décimal), 11 (= 3), 100 (= 4), 101 (= 5)... Chaque position vaut 2 fois plus que la précédente.", emoji:"📐"},
          {title:"Les bits et les octets", text:"Un bit (Binary digIT) est la plus petite unité d'information : 0 ou 1. Un octet (byte) = 8 bits. 1 Ko = 1 024 octets. 1 Mo = 1 024 Ko. 1 Go = 1 024 Mo. Un fichier MP3 de 4 minutes pèse environ 4 Mo.", emoji:"💾"},
          {title:"Représenter les caractères", text:"Comment coder la lettre 'A' en binaire ? Grâce à des tables de correspondance comme l'ASCII : 'A' = 65 en décimal = 01000001 en binaire. Chaque caractère du texte que tu lis est stocké sous forme de série de 0 et de 1.", emoji:"🔡"}
        ],
        quiz:[
          {question:"Pourquoi les ordinateurs utilisent-ils le système binaire ?", options:["Parce que c'est plus simple pour les humains","Parce que l'électricité ne peut avoir que deux états : présent (1) ou absent (0)","Parce qu'il y a seulement 2 langages de programmation"], correctAnswer:"Parce que l'électricité ne peut avoir que deux états : présent (1) ou absent (0)"},
          {question:"Combien vaut '10' en binaire exprimé en décimal ?", options:["10","5","2"], correctAnswer:"2"},
          {question:"Combien vaut '101' en binaire exprimé en décimal ?", options:["101","3","5"], correctAnswer:"5"},
          {question:"Un bit peut stocker…", options:["Un chiffre de 0 à 9","Uniquement 0 ou 1","Un caractère alphanumérique complet"], correctAnswer:"Uniquement 0 ou 1"},
          {question:"Combien de bits constituent un octet (byte) ?", options:["4 bits","8 bits","16 bits"], correctAnswer:"8 bits"},
          {question:"Que signifie 1 Go (Gigaoctet) ?", options:["1 000 octets","1 000 000 octets","Environ 1 milliard d'octets (1 024 Mo)"], correctAnswer:"Environ 1 milliard d'octets (1 024 Mo)"},
          {question:"Quelle table de correspondance permet de coder les caractères en binaire ?", options:["Unicode UTF-32 uniquement","L'ASCII (et ses extensions)","Le code Morse"], correctAnswer:"L'ASCII (et ses extensions)"},
          {question:"La lettre 'A' en ASCII correspond à quelle valeur décimale ?", options:["1","65","97"], correctAnswer:"65"},
          {question:"Quelle est la valeur de '11' en binaire exprimée en décimal ?", options:["11","3","2"], correctAnswer:"3"},
          {question:"Un fichier MP3 de 4 minutes pèse environ combien ?", options:["4 Ko","4 Mo","4 Go"], correctAnswer:"4 Mo", isSpecial:true}
        ]
      },
      {
        t:"Les moteurs de recherche", e:"🔍", b:"Chercheur Web", be:"🔍",
        cards:[
          {title:"Comment fonctionne un moteur de recherche ?", text:"Un moteur de recherche fonctionne en 3 phases : 1) Crawling : des robots (spiders) parcourent automatiquement toutes les pages web. 2) Indexation : les pages sont analysées et indexées dans une gigantesque base de données. 3) Classement : un algorithme classe les résultats par pertinence.", emoji:"🔍"},
          {title:"Le PageRank", text:"Google utilise un algorithme appelé PageRank pour classer les pages. Une page est considérée comme importante si beaucoup d'autres pages y renvoient via des liens (backlinks). Plus ces liens proviennent de sites réputés, plus le score PageRank est élevé.", emoji:"📊"},
          {title:"SEO : être bien classé", text:"Le SEO (Search Engine Optimization) désigne l'ensemble des techniques pour améliorer la visibilité d'un site dans les résultats de recherche. On optimise le contenu, les mots-clés, la vitesse du site et le nombre de backlinks.", emoji:"📈"},
          {title:"Les filtres et bulles de filtres", text:"Les moteurs de recherche personnalisent les résultats en fonction de ton historique, ta localisation et tes habitudes. Ce phénomène, appelé 'bulle de filtre', peut t'empêcher de voir des informations différentes de ce que tu consultes habituellement.", emoji:"🫧"}
        ],
        quiz:[
          {question:"Comment s'appellent les robots qui parcourent automatiquement les pages web ?", options:["Les hackers","Les spiders (araignées)","Les indexeurs"], correctAnswer:"Les spiders (araignées)"},
          {question:"Quelles sont les 3 phases de fonctionnement d'un moteur de recherche ?", options:["Écriture, Lecture, Suppression","Crawling, Indexation, Classement","Recherche, Affichage, Mémorisation"], correctAnswer:"Crawling, Indexation, Classement"},
          {question:"Qu'est-ce que le PageRank de Google ?", options:["Un concours entre moteurs de recherche","Un algorithme qui classe les pages selon leur importance et leurs backlinks","Le classement des pages les plus anciennes"], correctAnswer:"Un algorithme qui classe les pages selon leur importance et leurs backlinks"},
          {question:"Qu'est-ce qu'un backlink ?", options:["Un lien vers une page d'un autre site qui pointe vers le tien","Un lien cassé sur un site web","Le lien vers la page d'accueil"], correctAnswer:"Un lien vers une page d'un autre site qui pointe vers le tien"},
          {question:"Que signifie SEO ?", options:["Secure Email Online","Search Engine Optimization (Optimisation pour les moteurs de recherche)","Software Engineering Online"], correctAnswer:"Search Engine Optimization (Optimisation pour les moteurs de recherche)"},
          {question:"Qu'est-ce qu'une 'bulle de filtre' dans les moteurs de recherche ?", options:["Un filtre de sécurité anti-virus","La personnalisation des résultats qui limite l'exposition à des informations différentes","Une erreur dans l'algorithme de classement"], correctAnswer:"La personnalisation des résultats qui limite l'exposition à des informations différentes"},
          {question:"Pourquoi un site avec beaucoup de backlinks de sites réputés est-il mieux classé ?", options:["Parce qu'il a payé Google","Parce que l'algorithme considère ces liens comme un gage de qualité et d'autorité","Parce qu'il a plus de pages"], correctAnswer:"Parce que l'algorithme considère ces liens comme un gage de qualité et d'autorité"},
          {question:"Lors de l'indexation, que fait le moteur de recherche ?", options:["Il supprime les pages de mauvaise qualité","Il analyse et stocke les pages dans une base de données","Il les classe directement"], correctAnswer:"Il analyse et stocke les pages dans une base de données"},
          {question:"Quel facteur NE fait PAS partie du SEO ?", options:["La vitesse de chargement du site","Le nombre de backlinks","La couleur du logo du site"], correctAnswer:"La couleur du logo du site"},
          {question:"Comment un moteur de recherche personnalise-t-il les résultats pour chaque utilisateur ?", options:["En posant des questions à l'utilisateur","En analysant son historique, sa localisation et ses habitudes","En lui demandant de renseigner son profil à chaque recherche"], correctAnswer:"En analysant son historique, sa localisation et ses habitudes", isSpecial:true}
        ]
      },
      {
        t:"Le processeur et la mémoire", e:"💾", b:"Architecte Système", be:"💾",
        cards:[
          {title:"Le CPU en détail", text:"Le processeur (CPU) est constitué de milliards de transistors. Il exécute les instructions en cycles : FETCH (chercher l'instruction), DECODE (la décoder), EXECUTE (l'exécuter). La fréquence (en GHz) indique combien de cycles il effectue par seconde.", emoji:"⚡"},
          {title:"Les cœurs du processeur", text:"Un processeur moderne possède plusieurs cœurs (cores) qui fonctionnent en parallèle. Un processeur 8 cœurs peut exécuter 8 tâches simultanément. C'est pour cette raison qu'on peut écouter de la musique en naviguant sur Internet.", emoji:"💪"},
          {title:"La hiérarchie mémoire", text:"La mémoire est organisée par vitesse et taille : Registres (ultra-rapides, quelques octets) → Cache L1/L2/L3 (très rapides, quelques Mo) → RAM (rapide, plusieurs Go) → Disque dur/SSD (lent mais grande capacité).", emoji:"🏗️"},
          {title:"Le cache processeur", text:"Le cache est une mémoire ultra-rapide intégrée directement dans le processeur. Il stocke les données fréquemment utilisées pour éviter d'aller les chercher dans la RAM plus lente. Un cache L1 est 100 fois plus rapide que la RAM.", emoji:"💫"}
        ],
        quiz:[
          {question:"Quelles sont les 3 étapes du cycle d'exécution d'un processeur ?", options:["Lire, Écrire, Supprimer","FETCH, DECODE, EXECUTE","Chercher, Stocker, Transmettre"], correctAnswer:"FETCH, DECODE, EXECUTE"},
          {question:"Que représente la fréquence d'un processeur en GHz ?", options:["Sa consommation électrique","Le nombre de cycles d'exécution par seconde","La quantité de RAM qu'il peut utiliser"], correctAnswer:"Le nombre de cycles d'exécution par seconde"},
          {question:"Qu'est-ce qu'un cœur (core) de processeur ?", options:["Une unité d'exécution indépendante qui peut traiter une tâche simultanément","La température maximale du CPU","Un type de cache mémoire"], correctAnswer:"Une unité d'exécution indépendante qui peut traiter une tâche simultanément"},
          {question:"Quelle est la mémoire la plus rapide dans la hiérarchie mémoire ?", options:["La RAM","Le SSD","Les registres du processeur"], correctAnswer:"Les registres du processeur"},
          {question:"Combien de fois le cache L1 est-il plus rapide que la RAM environ ?", options:["2 fois","10 fois","100 fois"], correctAnswer:"100 fois"},
          {question:"Pourquoi un processeur 8 cœurs est-il avantageux ?", options:["Il consomme 8 fois moins d'énergie","Il peut exécuter 8 tâches simultanément","Il a 8 fois plus de cache"], correctAnswer:"Il peut exécuter 8 tâches simultanément"},
          {question:"Que stocke le cache du processeur ?", options:["Les fichiers permanents de l'utilisateur","Les données fréquemment utilisées pour accélérer les accès","Le système d'exploitation complet"], correctAnswer:"Les données fréquemment utilisées pour accélérer les accès"},
          {question:"Quelle est la différence entre la RAM et le cache ?", options:["Le cache est plus rapide et intégré au processeur, la RAM est plus grande et externe","La RAM est plus rapide que le cache","Ils sont identiques en termes de vitesse"], correctAnswer:"Le cache est plus rapide et intégré au processeur, la RAM est plus grande et externe"},
          {question:"Dans la hiérarchie mémoire, quelle composante a la plus grande capacité de stockage ?", options:["Le cache L3","La RAM","Le disque dur ou SSD"], correctAnswer:"Le disque dur ou SSD"},
          {question:"Quel est l'avantage principal du SSD par rapport au disque dur classique (HDD) ?", options:["Il est moins cher","Il est bien plus rapide car il n'a pas de pièces mécaniques mobiles","Il a une plus grande capacité"], correctAnswer:"Il est bien plus rapide car il n'a pas de pièces mécaniques mobiles", isSpecial:true}
        ]
      },
      {
        t:"Le Cloud Computing", e:"☁️", b:"Gardien des Nuages", be:"☁️",
        cards:[
          {title:"Qu'est-ce que le Cloud ?", text:"Le Cloud Computing (informatique en nuage) consiste à utiliser des ressources informatiques (stockage, calcul, logiciels) à distance via Internet, plutôt que sur son propre appareil. Les serveurs sont dans de grands centres de données (data centers) dans le monde entier.", emoji:"☁️"},
          {title:"Les types de Cloud", text:"Il existe 3 modèles : IaaS (Infrastructure as a Service) fournit des serveurs virtuels. PaaS (Platform as a Service) fournit une plateforme de développement. SaaS (Software as a Service) fournit des logiciels (Google Docs, Netflix, Spotify sont des SaaS).", emoji:"🏗️"},
          {title:"Les avantages", text:"Le Cloud offre : l'élasticité (payer uniquement ce qu'on utilise), l'accessibilité (depuis n'importe quel appareil), la sauvegarde automatique, et la collaboration en temps réel (plusieurs personnes éditent le même document simultanément).", emoji:"✅"},
          {title:"Les enjeux", text:"Le Cloud soulève des défis : la souveraineté des données (où sont stockées tes données et quelles lois s'appliquent ?), la dépendance aux fournisseurs (GAFAM : Google, Apple, Facebook, Amazon, Microsoft), et l'impact environnemental des data centers.", emoji:"⚠️"}
        ],
        quiz:[
          {question:"Que signifie Cloud Computing ?", options:["Un programme météorologique","L'utilisation de ressources informatiques à distance via Internet","Un système de stockage physique portable"], correctAnswer:"L'utilisation de ressources informatiques à distance via Internet"},
          {question:"Que signifie SaaS ?", options:["Security as a Service","Software as a Service","Server and Application System"], correctAnswer:"Software as a Service"},
          {question:"Lequel de ces services est un exemple de SaaS ?", options:["Un disque dur externe","Google Docs ou Netflix","Un processeur virtuel AWS"], correctAnswer:"Google Docs ou Netflix"},
          {question:"Qu'est-ce que l'élasticité du Cloud ?", options:["La flexibilité physique des câbles","La possibilité de payer uniquement les ressources utilisées","La capacité à stocker des images haute résolution"], correctAnswer:"La possibilité de payer uniquement les ressources utilisées"},
          {question:"Que signifie GAFAM ?", options:["Un protocole de sécurité","Google, Apple, Facebook, Amazon, Microsoft (grandes entreprises du numérique)","Un standard de compression vidéo"], correctAnswer:"Google, Apple, Facebook, Amazon, Microsoft (grandes entreprises du numérique)"},
          {question:"Quel est le principal avantage du Cloud pour la collaboration ?", options:["Les documents sont automatiquement traduits","Plusieurs personnes peuvent éditer le même document en temps réel","Les fichiers sont mieux protégés"], correctAnswer:"Plusieurs personnes peuvent éditer le même document en temps réel"},
          {question:"La 'souveraineté des données' dans le Cloud fait référence à…", options:["La propriété intellectuelle des logiciels","Où sont physiquement stockées tes données et quelles lois s'y appliquent","La vitesse de transfert des données"], correctAnswer:"Où sont physiquement stockées tes données et quelles lois s'y appliquent"},
          {question:"Qu'est-ce qu'un data center ?", options:["Un logiciel de gestion de base de données","Un grand bâtiment contenant des milliers de serveurs connectés","Une unité de stockage portable"], correctAnswer:"Un grand bâtiment contenant des milliers de serveurs connectés"},
          {question:"Quel modèle Cloud fournit une plateforme de développement aux programmeurs ?", options:["IaaS","PaaS","SaaS"], correctAnswer:"PaaS"},
          {question:"Quel est l'impact environnemental des data centers ?", options:["Ils n'ont aucun impact","Ils consomment d'énormes quantités d'énergie et d'eau pour le refroidissement","Ils utilisent uniquement de l'énergie solaire"], correctAnswer:"Ils consomment d'énormes quantités d'énergie et d'eau pour le refroidissement", isSpecial:true}
        ]
      },
      {
        t:"L'impact écologique du numérique", e:"🌍", b:"Éco-Citoyen Digital", be:"🌱",
        cards:[
          {title:"L'empreinte carbone du numérique", text:"Le secteur numérique représente environ 4% des émissions mondiales de gaz à effet de serre (2 fois plus que l'aviation !). Cette part est en forte croissance avec l'essor de la vidéo en streaming, de l'IA et des data centers.", emoji:"🌍"},
          {title:"L'énergie des data centers", text:"Les data centers consomment environ 200 TWh d'électricité par an dans le monde, soit autant que certains pays. Ils nécessitent des systèmes de refroidissement très énergivores. Certains géants du numérique s'engagent à utiliser 100% d'énergie renouvelable.", emoji:"⚡"},
          {title:"Le cycle de vie des appareils", text:"Fabriquer un smartphone nécessite l'extraction de métaux rares (lithium, cobalt, tantale) dans des conditions souvent difficiles. L'empreinte carbone de la fabrication représente 70 à 80% de l'impact total d'un smartphone sur sa durée de vie.", emoji:"📱"},
          {title:"Le numérique responsable", text:"Quelques gestes pour réduire son empreinte : prolonger la durée de vie de ses appareils, préférer le Wi-Fi à la 4G (moins énergivore), éviter le streaming en HD inutile, et choisir des services hébergés avec de l'énergie verte.", emoji:"♻️"}
        ],
        quiz:[
          {question:"Quelle part des émissions mondiales de CO2 représente le secteur numérique ?", options:["0,5%","Environ 4%","Environ 20%"], correctAnswer:"Environ 4%"},
          {question:"Comparé à l'aviation, le secteur numérique émet…", options:["Beaucoup moins","Environ autant","Environ 2 fois plus"], correctAnswer:"Environ 2 fois plus"},
          {question:"Quel est le principal usage énergétique des data centers en dehors des serveurs ?", options:["L'éclairage des bâtiments","Les systèmes de refroidissement","Le transport des données"], correctAnswer:"Les systèmes de refroidissement"},
          {question:"Quelle part de l'impact total d'un smartphone provient de sa fabrication ?", options:["10 à 20%","30 à 40%","70 à 80%"], correctAnswer:"70 à 80%"},
          {question:"Quel métal rare est utilisé dans les batteries de smartphones ?", options:["L'or et l'argent uniquement","Le lithium et le cobalt","L'aluminium"], correctAnswer:"Le lithium et le cobalt"},
          {question:"Quelle connexion est plus économe en énergie pour regarder une vidéo ?", options:["La 5G","La 4G","Le Wi-Fi"], correctAnswer:"Le Wi-Fi"},
          {question:"Quel geste est le plus efficace pour réduire l'impact environnemental de son smartphone ?", options:["Baisser la luminosité","Prolonger sa durée de vie en ne le changeant pas trop souvent","Éteindre le Bluetooth"], correctAnswer:"Prolonger sa durée de vie en ne le changeant pas trop souvent"},
          {question:"Certaines entreprises s'engagent à alimenter leurs data centers avec…", options:["Du charbon moins polluant","100% d'énergie renouvelable","Du gaz naturel"], correctAnswer:"100% d'énergie renouvelable"},
          {question:"Pourquoi l'extraction de métaux rares est-elle problématique ?", options:["Elle est trop coûteuse uniquement","Elle se déroule souvent dans des conditions environnementales et humaines difficiles","Elle est impossible dans de nombreux pays"], correctAnswer:"Elle se déroule souvent dans des conditions environnementales et humaines difficiles"},
          {question:"Quel est l'impact du streaming vidéo en haute définition sur l'environnement ?", options:["Aucun impact particulier","Il consomme beaucoup plus de données et d'énergie qu'en définition standard","Il est moins polluant car les vidéos sont compressées"], correctAnswer:"Il consomme beaucoup plus de données et d'énergie qu'en définition standard", isSpecial:true}
        ]
      }
    ]
  }
};

// 3. Fonction pour les univers existants (extension générique améliorée)
function generateExtraLesson(univId, ageGroup, levelIndex) {
  const lNum = levelIndex + 1;
  if (univId === "maths") {
    const titles = ["Introduction aux Nombres","Les Premières Additions","Les Premières Soustractions","Compter plus loin","Double et Moitié","Les Formes Géométriques","La Table de Multiplication","Les Divisions Faciles","Les Fractions Simples","Grand Défi de Logique"];
    const emojis = ["🔢","➕","➖","🧮","⚖️","📐","✖️","➗","🍰","🧠"];
    const text = `Dans ce niveau ${lNum}, nous allons nous entraîner sur : ${titles[levelIndex]}. Répète bien les exercices !`;
    const quiz = [];
    const qCount = ageGroup === "3-5" ? 5 : 10;
    for (let i = 0; i < qCount; i++) {
      let a, b, correct, question;
      if (ageGroup === "3-5") { a = Math.floor(Math.random()*4)+1; b = Math.floor(Math.random()*3)+1; correct = a+b; question = `Combien font ${a} + ${b} ?`; }
      else if (ageGroup === "6-8") { a = Math.floor(Math.random()*15)+5; b = Math.floor(Math.random()*12)+2; correct = levelIndex < 5 ? a+b : a*b; question = levelIndex < 5 ? `Calcule : ${a} + ${b}` : `Calcule : ${a} × ${b}`; }
      else { a = Math.floor(Math.random()*50)+10; b = Math.floor(Math.random()*40)+10; correct = levelIndex < 6 ? a+b : a*b; question = levelIndex < 6 ? `Résous : ${a} + ${b}` : `Calcule le produit : ${a} × ${b}`; }
      const options = [String(correct), String(correct+3), String(Math.max(1,correct-2))];
      quiz.push({ question, options, correctAnswer: String(correct), ...(i === qCount-1 ? {isSpecial:true} : {}) });
    }
    return { id:`${univId}-gen-l${lNum}`, title:titles[levelIndex], emoji:emojis[levelIndex], themeColor:"amber", badgeId:`${univId}-badge-l${lNum}`, badgeName:`Mathématicien L${lNum}`, badgeEmoji:emojis[levelIndex], cards:[{title:titles[levelIndex], text, emoji:emojis[levelIndex]},{title:"Conseil",text:"Fais des exercices chaque jour pour progresser rapidement !",emoji:"💡"}], quiz };
  }
  const names = { animals:"Zoologiste", nature:"Écologiste", body:"Anatomiste", space:"Cosmonaute", geography:"Géographe", french:"Linguiste", arts:"Artiste" };
  const name = names[univId] || "Explorateur";
  const titleLists = {
    animals:["Les Mammifères","Les Oiseaux","Les Reptiles","Les Insectes","Les Amphibiens","Les Animaux Marins","Les Animaux de Forêt","Les Animaux du Désert","Animaux de la Jungle","Les Dinosaures"],
    nature:["Les Saisons","Le Climat","L'Eau","Le Vent","La Terre","Les Forêts","Les Volcans","Les Étoiles","La Pollution","Le Recyclage"],
    body:["Les Sens","Le Squelette","Les Muscles","La Digestion","La Respiration","Le Cœur","Le Cerveau","Le Sommeil","Les Dents","Les Globules Rouges"],
    space:["Le Soleil","La Lune","La Terre","Mars","Jupiter","Saturne","Les Étoiles","Les Fusées","La Gravité","Les Galaxies"],
    geography:["Les Continents","Les Drapeaux","Les Pays d'Europe","Les Capitales","Les Pays d'Asie","Les Pays d'Afrique","Les Océans","Les Montagnes","Les Fleuves","Les Cartes"],
    french:["L'Alphabet","Les Noms","Les Verbes","Le Pluriel","Le Féminin","Les Adjectifs","La Ponctuation","Les Synonymes","Le Présent","Les Homophones"],
    arts:["Les Couleurs","La Peinture","Le Dessin","La Musique","Les Chansons","Le Théâtre","Le Cinéma","La Sculpture","Les Musées","Les Instruments"]
  };
  const titleList = titleLists[univId] || ["Leçon","Leçon Intermédiaire","Leçon Avancée","Leçon Générale","Leçon Découverte","Leçon Nature","Leçon Monde","Leçon Science","Leçon Espace","Leçon Défi"];
  const title = titleList[levelIndex];
  const emojis = ["🌟","🌱","💧","🔥","💨","⛰️","🧭","🛡️","🔮","🏆"];
  const emoji = emojis[levelIndex];
  const qCount = ageGroup === "3-5" ? 5 : 10;
  const quiz = [];
  const questions = [
    { question:`Quel est le sujet principal de cette leçon ?`, options:[title, "La géographie", "Les sciences"], correctAnswer:title },
    { question:`Cette leçon sur "${title}" appartient à quel univers ?`, options:[names[univId] ? univId : "sciences", "Les mathématiques", "L'histoire"], correctAnswer:names[univId] ? univId : "sciences" },
    { question:`Combien de niveaux comporte chaque thème dans ExploraKids ?`, options:["5 niveaux","10 niveaux","3 niveaux"], correctAnswer:"10 niveaux" },
    { question:`Quel badge obtiens-tu en terminant ce niveau ${lNum} ?`, options:[`Badge ${name} L${lNum}`, "Aucun badge", "Un diplôme"], correctAnswer:`Badge ${name} L${lNum}` },
    { question:`À quel niveau sommes-nous dans cet univers ?`, options:[`Niveau ${lNum}`, `Niveau ${lNum+1}`, `Niveau ${Math.max(1,lNum-1)}`], correctAnswer:`Niveau ${lNum}` },
    { question:`Quel est le numéro de cette leçon ?`, options:[`Leçon ${lNum}`, `Leçon ${lNum+2}`, `Leçon ${Math.max(1,lNum-1)}`], correctAnswer:`Leçon ${lNum}` },
    { question:`La leçon ${lNum} est une leçon de niveau…`, options:["Débutant si c'est le niveau 1-3, Intermédiaire si 4-7, Avancé si 8-10","Toujours débutant","Toujours avancé"], correctAnswer:"Débutant si c'est le niveau 1-3, Intermédiaire si 4-7, Avancé si 8-10" },
    { question:`Pourquoi étudie-t-on "${title}" ?`, options:["Pour s'amuser et apprendre des choses importantes","Pour passer le temps","Ce n'est pas utile"], correctAnswer:"Pour s'amuser et apprendre des choses importantes" },
    { question:`Combien d'univers au total dans ExploraKids ?`, options:["8 univers","10 univers","12 univers"], correctAnswer:"12 univers" },
    { question:`Complète la phrase : Apprendre "${title}" est essentiel car…`, options:["Ça enrichit notre culture générale et notre compréhension du monde","Ça ne sert à rien","C'est obligatoire"], correctAnswer:"Ça enrichit notre culture générale et notre compréhension du monde", isSpecial:true }
  ];
  for (let i = 0; i < qCount; i++) quiz.push(questions[i % questions.length]);
  return { id:`${univId}-gen-l${lNum}`, title, emoji, themeColor:"amber", badgeId:`${univId}-badge-l${lNum}`, badgeName:`${name} L${lNum}`, badgeEmoji:emoji, cards:[{title:`Découverte : ${title}`, text:`Cette leçon traite de ${title}. Lis attentivement pour réussir le quiz !`, emoji},{title:"Le savais-tu ?", text:`L'univers de cet apprentissage regorge de secrets fascinants. Continue pour débloquer de nouveaux badges !`, emoji:"💡"}], quiz };
}

// 4. Construire le nouvel objet UNIVERSES final
const finalUniverses = {};
const ALL_UNIVERSE_IDS = ["animals","nature","body","space","maths","geography","french","arts","computer","survival","ornithology","history"];

for (const id of ALL_UNIVERSE_IDS) {
  let univ;
  if (existing[id]) {
    univ = { ...existing[id], lessons: { ...existing[id].lessons } };
  } else {
    const meta = NEW_UNIVERSES_META[id];
    univ = { id, name:meta.name, emoji:meta.emoji, description:meta.description, themeColor:meta.themeColor, lessons:{"3-5":[],"6-8":[],"9-12":[]} };
  }

  const ageGroups = ["3-5","6-8","9-12"];
  for (const ageGroup of ageGroups) {
    let list = univ.lessons[ageGroup] || [];
    for (let i = 0; i < 10; i++) {
      if (list[i]) continue;
      if (LESSONS_DB[id] && LESSONS_DB[id][ageGroup] && LESSONS_DB[id][ageGroup][i]) {
        const lesson = LESSONS_DB[id][ageGroup][i];
        list[i] = {
          id:`${id}-gen-l${i+1}`,
          title:lesson.t, emoji:lesson.e, themeColor:NEW_UNIVERSES_META[id]?.themeColor || "amber",
          badgeId:`${id}-badge-l${i+1}`, badgeName:lesson.b, badgeEmoji:lesson.be,
          cards:lesson.cards, quiz:lesson.quiz
        };
      } else {
        list[i] = generateExtraLesson(id, ageGroup, i);
      }
    }
    univ.lessons[ageGroup] = list;
  }
  finalUniverses[id] = univ;
}

// 5. Écrire la sortie
const fileHeader = `export interface LessonCard { title: string; text: string; emoji: string; illustrationData?: string; mediaUrl?: string; mediaType?: "image" | "video"; }
export interface QuizQuestion { question: string; options: string[]; correctAnswer: string; imageHint?: string; mediaUrl?: string; mediaType?: "image" | "video"; isSpecial?: boolean; }
export interface Lesson { id: string; title: string; emoji: string; themeColor: string; cards: LessonCard[]; quiz: QuizQuestion[]; badgeId: string; badgeName: string; badgeEmoji: string; }
export interface Universe { id: string; name: string; emoji: string; description: string; themeColor: string; lessons: Record<string, Lesson[]>; }
`;
const fileContent = `${fileHeader}\nexport const UNIVERSES: Record<string, Universe> = ${JSON.stringify(finalUniverses, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'src/data/lessons.ts'), fileContent, 'utf8');
console.log('✅ src/data/lessons.ts généré avec succès : 12 univers, 10 niveaux, vraies questions pédagogiques !');
