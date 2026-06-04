const fs = require('fs');
const path = require('path');

// Charger les univers existants compilés
const { UNIVERSES: existing } = require('./tmp_build/lessons.js');

// 1. Définition des nouveaux univers
const NEW_UNIVERSES_META = {
  computer: {
    id: "computer",
    name: "Informatique",
    emoji: "💻",
    description: "Découvre les ordinateurs, le code secret, Internet et le monde des jeux vidéo !",
    themeColor: "indigo"
  },
  survival: {
    id: "survival",
    name: "Survie",
    emoji: "🏕️",
    description: "Apprends à faire un feu, t'orienter en forêt, et réagir en cas d'urgence !",
    themeColor: "orange"
  },
  ornithology: {
    id: "ornithology",
    name: "Ornithologie",
    emoji: "🦅",
    description: "Observe le vol des rapaces, écoute les chants et perce les secrets des oiseaux !",
    themeColor: "violet"
  },
  history: {
    id: "history",
    name: "Histoire",
    emoji: "🏰",
    description: "Plonge dans le temps des châteaux forts, des chevaliers, des pharaons et des dinosaures !",
    themeColor: "pink"
  }
};

// 2. Base de données de sujets (topics) pour générer les leçons manquantes (de 0 à 9 pour faire 10 leçons)
const TOPICS_DB = {
  computer: {
    "3-5": [
      { t: "L'ordinateur et l'écran", e: "💻", b: "Mon Premier Écran", be: "🖥️", text: "L'ordinateur a un écran pour regarder des dessins animés ou jouer à des jeux rigolos. C'est magique !" },
      { t: "La souris magique", e: "🖱️", b: "Ami de la Souris", be: "🖱️", text: "La souris sert à déplacer la flèche sur l'écran. Quand on appuie sur le bouton, ça fait clic-clic !" },
      { t: "Le clavier magique", e: "⌨️", b: "Petit Écrivain", be: "⌨️", text: "Le clavier est plein de boutons avec des lettres. Quand tu appuies dessus, les lettres s'écrivent sur l'écran !" },
      { t: "Les images et les pixels", e: "🖼️", b: "Dessinateur Pixel", be: "🎨", text: "Les images de l'ordinateur sont faites de tout petits carrés de couleur appelés des pixels. C'est magique !" },
      { t: "Les robots rigolos", e: "🤖", b: "Copain des Robots", be: "🤖", text: "Un robot est une machine métallique qui fait ce qu'on lui demande. Il marche en faisant : bip-bop-bip !" },
      { t: "Les tablettes tactiles", e: "📱", b: "Doigt Magique", be: "👉", text: "Sur la tablette, pas besoin de souris ! Tu touches l'écran avec ton doigt pour jouer et dessiner." },
      { t: "Allumer et éteindre", e: "🔌", b: "Maître du Bouton", be: "🟢", text: "Pour démarrer un ordinateur, on appuie sur le bouton Power. Quand on a fini, on l'éteint pour économiser l'électricité." },
      { t: "Les musiques sur l'ordi", e: "🎵", b: "Mélomane Digital", be: "🎧", text: "L'ordinateur a des haut-parleurs pour chanter des comptines ou jouer des bruits d'animaux très rigolos." },
      { t: "Les jolis emojis", e: "😊", b: "Roi des Emojis", be: "😀", text: "Les emojis sont des petits visages jaunes. On les utilise pour envoyer des sourires ou des cœurs à ses amis !" },
      { t: "Le jeu vidéo simple", e: "🎮", b: "Jeune Gamer", be: "🕹️", text: "Dans un jeu vidéo, tu contrôles un personnage avec les boutons pour attraper des pièces et éviter des obstacles !" }
    ],
    "6-8": [
      { t: "Comment fonctionne l'ordinateur", e: "💻", b: "Technicien en Herbe", be: "🔧", text: "L'ordinateur utilise un processeur (le cerveau) pour faire des calculs très vite et une mémoire pour retenir tes jeux." },
      { t: "C'est quoi un algorithme ?", e: "🧩", b: "Logique Junior", be: "🧩", text: "Un algorithme est une suite d'instructions précises. C'est comme une recette de cuisine pour faire faire une tâche à l'ordinateur." },
      { t: "Internet, le réseau géant", e: "🌐", b: "Navigateur du Web", be: "🌐", text: "Internet relie tous les ordinateurs du monde entre eux pour s'envoyer des messages, des images ou jouer ensemble." },
      { t: "Créer son propre jeu vidéo", e: "🎮", b: "Créateur de Jeux", be: "👾", text: "Pour faire un jeu vidéo, un programmeur écrit des instructions pour dire au personnage comment sauter ou courir." },
      { t: "La sécurité sur Internet", e: "🛡️", b: "Bouclier du Web", be: "🛡️", text: "Sur Internet, il faut protéger ses mots de passe et ne jamais donner son nom ou son adresse à des inconnus." },
      { t: "Les pièces de l'ordinateur", e: "💾", b: "Monteur Ordi", be: "🔌", text: "À l'intérieur, il y a la carte mère, le disque dur pour stocker tes fichiers et la carte graphique pour afficher les dessins du jeu." },
      { t: "Le code informatique", e: "👾", b: "Codeur Débutant", be: "💻", text: "Coder, c'est parler la langue des ordinateurs. On utilise des blocs ou des mots simples pour donner des ordres aux robots." },
      { t: "Les écrans et tes yeux", e: "👀", b: "Ami des Yeux", be: "👓", text: "Regarder un écran trop longtemps fatigue les yeux. Il faut faire des pauses régulièrement et ne pas regarder l'écran dans le noir." },
      { t: "Les e-mails et courriers", e: "✉️", b: "Facteur du Web", be: "✉️", text: "Un e-mail est une lettre électronique qui voyage en une seconde à l'autre bout de la Terre grâce aux réseaux." },
      { t: "Les objets connectés", e: "⌚", b: "Aventurier Connecté", be: "⌚", text: "De nos jours, des montres, des voitures et même des ampoules peuvent se connecter à Internet pour obéir à ta voix !" }
    ],
    "9-12": [
      { t: "L'histoire de l'informatique", e: "📜", b: "Historien Tech", be: "📜", text: "Le premier ordinateur moderne occupait une pièce entière ! Ada Lovelace a écrit le tout premier programme informatique de l'histoire au 19ème siècle." },
      { t: "Les langages de programmation", e: "💻", b: "Polyglotte du Code", be: "🧬", text: "Les codeurs utilisent différents langages : Python pour l'intelligence artificielle, JavaScript pour rendre les sites web interactifs, et C++ pour les jeux vidéo complexes." },
      { t: "Le fonctionnement d'Internet", e: "🌐", b: "Expert Réseau", be: "🌐", text: "Chaque ordinateur sur Internet possède une adresse IP unique. Les données voyagent dans des câbles sous-marins sous forme de paquets d'informations." },
      { t: "L'Intelligence Artificielle", e: "🤖", b: "Futuriste IA", be: "🧠", text: "L'IA apprend à partir de millions d'exemples grâce au Deep Learning. Elle peut reconnaître des visages, traduire des textes ou piloter des voitures autonomes." },
      { t: "Cybersécurité et cryptage", e: "🔐", b: "Cryptographe Secret", be: "🔑", text: "Le cryptage transforme tes messages en code secret indéchiffrable pour les pirates. Un bon mot de passe utilise des lettres, des chiffres et des symboles." },
      { t: "Le code binaire", e: "🔢", b: "Maître du Binaire", be: "🔢", text: "Les ordinateurs ne comprennent que l'électricité : allumé (1) ou éteint (0). Tout le texte, les images et les sons sont traduits en suites de 0 et de 1." },
      { t: "Les moteurs de recherche", e: "🔍", b: "Chercheur Web", be: "🔍", text: "Un moteur de recherche parcourt en permanence des milliards de pages web et utilise des algorithmes de classement pour te donner la réponse idéale." },
      { t: "Le processeur et la mémoire", e: "💾", b: "Architecte Système", be: "💾", text: "La RAM est la mémoire vive ultra-rapide qui s'efface quand on éteint l'ordi. Le CPU exécute des milliards d'opérations par seconde." },
      { t: "Le Cloud Computing", e: "☁️", b: "Gardien des Nuages", be: "☁️", text: "Le Cloud permet de sauvegarder tes photos ou tes jeux sur de grands serveurs distants plutôt que sur ton propre appareil, pour y accéder partout." },
      { t: "L'impact écologique du numérique", e: "🌍", b: "Éco-Citoyen Digital", be: "🌱", text: "Faire fonctionner Internet consomme énormément d'électricité. Les centres de données génèrent beaucoup de chaleur et nécessitent de l'énergie pour être refroidis." }
    ]
  },
  survival: {
    "3-5": [
      { t: "Les numéros d'urgence", e: "📞", b: "Alerte Secours", be: "🚨", text: "Si un adulte est blessé ou s'il y a un grand danger, appelle le 112 ou demande de l'aide immédiatement. C'est très important !" },
      { t: "Attention au feu !", e: "🔥", b: "Prudent du Feu", be: "🛡️", text: "Le feu brûle très fort et fait mal. Ne touche jamais aux allumettes ou aux briquets sans un adulte !" },
      { t: "S'habiller pour la forêt", e: "🥾", b: "Prêt à Marcher", be: "🥾", text: "Pour aller en forêt, mets des baskets ou des bottes fermées pour protéger tes pieds des cailloux et des branches pointues." },
      { t: "Boire de l'eau propre", e: "🥤", b: "Ami de l'Eau", be: "🥤", text: "Ne bois jamais l'eau de la rivière ou d'une flaque ! Elle peut contenir des microbes. Bois toujours l'eau de ta gourde." },
      { t: "Se protéger du soleil", e: "🧢", b: "Chapeau Magique", be: "🧢", text: "Quand le soleil tape fort, mets une casquette et de la crème pour éviter d'attraper des coups de soleil douloureux." },
      { t: "Les plantes sauvages", e: "🌿", b: "Botaniste Prudent", be: "🚫", text: "Certaines baies rouges ou champignons sauvages sont toxiques. Ne mange jamais une plante de la forêt sans demander à un adulte !" },
      { t: "S'abriter de la pluie", e: "☔", b: "Au Sec !", be: "☔", text: "Si la pluie commence à tomber, abrite-toi sous un grand arbre ou utilise un manteau imperméable pour ne pas tomber malade." },
      { t: "Demander de l'aide", e: "🗣️", b: "Voix Forte", be: "🗣️", text: "Si tu te perds, reste sur place et crie le nom de tes parents très fort. Les secours viendront te chercher !" },
      { t: "Le sifflet de secours", e: "😗", b: "Siffleur Alerte", be: "😗", text: "Un sifflet fait un bruit très aigu qui s'entend très loin dans la forêt. Souffle dedans trois fois pour appeler au secours." },
      { t: "Soigner les petits bobos", e: "🩹", b: "Docteur Pansement", be: "🩹", text: "Si tu t'égratignes sur une branche, nettoie la plaie avec de l'eau propre et mets un joli pansement pour la protéger." }
    ],
    "6-8": [
      { t: "Construire une cabane", e: "🪵", b: "Bâtisseur de Forêt", be: "🪵", text: "Pour s'abriter du vent, assemble des branches mortes contre un arbre solide. Ne coupe jamais de branches vivantes !" },
      { t: "Trouver de l'eau potable", e: "💧", b: "Puisatier Junior", be: "💧", text: "L'eau de la nature doit toujours être bouillie ou filtrée avant d'être bue pour éliminer les bactéries dangereuses." },
      { t: "S'orienter avec le Soleil", e: "☀️", b: "Aventurier du Soleil", be: "☀️", text: "Le Soleil se lève toujours à l'Est et se couche à l'Ouest. À midi, il indique le Sud dans notre hémisphère." },
      { t: "Le sac à dos de survie", e: "🎒", b: "Sac Prêt", be: "🎒", text: "Un bon aventurier emporte toujours : de l'eau, une lampe de poche, un sifflet, une couverture de survie et des pansements." },
      { t: "Allumer un feu de camp", e: "🔥", b: "Gardien du Feu", be: "🔥", text: "Dégage le sol autour du foyer, entoure-le de pierres et garde toujours de l'eau à proximité pour éteindre le feu." },
      { t: "Les numéros de secours", e: "📞", b: "Secouriste Alerte", be: "🚨", text: "En Europe, le 112 est le numéro d'urgence gratuit. Il fonctionne même sur un téléphone verrouillé ou sans carte SIM !" },
      { t: "Les animaux de la forêt", e: "🐗", b: "Ami de la Faune", be: "🐗", text: "Si tu croises un sanglier ou un serpent, ne t'approche pas et recule calmement. Les animaux ont souvent plus peur de toi !" },
      { t: "Que faire en cas d'orage ?", e: "⚡", b: "Prudent de l'Orage", be: "⚡", text: "Ne reste jamais sous un grand arbre isolé. Accroupis-toi au sol sur ton sac à dos pour ne pas toucher directement la terre." },
      { t: "Les premiers gestes de secours", e: "🩹", b: "Secouriste Junior", be: "🩹", text: "En cas de brûlure, laisse couler de l'eau fraîche du robinet pendant 15 minutes pour calmer la douleur et stopper la brûlure." },
      { t: "Les points cardinaux", e: "🧭", b: "Maître des Caps", be: "🧭", text: "Il y a quatre directions principales : le Nord, le Sud, l'Est et l'Ouest. Elles forment la rose des vents." }
    ],
    "9-12": [
      { t: "Utiliser carte et boussole", e: "🧭", b: "Cartographe Expert", be: "🧭", text: "L'aiguille aimantée de la boussole pointe toujours vers le Nord magnétique. Aligne le Nord de ta carte avec l'aiguille pour savoir où aller." },
      { t: "Filtration et purification", e: "🧪", b: "Chimiste de l'Eau", be: "🧪", text: "Pour rendre l'eau potable, utilise des pastilles de purification (chlore/iode) ou un filtre à membrane pour bloquer les parasites." },
      { t: "Techniques de feu avancées", e: "🔥", b: "Maître du Foyer", be: "🔥", text: "Utilise de l'amadou très sec (écorce de bouleau, coton) et une pierre à feu (firesteel) qui produit des étincelles à plus de 3000°C." },
      { t: "Survie en grand froid", e: "❄️", b: "Survivant Polaire", be: "❄️", text: "Dans le froid, le plus grand danger est l'hypothermie. Habille-toi avec trois couches : respirante, isolante (polaire) et imperméable." },
      { t: "Signaux de détresse (SOS)", e: "🚨", b: "Signaliseur Alerte", be: "🚨", text: "Le signal SOS international en morse se compose de : 3 signaux courts, 3 longs, 3 courts (... --- ...). Fais-le avec un sifflet ou une lampe." },
      { t: "La trousse de secours complète", e: "🩹", b: "Pharmacien Secours", be: "🩹", text: "Elle doit contenir des compresses stériles, du désinfectant, une pince à épiler (tiques), du paracétamol et du ruban adhésif solide." },
      { t: "S'orienter avec les étoiles", e: "⭐", b: "Astronome Guide", be: "⭐", text: "Dans l'hémisphère Nord, trouve la Grande Ourse, reporte 5 fois la distance du bord extérieur pour repérer l'Étoile Polaire (le Nord)." },
      { t: "La règle des 3 de la survie", e: "🧠", b: "Théoricien Survie", be: "🧠", text: "Un humain peut survivre : 3 minutes sans oxygène, 3 heures sans abri par froid extrême, 3 jours sans eau, et 3 semaines sans manger." },
      { t: "Se nourrir dans la nature", e: "🍒", b: "Cueilleur Expert", be: "🍒", text: "Mange uniquement des plantes identifiées à 100%. Les pissenlits, les orties et les mûres sauvages sont d'excellentes sources de nutriments." },
      { t: "Réagir aux catastrophes", e: "🌋", b: "Résistant Catastrophe", be: "🛡️", text: "En cas de séisme, abrite-toi sous une table solide (méthode Drop, Cover and Hold On) et protège ta tête avec tes mains." }
    ]
  },
  ornithology: {
    "3-5": [
      { t: "Qu'est-ce qu'un oiseau ?", e: "🪶", b: "Ami des Plumes", be: "🪶", text: "Les oiseaux sont des animaux rigolos couverts de jolies plumes colorées. Ils ont tous deux ailes et un bec !" },
      { t: "Le cri des oiseaux", e: "🐦", b: "Chanteur de la Forêt", be: "🐦", text: "Les oiseaux chantent et sifflent de jolies comptines. Le petit moineau fait 'cuicui' et le corbeau fait 'croâ' !" },
      { t: "Le nid douillet", e: "🪺", b: "Garnisseur de Nid", be: "🪺", text: "Pour pondre leurs œufs, les oiseaux fabriquent un nid en herbe et en brindilles au creux d'un arbre pour protéger les oisillons." },
      { t: "Le plumage coloré", e: "🌈", b: "Peintre des Plumes", be: "🎨", text: "Certains oiseaux ont des plumes très colorées : le perroquet est vert et rouge, le canard a la tête verte, et le cygne est tout blanc !" },
      { t: "Les oiseaux du jardin", e: "🐤", b: "Observateur Jardin", be: "🐤", text: "Dans les jardins, tu peux apercevoir le moineau gris, le rouge-gorge avec sa gorge orange, et la pie noire et blanche." },
      { t: "Le bec des oiseaux", e: "🦆", b: "Expert du Bec", be: "🦆", text: "Les oiseaux utilisent leur bec pour attraper des graines ou des petits vers. Les canards ont un bec tout plat pour filtrer l'eau !" },
      { t: "La chouette de nuit", e: "🦉", b: "Compagnon de la Chouette", be: "🦉", text: "La chouette et le hibou dorment le jour et se réveillent la nuit. Ils ont de très grands yeux pour voir dans le noir !" },
      { t: "Les oiseaux qui nagent", e: "🌊", b: "Nageur Plumes", be: "🌊", text: "Certains oiseaux adorent l'eau ! Les canards et les cygnes nagent sur le lac grâce à leurs pattes palmées." },
      { t: "Comment s'envoler ?", e: "🪽", b: "Petit Aviateur", be: "🪽", text: "Les oiseaux battent des ailes pour sauter dans le vent et voler tout là-haut dans le ciel bleu, comme des petits avions !" },
      { t: "Aider les oiseaux en hiver", e: "❄️", b: "Protecteur Hiver", be: "❄️", text: "En hiver, quand la terre est gelée, pose des graines et de l'eau tiède dans le jardin pour aider les oiseaux à manger !" }
    ],
    "6-8": [
      { t: "Les plumes et le vol", e: "🪶", b: "Physicien du Vol", be: "🪶", text: "Les plumes sont faites de kératine (comme tes cheveux). Les plumes des ailes s'imbriquent pour former une surface lisse pour planer." },
      { t: "Les nids et la reproduction", e: "🥚", b: "Nidicole Actif", be: "🥚", text: "La femelle pond des œufs et les couve en s'asseyant dessus pour les garder au chaud jusqu'à ce que les oisillons sortent." },
      { t: "Le chant et la communication", e: "🎶", b: "Compositeur Plumes", be: "🎶", text: "Chaque espèce a son propre chant. Les oiseaux l'utilisent pour délimiter leur territoire et séduire des partenaires au printemps." },
      { t: "Les grands rapaces", e: "🦅", b: "Ami des Aigles", be: "🦅", text: "L'aigle, le faucon et le vautour sont des rapaces. Ils ont un bec crochu et des griffes acérées appelées serres pour chasser." },
      { t: "Les oiseaux coureurs", e: "🏃", b: "Coureur Plumes", be: "🏃", text: "Certains oiseaux ne volent pas ! L'autruche est trop lourde pour voler, mais elle peut courir très vite, jusqu'à 70 km/h !" },
      { t: "Que mangent les oiseaux ?", e: "🐛", b: "Nutritionniste Volant", be: "🍎", text: "Certains mangent des graines (granivores), d'autres des insectes (insectivores), ou du poisson (piscivores) comme le martin-pêcheur." },
      { t: "Le perroquet bavard", e: "🦜", b: "Imitateur Plumes", be: "🦜", text: "Les perroquets vivent dans les forêts tropicales. Ils peuvent imiter la voix humaine et d'autres bruits grâce à leur langue épaisse." },
      { t: "Les oiseaux aquatiques", e: "🦢", b: "Ornithologue Lac", be: "🦢", text: "Les hérons ont de longues pattes d'échassier pour marcher dans l'eau peu profonde sans faire de bruit et harponner les poissons." },
      { t: "Rapaces de nuit", e: "🦉", b: "Ami des Rapaces", be: "🦉", text: "Les hiboux ont des plumes ultra-douces qui étouffent le bruit de l'air. Ils peuvent voler de façon 100% silencieuse pour surprendre leurs proies." },
      { t: "La protection des nids", e: "🌳", b: "Gardien d'Arbres", be: "🌱", text: "Il faut éviter de tailler les haies au printemps car c'est là que les petits oiseaux cachent leurs nids et élèvent leurs oisillons." }
    ],
    "9-12": [
      { t: "L'anatomie et l'adaptation", e: "🦴", b: "Biologiste Aviaire", be: "🧬", text: "Pour voler, les oiseaux ont des os creux très légers renforcés par des traverses internes, et un sternum géant en forme de bréchet." },
      { t: "Les vols migratoires géants", e: "🗺️", b: "Cartographe Stellaire", be: "🧭", text: "La Sterne arctique fait l'aller-retour entre les pôles chaque année, volant plus de 70 000 km. Elle utilise le champ magnétique terrestre." },
      { t: "La vision extraordinaire", e: "🦅", b: "Ophlamologue Rapace", be: "👀", text: "L'œil de l'aigle a une densité de cellules visuelles 5 fois supérieure à celle de l'homme, lui permettant de voir une souris à 1 km." },
      { t: "Les oiseaux de l'extrême", e: "❄️", b: "Explorateur des Glaces", be: "🧊", text: "Le Manchot empereur affronte l'hiver antarctique par -60°C. Il protège son œuf sur ses pattes sous un repli de peau chaude." },
      { t: "L'évolution des oiseaux", e: "🦖", b: "Paléontologue Aviaire", be: "🦖", text: "Les dinosaures théropodes possédaient déjà des plumes ! L'Archéoptéryx est le plus célèbre fossile de transition." },
      { t: "Darwin et les pinsons", e: "🧬", b: "Généticien Darwin", be: "🧬", text: "Aux îles Galápagos, Darwin a remarqué que la forme des becs des pinsons s'adaptait à leur nourriture locale, prouvant la sélection naturelle." },
      { t: "Parade et dimorphisme sexuel", e: "🦚", b: "Sociologue Aviaire", be: "🦚", text: "Chez de nombreuses espèces, le mâle a des plumes très colorées (le paon) pour séduire la femelle qui, elle, est terne pour se camoufler." },
      { t: "Les prédateurs silencieux", e: "🦉", b: "Noctambule Aviaire", be: "🦉", text: "L'ouïe du hibou moyen-duc est asymétrique : ses oreilles ne sont pas à la même hauteur, ce qui lui permet de localiser un son en 3D." },
      { t: "Le métabolisme aviaire", e: "⚡", b: "Physiologiste Aviaire", be: "⚡", text: "Le colibri bat des ailes jusqu'à 80 fois par seconde ! Son cœur bat à plus de 1000 pulsations par minute pour soutenir cet effort." },
      { t: "Conservation et biodiversité", e: "🌍", b: "Écologue Aviaire", be: "🌍", text: "L'utilisation de pesticides élimine les insectes et empoisonne les oiseaux, provoquant un déclin dramatique des populations aviaires." }
    ]
  },
  history: {
    "3-5": [
      { t: "Les dinosaures géants", e: "🦖", b: "Ami des Dinos", be: "🦖", text: "Il y a très longtemps, de grands dinosaures vivaient sur Terre : le Diplodocus géant mangeait des feuilles, et le T-Rex courait très vite !" },
      { t: "Les magnifiques châteaux", e: "🏰", b: "Prince ou Princesse", be: "👑", text: "Les rois et les reines habitaient dans de grands châteaux en pierre avec des ponts-levis et des tours très hautes !" },
      { t: "Les pyramides d'Égypte", e: "📐", b: "Aventurier du Désert", be: "🏜️", text: "En Égypte, il y a de grands monuments pointus en pierre appelés des pyramides, construits au milieu du sable chaud." },
      { t: "Les hommes des cavernes", e: "🍖", b: "Petit Cro-Magnon", be: "🔥", text: "Les premiers hommes s'abritaient dans des cavernes. Ils chassaient des mammouths et dessinaient sur les murs de pierre." },
      { t: "Les chapeaux des rois", e: "👑", b: "Couronné", be: "👑", text: "Les rois et reines portaient une couronne en or brillant posée sur la tête, avec de jolis diamants rouges et bleus !" },
      { t: "Les bateaux de pirates", e: "🏴‍☠️", b: "Mousse Pirate", be: "🏴‍☠️", text: "Les pirates naviguaient sur de grands bateaux en bois avec un drapeau noir pour chercher des coffres pleins de pièces d'or !" },
      { t: "Le bouclier en bois", e: "🛡️", b: "Chevalier Prudent", be: "🛡️", text: "Pour se protéger des flèches, les chevaliers portaient un grand bouclier en bois ou en métal décoré avec un lion dessiné." },
      { t: "Les momies mystérieuses", e: "🧟", b: "Ami des Pharaons", be: "🏺", text: "En Égypte, pour conserver les rois (les pharaons) après leur mort, on les enveloppait dans de grandes bandes de tissu." },
      { t: "Écrire avec des dessins", e: "✍️", b: "Scribe Débutant", be: "📜", text: "Il y a très longtemps, on n'écrivait pas avec des lettres mais avec des petits dessins d'animaux ou d'objets !" },
      { t: "Les habits d'autrefois", e: "👗", b: "Habillé d'Époque", be: "👗", text: "Autrefois, il n'y avait pas de jeans ! Les hommes portaient des capes et des armures de métal, et les femmes de longues robes." }
    ],
    "6-8": [
      { t: "Le château fort médiéval", e: "🏰", b: "Châtelain Junior", be: "🏰", text: "Le château fort est protégé par des douves pleines d'eau et une herse en fer pour empêcher les ennemis d'entrer." },
      { t: "Les chevaliers et tournois", e: "🛡️", b: "Chevalier Adoubé", be: "⚔️", text: "Les chevaliers s'entraînaient dur et faisaient des tournois à cheval avec des lances en bois pour montrer leur force." },
      { t: "Les dieux de l'Égypte", e: "🐈", b: "Égyptologue Junior", be: "🏺", text: "Les Égyptiens adoraient des dieux à tête d'animaux : Anubis à tête de chacal, Horus à tête de faucon, et ils adoraient les chats !" },
      { t: "Les Romains et Gladiateurs", e: "🏟️", b: "Citoyen Romain", be: "🏛️", text: "L'Empire romain a construit de grands monuments comme le Colisée où les gladiateurs combattaient devant le peuple." },
      { t: "La Préhistoire et le feu", e: "🔥", b: "Archéologue Préhistoire", be: "🔥", text: "Les hommes préhistoriques ont appris à faire du feu en frottant deux bois ou en percutant du silex. Le feu les réchauffait et cuisait la viande." },
      { t: "Les drakkars des Vikings", e: "⛵", b: "Navigateur Viking", be: "⛵", text: "Les Vikings étaient de grands navigateurs venus du Nord. Leurs navires rapides, les drakkars, avaient une tête de dragon sculptée à l'avant." },
      { t: "Châteaux de la Renaissance", e: "🏰", b: "Châtelain Renaissance", be: "🎨", text: "À la Renaissance, les châteaux ne servent plus pour la guerre, mais deviennent des palais magnifiques avec de grands jardins à la française." },
      { t: "Les dinosaures célèbres", e: "🦖", b: "Paléontologue Junior", be: "🦖", text: "Le Tricératops avait trois cornes sur la tête, le Stégosaure des plaques sur le dos, et le T-Rex était le prédateur le plus redouté." },
      { t: "L'écriture des Égyptiens", e: "📜", b: "Scribe de Cour", be: "📜", text: "L'écriture égyptienne s'appelle les hiéroglyphes. Les scribes écrivaient sur des rouleaux faits avec une plante appelée le papyrus." },
      { t: "Les inventions du passé", e: "⚙️", b: "Inventeur Junior", be: "⚙️", text: "L'invention de la roue en Mésopotamie il y a 5000 ans a changé le monde, permettant de transporter des charges lourdes facilement." }
    ],
    "9-12": [
      { t: "Le système de la féodalité", e: "🛡️", b: "Vassal Loyal", be: "🏰", text: "Au Moyen Âge, la féodalité lie le seigneur à son vassal. Le seigneur donne une terre (le fief) en échange de protection militaire." },
      { t: "Les grandes découvertes", e: "🌍", b: "Grand Explorateur", be: "🧭", text: "Grâce à la boussole et aux caravelles, Christophe Colomb traverse l'Atlantique en 1492, ouvrant la route vers le continent américain." },
      { t: "La mythologie gréco-romaine", e: "⚡", b: "Mythologue Expert", be: "🏛️", text: "Zeus (Jupiter chez les Romains) règne sur l'Olympe et lance la foudre. Poséidon (Neptune) commande les océans avec son trident." },
      { t: "Les momies et l'au-delà", e: "🧟", b: "Expert Momification", be: "🏺", text: "L'embaumement égyptien durait 70 jours : on retirait les organes mis dans des vases canopes, salait le corps avec du natron et l'enveloppait." },
      { t: "L'invention de l'imprimerie", e: "📖", b: "Gutenberg Junior", be: "📖", text: "Vers 1440, Johannes Gutenberg invente les caractères mobiles en métal. Cela permet d'imprimer des livres en quantité, diffusant le savoir." },
      { t: "L'Empire Romain et sa chute", e: "🏛️", b: "Sénateur Romain", be: "🏛️", text: "Rome possédait une armée surpuissante, les légions. L'Empire s'est effondré en 476 après J.-C., marquant la fin de l'Antiquité." },
      { t: "L'art pariétal préhistorique", e: "🎨", b: "Artiste des Cavernes", be: "🎨", text: "Dans des grottes comme Lascaux, les hommes peignaient des bisons et des chevaux en utilisant des pigments naturels (ocre, charbon)." },
      { t: "La Révolution française", e: "🇫🇷", b: "Citoyen Révolutionnaire", be: "🇫🇷", text: "En 1789, le peuple français se révolte contre le roi Louis XVI. La prise de la Bastille le 14 juillet marque le début de la République." },
      { t: "Les bâtisseurs de cathédrales", e: "🧱", b: "Compagnon Bâtisseur", be: "⛪", text: "Au 12ème siècle naît l'art gothique. Grâce à la croisée d'ogives et aux arcs-boutants, les cathédrales montent très haut et s'illuminent de vitraux." },
      { t: "Léonard de Vinci et la Renaissance", e: "🎨", b: "Génie Universel", be: "🎨", text: "Léonard de Vinci était peintre (La Joconde), mais aussi ingénieur. Il a dessiné des plans de machines volantes et de chars d'assaut 400 ans en avance." }
    ]
  }
};

// 3. Fonction pour générer un quiz d'additions mathématiques complexes en fonction du niveau (1 à 10) et de la tranche d'âge
function getGeneratedMathQuiz(level, ageGroup) {
  const quiz = [];
  const qCount = ageGroup === "3-5" ? 3 : ageGroup === "6-8" ? 5 : 10;
  
  for (let i = 0; i < qCount; i++) {
    let a, b, op, question, correct, opt;
    if (ageGroup === "3-5") {
      a = Math.floor(Math.random() * 4) + 1; // 1-4
      b = Math.floor(Math.random() * 3) + 1; // 1-3
      correct = a + b;
      question = `Combien font ${a} plus ${b} ?`;
      opt = [correct, correct + 1, Math.max(1, correct - 1)];
    } else if (ageGroup === "6-8") {
      if (level <= 5) {
        a = Math.floor(Math.random() * 15) + 5; // 5-20
        b = Math.floor(Math.random() * 12) + 2; // 2-14
        correct = a + b;
        question = `Calcule le résultat de : ${a} + ${b}`;
      } else {
        a = Math.floor(Math.random() * 9) + 2; // 2-10
        b = Math.floor(Math.random() * 5) + 2; // 2-6
        correct = a * b;
        question = `Combien font ${a} fois ${b} ? (${a} x ${b})`;
      }
      opt = [correct, correct + (Math.random() > 0.5 ? 2 : -2), correct + 10];
    } else { // 9-12
      if (level <= 6) {
        a = Math.floor(Math.random() * 50) + 10;
        b = Math.floor(Math.random() * 40) + 10;
        correct = a + b;
        question = `Résous l'addition suivante : ${a} + ${b}`;
      } else {
        a = Math.floor(Math.random() * 12) + 3;
        b = Math.floor(Math.random() * 11) + 3;
        correct = a * b;
        question = `Calcule le produit de : ${a} x ${b}`;
      }
      opt = [correct, correct + (Math.random() > 0.5 ? 5 : -5), correct + 2];
    }
    
    // Rendre les options uniques
    const optionsSet = new Set(opt.map(o => String(o)));
    while (optionsSet.size < 3) {
      optionsSet.add(String(correct + Math.floor(Math.random() * 10) + 3));
    }
    const options = Array.from(optionsSet);
    
    // S'assurer que correctAnswer fait partie des options
    if (!options.includes(String(correct))) {
      options[0] = String(correct);
    }

    quiz.push({
      question,
      options,
      correctAnswer: String(correct)
    });
  }
  
  if (ageGroup === "9-12") {
    quiz[quiz.length - 1].isSpecial = true; // Dernière question spéciale
  }
  
  return quiz;
}

// 4. Fonction générale pour générer le reste des leçons pour n'importe quel univers existant
function generateExtraLesson(univId, ageGroup, levelIndex) {
  // levelIndex va de 0 à 9 (1ère à 10ème leçon)
  const lNum = levelIndex + 1;
  
  // Si c'est pour maths, on a des questions dynamiques
  if (univId === "maths") {
    const titles = [
      "Introduction aux Nombres", "Les Premières Additions", "Les Premières Soustractions",
      "Compter plus loin", "Double et Moitié", "Les Formes Géométriques",
      "La Table de Multiplication", "Les Divisions Faciles", "Les Fractions Simples", "Grand Défi de Logique"
    ];
    const emojis = ["🔢", "➕", "➖", "🧮", "⚖️", "📐", "✖️", "➗", "🍰", "🧠"];
    const text = `Dans ce niveau ${lNum}, nous allons nous entraîner sur : ${titles[levelIndex]}. Répète bien les exercices pour devenir un as du calcul !`;
    return {
      id: `${univId}-gen-l${lNum}`,
      title: titles[levelIndex],
      emoji: emojis[levelIndex],
      themeColor: "amber",
      badgeId: `${univId}-badge-l${lNum}`,
      badgeName: `Mathématicien L${lNum}`,
      badgeEmoji: emojis[levelIndex],
      cards: [
        { title: titles[levelIndex], text: text, emoji: emojis[levelIndex] },
        { title: "S'entraîner", text: "Fais des quiz tous les jours. C'est en faisant des erreurs qu'on apprend le plus !", emoji: "🧠" }
      ],
      quiz: getGeneratedMathQuiz(lNum, ageGroup)
    };
  }

  // Pour les autres univers, on utilise des fiches génériques informatives thématiques
  const names = {
    animals: "Zoologiste",
    nature: "Écologiste",
    body: "Anatomiste",
    space: "Cosmonaute",
    geography: "Géographe",
    french: "Linguiste",
    arts: "Artiste",
    computer: "Informaticien",
    survival: "Survivant",
    ornithology: "Ornithologue",
    history: "Historien"
  };

  const name = names[univId] || "Explorateur";
  const titles = {
    animals: ["Les Mammifères", "Les Oiseaux", "Les Reptiles", "Les Insectes", "Les Amphibiens", "Les Animaux Marins", "Les Animaux de Forêt", "Les Animaux du Désert", "Animaux de la Jungle", "Les Dinosaures"],
    nature: ["Les Saisons", "Le Climat", "L'Eau", "Le Vent", "La Terre", "Les Forêts", "Les Volcans", "Les Étoiles", "La Pollution", "Le Recyclage"],
    body: ["Les Sens", "Le Squelette", "Les Muscles", "La Digestion", "La Respiration", "Le Cœur", "Le Cerveau", "Le Sommeil", "Les Dents", "Les Globules Rouges"],
    space: ["Le Soleil", "La Lune", "La Terre", "Mars", "Jupiter", "Saturne", "Les Étoiles", "Les Fusées", "La Gravité", "Les Galaxies"],
    geography: ["Les Continents", "Les Drapeaux", "Les Pays d'Europe", "Les Capitales", "Les Pays d'Asie", "Les Pays d'Afrique", "Les Océans", "Les Montagnes", "Les Fleuves", "Les Cartes"],
    french: ["L'Alphabet", "Les Noms", "Les Verbes", "Le Pluriel", "Le Féminin", "Les Adjectifs", "La Ponctuation", "Les Synonymes", "Le Présent", "Les Homophones"],
    arts: ["Les Couleurs", "La Peinture", "Le Dessin", "La Musique", "Les Chansons", "Le Théâtre", "Le Cinéma", "La Sculpture", "Les Musées", "Les Instruments"]
  };

  const titleList = titles[univId] || ["Leçon Initiale", "Leçon Intermédiaire", "Leçon Avancée", "Leçon Générale", "Leçon Découverte", "Leçon Nature", "Leçon Monde", "Leçon Science", "Leçon Espace", "Leçon Défi"];
  const title = titleList[levelIndex];
  
  const emojis = ["🌟", "🌱", "💧", "🔥", "💨", "⛰️", "🧭", "🛡️", "🔮", "🏆"];
  const emoji = emojis[levelIndex];

  const cards = [
    { title: `Découverte : ${title}`, text: `Cette leçon traite de ${title} dans le cadre de ton apprentissage de l'univers ${univId}. Lis bien les explications !`, emoji: emoji },
    { title: "Le savais-tu ?", text: `L'univers de ${univId} regorge de secrets passionnants. Continue d'étudier pour débloquer de nouveaux badges et animaux d'arbre !`, emoji: "💡" }
  ];

  const quiz = [
    {
      question: `Quelle est la couleur principale associée à l'univers ${univId} ?`,
      options: ["Bleu 🔵", "Vert 🟢", "Dépend du thème 🌈"],
      correctAnswer: "Dépend du thème 🌈"
    },
    {
      question: `Dans quel but étudions-nous le sujet : ${title} ?`,
      options: ["Pour s'amuser et apprendre 🎓", "Pour dormir 😴", "Pour manger des gâteaux 🍰"],
      correctAnswer: "Pour s'amuser et apprendre 🎓"
    },
    {
      question: `Combien de niveaux comporte chaque thème d'ExploraKids ?`,
      options: ["3 niveaux 🚫", "10 niveaux 🌟", "50 niveaux 🚫"],
      correctAnswer: "10 niveaux 🌟"
    }
  ];

  if (ageGroup === "6-8") {
    quiz.push({
      question: `Quel badge obtiens-tu en terminant le niveau ${lNum} ?`,
      options: ["Un badge en carton 📦", `Le badge ${name} L${lNum} 🏆`, "Pas de badge 🚫"],
      correctAnswer: `Le badge ${name} L${lNum} 🏆`
    });
  }

  if (ageGroup === "9-12") {
    quiz.push({
      question: `Quel badge obtiens-tu en terminant le niveau ${lNum} ?`,
      options: ["Un badge en carton 📦", `Le badge ${name} L${lNum} 🏆`, "Pas de badge 🚫"],
      correctAnswer: `Le badge ${name} L${lNum} 🏆`
    });
    quiz.push({
      question: `Complète la phrase : L'apprentissage de "${title}" est...`,
      options: ["Ennuyeux 🥱", "Essentiel et super intéressant pour mon cerveau 🧠✨", "Inutile 🚫"],
      correctAnswer: "Essentiel et super intéressant pour mon cerveau 🧠✨",
      isSpecial: true
    });
  }

  return {
    id: `${univId}-gen-l${lNum}`,
    title: title,
    emoji: emoji,
    themeColor: "amber",
    badgeId: `${univId}-badge-l${lNum}`,
    badgeName: `${name} L${lNum}`,
    badgeEmoji: emoji,
    cards: cards,
    quiz: quiz
  };
}

// 5. Construire le nouvel objet UNIVERSES final
const finalUniverses = {};

// Traiter tous les 12 univers prévus
const ALL_UNIVERSE_IDS = [
  "animals", "nature", "body", "space", "maths", "geography", "french", "arts",
  "computer", "survival", "ornithology", "history"
];

for (const id of ALL_UNIVERSE_IDS) {
  let univ;
  if (existing[id]) {
    // Univers existant, on le clone
    univ = { ...existing[id], lessons: { ...existing[id].lessons } };
  } else {
    // Nouvel univers, on l'initialise
    const meta = NEW_UNIVERSES_META[id];
    univ = {
      id: id,
      name: meta.name,
      emoji: meta.emoji,
      description: meta.description,
      themeColor: meta.themeColor,
      lessons: { "3-5": [], "6-8": [], "9-12": [] }
    };
  }

  // S'assurer que chaque tranche d'âge a exactement 10 leçons
  const ageGroups = ["3-5", "6-8", "9-12"];
  for (const ageGroup of ageGroups) {
    let list = univ.lessons[ageGroup] || [];
    
    // Si c'est le nouvel univers ornithologie, on peut y copier la leçon "ornithology" existante de animals "6-8"
    if (id === "ornithology" && ageGroup === "6-8" && list.length === 0) {
      const existingOrnithology = existing.animals?.lessons["6-8"]?.find(l => l.id === "ornithology");
      if (existingOrnithology) {
        list.push(existingOrnithology);
      }
    }

    // Remplir jusqu'à 10
    for (let i = 0; i < 10; i++) {
      if (list[i]) {
        // La leçon existe déjà (handcrafted), on la garde intacte !
        continue;
      }
      
      // Sinon, on génère la leçon correspondante
      // Si c'est l'un des 4 nouveaux univers et qu'on a défini des sujets dans TOPICS_DB, on les utilise !
      if (TOPICS_DB[id] && TOPICS_DB[id][ageGroup] && TOPICS_DB[id][ageGroup][i]) {
        const topic = TOPICS_DB[id][ageGroup][i];
        const lNum = i + 1;
        const name = id === "computer" ? "Informaticien" : id === "survival" ? "Survivant" : id === "ornithology" ? "Ornithologue" : "Historien";
        
        // Créer les fiches (cards)
        const cards = [
          { title: topic.t, text: topic.text, emoji: topic.e },
          { title: "Astuce d'Explorateur", text: "Prends ton temps pour lire la leçon et retiens bien les mots écrits en gras !", emoji: "💡" }
        ];

        // Créer le quiz
        const quiz = [
          {
            question: `Quel objet ou symbole représente "${topic.t}" ?`,
            options: [topic.e, "🍎", "🚗"],
            correctAnswer: topic.e
          },
          {
            question: `Complète la phrase : "${topic.t}" fait partie de la leçon d'apprentissage.`,
            options: ["Vrai 🎯", "Faux 🚫", "Je ne sais pas 🤷"],
            correctAnswer: "Vrai 🎯"
          }
        ];

        if (ageGroup === "3-5") {
          quiz.push({
            question: `Est-ce que tu as aimé apprendre sur : ${topic.t} ?`,
            options: ["Oui ! 😍", "Non 😢"],
            correctAnswer: "Oui ! 😍"
          });
        } else if (ageGroup === "6-8") {
          quiz.push({
            question: `Quelle leçon étudions-nous ici ?`,
            options: ["Les mathématiques ➕", topic.t, "L'anglais 🇬🇧"],
            correctAnswer: topic.t
          });
          quiz.push({
            question: `Quel badge obtiens-tu à ce niveau ?`,
            options: [`Le badge ${name} L${lNum} 🏆`, "Aucun badge 🚫", "Un bonbon 🍬"],
            correctAnswer: `Le badge ${name} L${lNum} 🏆`
          });
        } else { // 9-12
          quiz.push({
            question: `Quelle notion est centrale dans la fiche : "${topic.t}" ?`,
            options: ["Le jeu 🎮", topic.t, "La cuisine 🍳"],
            correctAnswer: topic.t
          });
          quiz.push({
            question: `De quelle discipline scientifique s'agit-il ?`,
            options: [NEW_UNIVERSES_META[id].name, "Le français 🇫🇷", "Les mathématiques 🧮"],
            correctAnswer: NEW_UNIVERSES_META[id].name
          });
          quiz.push({
            question: `Félicitations pour ton travail ! Es-tu prêt à continuer ?`,
            options: ["Non 😴", "Oui, je veux relever tous les défis ! 🚀✨", "Peut-être 🤷"],
            correctAnswer: "Oui, je veux relever tous les défis ! 🚀✨",
            isSpecial: true
          });
        }

        list[i] = {
          id: `${id}-gen-l${lNum}`,
          title: topic.t,
          emoji: topic.e,
          themeColor: NEW_UNIVERSES_META[id].themeColor,
          badgeId: `${id}-badge-l${lNum}`,
          badgeName: `${topic.b}`,
          badgeEmoji: topic.be,
          cards: cards,
          quiz: quiz
        };
      } else {
        // Pour les univers existants (ou si sujet générique nécessaire)
        list[i] = generateExtraLesson(id, ageGroup, i);
      }
    }
    
    univ.lessons[ageGroup] = list;
  }

  finalUniverses[id] = univ;
}

// 6. Formater et écrire la sortie dans src/data/lessons.ts
const fileHeader = `export interface LessonCard {
  title: string;
  text: string;
  emoji: string;
  illustrationData?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  imageHint?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  isSpecial?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  themeColor: string;
  cards: LessonCard[];
  quiz: QuizQuestion[];
  badgeId: string;
  badgeName: string;
  badgeEmoji: string;
}

export interface Universe {
  id: string;
  name: string;
  emoji: string;
  description: string;
  themeColor: string;
  lessons: Record<string, Lesson[]>;
}
`;

const fileContent = `${fileHeader}\nexport const UNIVERSES: Record<string, Universe> = ${JSON.stringify(finalUniverses, null, 2)};\n`;

fs.writeFileSync(path.join(__dirname, 'src/data/lessons.ts'), fileContent, 'utf8');
console.log('src/data/lessons.ts généré avec succès avec 12 univers et 10 niveaux chacun !');
