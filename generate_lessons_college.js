const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/lessons.ts');
let fileContent = fs.readFileSync(filePath, 'utf8');

// ============================================================================
// NEW DETAILED COLLEGE CURRICULUM ("9-12") - 3 lessons, 5 rich cards, 10 questions per lesson
// ============================================================================

const animals_9_12 = `[
        {
          id: "animal-adaptations",
          title: "Les super-pouvoirs des animaux",
          emoji: "⚡",
          themeColor: "amber",
          badgeId: "adaptation-scientist",
          badgeName: "Généticien Évolutif",
          badgeEmoji: "🧬",
          cards: [
            {
              title: "La sélection naturelle",
              text: "La sélection naturelle est le moteur principal de l'évolution des espèces, théorisée par Charles Darwin. Les individus d'une espèce possèdent des variations génétiques aléatoires. \\n\\nSi une variation confère un avantage de survie dans un milieu donné (comme une fourrure plus blanche dans la neige ou des pattes plus rapides), les individus qui la possèdent survivent plus longtemps. Ils peuvent ainsi se reproduire davantage et transmettre cette mutation avantageuse à leurs descendants. Au fil des générations, cette adaptation se répand dans toute la population.",
              emoji: "🧬"
            },
            {
              title: "La communication chimique",
              text: "Les animaux utilisent une grande diversité de signaux chimiques invisibles pour interagir entre eux, appelés les **phéromones**. Ces substances sont sécrétées par des glandes spécialisées et captées par l'odorat ou des organes sensoriels complexes.\\n\\nChez les insectes sociaux comme les fourmis, les phéromones servent à tracer des pistes vers de la nourriture ou à sonner l'alarme en cas d'attaque. Chez les mammifères, elles permettent de marquer son territoire, d'identifier les membres d'un groupe ou d'attirer un partenaire reproducteur à des distances parfois impressionnantes.",
              emoji: "🧪"
            },
            {
              title: "Thermorégulation et métabolisme",
              text: "La thermorégulation est la capacité d'un organisme à maintenir sa température interne dans des limites compatibles avec la vie, malgré les variations externes. On distingue deux grandes stratégies : l'**endothermie** et l'**ectothermie**.\\n\\nLes animaux endothermes (mammifères, oiseaux) produisent leur propre chaleur en brûlant des calories (métabolisme élevé) et régulent leur température via la transpiration ou le haltènement. Les animaux ectothermes (reptiles, amphibiens, poissons) dépendent de sources externes ; ils doivent modifier leur comportement, en s'exposant au soleil ou en s'abritant à l'ombre, pour ajuster leur température.",
              emoji: "🦎"
            },
            {
              title: "La bioluminescence abyssale",
              text: "Dans les profondeurs océaniques, au-delà de 1000 mètres (la zone aphotique où la lumière solaire ne pénètre jamais), la majorité des créatures ont développé le pouvoir de produire de la lumière. Ce phénomène s'appelle la **bioluminescence**.\\n\\nIl s'agit d'une réaction chimique précise au sein des cellules de l'animal : une molécule appelée **luciférine** est oxydée en présence d'oxygène grâce à une enzyme appelée **luciférase**. Cette lumière froide (qui ne produit pas de chaleur) sert à attirer des proies (comme le leurre de la baudroie abyssale), à communiquer avec ses semblables, ou à effrayer et aveugler les prédateurs.",
              emoji: "💡"
            },
            {
              title: "La cryptobiose extrême",
              text: "Certaines espèces animales microscopiques, comme les tardigrades ou les rotifères, ont la capacité d'entrer dans un état de mort apparente appelé la **cryptobiose**. Lorsqu'ils font face à des conditions mortelles (sécheresse extrême, froid absolu, radiations intenses), ils évacuent presque toute l'eau de leurs cellules et stoppent leur métabolisme.\\n\\nPour protéger leurs structures cellulaires, ils remplacent l'eau par des sucres protecteurs vitreux. Dans cet état de stase totale, ils peuvent survivre dans le vide spatial, résister à des températures proches du zéro absolu (-272°C) et se réveiller en quelques heures dès que de l'eau liquide réapparaît.",
              emoji: "🔬"
            }
          ],
          quiz: [
            {
              question: "Quel mécanisme décrit la survie et la reproduction préférentielle des individus les mieux adaptés ?",
              options: ["La photosynthèse 🌿", "La sélection naturelle 🧬", "La dérive magnétique 🧲"],
              correctAnswer: "La sélection naturelle 🧬"
            },
            {
              question: "Comment appelle-t-on les substances chimiques utilisées pour communiquer au sein d'une espèce ?",
              options: ["Les hormones 🧪", "Les phéromones 🧪", "Les vitamines 💊"],
              correctAnswer: "Les phéromones 🧪"
            },
            {
              question: "Quelle stratégie thermique caractérise un animal qui produit sa propre chaleur par son métabolisme ?",
              options: ["L'ectothermie 🦎", "L'endothermie 🐕", "L'isothermie 🌡️"],
              correctAnswer: "L'endothermie 🐕"
            },
            {
              question: "Quelle enzyme catalyse la réaction chimique produisant de la lumière chez les animaux abyssaux ?",
              options: ["La luciférase 💡", "L'amylase 🧬", "La pepsine 🔬"],
              correctAnswer: "La luciférase 💡"
            },
            {
              question: "Quel état permet aux tardigrades de survivre sans eau et sans métabolisme actif ?",
              options: ["L'hibernation 🐻", "La photosynthèse 🍃", "La cryptobiose 🔬"],
              correctAnswer: "La cryptobiose 🔬"
            },
            {
              question: "Qui a formulé les fondements théoriques de l'évolution par la sélection naturelle ?",
              options: ["Isaac Newton 🍎", "Albert Einstein 🌌", "Charles Darwin 🧔"],
              correctAnswer: "Charles Darwin 🧔"
            },
            {
              question: "Comment une fourmi trace-t-elle une piste vers une source de nourriture ?",
              options: ["En criant fort 🔊", "En déposant des phéromones sur le sol 🧪", "En faisant des dessins 🗺️"],
              correctAnswer: "En déposant des phéromones sur le sol 🧪"
            },
            {
              question: "Qu'est-ce qu'un organisme ectotherme ?",
              options: ["Un animal dont la température dépend de son environnement 🦎", "Un animal qui ne respire pas 🚫", "Un animal vivant uniquement dans les abysses 🌊"],
              correctAnswer: "Un animal dont la température dépend de son environnement 🦎"
            },
            {
              question: "Quel sucre protecteur remplace l'eau dans les cellules des tardigrades en cryptobiose ?",
              options: ["Le glucose 🍬", "Le saccharose 🍯", "Le tréhalose 🧪"],
              correctAnswer: "Le tréhalose 🧪"
            },
            {
              question: "Pourquoi la lumière produite par bioluminescence est-elle qualifiée de 'froide' ?",
              options: ["Parce qu'elle est bleue 🔵", "Parce que sa réaction produit de la lumière avec très peu de perte de chaleur 💡", "Parce qu'elle gèle l'eau autour d'elle ❄️"],
              correctAnswer: "Parce que sa réaction produit de la lumière avec très peu de perte de chaleur 💡"
            }
          ]
        },
        {
          id: "animal-migration",
          title: "Les grands voyages migrateurs",
          emoji: "🪶",
          themeColor: "amber",
          badgeId: "migration-scientist",
          badgeName: "Navigateur Stellaire",
          badgeEmoji: "🧭",
          cards: [
            {
              title: "Déclencheurs de la migration",
              text: "La migration est un comportement périodique complexe déclenché par des facteurs physiologiques et environnementaux. Le principal facteur astronomique est le **photopériodisme** (la variation de la durée du jour et de la nuit au fil des saisons).\\n\\nLorsque les jours raccourcissent à l'automne, la glande pinéale des oiseaux perçoit ce changement lumineux. Cela provoque une décharge d'hormones qui induit l'**hyperphagie** : les migrateurs mangent de grandes quantités de nourriture pour accumuler de la graisse sous-cutanée, qui servira de carburant pour leurs milliers de kilomètres de vol.",
              emoji: "☀️"
            },
            {
              title: "Orientation astronomique",
              text: "Pour s'orienter sur d'immenses distances, les animaux utilisent de véritables systèmes de navigation céleste. Les oiseaux migrateurs diurnes s'appuient sur la position du Soleil et compensent sa course à l'aide de leur horloge biologique interne.\\n\\nLes migrateurs nocturnes, quant à eux, s'orientent grâce aux étoiles. Des études ont montré qu'ils mémorisent la carte du ciel et se repèrent grâce au centre de rotation des constellations, situé près de l'Étoile Polaire dans l'hémisphère Nord.",
              emoji: "⭐️"
            },
            {
              title: "La magnétoréception",
              text: "Un outil de navigation encore plus mystérieux est la **magnétoréception**, la capacité à percevoir le champ magnétique de la Terre. Chez les oiseaux migrateurs, cela implique une protéine de la rétine sensible à la lumière bleue, appelée **cryptochrome**.\\n\\nL'activation du cryptochrome par la lumière engendre des réactions chimiques quantiques qui permettent aux oiseaux de 'visualiser' les lignes de force magnétiques de la Terre. C'est comme s'ils avaient une boussole projetée en permanence dans leur champ visuel, leur permettant de s'orienter par temps couvert.",
              emoji: "🧲"
            },
            {
              title: "Le métabolisme extrême",
              text: "Le voyage migratoire exige des performances physiques et métaboliques hors du commun. La Barge rousse (un oiseau limicole) détient le record du plus long trajet continu enregistré sans escale.\\n\\nElle effectue un vol transocéanique de 11 jours complets depuis l'Alaska jusqu'à la Nouvelle-Zélande, soit environ 12 000 kilomètres d'affilée au-dessus du Pacifique. Pour réaliser cet exploit, son corps consomme ses réserves de graisse avec une efficacité inégalée et réduit temporairement la taille de ses organes non essentiels pour s'alléger.",
              emoji: "🐦"
            },
            {
              title: "Obstacles et menaces humaines",
              text: "Les routes migratoires sont aujourd'hui gravement menacées par les activités humaines. La destruction des zones humides (marais, estuaires) prive les oiseaux de haltes migratoires indispensables pour s'alimenter.\\n\\nDe plus, la **pollution lumineuse** des grandes villes perturbe l'orientation des oiseaux migrateurs nocturnes. Attirés par la lumière artificielle des gratte-ciels, ils s'épuisent en tournant autour ou meurent lors de collisions. Enfin, le réchauffement climatique décale le cycle d'éclosion des insectes, privant les oisillons de nourriture à leur arrivée.",
              emoji: "🏙"
            }
          ],
          quiz: [
            {
              question: "Quel mécanisme lié à la lumière du jour déclenche le comportement migratoire ?",
              options: ["La bioluminescence 💡", "Le photopériodisme ☀️", "La photosynthèse 🍃"],
              correctAnswer: "Le photopériodisme ☀️"
            },
            {
              question: "Comment appelle-t-on le besoin frénétique de s'alimenter avant la migration ?",
              options: ["L'hyperphagie 🍎", "La cryptobiose 🔬", "La thermorégulation 🦎"],
              correctAnswer: "L'hyperphagie 🍎"
            },
            {
              question: "Sur quelle étoile fixe les migrateurs nocturnes s'appuient-ils pour s'orienter ?",
              options: ["Le Soleil ☀️", "L'Étoile Polaire ⭐️", "Sirius 🌌"],
              correctAnswer: "L'Étoile Polaire ⭐️"
            },
            {
              question: "Quelle protéine oculaire permet aux oiseaux de voir le champ magnétique terrestre ?",
              options: ["La chlorophylle 🌿", "L'hémoglobine 🩸", "Le cryptochrome 👁️🧲"],
              correctAnswer: "Le cryptochrome 👁️🧲"
            },
            {
              question: "Quel oiseau détient le record mondial du vol continu sans escale (12 000 km) ?",
              options: ["La Sterne arctique 🐦", "La Barge rousse 🐦", "Le faucon pèlerin 🦅"],
              correctAnswer: "La Barge rousse 🐦"
            },
            {
              question: "Quel organe sécrète les hormones responsables du métabolisme de migration ?",
              options: ["L'estomac 🥣", "La glande pinéale 🧠", "Les poumons 🫁"],
              correctAnswer: "La glande pinéale 🧠"
            },
            {
              question: "Comment la pollution lumineuse affecte-t-elle les migrateurs nocturnes ?",
              options: ["Elle les aide à voir les insectes 🐛", "Elle les désoriente et provoque des collisions avec les bâtiments 🏙️💡", "Elle augmente leur vitesse de vol ⚡"],
              correctAnswer: "Elle les désoriente et provoque des collisions avec les bâtiments 🏙️💡"
            },
            {
              question: "Pourquoi la conservation des zones humides est-elle cruciale pour les migrateurs ?",
              options: ["Pour qu'ils puissent se baigner 🛁", "Pour servir de haltes migratoires riches en nourriture 🌾", "Pour éviter qu'ils aient trop chaud ☀️"],
              correctAnswer: "Pour servir de haltes migratoires riches en nourriture 🌾"
            },
            {
              question: "De quel État à quel pays la Barge rousse migre-t-elle sans s'arrêter ?",
              options: ["Du Canada vers le Mexique 🦋", "De l'Alaska vers la Nouvelle-Zélande 🗺️", "De l'Afrique vers l'Europe 🇪🇺"],
              correctAnswer: "De l'Alaska vers la Nouvelle-Zélande 🗺️"
            },
            {
              question: "Comment le corps de la Barge rousse s'adapte-t-il physiquement pour son long voyage ?",
              options: ["Il fait pousser des plumes supplémentaires 🪶", "Il réduit temporairement la taille de ses organes non essentiels pour s'alléger 🐦", "Il stocke de l'eau dans ses os 🦴"],
              correctAnswer: "Il réduit temporairement la taille de ses organes non essentiels pour s'alléger 🐦"
            }
          ]
        },
        {
          id: "animal-classification",
          title: "La classification des espèces",
          emoji: "🦕",
          themeColor: "amber",
          badgeId: "taxonomist-expert",
          badgeName: "Taxonomiste Expert",
          badgeEmoji: "🦕",
          cards: [
            {
              title: "L'histoire de la classification",
              text: "Classer le vivant permet de comprendre l'immense diversité biologique de la Terre. Le scientifique suédois Carl von Linné a inventé au 18ème siècle le système de **nomenclature binominale**, toujours utilisé aujourd'hui.\\n\\nChaque espèce est identifiée par un nom en latin composé de deux mots : le premier désigne le genre (avec une majuscule) et le second désigne l'espèce (en minuscules). Par exemple, le lion est *Panthera leo* et le loup est *Canis lupus*. Ce système permet aux scientifiques du monde entier d'utiliser le même langage universel sans confusion.",
              emoji: "📜"
            },
            {
              title: "La classification phylogénétique",
              text: "Aujourd'hui, les scientifiques n'utilisent plus de simples ressemblances physiques superficielles pour classer les animaux. Ils utilisent la **phylogénie**, qui étudie les relations de parenté évolutive basées sur l'analyse de l'ADN et des fossiles.\\n\\nLes animaux sont regroupés dans des groupes appelés **clades**. Un clade comprend un ancêtre commun et tous ses descendants. Par exemple, les oiseaux font scientifiquement partie du clade des dinosaures, car ils partagent avec eux un ancêtre commun unique caractérisé par des structures osseuses bien précises.",
              emoji: "🧬"
            },
            {
              title: "Le règne animal et les vertébrés",
              text: "Le règne animal se divise en plusieurs grands groupes. Les **vertébrés** se caractérisent par la présence d'une colonne vertébrale protégeant leur système nerveux central. Ils représentent environ 5% des espèces animales.\\n\\nLes vertébrés se divisent en plusieurs classes bien connues : les mammifères (qui allaitent leurs petits et ont des poils), les oiseaux (qui ont des plumes et un bec), les reptiles (ectothermes à écailles soudées), les amphibiens (à peau nue respirante) et les poissons (dotés de nageoires et de branchies).",
              emoji: "🦁"
            },
            {
              title: "Les invertébrés et les arthropodes",
              text: "La grande majorité (95%) des animaux terrestres et marins sont des **invertébrés** (sans colonne vertébrale). Le groupe le plus vaste et le plus diversifié de tous est celui des **arthropodes**.\\n\\nLes arthropodes possèdent un squelette externe articulé (exosquelette en chitine) et des pattes articulées. Ils regroupent les insectes (6 pattes), les arachnides (8 pattes), les crustacés (souvent 10 pattes ou plus) et les myriapodes (mille-pattes). Les insectes comptent à eux seuls plus d'un million d'espèces décrites !",
              emoji: "🕷"
            },
            {
              title: "La notion d'espèce biologique",
              text: "Qu'est-ce qu'une espèce ? La définition biologique classique énonce que deux individus font partie de la même espèce s'ils peuvent se reproduire ensemble et donner naissance à une descendance viable et **fertile** (qui pourra elle-même avoir des petits).\\n\\nSi un cheval et un âne s'accouplent, ils donnent naissance à un mulet. Le mulet est viable mais stérile ; le cheval et l'âne sont donc bien deux espèces distinctes. Aujourd'hui, l'analyse génétique moderne permet de préciser ces limites en comparant les génomes des populations.",
              emoji: "🔍"
            }
          ],
          quiz: [
            {
              question: "Qui est le créateur de la nomenclature binominale en latin au 18ème siècle ?",
              options: ["Charles Darwin 🧔", "Carl von Linné 📜", "Gregor Mendel 🌱"],
              correctAnswer: "Carl von Linné 📜"
            },
            {
              question: "Quelle science étudie les relations de parenté évolutive entre les êtres vivants ?",
              options: ["La géologie 🪨", "La phylogénie 🧬", "La climatologie ☁️"],
              correctAnswer: "La phylogénie 🧬"
            },
            {
              question: "Quelle classe d'animaux caractérise la présence de poils et l'allaitement des petits ?",
              options: ["Les reptiles 🦎", "Les mammifères 🐾", "Les oiseaux 🦅"],
              correctAnswer: "Les mammifères 🐾"
            },
            {
              question: "Quelle est la proportion approximative d'invertébrés dans le règne animal ?",
              options: ["5% 🦈", "50% 🐸", "95% 🕷️"],
              correctAnswer: "95% 🕷️"
            },
            {
              question: "Quel critère principal définit deux individus comme faisant partie de la même espèce ?",
              options: ["Ils doivent se ressembler physiquement 🦌", "Ils doivent pouvoir concevoir des descendants viables et fertiles 👶", "Ils doivent habiter dans la même région 🗺️"],
              correctAnswer: "Ils doivent pouvoir concevoir des descendants viables et fertiles 👶"
            },
            {
              question: "Quel est le nom scientifique binomial écrit correctement pour désigner l'être humain ?",
              options: ["Homo Sapiens 🧔", "Homo sapiens 🧔", "homo Sapiens 🧔"],
              correctAnswer: "Homo sapiens 🧔"
            },
            {
              question: "De quel grand clade préhistorique les oiseaux sont-ils les descendants directs ?",
              options: ["Les mammouths 🦣", "Les dinosaures 🦖", "Les trilobites 🪱"],
              correctAnswer: "Les dinosaures 🦖"
            },
            {
              question: "Quel constituant chimique rigide compose l'exosquelette des arthropodes ?",
              options: ["Le calcium 🦴", "La chitine 🕷️", "La kératine 💇"],
              correctAnswer: "La chitine 🕷️"
            },
            {
              question: "Pourquoi le mulet (issu d'un âne et d'une jument) prouve-t-il que ses parents sont d'espèces distinctes ?",
              options: ["Parce qu'il est trop petit 🐴", "Parce qu'il est stérile 🚫👶", "Parce qu'il a de grandes oreilles 👂"],
              correctAnswer: "Parce qu'il est stérile 🚫👶"
            },
            {
              question: "Combien de pattes possède spécifiquement un arachnide (comme l'araignée) ?",
              options: ["6 pattes 🐜", "8 pattes 🕷️", "10 pattes 🦀"],
              correctAnswer: "8 pattes 🕷️"
            }
          ]
        }
      ]`;

const nature_9_12 = `[
        {
          id: "water-cycle",
          title: "Le grand voyage de l'eau",
          emoji: "💧",
          themeColor: "emerald",
          badgeId: "water-guardian",
          badgeName: "Climatologue Global",
          badgeEmoji: "🌍",
          cards: [
            {
              title: "Bilan hydrique de la Terre",
              text: "L'hydrosphère terrestre contient environ 1,4 milliard de kilomètres cubes d'eau. Cette quantité est constante, mais sa répartition est inégale : 97,5% est de l'eau salée stockée dans les océans.\\n\\nL'eau douce ne représente que 2,5% du total. Sur cette faible part, près de 70% est immobilisée sous forme de glace dans les calottes polaires (Antarctique, Groenland) et les glaciers de montagne. Le reste se trouve dans les nappes souterraines profondes, ne laissant que moins de 1% d'eau douce liquide de surface (lacs, fleuves) disponible pour le vivant.",
              emoji: "❄️"
            },
            {
              title: "L'évaporation et la sublimation",
              text: "L'eau rejoint l'atmosphère sous forme gazeuse par deux processus physiques majeurs alimentés par l'énergie thermique du Soleil.\\n\\nL'**évaporation** convertit l'eau liquide des océans et des cours d'eau en vapeur d'eau invisible. La **sublimation** est le passage direct de l'eau solide (neige ou glace) à l'état de vapeur, sans fondre en eau liquide. Ce phénomène est très actif sur les sommets glacés, où le vent est fort et l'air très sec.",
              emoji: "💨"
            },
            {
              title: "Nuages et coalescence",
              text: "En s'élevant, la vapeur d'eau se refroidit et se condense sur des poussières microscopiques (noyaux de condensation) pour former des gouttelettes d'eau liquide ou des cristaux de glace, constituant les nuages.\\n\\nCes microgouttelettes sont animées de mouvements turbulents et s'entrechoquent. En se heurtant, elles s'assemblent pour grossir : c'est le phénomène de **coalescence**. Lorsque la goutte d'eau atteint une taille critique d'environ 0,5 mm, son poids surpasse les courants d'air ascendants et elle tombe sous forme de pluie.",
              emoji: "🌧️"
            },
            {
              title: "Infiltration et aquifères",
              text: "Au sol, l'eau des précipitations s'écoule par ruissellement ou s'infiltre dans le sous-sol selon la porosité des roches. L'eau infiltrée descend par gravité jusqu'à rencontrer une couche imperméable.\\n\\nElle s'accumule alors pour saturer la roche et former un **aquifère**. La limite supérieure de cette zone saturée est la nappe phréatique. L'eau stockée dans les aquifères profonds progresse très lentement et peut y séjourner des milliers d'années (eau fossile) avant de jaillir sous forme de sources.",
              emoji: "💧"
            },
            {
              title: "Moteur thermodynamique",
              text: "Le cycle de l'eau est le principal moteur du climat de notre planète car il réalise d'immenses transferts de chaleur. L'évaporation de l'eau absorbe de l'énergie thermique (chaleur latente de vaporisation), ce qui refroidit la surface terrestre.\\n\\nCette énergie thermique est stockée dans la vapeur d'eau. Lorsque cette vapeur monte et se condense en nuage, elle libère cette chaleur latente dans la haute atmosphère. Ce transfert réchauffe l'air en altitude, génère des écarts de pression et alimente la circulation des vents mondiaux.",
              emoji: "☀️"
            }
          ],
          quiz: [
            {
              question: "Quel pourcentage approximatif de l'eau terrestre est salée ?",
              options: ["2,5% 💧", "50% 🌊", "97,5% 🌊"],
              correctAnswer: "97,5% 🌊"
            },
            {
              question: "Où se trouve la majorité de l'eau douce de notre planète ?",
              options: ["Dans les fleuves 🏞️", "Dans les nuages ☁️", "Dans les glaciers et calottes polaires ❄️"],
              correctAnswer: "Dans les glaciers et calottes polaires ❄️"
            },
            {
              question: "Quel terme décrit le passage direct de la glace ou neige à l'état de vapeur d'eau ?",
              options: ["La condensation ☁️", "La sublimation 💨", "La fusion 🫠"],
              correctAnswer: "La sublimation 💨"
            },
            {
              question: "Comment appelle-t-on la fusion de petites gouttelettes d'eau en gouttes plus grosses dans un nuage ?",
              options: ["L'infiltration 💧", "La coalescence 🌧️", "La sublimation 💨"],
              correctAnswer: "La coalescence 🌧️"
            },
            {
              question: "Qu'est-ce qu'une nappe phréatique ?",
              options: ["Le niveau supérieur d'une zone saturée en eau souterraine 💧", "Une rivière de lave sous la Terre 🌋", "Un grand nuage d'orage ⛈️"],
              correctAnswer: "Le niveau supérieur d'une zone saturée en eau souterraine 💧"
            },
            {
              question: "Quel est le moteur énergétique principal qui fait circuler l'eau dans son cycle ?",
              options: ["La force de gravité 🪐", "L'énergie thermique du Soleil ☀️", "La rotation de la Terre 🌍"],
              correctAnswer: "L'énergie thermique du Soleil ☀️"
            },
            {
              question: "Quelle forme de transfert de chaleur refroidit la surface de la Terre lors de l'évaporation ?",
              options: ["La chaleur latente de vaporisation ☀️", "La conduction thermique 🌡️", "Le rayonnement ultraviolet ⚡"],
              correctAnswer: "La chaleur latente de vaporisation ☀️"
            },
            {
              question: "Que se passe-t-il lorsque la vapeur d'eau se condense pour former un nuage ?",
              options: ["Elle absorbe du froid 🥶", "Elle libère sa chaleur latente dans l'atmosphère ☁️🔥", "Elle détruit le CO2 🍃"],
              correctAnswer: "Elle libère sa chaleur latente dans l'atmosphère ☁️🔥"
            },
            {
              question: "Comment appelle-t-on l'eau stockée depuis des millénaires dans des aquifères profonds ?",
              options: ["L'eau de ruissellement 🌊", "L'eau fossile 💧", "L'eau de condensation ☁️"],
              correctAnswer: "L'eau fossile 💧"
            },
            {
              question: "Quelle taille critique minimale une goutte de pluie doit-elle atteindre pour vaincre les courants d'air ?",
              options: ["0,01 mm 🔍", "0,5 mm 🌧️", "5 mm 🌧️"],
              correctAnswer: "0,5 mm 🌧️"
            }
          ]
        },
        {
          id: "photosynthesis-deep",
          title: "Le secret de la photosynthèse",
          emoji: "🍃",
          themeColor: "emerald",
          badgeId: "botanist-genius",
          badgeName: "Biochimiste Végétal",
          badgeEmoji: "🧪",
          cards: [
            {
              title: "Les Chloroplastes et la lumière",
              text: "La photosynthèse est le processus par lequel les végétaux fabriquent de l'énergie organique. Elle a lieu dans des organites cellulaires appelés **chloroplastes**, concentrés dans les cellules des feuilles.\\n\\nCes organites contiennent de la **chlorophylle**, un pigment vert spécialisé. La chlorophylle absorbe l'énergie lumineuse des photons du soleil (principalement les ondes rouges et bleues) et réfléchit la lumière verte, ce qui donne leur couleur aux plantes. Cette énergie est utilisée lors de la phase photochimique pour dissocier l'eau ($H_2O$) absorbée par les racines.",
              emoji: "🧪"
            },
            {
              title: "La phase biochimique (Calvin)",
              text: "La photosynthèse comporte deux étapes distinctes. La première dépend directement de la lumière (phase claire). La seconde, appelée le **cycle de Calvin** (phase sombre), n'a pas besoin de lumière directe.\\n\\nDans cette phase, les cellules végétales utilisent l'énergie chimique accumulée (sous forme de molécules d'ATP et de NADPH) pour fixer le carbone du dioxyde de carbone ($CO_2$) atmosphérique. Par une suite complexe de réactions enzymatiques, le carbone minéral est transformé en sucre simple, le glucose ($C_6H_{12}O_6$), nourriture de base de la plante.",
              emoji: "🔄"
            },
            {
              title: "Les canaux de la Sève",
              text: "La plante doit acheminer les matières premières et distribuer les nutriments via deux réseaux de vaisseaux conducteurs indépendants : le **xylème** et le **phloème**.\\n\\nLe xylème transporte la sève brute (eau et sels minéraux puisés du sol) des racines jusqu'aux feuilles. Ce mouvement ascendant fonctionne grâce à l'aspiration créée par l'évaporation de l'eau au niveau des feuilles (tension-cohésion). Le phloème, lui, transporte la sève élaborée (chargée des sucres issus de la photosynthèse) pour alimenter toutes les cellules de la plante, des bourgeons jusqu'aux racines.",
              emoji: "🪵"
            },
            {
              title: "Les Stomates régulateurs",
              text: "Les feuilles doivent respirer pour absorber le $CO_2$ nécessaire à la photosynthèse. Pour cela, elles possèdent sur leur face inférieure des milliers d'orifices microscopiques appelés **stomates**.\\n\\nChaque stomate est encadré par deux cellules de garde. Lorsque la plante est bien hydratée, ces cellules gonflent et ouvrent le pore. En cas de sécheresse, les cellules se dégonflent et referment hermétiquement le stomate pour stopper la perte d'eau par transpiration. Cependant, cette fermeture bloque l'entrée du $CO_2$ et arrête temporairement la photosynthèse.",
              emoji: "🔍"
            },
            {
              title: "Importance globale de la photosynthèse",
              text: "La photosynthèse est à la base de la quasi-totalité de la vie sur Terre. Les plantes, les algues et le phytoplancton sont des producteurs primaires qui fabriquent de la matière organique à partir d'énergie solaire.\\n\\nEn absorbant le $CO_2$ et en libérant du dioxygène ($O_2$), ce mécanisme régule l'effet de serre et le climat de notre planète. Le phytoplancton marin produit à lui seul plus de 50% de l'oxygène de notre atmosphère, faisant des océans le véritable premier poumon de la Terre.",
              emoji: "🌍"
            }
          ],
          quiz: [
            {
              question: "Dans quels organites de la cellule végétale se produit la photosynthèse ?",
              options: ["Les noyaux 🧬", "Les mitochondries 🔋", "Les chloroplastes 🍃"],
              correctAnswer: "Les chloroplastes 🍃"
            },
            {
              question: "Quelles longueurs d'onde de la lumière la chlorophylle absorbe-t-elle principalement ?",
              options: ["La lumière verte 🟢", "Les lumières rouge et bleue 🔴🔵", "La lumière jaune 🟡"],
              correctAnswer: "Les lumières rouge et bleue 🔴🔵"
            },
            {
              question: "Comment appelle-t-on la phase sombre de fixation du CO2 qui produit le glucose ?",
              options: ["La glycolyse 🧪", "Le cycle de Calvin 🔄", "Le cycle de Krebs 🔄"],
              correctAnswer: "Le cycle de Calvin 🔄"
            },
            {
              question: "Quel canal conduit la sève brute minérale des racines vers le haut de la plante ?",
              options: ["Le phloème 🪵", "Le xylème 🪵", "Le stomate 🔍"],
              correctAnswer: "Le xylème 🪵"
            },
            {
              question: "Quel pore microscopique régule les échanges gazeux et la transpiration des feuilles ?",
              options: ["Le stomate 🔍", "Le chloroplaste 🍃", "La racine 🎋"],
              correctAnswer: "Le stomate 🔍"
            },
            {
              question: "Quelle sève transporte les sucres organiques synthétisés vers le reste de la plante ?",
              options: ["La sève brute 🪵", "La sève élaborée 🪵", "La sève minérale 🍯"],
              correctAnswer: "La sève élaborée 🪵"
            },
            {
              question: "Que se passe-t-il pour la photosynthèse si la plante ferme ses stomates pendant une sécheresse ?",
              options: ["Elle s'accélère ⚡", "Elle s'arrête car le CO2 ne peut plus entrer 🚫💨", "Elle produit plus d'oxygène 💨"],
              correctAnswer: "Elle s'arrête car le CO2 ne peut plus entrer 🚫💨"
            },
            {
              question: "Quelle formule chimique modélise le glucose fabriqué par la plante ?",
              options: ["H2O 💧", "CO2 🧪", "C6H12O6 🍬"],
              correctAnswer: "C6H12O6 🍬"
            },
            {
              question: "Quelle proportion de l'oxygène de notre atmosphère est produite par le phytoplancton marin ?",
              options: ["Plus de 50% 🌊💨", "Environ 5% 💨", "100% 🚫"],
              correctAnswer: "Plus de 50% 🌊💨"
            },
            {
              question: "Par quel phénomène physique l'eau est-elle aspirée vers le haut à travers le xylème ?",
              options: ["La poussée cardiaque 🩸", "La tension-cohésion par évaporation foliaire 🍃", "La gravité inversée 🪐"],
              correctAnswer: "La tension-cohésion par évaporation foliaire 🍃"
            }
          ]
        },
        {
          id: "ecosystems-mountains",
          title: "Les écosystèmes montagnards",
          emoji: "⛰️",
          themeColor: "emerald",
          badgeId: "mountaineer-ecologist",
          badgeName: "Écologue Alpin",
          badgeEmoji: "⛰️",
          cards: [
            {
              title: "Les étages de végétation",
              text: "En montagne, le climat change rapidement avec l'altitude. La température baisse d'environ 0,6°C tous les 100 mètres. Les plantes et les arbres se répartissent donc selon des zones précises appelées **étages de végétation**.\\n\\nOn commence par l'étage collinéen (feuillus), puis l'étage montagnard (forêt de sapins et hêtres), suivi de l'étage subalpin (conifères résistants comme les mélèzes). Plus haut, l'étage alpin laisse place aux pelouses alpines rases et aux buissons. Enfin, l'étage nival est le domaine de la roche nue, des neiges éternelles et des lichens.",
              emoji: "🌲"
            },
            {
              title: "L'adaptation des plantes alpines",
              text: "Les plantes de haute altitude subissent des conditions extrêmes : gel hivernal, vents violents, rayonnement solaire intense (UV) et sécheresse physiologique. Elles ont développé des formes d'adaptation fascinantes.\\n\\nBeaucoup de fleurs alpines, comme le célèbre edelweiss, sont recouvertes d'un duvet de poils blancs qui réfléchit les UV et retient l'humidité. D'autres poussent sous forme de coussinets ras (comme la silène acaule) pour résister au vent et maintenir une température interne plus chaude de quelques degrés par rapport à l'air ambiant.",
              emoji: "🌸"
            },
            {
              title: "La faune et l'hypoxie",
              text: "Les animaux de montagne doivent s'adapter à la rudesse du relief et à la baisse de pression d'oxygène en altitude (hypoxie). Pour y faire face, le chamois ou le bouquetin possèdent un cœur volumineux et un sang très riche en globules rouges pour transporter l'oxygène efficacement.\\n\\nLeurs sabots ont également évolué : ils sont dotés d'une pince externe dure pour s'agripper à la roche et d'une semelle antidérapante souple au centre. Pour passer l'hiver, certains animaux comme la marmotte hibernent en abaissant leur température à 5°C, tandis que le lièvre variable change de pelage pour devenir blanc et se camoufler dans la neige.",
              emoji: "🐐"
            },
            {
              title: "L'érosion et la gélifraction",
              text: "Le relief montagnard est sculpté en permanence par des forces géologiques d'érosion. L'agent principal de cette érosion est l'eau sous l'effet des cycles de gel et de dégel. Ce mécanisme s'appelle la **gélifraction** (ou cryoclastie).\\n\\nL'eau de pluie s'infiltre dans les fissures des roches. Lorsqu'il gèle, l'eau se transforme en glace et augmente de volume d'environ 9%. Cette expansion exerce une pression colossale qui élargit la fissure. Au fil des cycles, la roche éclate et s'effondre en éboulis au pied des parois, formant des pentes caractéristiques.",
              emoji: "🪨"
            },
            {
              title: "Les glaciers et leur dynamique",
              text: "Les glaciers sont d'immenses masses de glace formées par l'accumulation et le tassement de la neige au fil des siècles. Sous l'effet de leur propre poids énorme, ils se comportent comme des fleuves de glace visqueux qui s'écoulent très lentement vers le bas.\\n\\nEn glissant, le glacier rabote le fond de la vallée. Il arrache des roches et façonne des vallées caractéristiques en forme de **U** (vallées glaciaires), contrairement aux rivières qui creusent des vallées en forme de **V**. Les débris rocheux transportés par le glacier s'accumulent sur les côtés et à l'avant pour former des collines de pierres appelées des **moraines**.",
              emoji: "❄️"
            }
          ],
          quiz: [
            {
              question: "De combien la température baisse-t-elle en moyenne tous les 100 mètres d'altitude ?",
              options: ["0,1°C 🌡️", "0,6°C 🌡️", "2°C 🌡️"],
              correctAnswer: "0,6°C 🌡️"
            },
            {
              question: "Quel étage de végétation correspond à la pelouse rase et aux fleurs d'altitude, sans arbres ?",
              options: ["L'étage montagnard 🌲", "L'étage subalpin 🌲", "L'étage alpin 🌸"],
              correctAnswer: "L'étage alpin 🌸"
            },
            {
              question: "Comment l'Edelweiss s'adapte-t-elle au rayonnement UV intense des sommets ?",
              options: ["Elle se cache sous les pierres 🪨", "Elle possède un duvet de poils blancs réfléchissant 🌸", "Elle fleurit uniquement la nuit 🌑"],
              correctAnswer: "Elle possède un duvet de poils blancs réfléchissant 🌸"
            },
            {
              question: "Quelle adaptation sanguine permet au chamois de courir en haute altitude malgré le manque d'oxygène ?",
              options: ["Un sang pauvre en eau 🧪", "Une grande quantité de globules rouges pour capter le peu d'oxygène 🐐🩸", "Des poumons rétractables 🫁"],
              correctAnswer: "Une grande quantité de globules rouges pour capter le peu d'oxygène 🐐🩸"
            },
            {
              question: "Comment s'appelle l'éclatement des roches provoqué par le gel de l'eau infiltrée ?",
              options: ["La gélifraction 🪨", "La subduction ⛰️", "L'accrétion 🪐"],
              correctAnswer: "La gélifraction 🪨"
            },
            {
              question: "De quel pourcentage le volume de l'eau augmente-t-il lorsqu'elle se transforme en glace ?",
              options: ["1% 💧", "9% 🧊", "50% 🧊"],
              correctAnswer: "9% 🧊"
            },
            {
              question: "Quelle est la forme caractéristique d'une vallée creusée par un glacier ?",
              options: ["Une vallée en forme de V ⛰️", "Une vallée en forme de U (auge) ⛰️", "Une plaine circulaire ⭕"],
              correctAnswer: "Une vallée en forme de U (auge) ⛰️"
            },
            {
              question: "Qu'est-ce qu'une moraine en géomorphologie glaciaire ?",
              options: ["Un lac d'eau de fonte glacé 🏞️", "Un empilement de débris rocheux transportés et déposés par un glacier 🪨", "Une crevasse très profonde 🕳️"],
              correctAnswer: "Un empilement de débris rocheux transportés et déposés par un glacier 🪨"
            },
            {
              question: "Quelle adaptation comportementale permet à la marmotte de survivre à l'hiver ?",
              options: ["Elle change de couleur 🐇", "Elle migre vers le sud 🐦", "Elle entre en hibernation en abaissant sa température interne 💤"],
              correctAnswer: "Elle entre en hibernation en abaissant sa température interne 💤"
            },
            {
              question: "Comment les sabots du bouquetin sont-ils adaptés à la roche glissante ?",
              options: ["Ils ont des griffes en métal 爪", "Ils ont une pince dure externe et une semelle centrale antidérapante souple 🐐", "Ils sont ronds et lisses ⭕"],
              correctAnswer: "Ils ont une pince dure externe et une semelle centrale antidérapante souple 🐐"
            }
          ]
        }
      ]`;

const body_9_12 = `[
        {
          id: "digestion-trip",
          title: "Le voyage des aliments",
          emoji: "🍎",
          themeColor: "rose",
          badgeId: "digestion-doctor",
          badgeName: "Enzymologiste Expert",
          badgeEmoji: "🔬",
          cards: [
            {
              title: "La digestion enzymatique",
              text: "La digestion est la transformation des aliments en nutriments assimilables par l'organisme. Ce processus chimique est accéléré par des protéines hautement spécialisées appelées **enzymes digestives**.\\n\\nChaque groupe d'aliments possède ses enzymes dédiées. Dans la salive, l'amylase commence à découper l'amidon (sucre complexe). Dans l'estomac, la pepsine s'active en milieu acide pour fragmenter les protéines en peptides. Enfin, dans l'intestin grêle, les lipases s'attaquent aux graisses avec l'aide des sels biliaires.",
              emoji: "🧬"
            },
            {
              title: "Le rôle clé du Duodénum",
              text: "Après avoir été broyés par l'estomac, les aliments forment une pâte très acide appelée le chyme. Ce chyme pénètre dans le **duodénum**, la première partie de l'intestin grêle.\\n\\nC'est à cet endroit que se déversent les sucs sécrétés par deux glandes majeures. Le pancréas libère du bicarbonate de sodium pour neutraliser l'acidité stomacale nocive, ainsi que de puissantes enzymes. Le foie y envoie la **bile** (stockée dans la vésicule biliaire) qui agit comme un détergent pour émulsionner les graisses et faciliter leur digestion.",
              emoji: "🧪"
            },
            {
              title: "L'absorption intestinale",
              text: "La majeure partie de l'absorption des nutriments s'effectue dans le jéjunum et l'iléon (les parties suivantes de l'intestin grêle). Pour maximiser cette absorption, la paroi intestinale présente une structure ultra-plissée.\\n\\nElle est recouverte de millions de replis microscopiques appelés **villosités intestinales**, elles-mêmes tapissées de micro-villosités. Ce plissement extrême déploie une surface totale de contact avec les aliments estimée à $200 m^2$ (l'équivalent d'un terrain de tennis), permettant aux nutriments de traverser la paroi cellulaire et d'entrer directement dans le sang.",
              emoji: "🔬"
            },
            {
              title: "Le filtrage hépatique",
              text: "Le sang qui quitte les intestins chargé de nutriments ne circule pas directement dans le reste du corps. Il est acheminé en priorité vers le **foie** par un vaisseau sanguin spécial, la veine porte hépatique.\\n\\nLe foie agit comme l'usine chimique du corps : il filtre et détruit les substances toxiques, stocke le glucose excédentaire sous forme de **glycogène** (réserve d'énergie rapidement disponible), et synthétise des protéines essentielles comme celles nécessaires à la coagulation du sang.",
              emoji: "🩸"
            },
            {
              title: "Le microbiote du côlon",
              text: "Les matières non digérées (comme les fibres végétales) arrivent dans le gros intestin (côlon). Ce dernier abrite des milliards de micro-organismes formant le **microbiote intestinal**.\\n\\nCes bactéries vivent en symbiose avec notre corps. Elles fermentent les fibres que nous ne pouvons pas digérer, produisant des acides gras bénéfiques pour nos cellules. Elles synthétisent également des vitamines vitales (comme la vitamine K et la vitamine B12) et empêchent l'installation de bactéries pathogènes causant des maladies.",
              emoji: "🦠"
            }
          ],
          quiz: [
            {
              question: "Quel type de molécule biologique accélère la décomposition chimique de notre nourriture ?",
              options: ["Les vitamines 💊", "Les hormones 🧪", "Les enzymes 🧬"],
              correctAnswer: "Les enzymes 🧬"
            },
            {
              question: "Quelle enzyme salivaire commence la digestion de l'amidon dans la bouche ?",
              options: ["La pepsine 🧪", "L'amylase 🧬", "La lipase 🔬"],
              correctAnswer: "L'amylase 🧬"
            },
            {
              question: "Où se trouve le duodénum dans le système digestif ?",
              options: ["Au début de l'intestin grêle 🌀", "À l'entrée de l'estomac 🥣", "Dans le gros intestin 🦠"],
              correctAnswer: "Au début de l'intestin grêle 🌀"
            },
            {
              question: "Quel liquide produit par le foie émulsionne les graisses dans le duodénum ?",
              options: ["L'acide chlorhydrique 🧪", "La salive 👄", "La bile 🧪"],
              correctAnswer: "La bile 🧪"
            },
            {
              question: "Pourquoi l'intestin grêle est-il tapissé de millions de villosités microscopiques ?",
              options: ["Pour empêcher le passage des aliments 🚫", "Pour augmenter la surface d'absorption des nutriments 💪🔬", "Pour fabriquer des vitamines 💊"],
              correctAnswer: "Pour augmenter la surface d'absorption des nutriments 💪🔬"
            },
            {
              question: "Quel vaisseau sanguin conduit le sang chargé de nutriments des intestins au foie ?",
              options: ["L'artère aorte 🩸", "La veine porte hépatique 🩸", "La veine cave supérieure 🩸"],
              correctAnswer: "La veine porte hépatique 🩸"
            },
            {
              question: "Sous quelle forme chimique le glucose est-il stocké dans le foie ?",
              options: ["Le saccharose 🍬", "Le glycogène 🩸", "Les acides gras 🥩"],
              correctAnswer: "Le glycogène 🩸"
            },
            {
              question: "Qu'est-ce que le microbiote intestinal ?",
              options: ["Un ensemble de petits muscles digestifs 💪", "Des milliards de micro-organismes vivant en symbiose dans le côlon 🦠", "Un groupe d'hormones 🧪"],
              correctAnswer: "Des milliards de micro-organismes vivant en symbiose dans le côlon 🦠"
            },
            {
              question: "Quelle vitamine importante pour la coagulation sanguine est produite par notre microbiote ?",
              options: ["La vitamine C 🍋", "La vitamine K 🥦", "La vitamine D ☀️"],
              correctAnswer: "La vitamine K 🥦"
            },
            {
              question: "Quelle substance sécrétée par le pancréas neutralise l'acidité du chyme stomacal ?",
              options: ["Le bicarbonate de sodium 🧪", "L'insuline 🧪", "La bile 🧪"],
              correctAnswer: "Le bicarbonate de sodium 🧪"
            }
          ]
        },
        {
          id: "brain-computer",
          title: "Le cerveau coordinateur",
          emoji: "🧠",
          themeColor: "rose",
          badgeId: "neuro-explorer",
          badgeName: "Neuroscientifique Pro",
          badgeEmoji: "🧠",
          cards: [
            {
              title: "Le système nerveux central",
              text: "Le système nerveux central (SNC) est le centre d'intégration et de traitement de l'information du corps humain. Il est composé de l'encéphale (cerveau, cervelet, tronc cérébral), situé dans la boîte crânienne, et de la moelle épinière, logée dans la colonne vertébrale.\\n\\nLe SNC reçoit en permanence des signaux sensoriels provenant du système nerveux périphérique (le réseau de nerfs qui parcourt nos organes et nos membres). Il analyse ces données et renvoie des ordres moteurs ultra-rapides sous forme d'influx électriques.",
              emoji: "🧠"
            },
            {
              title: "Anatomie d'un neurone",
              text: "Le cerveau contient environ 86 milliards de cellules nerveuses appelées **neurones**. Un neurone est une cellule hautement spécialisée dans la conduction des signaux électriques.\\n\\nIl se compose d'un corps cellulaire (contenant le noyau), de prolongements courts et ramifiés appelés **dendrites** (qui reçoivent les messages des autres cellules), et d'un long filament appelé **axone**. Cet axone, qui conduit le message vers la cellule suivante, est enveloppé d'une gaine de graisse isolante, la **myéline**. Cette gaine accélère l'influx nerveux, le faisant voyager jusqu'à 120 mètres par seconde !",
              emoji: "⚡"
            },
            {
              title: "La transmission synaptique",
              text: "Les neurones ne se touchent pas directement. L'espace microscopique qui les sépare s'appelle la fente synaptique, et la zone de communication est la **synapse**.\\n\\nLorsque l'influx électrique atteint l'extrémité de l'axone, il déclenche la libération de molécules chimiques appelées **neurotransmetteurs** (tels que la dopamine, l'acétylcholine ou la sérotonine). Ces messagers traversent la fente synaptique et se fixent sur des récepteurs du neurone suivant, générant un nouveau signal électrique. Ce passage du signal électrique au chimique permet de réguler finement l'information.",
              emoji: "🔬"
            },
            {
              title: "Lobes et Aires cérébrales",
              text: "Le cortex cérébral (la couche superficielle grise et plissée du cerveau) est structuré en quatre grands lobes spécialisés dans des tâches précises.\\n\\nLe lobe frontal, situé à l'avant, gère la planification, la motricité volontaire et la parole. Le lobe occipital, à l'arrière, décode les informations visuelles captées par les yeux. Le lobe temporal, sur les côtés, gère l'audition, le langage et la mémoire. Enfin, le lobe pariétal analyse les sensations de l'espace et du toucher (somesthésie).",
              emoji: "🌗"
            },
            {
              title: "La plasticité cérébrale",
              text: "Pendant longtemps, on a pensé que le cerveau adulte ne pouvait plus changer. On sait aujourd'hui que notre cerveau est dynamique : c'est la **plasticité cérébrale**.\\n\\nChaque fois que nous apprenons une nouvelle compétence (jouer d'un instrument, parler une langue, résoudre un problème), notre cerveau réorganise ses circuits. De nouvelles synapses se créent, tandis que les connexions inutilisées s'affaiblissent et disparaissent. Cette flexibilité neurologique permet au cerveau de s'adapter et d'apprendre tout au long de notre vie.",
              emoji: "🧠"
            }
          ],
          quiz: [
            {
              question: "Quelles parties forment le Système Nerveux Central ?",
              options: ["Le cœur et les artères 🩸", "L'encéphale et la moelle épinière 🧠", "Les nerfs et les récepteurs sensoriels ⚡"],
              correctAnswer: "L'encéphale et la moelle épinière 🧠"
            },
            {
              question: "Quel prolongement ramifié du neurone reçoit les messages des autres cellules ?",
              options: ["L'axone ⚡", "La dendrite 🔬", "La gaine de myéline 🧠"],
              correctAnswer: "La dendrite 🔬"
            },
            {
              question: "Quelle gaine isolante accélère l'influx électrique le long de l'axone ?",
              options: ["La myéline ⚡", "La chitine 🕷️", "Le collagène 🦴"],
              correctAnswer: "La myéline ⚡"
            },
            {
              question: "Comment appelle-t-on l'espace microscopique de connexion entre deux neurones ?",
              options: ["La synapse 🔬", "Le neurone 🧠", "Le noyau 🧬"],
              correctAnswer: "La synapse 🔬"
            },
            {
              question: "Quelles molécules chimiques transmettent le signal d'un neurone à l'autre ?",
              options: ["Les enzymes 🧬", "Les neurotransmetteurs 🧪", "Les phéromones 🧪"],
              correctAnswer: "Les neurotransmetteurs 🧪"
            },
            {
              question: "Quel lobe du cortex cérébral est dédié au traitement de la vision ?",
              options: ["Le lobe frontal 🧠", "Le lobe temporal 👂", "Le lobe occipital 👀"],
              correctAnswer: "Le lobe occipital 👀"
            },
            {
              question: "Quelle zone du cerveau gère le raisonnement, la motricité et le contrôle des émotions ?",
              options: ["Le lobe frontal 🧠", "Le lobe occipital 👀", "La moelle épinière 🦴"],
              correctAnswer: "Le lobe frontal 🧠"
            },
            {
              question: "Qu'est-ce que la plasticité cérébrale ?",
              options: ["La déformation du crâne lors d'un choc 🦴", "La capacité du cerveau à remodeler ses connexions en fonction de l'apprentissage 🧠✨", "La fabrication de cellules artificielles 🔬"],
              correctAnswer: "La capacité du cerveau à remodeler ses connexions en fonction de l'apprentissage 🧠✨"
            },
            {
              question: "À quelle vitesse maximale l'influx électrique peut-il voyager le long d'un axone myélinisé ?",
              options: ["1 mètre par seconde 🚶‍♂️", "10 mètres par seconde 🏃‍♂️", "120 mètres par seconde ⚡"],
              correctAnswer: "120 mètres par seconde ⚡"
            },
            {
              question: "Quel neurotransmetteur célèbre est associé au circuit de la récompense et du plaisir ?",
              options: ["L'adrénaline 🧪", "La dopamine 🧪", "La mélatonine 💤"],
              correctAnswer: "La dopamine 🧪"
            }
          ]
        },
        {
          id: "circulatory-respiratory",
          title: "Le système cardio-respiratoire",
          emoji: "❤️",
          themeColor: "rose",
          badgeId: "cardiologist-expert",
          badgeName: "Cardiologue Junior",
          badgeEmoji: "❤️",
          cards: [
            {
              title: "La double circulation sanguine",
              text: "Le système cardiovasculaire assure le transport de l'oxygène, des nutriments et des déchets à travers le corps. Le cœur, un muscle creux appelé myocarde, fonctionne comme une double pompe.\\n\\nOn distingue deux circuits. La **petite circulation** (ou circulation pulmonaire) envoie le sang pauvre en oxygène du ventricule droit vers les poumons pour le recharger en dioxygène et rejeter le $CO_2$. La **grande circulation** (circulation systémique) propulse le sang oxygéné depuis le ventricule gauche vers tous les organes du corps via l'artère aorte.",
              emoji: "🩸"
            },
            {
              title: "Le cycle cardiaque",
              text: "Le cœur bat de manière autonome grâce à un tissu électrique interne (le nœud sinusal). Chaque battement comprend deux phases majeures : la **diastole** et la **systole**.\\n\\nPendant la diastole, le muscle cardiaque se relâche, permettant aux oreillettes et aux ventricules de se remplir de sang. Pendant la systole, le cœur se contracte puissamment : les oreillettes chassent d'abord le sang dans les ventricules, puis les ventricules se contractent pour éjecter le sang vers les artères pulmonaire et aorte. Des valves cardiaques anti-reflux s'ouvrent et se ferment hermétiquement, créant le bruit caractéristique des battements.",
              emoji: "❤️"
            },
            {
              title: "Artères, Veines et Capillaires",
              text: "Les vaisseaux sanguins forment un réseau fermé de trois types de conduits aux structures adaptées à leur fonction. Les **artères** transportent le sang sous haute pression quittant le cœur ; leurs parois sont épaisses et élastiques.\\n\\nLes **veines** ramènent le sang vers le cœur sous faible pression ; elles contiennent des valvules pour empêcher le sang de redescendre (notamment depuis les jambes). Les **capillaires** sont des vaisseaux microscopiques reliant artères et veines. Leurs parois, épaisses d'une seule cellule, permettent les échanges gazeux et nutritifs directs avec les tissus des organes.",
              emoji: "🔬"
            },
            {
              title: "La respiration et l'hématose",
              text: "L'appareil respiratoire fournit le dioxygène ($O_2$) au sang et élimine le dioxyde de carbone ($CO_2$). L'air inspiré passe par la trachée, les bronches et se ramifie en bronchioles jusqu'aux **alvéoles pulmonaires**.\\n\\nLes alvéoles sont de minuscules sacs d'air entourés de capillaires sanguins. C'est là que se produit l'**hématose** (l'échange de gaz). Par simple diffusion, l'oxygène de l'air alvéolaire traverse la membrane pour se fixer sur les globules rouges du sang, tandis que le $CO_2$ du sang passe dans l'alvéole pour être expiré.",
              emoji: "🫁"
            },
            {
              title: "La respiration cellulaire",
              text: "Pourquoi nos cellules ont-elles besoin d'oxygène ? Pour produire de l'énergie ! Au niveau microscopique, les cellules réalisent la **respiration cellulaire** dans des organites appelés **mitochondries**.\\n\\nLes mitochondries utilisent l'oxygène apporté par le sang pour brûler les nutriments (principalement le glucose). Cette réaction chimique produit de l'énergie utilisable par la cellule (ATP), tout en rejetant de l'eau ($H_2O$) et du dioxyde de carbone ($CO_2$) comme déchets. Ces déchets sont ensuite évacués par le sang veineux vers les poumons.",
              emoji: "🔋"
            }
          ],
          quiz: [
            {
              question: "Quelle partie du cœur propulse le sang oxygéné dans la grande circulation (artère aorte) ?",
              options: ["L'oreillette droite 🩸", "Le ventricule gauche ❤️", "Le ventricule droit 🩸"],
              correctAnswer: "Le ventricule gauche ❤️"
            },
            {
              question: "Comment appelle-t-il la phase de relâchement du cœur pendant laquelle il se remplit de sang ?",
              options: ["La systole ⚡", "La diastole 💤", "L'hématose 🫁"],
              correctAnswer: "La diastole 💤"
            },
            {
              question: "Quel vaisseau sanguin ramène le sang vers le cœur à faible pression ?",
              options: ["L'artère 🩸", "La veine 🩸", "Le capillaire 🔬"],
              correctAnswer: "La veine 🩸"
            },
            {
              question: "Où se déroulent précisément les échanges gazeux entre l'air inspiré et le sang ?",
              options: ["Dans la trachée 🌬️", "Dans les bronches 🌬️", "Dans les alvéoles pulmonaires 🫁"],
              correctAnswer: "Dans les alvéoles pulmonaires 🫁"
            },
            {
              question: "Dans quels organites des cellules s'effectue la respiration cellulaire productrice d'énergie ?",
              options: ["Les mitochondries 🔋", "Les chloroplastes 🍃", "Les synapses 🔬"],
              correctAnswer: "Les mitochondries 🔋"
            },
            {
              question: "Quel nom porte le muscle principal du cœur ?",
              options: ["Le biceps 💪", "Le myocarde ❤️", "Le diaphragme 🫁"],
              correctAnswer: "Le myocarde ❤️"
            },
            {
              question: "Quel rôle jouent les valvules présentes à l'intérieur des veines ?",
              options: ["Elles augmentent la pression du sang ⚡", "Elles forcent le sang à circuler dans un seul sens vers le cœur (anti-reflux) 🩸", "Elles filtrent les déchets 🦠"],
              correctAnswer: "Elles forcent le sang à circuler dans un seul sens vers le cœur (anti-reflux) 🩸"
            },
            {
              question: "Qu'est-ce que l'hématose ?",
              options: ["La fabrication de globules rouges par la moelle osseuse 🦴", "L'échange gazeux au niveau des alvéoles chargeant le sang en oxygène 🫁", "La contraction des ventricules ⚡"],
              correctAnswer: "L'échange gazeux au niveau des alvéoles chargeant le sang en oxygène 🫁"
            },
            {
              question: "Quel déchet gazeux est produit par la respiration cellulaire et éliminé par l'expiration ?",
              options: ["Le dioxygène (O2) 💨", "Le dioxyde de carbone (CO2) 🧪", "L'azote 💨"],
              correctAnswer: "Le dioxyde de carbone (CO2) 🧪"
            },
            {
              question: "Quelle artère majeure quitte le ventricule gauche pour distribuer le sang oxygéné aux organes ?",
              options: ["L'artère pulmonaire 🩸", "L'artère aorte 🩸", "La veine porte hépatique 🩸"],
              correctAnswer: "L'artère aorte 🩸"
            }
          ]
        }
      ]`;

const space_9_12 = `[
        {
          id: "solar-system",
          title: "Le Système Solaire",
          emoji: "🪐",
          themeColor: "indigo",
          badgeId: "space-commander",
          badgeName: "Astrophysicien Relativiste",
          badgeEmoji: "🌌",
          cards: [
            {
              title: "L'effondrement et l'accrétion",
              text: "Le Système Solaire s'est formé il y a 4,6 milliards d'années à partir du collapse gravitationnel d'un nuage de gaz et de poussière interstellaire. Au centre, la densité et la température ont permis au Soleil de s'allumer.\\n\\nAutour du jeune Soleil, la matière restante s'est aplatie en un disque protoplanétaire. Les grains de poussière se sont heurtés, formant des blocs rocheux de plus en plus gros par attraction gravitationnelle. Ce processus d'accumulation de matière est appelé l'**accrétion**. Les planètes rocheuses se sont formées près du Soleil chaud, tandis que les gaz plus volatils ont été repoussés plus loin, formant les géantes gazeuses.",
              emoji: "🪐"
            },
            {
              title: "La gravitation universelle de Newton",
              text: "Les mouvements des corps célestes sont dictés par la force gravitationnelle. Établie par Isaac Newton, la loi de la gravitation universelle énonce que deux masses s'attirent avec une force proportionnelle à leur masse et inversement proportionnelle au carré de leur distance ($F = G \\\\frac{m_1 m_2}{d^2}$).\\n\\nLe Soleil étant ultra-massif (il représente 99,8% de la masse de tout le système), il exerce une attraction colossale qui courbe la trajectoire des planètes. Cette force attractive est équilibrée par la vitesse orbitale des planètes (force centrifuge), maintenant le système dans un état d'équilibre stable.",
              emoji: "🧲"
            },
            {
              title: "La zone d'habitabilité planétaire",
              text: "Pour que la vie puisse émerger sur une planète, la présence d'eau liquide à sa surface est considérée comme indispensable. La région orbitale autour d'une étoile qui permet ces conditions s'appelle la **zone d'habitabilité**.\\n\\nDans cette zone, la chaleur reçue de l'étoile est modérée. Sur la Terre, l'eau reste liquide. Sur Vénus, située trop près du Soleil, la chaleur a provoqué l'évaporation de l'eau et un effet de serre extrême. Sur Mars, trop éloignée, l'eau est gelée sous forme de glace souterraine. L'épaisseur et la composition de l'atmosphère d'une planète jouent également un rôle clé pour maintenir cette température stable.",
              emoji: "🌊"
            },
            {
              title: "Les lois de Kepler",
              text: "Au 17ème siècle, Johannes Kepler a découvert les trois lois qui régissent l'orbite des planètes, corrigeant l'idée que les planètes tournaient en cercles parfaits. La première loi démontre que les planètes décrivent des trajectoires **elliptiques** (ovales) dont le Soleil occupe l'un des foyers.\\n\\nLa deuxième loi (loi des aires) stipule qu'une planète accélère lorsqu'elle s'approche du Soleil (périhélie) et ralentit lorsqu'elle s'en éloigne (aphélie). La troisième loi relie la période de révolution de la planète à sa distance moyenne du Soleil : plus une planète est lointaine, plus elle met de temps à accomplir son orbite.",
              emoji: "🌌"
            },
            {
              title: "Frontières glacées et comètes",
              text: "Le Système Solaire ne s'arrête pas aux planètes géantes. Au-delà de l'orbite de Neptune se trouve la ceinture de Kuiper, un disque d'astéroïdes glacés et de planètes naines comme Pluton.\\n\\nBeaucoup plus loin, aux limites extrêmes du champ gravitationnel du Soleil (entre 20 000 et 50 000 unités astronomiques), s'étend le **nuage d'Oort**. Cette structure sphérique géante abrite des milliards de petits corps glacés. Perturbés par des étoiles proches, ces blocs de glace s'effondrent parfois vers le Soleil, se vaporisant pour former des comètes dotées de magnifiques queues de gaz et de poussière.",
              emoji: "☄️"
            }
          ],
          quiz: [
            {
              question: "Comment nomme-t-on le processus d'agglomération gravitationnelle de matière ayant formé les planètes ?",
              options: ["La convection 🌀", "L'accrétion 🪐", "La subduction ⛰️"],
              correctAnswer: "L'accrétion 🪐"
            },
            {
              question: "Si on double la distance entre deux corps célestes, comment varie la force de gravité ?",
              options: ["Elle est divisée par deux 🌗", "Elle est divisée par quatre 🧲", "Elle reste identique 🤝"],
              correctAnswer: "Elle est divisée par quatre 🧲"
            },
            {
              question: "Quel élément chimique à l'état liquide définit la zone d'habitabilité d'un système ?",
              options: ["Le méthane 🧪", "L'eau 🌊", "Le dioxyde de carbone 💨"],
              correctAnswer: "L'eau 🌊"
            },
            {
              question: "Quelle est la forme réelle de l'orbite des planètes d'après la première loi de Kepler ?",
              options: ["Un cercle parfait ⭕", "Une ellipse (ovale) 🌌", "Une spirale infinie 🌀"],
              correctAnswer: "Une ellipse (ovale) 🌌"
            },
            {
              question: "Quelle structure sphérique lointaine est le réservoir principal des comètes à longue période ?",
              options: ["La ceinture d'astéroïdes ☄️", "La ceinture de Kuiper ☄️", "Le nuage d'Oort ☄️"],
              correctAnswer: "Le nuage d'Oort ☄️"
            },
            {
              question: "Quel pourcentage approximatif de la masse du Système Solaire le Soleil représente-t-il ?",
              options: ["50% 🌓", "99,8% ☀️", "10% 🌑"],
              correctAnswer: "99,8% ☀️"
            },
            {
              question: "Qui a formulé la loi de la gravitation universelle ?",
              options: ["Isaac Newton 🍎", "Albert Einstein 🧠", "Johannes Kepler 🌌"],
              correctAnswer: "Isaac Newton 🍎"
            },
            {
              question: "Comment s'appelle le point de l'orbite d'une planète le plus proche du Soleil ?",
              options: ["L'aphélie 🌌", "Le périhélie ☀️", "La singularité 🕳️"],
              correctAnswer: "Le périhélie ☀️"
            },
            {
              question: "Pourquoi l'atmosphère de Vénus empêche-t-elle la présence d'eau liquide ?",
              options: ["Parce qu'elle est absente 🚫", "Parce qu'elle génère un effet de serre extrême rendant le sol brûlant 🌡️", "Parce qu'elle gèle l'eau ❄️"],
              correctAnswer: "Parce qu'elle génère un effet de serre extrême rendant le sol brûlant 🌡️"
            },
            {
              question: "Quelle planète naine célèbre est située au sein de la ceinture de Kuiper ?",
              options: ["Cérès ☄️", "Pluton 🪐", "Mars 🔴"],
              correctAnswer: "Pluton 🪐"
            }
          ]
        },
        {
          id: "stars-lifecycle",
          title: "La vie des étoiles",
          emoji: "⭐",
          themeColor: "indigo",
          badgeId: "nebula-expert",
          badgeName: "Cosmologue Expert",
          badgeEmoji: "🕳️",
          cards: [
            {
              title: "La fusion nucléaire stellaire",
              text: "Une étoile est une gigantesque boule de plasma maintenue par sa propre gravité. Dans son cœur, règnent des pressions et des températures écrasantes (15 millions de degrés pour notre Soleil) qui déclenchent la **fusion nucléaire**.\\n\\nAu cours de cette réaction, quatre atomes d'hydrogène fusionnent pour former un atome d'hélium. La masse de l'atome d'hélium final étant légèrement inférieure à la somme des masses initiales, cette différence est convertie en une quantité gigantesque d'énergie pure (lumière et chaleur), d'après la célèbre formule d'Albert Einstein : $E=mc^2$.",
              emoji: "🔬"
            },
            {
              title: "L'équilibre hydrostatique",
              text: "Pourquoi les étoiles ne s'effondrent-elles pas sur elles-mêmes sous l'effet de leur propre gravité ? Elles sont maintenues stables grâce à l'**équilibre hydrostatique**.\\n\\nC'est la lutte constante entre deux forces opposées : la force gravitationnelle, qui tend à contracter et écraser l'étoile vers son centre, et la pression de radiation thermique engendrée par les réactions de fusion nucléaire internes, qui pousse la matière vers l'extérieur. Tant que le carburant nucléaire alimente le cœur, ces deux forces s'équilibrent et l'étoile brille de manière stable.",
              emoji: "⚖️"
            },
            {
              title: "Des géantes rouges aux naines blanches",
              text: "La fin de vie d'une étoile dépend de sa masse initiale. Les étoiles de masse moyenne comme notre Soleil brûlent leur hydrogène lentement sur environ 10 milliards d'années. À court d'hydrogène, le cœur se contracte tandis que les couches externes gonflent et se refroidissent : l'étoile devient une **géante rouge**.\\n\\nFinalement, le Soleil expulsera ses couches externes sous forme de nébuleuse planétaire. Son cœur restant, composé de carbone et d'oxygène ultra-tassés, se contractera pour former une **naine blanche**, une petite étoile de la taille de la Terre mais extrêmement dense, qui se refroidira lentement sur des milliards d'années.",
              emoji: "⚪"
            },
            {
              title: "Nucléosynthèse et Supernovas",
              text: "Les étoiles très massives (plus de 8 fois la masse du Soleil) consomment leur carburant à un rythme effréné. Elles fusionnent des éléments de plus en plus lourds : l'hélium en carbone, puis en oxygène, néon, silicium, jusqu'au fer. Ce processus est la **nucléosynthèse stellaire**.\\n\\nLa fusion du fer n'étant pas productrice d'énergie, la pression thermique s'arrête brusquement. En une fraction de seconde, la gravité l'emporte et l'étoile s'effondre sur elle-même avant de rebondir et d'exploser dans un éclat colossal : une **supernova**. Cette explosion projette dans l'espace les éléments chimiques lourds essentiels à la formation des planètes et de la vie.",
              emoji: "💥"
            },
            {
              title: "Les cadavres stellaires et Trous Noirs",
              text: "Après l'explosion d'une supernova, le cœur restant s'effondre de manière irréversible. Si sa masse finale est inférieure à 3 masses solaires, les neutrons s'écrasent pour former une **étoile à neutrons** (un astre de 20 km de diamètre si dense qu'une cuillère à café pèserait des milliards de tonnes).\\n\\nSi le cœur dépasse 3 masses solaires, la gravité écrase tout jusqu'à un point de densité infinie, une singularité. On obtient un **trou noir**. La gravité y est si forte que la vitesse requise pour s'en échapper (vitesse de libération) dépasse celle de la lumière. Rien, pas même les photons, ne peut franchir sa frontière appelée l'horizon des événements.",
              emoji: "🕳️"
            }
          ],
          quiz: [
            {
              question: "Quelle réaction physique produit la lumière et l'énergie des étoiles ?",
              options: ["La fission nucléaire ☢️", "La fusion nucléaire de l'hydrogène 🔬", "La combustion chimique 🔥"],
              correctAnswer: "La fusion nucléaire de l'hydrogène 🔬"
            },
            {
              question: "Quelle équation d'Einstein régit la conversion de masse en énergie stellaire ?",
              options: ["F = ma 🍎", "E = mc² 🔬", "PV = nRT 🌡️"],
              correctAnswer: "E = mc² 🔬"
            },
            {
              question: "Quel équilibre oppose la gravité interne à la pression de radiation thermique d'une étoile ?",
              options: ["L'équilibre thermique 🌡️", "L'équilibre hydrostatique ⚖️", "L'équilibre sismique 📈"],
              correctAnswer: "L'équilibre hydrostatique ⚖️"
            },
            {
              question: "Quel sera le stade d'évolution final de notre Soleil à la fin de sa vie ?",
              options: ["Une supernova 💥", "Un trou noir 🕳️", "Une naine blanche ⚪"],
              correctAnswer: "Une naine blanche ⚪"
            },
            {
              question: "Comment appelle-t-on la synthèse d'éléments lourds au cœur des étoiles ?",
              options: ["La photosynthèse 🍃", "La nucléosynthèse stellaire 🧪", "La sédimentation 🪨"],
              correctAnswer: "La nucléosynthèse stellaire 🧪"
            },
            {
              question: "Quelle explosion titanesque marque la mort d'une étoile massive ?",
              options: ["Une aurore boréale 🌌", "Une supernova 💥", "Une éruption solaire ☀️"],
              correctAnswer: "Une supernova 💥"
            },
            {
              question: "Quel astre ultra-dense se forme si le cœur d'une supernova fait moins de 3 masses solaires ?",
              options: ["Une naine blanche ⚪", "Une étoile à neutrons ⚡", "Un trou noir 🕳️"],
              correctAnswer: "Une étoile à neutrons ⚡"
            },
            {
              question: "Quelle frontière marque la limite de non-retour d'un Trou Noir ?",
              options: ["La fente synaptique 🔬", "L'horizon des événements 🕳️⚡", "La discontinuité du Moho 🥾"],
              correctAnswer: "L'horizon des événements 🕳️⚡"
            },
            {
              question: "Quel élément chimique marque l'arrêt des fusions nucléaires dans une étoile massive ?",
              options: ["Le carbone 🪨", "Le silicium 💎", "Le fer ⚙️"],
              correctAnswer: "Le fer ⚙️"
            },
            {
              question: "Pourquoi la lumière ne peut-elle pas s'échapper d'un Trou Noir ?",
              options: ["Parce qu'il est fermé à clé 🔑", "Parce que la vitesse de libération de sa gravité dépasse la vitesse de la lumière 🕳️⚡", "Parce qu'il y fait trop froid 🥶"],
              correctAnswer: "Parce que la vitesse de libération de sa gravité dépasse la vitesse de la lumière 🕳️⚡"
            }
          ]
        },
        {
          id: "space-exploration",
          title: "La conquête de l'espace",
          emoji: "🧑‍🚀",
          themeColor: "indigo",
          badgeId: "astronaut-badge",
          badgeName: "Commandant de Mission",
          badgeEmoji: "🧑‍🚀",
          cards: [
            {
              title: "La propulsion spatiale",
              text: "Pour s'arracher à l'attraction terrestre, les fusées doivent appliquer la troisième loi du mouvement d'Isaac Newton : l'action-réaction. La fusée éjecte des gaz chauds vers le bas à très haute vitesse, ce qui produit une force de poussée égale vers le haut.\\n\\nPour brûler leur carburant (le carburant) dans le vide de l'espace où il n'y a pas d'air, les fusées doivent emporter leur propre oxygène liquide (le comburant). Les moteurs consomment d'immenses mélanges d'hydrogène liquide et d'oxygène liquide, produisant de la vapeur d'eau inoffensive lors de la combustion.",
              emoji: "🚀"
            },
            {
              title: "La satellisation et vitesse de libération",
              text: "Comment un satellite reste-t-il en orbite autour de la Terre sans tomber ? C'est une question de vitesse. Newton l'imaginait comme un canon tirant un boulet si fort que la courbure de la chute du boulet correspond exactement à la courbure de la Terre.\\n\\nUn satellite est en fait en chute libre permanente autour de la Terre, mais sa vitesse orbitale (environ 28 000 km/h en orbite basse) l'empêche de toucher le sol. Pour échapper définitivement à la gravité de la Terre et voyager vers d'autres planètes, un vaisseau doit atteindre la **vitesse de libération**, qui est d'environ 40 300 km/h (11,2 km/s).",
              emoji: "🛰"
            },
            {
              title: "Les ondes électromagnétiques",
              text: "Dans le vide spatial, le son ne peut pas se propager car il a besoin de matière (air, eau) pour vibrer. Les astronautes et les sondes communiquent donc en utilisant des **ondes électromagnétiques** (ondes radio, micro-ondes) qui se déplacent dans le vide à la vitesse de la lumière (300 000 km/s).\\n\\nCes mêmes ondes permettent aux télescopes spatiaux (comme James Webb) d'observer l'Univers. En captant la lumière infrarouge émise par les premières galaxies il y a des milliards d'années, ces télescopes agissent comme de véritables machines à remonter le temps.",
              emoji: "📡"
            },
            {
              title: "Les stations spatiales et microgravité",
              text: "La Station Spatiale Internationale (ISS) orbite à 400 kilomètres d'altitude. À cette hauteur, la gravité terrestre est encore très forte (90% de celle au sol). Pourtant, les astronautes y flottent en état de **microgravité**.\\n\\nCela s'explique par le fait que l'ISS tombe en permanence autour de la Terre. Les astronautes tombant à la même vitesse que la station, ils n'ont aucune sensation de poids. Cette absence de pesanteur apparente permet de réaliser des expériences uniques, mais elle fatigue le corps humain, entraînant une perte de muscles et d'os que les astronautes combattent en faisant du sport.",
              emoji: "🧑‍🚀"
            },
            {
              title: "L'exploration lointaine et les sondes",
              text: "L'exploration humaine se limite pour l'instant à la Lune, située à 384 000 km. Pour explorer le reste du Système Solaire, nous envoyons des sondes robotiques automatiques.\\n\\nLes sondes Voyager, lancées en 1977, ont survolé Jupiter, Saturne, Uranus et Neptune. Elles ont désormais franchi l'héliopause, la limite d'influence du vent solaire, devenant les premiers objets fabriqués par l'Homme à entrer dans le milieu interstellaire. Elles transportent un disque d'or contenant des images et des sons de la Terre destinés à d'éventuelles civilisations extraterrestres.",
              emoji: "🗺"
            }
          ],
          quiz: [
            {
              question: "Quelle loi physique de Newton explique la poussée d'une fusée éjectant des gaz ?",
              options: ["La loi de la gravité 🍎", "La loi d'action-réaction 🚀", "Les lois de Kepler Ellipses 🌌"],
              correctAnswer: "La loi d'action-réaction 🚀"
            },
            {
              question: "Pourquoi une fusée emporte-t-elle de l'oxygène liquide (comburant) dans l'espace ?",
              options: ["Pour que les astronautes puissent boire 🥤", "Parce qu'il n'y a pas d'air dans le vide spatial pour brûler le carburant 🚫💨", "Pour refroidir les moteurs ❄️"],
              correctAnswer: "Parce qu'il n'y a pas d'air dans le vide spatial pour brûler le carburant 🚫💨"
            },
            {
              question: "Quelle vitesse un vaisseau doit-il atteindre pour échapper à la gravité de la Terre (vitesse de libération) ?",
              options: ["28 000 km/h 🛰️", "40 300 km/h (11,2 km/s) 🚀", "300 000 km/s ⚡"],
              correctAnswer: "40 300 km/h (11,2 km/s) 🚀"
            },
            {
              question: "Pourquoi le son ne peut-il pas se déplacer dans l'espace ?",
              options: ["Parce qu'il y fait trop froid 🥶", "Parce que le son a besoin d'un milieu matériel (gaz, liquide) pour vibrer et que l'espace est un vide 🚫💨", "Parce que les étoiles font trop de bruit 🔊"],
              correctAnswer: "Parce que le son a besoin d'un milieu matériel (gaz, liquide) pour vibrer et que l'espace est un vide 🚫💨"
            },
            {
              question: "Quel type d'ondes les sondes spatiales utilisent-elles pour communiquer ?",
              options: ["Des ondes sonores 🔊", "Des ondes électromagnétiques (radio) 📡", "Des impulsions laser vertes 🟢"],
              correctAnswer: "Des ondes électromagnétiques (radio) 📡"
            },
            {
              question: "Pourquoi les astronautes flottent-ils à bord de l'ISS ?",
              options: ["Parce qu'il n'y a pas de gravité à 400 km de haut 🚫", "Parce que la station et les astronautes sont en chute libre permanente autour de la Terre (microgravité) 🧑‍🚀", "Parce qu'ils portent des combinaisons spéciales 👕"],
              correctAnswer: "Parce que la station et les astronautes sont en chute libre permanente autour de la Terre (microgravité) 🧑‍🚀"
            },
            {
              question: "À quelle distance moyenne de la Terre se trouve la Lune ?",
              options: ["10 000 km 🚗", "384 000 km 🌕", "150 millions de km ☀️"],
              correctAnswer: "384 000 km 🌕"
            },
            {
              question: "Quelles sondes spatiales lancées en 1977 ont survolé les géantes gazeuses et quitté le Système Solaire ?",
              options: ["Apollo 🚀", "Voyager 🛰️", "James Webb 📡"],
              correctAnswer: "Voyager 🛰️"
            },
            {
              question: "Quel télescope spatial infrarouge ultra-moderne étudie les premières galaxies de l'Univers ?",
              options: ["Hubble 🔭", "James Webb 🔭", "Kepler 🪐"],
              correctAnswer: "James Webb 🔭"
            },
            {
              question: "Quel message les sondes Voyager transportent-elles à destination d'autres civilisations ?",
              options: ["Un livre d'histoire 📖", "Un disque d'or contenant des images et sons de la Terre 📀", "Une bouteille d'eau 🥤"],
              correctAnswer: "Un disque d'or contenant des images et sons de la Terre 📀"
            }
          ]
        }
      ]`;

const maths_9_12 = `[
        {
          id: "math-logic",
          title: "Logique et Suites",
          emoji: "🧠",
          themeColor: "orange",
          badgeId: "logic-champ",
          badgeName: "Mathématicien Théorique",
          badgeEmoji: "🔢",
          cards: [
            {
              title: "Suites arithmétiques",
              text: "Une suite arithmétique est une liste de nombres ordonnés où l'on passe d'un terme au suivant en ajoutant ou en soustrayant toujours la même constante, appelée la **raison** ($r$).\\n\\nLa formule générale pour trouver le terme $u_n$ à partir du premier terme $u_0$ est $u_n = u_0 + n \\\\times r$. Ces suites modélisent des croissances linéaires simples, comme le fait de remplir un réservoir d'eau à débit constant ou de calculer des économies hebdomadaires fixes.",
              emoji: "🔢"
            },
            {
              title: "Suites géométriques et exposants",
              text: "Dans une suite géométrique, la progression ne se fait pas par addition, mais par multiplication. On passe d'un terme au suivant en multipliant toujours par le même nombre constant, la raison ($q$).\\n\\nLa formule générale est $u_n = u_0 \\\\times q^n$. Ces suites décrivent des phénomènes de croissance exponentielle, comme la division cellulaire (les cellules doublent à chaque étape), les intérêts bancaires composés ou la propagation d'une épidémie.",
              emoji: "📈"
            },
            {
              title: "Fibonacci et la proportion divine",
              text: "La célèbre suite de Fibonacci débute par 0 et 1, puis chaque terme suivant est la somme des deux précédents : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...\\n\\nSi l'on divise un nombre de cette suite par le nombre qui le précède (ex. 55/34), on tend vers une valeur limite de 1,61803... Ce nombre irrationnel est le **nombre d'or** (noté $\\\\Phi$). On retrouve ce ratio dans les spirales des pommes de pin, la disposition des graines de tournesol et dans de nombreuses œuvres d'art pour son esthétique parfaite.",
              emoji: "📏"
            },
            {
              title: "Logique formelle et tables de vérité",
              text: "La logique mathématique manipule des propositions qui ne peuvent être que Vraies (1) ou Fausses (0). On utilise des opérateurs logiques comme le NON (inversion), le ET (conjonction) et le OU (disjonction).\\n\\nUne **table de vérité** est un tableau qui répertorie toutes les combinaisons possibles de vérité pour des propositions données. Par exemple, la proposition (A ET B) n'est vraie que si A et B sont vrais en même temps. Cet outil est la base de l'algèbre de Boole, utilisée pour concevoir les processeurs informatiques.",
              emoji: "🕵️‍♂️"
            },
            {
              title: "Ensembles et diagrammes de Venn",
              text: "La théorie des ensembles étudie les collections d'objets appelés éléments. On réalise deux opérations majeures : l'**union** ($\\\\cup$), qui regroupe tous les éléments de deux ensembles, et l'**intersection** ($\\\\cap$), qui ne conserve que les éléments communs aux deux.\\n\\nLes diagrammes de Venn permettent de visualiser ces relations en traçant des cercles qui se chevauchent. La zone de chevauchement représente graphiquement l'intersection ($\\\\cap$) des deux groupes.",
              emoji: "⭕"
            }
          ],
          quiz: [
            {
              question: "Quelle est la valeur du terme u3 d'une suite arithmétique avec u0 = 4 et raison r = 3 ?",
              options: ["10", "13 (termes: 4, 7, 10, 13) 🔢", "16"],
              correctAnswer: "13 (termes: 4, 7, 10, 13) 🔢"
            },
            {
              question: "Quelle formule modélise le terme général un d'une suite géométrique de raison q ?",
              options: ["un = u0 + n x q 🔢", "un = u0 x q^n 📈", "un = u0 - n x q 📉"],
              correctAnswer: "un = u0 x q^n 📈"
            },
            {
              question: "Quelle est la valeur numérique approximative du nombre d'or ?",
              options: ["3,1416 🥧", "1,618 📏", "2,718 📈"],
              correctAnswer: "1,618 📏"
            },
            {
              question: "En logique, que vaut la proposition (A ET B) si A est vrai et B est faux ?",
              options: ["Vrai 🟩", "Faux ❌", "Indéterminé 🤷"],
              correctAnswer: "Faux ❌"
            },
            {
              question: "Quel symbole mathématique représente la réunion (union) de tous les éléments de deux ensembles ?",
              options: ["Le symbole ∩ ⭕", "Le symbole ∪ ⭕", "Le symbole ∈ ✏️"],
              correctAnswer: "Le symbole ∪ ⭕"
            },
            {
              question: "Quels sont les deux premiers termes de la suite de Fibonacci ?",
              options: ["1 et 2 🔢", "0 et 1 🔢", "0 et 10 🔢"],
              correctAnswer: "0 et 1 🔢"
            },
            {
              question: "Comment appelle-t-on le tableau répertoriant les états de vérité logiques possibles ?",
              options: ["Un diagramme de Venn ⭕", "Une table de vérité 🕵️‍♂️", "Une équation différentielle 📉"],
              correctAnswer: "Une table de vérité 🕵️‍♂️"
            },
            {
              question: "Dans une suite géométrique de premier terme u0 = 2 et de raison q = 3, que vaut u2 ?",
              options: ["8 🔢", "18 (termes: 2, 6, 18) 📈", "12 🔢"],
              correctAnswer: "18 (termes: 2, 6, 18) 📈"
            },
            {
              question: "Dans un diagramme de Venn, que représente le chevauchement (l'intersection) ?",
              options: ["Les éléments appartenant à l'un ou à l'autre ⭕", "Les éléments appartenant aux deux ensembles en même temps (A ∩ B) ⭕", "Les éléments extérieurs 🚫"],
              correctAnswer: "Les éléments appartenant aux deux ensembles en même temps (A ∩ B) ⭕"
            },
            {
              question: "Quel opérateur logique inverse la valeur de vérité d'une proposition (transforme Vrai en Faux) ?",
              options: ["L'opérateur ET ➕", "L'opérateur NON ❌", "L'opérateur OU ⭕"],
              correctAnswer: "L'opérateur NON ❌"
            }
          ]
        },
        {
          id: "multiplication-intro",
          title: "La multiplication rapide",
          emoji: "✖️",
          themeColor: "orange",
          badgeId: "multiplication-wizard",
          badgeName: "Algébriste Expert",
          badgeEmoji: "📐",
          cards: [
            {
              title: "Propriétés commutatives et associatives",
              text: "La multiplication associe des facteurs pour calculer un produit. En algèbre, cette opération possède deux propriétés structurales importantes.\\n\\nElle est **commutative**, ce qui signifie que l'ordre des facteurs ne modifie pas le produit ($a \\\\times b = b \\\\times a$). Elle est également **associative**, ce qui autorise à regrouper les facteurs dans l'ordre de son choix sans changer le résultat final : $(a \\\\times b) \\\\times c = a \\\\times (b \\\\times c)$. Ces propriétés facilitent la simplification d'expressions complexes.",
              emoji: "🔢"
            },
            {
              title: "La Distributivité en calcul mental",
              text: "La multiplication est **distributive** par rapport à l'addition et à la soustraction : $a \\\\times (b + c) = ab + ac$. Cette loi permet de découper mentalement des multiplications complexes pour les résoudre facilement.\\n\\nPar exemple, pour calculer $17 \\\\times 101$, on distribue : $17 \\\\times (100 + 1) = (17 \\\\times 100) + (17 \\\\times 1) = 1700 + 17 = 1717$. De même, pour $15 \\\\times 98$, on peut faire $15 \\\\times (100 - 2) = 1500 - 30 = 1470$.",
              emoji: "⚡"
            },
            {
              title: "Identités remarquables",
              text: "Les identités remarquables sont des égalités algébriques fondamentales de niveau collège qui permettent de développer ou de factoriser des expressions rapidement.\\n\\nLa première formule est $(a + b)^2 = a^2 + 2ab + b^2$. La seconde est $(a - b)^2 = a^2 - 2ab + b^2$, et la troisième est $(a - b)(a + b) = a^2 - b^2$. Ces formules se démontrent géométriquement en calculant et découpant les surfaces de carrés et de rectangles.",
              emoji: "📐"
            },
            {
              title: "Factorisation en nombres premiers",
              text: "Le théorème fondamental de l'arithmétique énonce que tout nombre entier supérieur à 1 peut s'écrire de manière unique sous la forme d'un produit de nombres premiers.\\n\\nPar exemple, pour factoriser 120, on le divise par les plus petits nombres premiers successifs : $120 = 2 \\\\times 60 = 2 \\\\times 2 \\\\times 30 = 2 \\\\times 2 \\\\times 2 \\\\times 15 = 2^3 \\\\times 3 \\\\times 5$. Cette décomposition est indispensable pour simplifier des fractions ou trouver le plus grand commun diviseur (PGCD) de deux nombres.",
              emoji: "🧠"
            },
            {
              title: "Éléments neutres et absorbants",
              text: "En algèbre générale, certains nombres possèdent des rôles uniques lors de la multiplication au sein des ensembles de nombres.\\n\\nLe nombre **1** est l'élément neutre de la multiplication : multiplier n'importe quelle valeur par 1 ne modifie pas sa valeur ($x \\\\times 1 = x$). À l'inverse, le nombre **0** est l'élément absorbant : le produit de n'importe quel nombre par 0 est toujours égal à 0 ($x \\\\times 0 = 0$), annulant instantanément l'expression.",
              emoji: "🛑"
            }
          ],
          quiz: [
            {
              question: "Quelle propriété permet d'écrire indifféremment : 7 x 8 = 8 x 7 ?",
              options: ["La distributivité ⚡", "La commutativité 🔄", "L'associativité 🔢"],
              correctAnswer: "La commutativité 🔄"
            },
            {
              question: "Calculez mentalement 14 x 103 en utilisant la distributivité :",
              options: ["1430", "1442 (1400 + 42) ⚡", "1452"],
              correctAnswer: "1442 (1400 + 42) ⚡"
            },
            {
              question: "Développez l'expression algébrique : (x + 5)²",
              options: ["x² + 25 📐", "x² + 10x + 25 📐", "x² + 5x + 10 📐"],
              correctAnswer: "x² + 10x + 25 📐"
            },
            {
              question: "Quelle est la factorisation en nombres premiers de l'entier 90 ?",
              options: ["9 x 10 🔢", "2 x 3² x 5 🔢", "3 x 30 🔢"],
              correctAnswer: "2 x 3² x 5 🔢"
            },
            {
              question: "Quel rôle le nombre 0 joue-t-il pour la multiplication ?",
              options: ["L'élément neutre 🤝", "L'élément absorbant 🛑", "La variable commune 🔢"],
              correctAnswer: "L'élément absorbant 🛑"
            },
            {
              question: "Que donne le développement de l'identité remarquable : (a - b)(a + b) ?",
              options: ["a² + b² 📐", "a² - b² 📐", "a² - 2ab + b² 📐"],
              correctAnswer: "a² - b² 📐"
            },
            {
              question: "Quelle propriété de la multiplication justifie de pouvoir regrouper les facteurs d'un produit ?",
              options: ["La distributivité ⚡", "L'associativité 🔢", "La commutativité 🔄"],
              correctAnswer: "L'associativité 🔢"
            },
            {
              question: "Calculez rapidement 12 x 98 en utilisant la distributivité (12 x (100 - 2)) :",
              options: ["1176 ⚡", "1180", "1166"],
              correctAnswer: "1176 ⚡"
            },
            {
              question: "Lequel de ces nombres est un nombre premier ?",
              options: ["15 🔢", "21 🔢", "17 🔢"],
              correctAnswer: "17 🔢"
            },
            {
              question: "Pourquoi le nombre 1 est-il qualifié d'élément neutre ?",
              options: ["Parce qu'il détruit le calcul 🛑", "Parce qu'il ne change pas le résultat du nombre multiplié 🤝", "Parce qu'il est pair 🔢"],
              correctAnswer: "Parce qu'il ne change pas le résultat du nombre multiplié 🤝"
            }
          ]
        },
        {
          id: "geometry-theorems",
          title: "La géométrie de collège",
          emoji: "📐",
          themeColor: "orange",
          badgeId: "geometry-expert",
          badgeName: "Géomètre Pro",
          badgeEmoji: "📐",
          cards: [
            {
              title: "Le théorème de Pythagore",
              text: "Le théorème de Pythagore est une règle fondamentale s'appliquant uniquement aux triangles rectangles (possédant un angle droit à 90°).\\n\\nIl énonce que dans un triangle rectangle, le carré de la longueur de l'hypoténuse (le côté le plus long, opposé à l'angle droit) est égal à la somme des carrés des longueurs des deux autres côtés. On l'écrit sous la formule : $a^2 + b^2 = c^2$. Ce théorème est indispensable pour calculer des distances directes ou vérifier qu'un mur est parfaitement perpendiculaire.",
              emoji: "📐"
            },
            {
              title: "Le théorème de Thalès",
              text: "Le théorème de Thalès étudie les rapports de longueurs dans des configurations géométriques formées par des droites parallèles coupant deux sécantes.\\n\\nIl établit que des droites parallèles découpent des segments proportionnels. Dans un triangle $ADE$ où une droite $(BC)$ est parallèle à $(DE)$, on obtient l'égalité des rapports : $\\\\frac{AB}{AD} = \\\\frac{AC}{AE} = \\\\frac{BC}{DE}$. Ce théorème sert historiquement à mesurer des hauteurs inaccessibles, comme celle des pyramides à partir de leur ombre.",
              emoji: "📐"
            },
            {
              title: "Les droites remarquables du triangle",
              text: "Dans un triangle, on peut tracer quatre types de droites particulières dotées de propriétés géométriques remarquables.\\n\\nLes **médiatrices** (perpendiculaires au milieu des côtés) se croisent au centre du cercle circonscrit au triangle. Les **bissectrices** (qui coupent les angles en deux parts égales) se croisent au centre du cercle inscrit. Les **hauteurs** (perpendiculaires passant par le sommet opposé) se coupent à l'orthocentre. Enfin, les **médianes** (reliant un sommet au milieu du côté opposé) se croisent au centre de gravité du triangle.",
              emoji: "📐"
            },
            {
              title: "Calculs d'aires et de volumes",
              text: "La géométrie de collège formalise les formules de calcul des surfaces planes et des volumes des solides à trois dimensions.\\n\\nL'aire d'un triangle vaut $\\\\frac{Base \\\\times Hauteur}{2}$. L'aire d'un disque se calcule par la formule $\\\\pi \\\\times r^2$. Pour les solides, le volume d'un cylindre vaut $\\\\pi \\\\times r^2 \\\\times h$ (aire de la base fois hauteur), tandis que le volume d'un cône de révolution ou d'une pyramide équivaut à un tiers de ce volume : $\\\\frac{1}{3} \\\\times Base \\\\times Hauteur$.",
              emoji: "📏"
            },
            {
              title: "Les angles et la trigonométrie",
              text: "La trigonométrie étudie les relations entre les longueurs des côtés d'un triangle rectangle et les mesures de ses angles.\\n\\nOn définit trois rapports fondamentaux basés sur l'angle $\\\\alpha$ : le sinus (côté opposé divisé par hypoténuse), le cosinus (côté adjacent divisé par hypoténuse) et la tangente (côté opposé divisé par côté adjacent). Une astuce mnémotechnique classique pour retenir ces formules est le mot **SOH CAH TOA**.",
              emoji: "🧭"
            }
          ],
          quiz: [
            {
              question: "Dans un triangle rectangle dont les côtés adjacents mesurent 3 cm et 4 cm, que vaut l'hypoténuse ?",
              options: ["5 cm (3² + 4² = 9 + 16 = 25, √25 = 5) 📐", "7 cm", "6 cm"],
              correctAnswer: "5 cm (3² + 4² = 9 + 16 = 25, √25 = 5) 📐"
            },
            {
              question: "Quelle condition est indispensable pour pouvoir appliquer le théorème de Pythagore ?",
              options: ["Le triangle doit être équilatéral 📐", "Le triangle doit posséder un angle droit (rectangle) 📐", "Le triangle doit avoir des côtés égaux 📐"],
              correctAnswer: "Le triangle doit posséder un angle droit (rectangle) 📐"
            },
            {
              question: "Quel théorème géométrique traite des proportions de segments formés par des droites parallèles ?",
              options: ["Le théorème de Thalès 📐", "Le théorème de Pythagore 📐", "Le théorème de Venn ⭕"],
              correctAnswer: "Le théorème de Thalès 📐"
            },
            {
              question: "Où se croisent les trois médianes d'un triangle ?",
              options: ["À l'orthocentre 📐", "Au centre de gravité du triangle 📐", "Au centre du cercle inscrit ⭕"],
              correctAnswer: "Au centre de gravité du triangle 📐"
            },
            {
              question: "Quelle formule donne le volume d'un cône de révolution de base B et de hauteur h ?",
              options: ["Volume = B x h 📏", "Volume = 1/3 x B x h 📐", "Volume = B + h 📏"],
              correctAnswer: "Volume = 1/3 x B x h 📐"
            },
            {
              question: "Dans un triangle rectangle, quel rapport définit le cosinus d'un angle ?",
              options: ["Côté opposé / Hypoténuse 🧭", "Côté adjacent / Hypoténuse 🧭", "Côté opposé / Côté adjacent 🧭"],
              correctAnswer: "Côté adjacent / Hypoténuse 🧭"
            },
            {
              question: "Quelle est la formule de calcul de l'aire d'un disque de rayon r ?",
              options: ["2 x π x r 📏", "π x r² 📏", "π x r³ 📏"],
              correctAnswer: "π x r² 📏"
            },
            {
              question: "Quelle droite d'un triangle est perpendiculaire à un côté et passe par le milieu de celui-ci ?",
              options: ["La hauteur 📐", "La bissectrice 📐", "La médiatrice 📐"],
              correctAnswer: "La médiatrice 📐"
            },
            {
              question: "Quel mot mnémotechnique permet de retenir les formules du sinus, cosinus et tangente ?",
              options: ["SOH CAH TOA 🧭", "PYTHAGORE 📐", "ALGEBRE 🔢"],
              correctAnswer: "SOH CAH TOA 🧭"
            },
            {
              question: "Qui a mesuré pour la première fois la hauteur de la pyramide de Khéops grâce à son ombre ?",
              options: ["Pythagore 📐", "Thalès de Milet 📐", "Carl von Linné 📜"],
              correctAnswer: "Thalès de Milet 📐"
            }
          ]
        }
      ]`;

const geography_9_12 = `[
        {
          id: "continents-world",
          title: "Les 6 Continents",
          emoji: "🗺️",
          themeColor: "cyan",
          badgeId: "continents-badge",
          badgeName: "Tectonicien Pro",
          badgeEmoji: "🧩",
          cards: [
            {
              title: "Plaques et dérive continentale",
              text: "La surface de la Terre est découpée en une douzaine de morceaux de roches rigides appelés plaques tectoniques (ou lithosphériques). Ces plaques, épaisses de 100 km, flottent sur l'**asthénosphère**, une couche du manteau plus chaude et déformable.\\n\\nAnimées par les flux de chaleur provenant du noyau terrestre, ces plaques se déplacent de quelques centimètres par an. Elles s'écartent (dorsales océaniques) ou entrent en collision (zones de subduction et de collision). Ce mouvement perpétuel redessine les continents sur des millions d'années. Il y a 250 millions d'années, toutes les terres étaient ainsi réunies en un unique supercontinent : la Pangée.",
              emoji: "🧩"
            },
            {
              title: "L'Eurasie et l'Oural",
              text: "D'un point de vue purement géologique et physique, l'Europe et l'Asie ne forment qu'un seul et unique bloc terrestre continu : le supercontinent de l'**Eurasie**, installé sur la plaque eurasienne.\\n\\nLa séparation entre l'Europe et l'Asie est une limite culturelle et historique conventionnelle. Elle est traditionnellement matérialisée par la chaîne de montagnes de l'**Oural** et le fleuve Oural en Russie, s'étendant des rives de l'océan Arctique jusqu'à la mer Caspienne. Cette frontière artificielle sépare la Russie en une partie européenne occidentale et une partie sibérienne asiatique.",
              emoji: "⛰"
            },
            {
              title: "Le grand Rift africain",
              text: "L'Afrique n'est pas un bloc géologique inactif. À l'est du continent, une gigantesque faille tectonique de 6000 kilomètres s'étire et s'élargit : c'est le **Grand Rift est-africain**.\\n\\nSous l'effet des remontées de magma, la plaque africaine est en train de se diviser lentement en deux (la plaque somalienne et la plaque nubienne). Cette fracture majeure se manifeste par une forte activité volcanique (comme le Kilimandjaro) et la présence de lacs très profonds (lac Tanganyika, lac Malawi). Dans plusieurs millions d'années, l'océan s'y engouffrera, détachant la corne de l'Afrique du reste du continent.",
              emoji: "🌋"
            },
            {
              title: "La Cordillère des Andes",
              text: "L'Amérique du Sud possède sur toute sa côte ouest la plus longue chaîne de montagnes continentale du monde, la cordillère des Andes, s'étendant sur plus de 7000 kilomètres. Sa formation est le résultat direct de la tectonique des plaques.\\n\\nLa plaque océanique de **Nazca** s'enfonce sous la plaque continentale sud-américaine : c'est le phénomène de **subduction**. En plongeant dans le manteau chaud, la plaque océanique fond, provoquant de violents séismes réguliers et alimentant une chaîne de volcans très actifs le long des sommets andins.",
              emoji: "⛰️"
            },
            {
              title: "L'Arctique et l'Antarctique",
              text: "Les deux pôles de notre planète ont des structures géographiques opposées. Le pôle Nord (**Arctique**) est un océan profond recouvert d'une couche de glace flottante : la banquise. Il n'y a pas de terre sous la glace du pôle Nord.\\n\\nÀ l'inverse, le pôle Sud (**Antarctique**) est un véritable continent terrestre recouvert d'une couche de glace géante (inlandsis) épaisse de près de 2 kilomètres. L'Antarctique abrite 90% des glaces de la Terre et est protégé par un traité international qui interdit toute exploitation militaire ou minière, le réservant uniquement à la recherche scientifique.",
              emoji: "❄️"
            }
          ],
          quiz: [
            {
              question: "Quelle couche géologique rigide externe de la Terre dérive lentement sur l'asthénosphère ?",
              options: ["La biosphère 🌍", "La lithosphère 🗺️", "L'atmosphère 🌬️"],
              correctAnswer: "La lithosphère 🗺️"
            },
            {
              question: "Quel nom portait l'unique supercontinent regroupant toutes les terres il y a 250 millions d'années ?",
              options: ["L'Eurasie 🗺️", "La Pangée 🧩", "L'Atlantide 🌊"],
              correctAnswer: "La Pangée 🧩"
            },
            {
              question: "Quelle chaîne de montagnes russe marque la frontière conventionnelle entre l'Europe et l'Asie ?",
              options: ["Les Alpes 🏔️", "L'Oural ⛰️", "L'Himalaya ⛰️"],
              correctAnswer: "L'Oural ⛰️"
            },
            {
              question: "Quel phénomène géologique étire et fracture l'Est du continent africain ?",
              options: ["La subduction océanique 🌊", "Le grand rift est-africain 🌋", "L'érosion fluviale 🏞️"],
              correctAnswer: "Le grand rift est-africain 🌋"
            },
            {
              question: "Quelle plaque océanique plonge sous la plaque sud-américaine pour former les Andes ?",
              options: ["La plaque Pacifique 🌊", "La plaque de Nazca ⛰️", "La plaque eurasienne 🗺️"],
              correctAnswer: "La plaque de Nazca ⛰️"
            },
            {
              question: "Qu'est-ce que la subduction en tectonique des plaques ?",
              options: ["L'écartement de deux plaques formant un océan 🌊", "L'enfoncement d'une plaque sous une autre plaque ⛰️", "L'érosion des roches par le vent 💨"],
              correctAnswer: "L'enfoncement d'une plaque sous une autre plaque ⛰️"
            },
            {
              question: "Quelle différence physique majeure distingue l'Arctique de l'Antarctique ?",
              options: ["L'Arctique est plus froid ❄️", "L'Arctique est un océan gelé sans terre, l'Antarctique est un continent terrestre ❄️", "L'Antarctique n'a pas de glace ☀️"],
              correctAnswer: "L'Arctique est un océan gelé sans terre, l'Antarctique est un continent terrestre ❄️"
            },
            {
              question: "Quelle est l'épaisseur moyenne de la couche de glace (inlandsis) recouvrant le continent de l'Antarctique ?",
              options: ["2 mètres 🧊", "200 mètres 🧊", "2 kilomètres 🧊"],
              correctAnswer: "2 kilomètres 🧊"
            },
            {
              question: "Sur quel continent se trouve le mont Kilimandjaro, grand volcan inactif ?",
              options: ["En Asie 🌏", "En Afrique 🌍", "En Amérique du Sud 🗽"],
              correctAnswer: "En Afrique 🌍"
            },
            {
              question: "Quelle règle géopolitique encadre le continent de l'Antarctique ?",
              options: ["Il est divisé entre 5 grands pays 🗺️", "Il est réservé uniquement à la recherche scientifique et protégé de toute exploitation militaire 🕊️", "Il est ouvert à la colonisation minière 🪨"],
              correctAnswer: "Il est réservé uniquement à la recherche scientifique et protégé de toute exploitation militaire 🕊️"
            }
          ]
        },
        {
          id: "earth-layers",
          title: "Voyage au centre de la Terre",
          emoji: "🌋",
          themeColor: "cyan",
          badgeId: "geologist-expert",
          badgeName: "Géophysicien Pro",
          badgeEmoji: "🧲",
          cards: [
            {
              title: "La sismologie et l'étude des ondes",
              text: "L'Homme n'a jamais foré la croûte terrestre au-delà de 12 kilomètres. Notre connaissance de l'intérieur de la Terre provient de la **sismologie**, l'étude de la propagation des ondes provoquées par les séismes.\\n\\nLes géophysiciens mesurent deux types d'ondes internes. Les **ondes P** (primaires) sont des ondes de compression rapides qui traversent tous les milieux (solides et liquides). Les **ondes S** (secondaires) sont des ondes de cisaillement plus lentes qui ne peuvent se propager que dans des milieux solides. L'arrêt des ondes S à 2900 km de profondeur a ainsi prouvé que le noyau externe de la Terre est liquide.",
              emoji: "📈"
            },
            {
              title: "La Croûte et la discontinuité du Moho",
              text: "La couche la plus externe de la Terre est la croûte. Elle est divisée en croûte océanique (fine et dense, faite de basalte) et croûte continentale (épaisse et moins dense, faite de granite).\\n\\nLa base de cette croûte est délimitée par la discontinuité de **Mohorovičić** (appelée couramment le **Moho**). C'est la frontière physique qui sépare la croûte du manteau supérieur. Au niveau du Moho, la composition des roches change brusquement (passant de roches superficielles à de la péridotite dense), ce qui entraîne une accélération soudaine des ondes sismiques.",
              emoji: "🥾"
            },
            {
              title: "L'Asthénosphère et la convection",
              text: "Sous le Moho se trouve le manteau terrestre, qui s'étend jusqu'à 2900 km de profondeur. Le manteau supérieur contient l'**asthénosphère**, une zone où les roches solides sont soumises à de telles conditions de température et de pression qu'elles deviennent plastiques (déformables).\\n\\nCette plasticité permet la mise en place de **courants de convection** géants. La chaleur intense émise par le noyau chauffe la base du manteau. Les roches chaudes, moins denses, montent lentement vers la surface. En se rapprochant de la croûte, elles se refroidissent, deviennent plus denses et replongent vers les profondeurs. Ces boucles thermiques déplacent les plaques tectoniques.",
              emoji: "🌀"
            },
            {
              title: "Le Noyau et la géodynamo magnétique",
              text: "Au centre de la Terre, à partir de 2900 km de profondeur, s'étend le noyau composé essentiellement de fer et de nickel. Il est séparé en deux zones distinctes aux propriétés physiques opposées.\\n\\nLe **noyau externe** est métallique liquide. Animé de violents mouvements de convection provoqués par le refroidissement de la Terre, ce métal liquide conducteur produit un effet dynamo géant : c'est la **géodynamo**. Ce mécanisme génère le champ magnétique terrestre (la magnétosphère) qui enveloppe notre planète et nous protège des radiations mortelles du vent solaire.",
              emoji: "🧲"
            },
            {
              title: "La Graine et l'énergie thermique",
              text: "Le cœur ultime de la Terre, situé à partir de 5100 km de profondeur, est le noyau interne, appelé la **graine**.\\n\\nBien que la température y dépasse 5000°C (soit autant qu'à la surface du Soleil), la pression y est si écrasante (3,5 millions de fois la pression atmosphérique) que les atomes de fer sont forcés de se cristalliser à l'état solide. La graine grossit lentement d'un millimètre par an à mesure que la Terre se refroidit, libérant de la chaleur qui alimente les mouvements du noyau externe liquide.",
              emoji: "☄️"
            }
          ],
          quiz: [
            {
              question: "Quelle méthode permet d'obtenir des données sur la composition interne de la Terre ?",
              options: ["Le forage direct jusqu'au centre 🕳️", "La sismologie et l'étude des ondes sismiques 📈", "L'observation par satellite 🛰️"],
              correctAnswer: "La sismologie et l'étude des ondes sismiques 📈"
            },
            {
              question: "Quelle est la principale caractéristique physique des ondes sismiques S (secondaires) ?",
              options: ["Elles traversent uniquement les milieux gazeux 🌬️", "Elles s'arrêtent net dans les milieux liquides 📈", "Elles sont plus rapides que les ondes P ⚡"],
              correctAnswer: "Elles s'arrêtent net dans les milieux liquides 📈"
            },
            {
              question: "Comment s'appelle la limite physique séparant la croûte terrestre du manteau ?",
              options: ["La faille de San Andreas 💥", "La discontinuité du Moho 🥾", "L'horizon des événements 🕳️"],
              correctAnswer: "La discontinuité du Moho 🥾"
            },
            {
              question: "De quel type de roche la croûte océanique est-elle principalement composée ?",
              options: ["Le granite 🪨", "Le basalte 🪨", "Le calcaire 🪨"],
              correctAnswer: "Le basalte 🪨"
            },
            {
              question: "Dans quelle zone du manteau les roches solides deviennent-elles ductiles (plastiques) ?",
              options: ["La lithosphère 🗺️", "L'asthénosphère 🌋", "Le noyau externe ☄️"],
              correctAnswer: "L'asthénosphère 🌋"
            },
            {
              question: "Quel mécanisme thermique dans le manteau déplace lentement les plaques tectoniques ?",
              options: ["La conduction 🌡️", "Les courants de convection 🌀", "Le rayonnement infrarouge ☀️"],
              correctAnswer: "Les courants de convection 🌀"
            },
            {
              question: "Quelle couche terrestre liquide génère le champ magnétique de notre planète par effet dynamo ?",
              options: ["Le noyau externe liquide 🧲", "L'asthénosphère 🌋", "Le manteau inférieur 🌀"],
              correctAnswer: "Le noyau externe liquide 🧲"
            },
            {
              question: "Comment s'appelle la partie solide centrale du noyau de la Terre ?",
              options: ["La graine ☄️", "Le manteau 🌋", "Le Moho 🥾"],
              correctAnswer: "La graine ☄️"
            },
            {
              question: "Pourquoi le fer reste-t-il solide dans le noyau interne malgré une température de 5000°C ?",
              options: ["Parce qu'il y fait froid 🥶", "En raison de la pression phénoménale exercée au centre de la Terre ☄️", "Grâce au champ magnétique 🧲"],
              correctAnswer: "En raison de la pression phénoménale exercée au centre de la Terre ☄️"
            },
            {
              question: "Quel gaz solaire nocif le champ magnétique terrestre bloque-t-il pour nous protéger ?",
              options: ["L'hélium 🧪", "Le vent solaire (particules chargées) 💨", "L'azote 💨"],
              correctAnswer: "Le vent solaire (particules chargées) 💨"
            }
          ]
        },
        {
          id: "climatology-biomes",
          title: "Climats et Biomes terrestres",
          emoji: "🌤️",
          themeColor: "cyan",
          badgeId: "climatology-biomes",
          badgeName: "Climatologue Pro",
          badgeEmoji: "🌤️",
          cards: [
            {
              title: "L'inégale répartition de l'énergie solaire",
              text: "Le climat d'une région dépend en premier lieu de la quantité d'énergie solaire qu'elle reçoit. La Terre étant sphérique, les rayons du Soleil frappent la surface avec un angle différent selon la latitude.\\n\\nPrès de l'équateur, les rayons arrivent verticalement et se concentrent sur une petite surface, ce qui produit une chaleur intense. Près des pôles, les rayons frappent de manière très inclinée et se dispersent sur une large surface, tout en traversant une couche d'atmosphère plus épaisse qui en absorbe une partie. C'est l'origine des trois grandes zones climatiques de la Terre : chaude, tempérée et froide.",
              emoji: "☀️"
            },
            {
              title: "Les cellules de circulation atmosphérique",
              text: "Pour redistribuer cette chaleur, l'atmosphère terrestre est animée par une circulation globale composée de trois grandes cellules convectives dans chaque hémisphère.\\n\\nLa **cellule de Hadley** transporte l'air chaud et humide de l'équateur vers les tropiques (latitude 30°). En montant à l'équateur, cet air se refroidit et perd son humidité sous forme de pluies diluviennes (forêts tropicales). En redescendant sec aux tropiques, il crée des zones de haute pression permanentes où se forment les grands déserts chauds de la Terre (Sahara, désert d'Australie).",
              emoji: "🌀"
            },
            {
              title: "Les courants marins thermohalins",
              text: "Les océans régulent le climat mondial grâce à la **circulation thermohaline**, un immense réseau de courants marins profonds et superficiels connectés à l'échelle du globe.\\n\\nCette circulation est dictée par les différences de température (thermo) et de salinité (haline) de l'eau, qui modifient sa densité (l'eau froide et salée est plus dense et plonge vers les profondeurs). Le **Gulf Stream** est un courant chaud de surface qui adoucit considérablement le climat de l'Europe occidentale. Sans lui, les hivers en France seraient aussi froids qu'au Québec !",
              emoji: "🌊"
            },
            {
              title: "La notion de biome terrestre",
              text: "Un **biome** est une grande communauté écologique caractérisée par un climat homogène, une faune et une végétation adaptées à ces conditions.\\n\\nOn distingue plusieurs biomes majeurs. La **taïga** (ou forêt boréale) est composée de conifères résistants au gel. La **toundra** est une plaine froide sans arbres caractérisée par un sol gelé en permanence, le **pergélisol** (permafrost). La **savane** est une prairie tropicale caractérisée par une longue saison sèche, tandis que la forêt tropicale humide abrite la plus grande biodiversité de la planète.",
              emoji: "🌳"
            },
            {
              title: "Le changement climatique et les biomes",
              text: "Le changement climatique perturbe la répartition géographique des biomes terrestres. L'augmentation des températures déplace les zones climatiques vers les pôles et en altitude.\\n\\nDans la toundra, la fonte du pergélisol libère d'immenses quantités de méthane (un puissant gaz à effet de serre), accélérant le réchauffement. Dans les zones tempérées, la sécheresse et les incendies répétés transforment certaines forêts en savanes arbustives sèches, modifiant profondément les habitats des espèces animales.",
              emoji: "🔥"
            }
          ],
          quiz: [
            {
              question: "Pourquoi fait-il plus chaud à l'équateur qu'aux pôles ?",
              options: ["Parce que le Soleil y est plus proche ☀️", "Parce que les rayons y frappent verticalement et se concentrent sur une surface plus petite ☀️", "En raison de la présence de volcans équatoriaux 🌋"],
              correctAnswer: "Parce que les rayons y frappent verticalement et se concentrent sur une surface plus petite ☀️"
            },
            {
              question: "Quelle cellule atmosphérique génère la sécheresse des grands déserts tropicaux ?",
              options: ["La cellule de Hadley 🌀", "La cellule de Ferrel 🌀", "La cellule polaire 🌀"],
              correctAnswer: "La cellule de Hadley 🌀"
            },
            {
              question: "Quel paramètre physique dicte la densité de l'eau dans la circulation thermohaline ?",
              options: ["La pression et le vent 💨", "La température et la salinité 🌊", "La profondeur du fond marin 🌊"],
              correctAnswer: "La température et la salinité 🌊"
            },
            {
              question: "Quel courant marin chaud adoucit le climat hivernal de l'Europe de l'Ouest ?",
              options: ["Le Gulf Stream 🌊", "Le courant de Humboldt 🌊", "Le courant circumpolaire ❄️"],
              correctAnswer: "Le Gulf Stream 🌊"
            },
            {
              question: "Comment appelle-t-on le sol gelé en permanence caractéristique de la toundra ?",
              options: ["L'humus 🍂", "Le pergélisol (pergélisol) ❄️", "Le calcaire 🪨"],
              correctAnswer: "Le pergélisol (pergélisol) ❄️"
            },
            {
              question: "Quel biome est composé d'une vaste forêt de conifères (pins, sapins) résistants aux hivers froids ?",
              options: ["La toundra ❄️", "La taïga (forêt boréale) 🌲", "La savane 🦁"],
              correctAnswer: "La taïga (forêt boréale) 🌲"
            },
            {
              question: "Quel gaz à effet de serre est libéré massivement lors de la fonte du pergélisol ?",
              options: ["Le dioxygène 💨", "Le méthane 🧪", "L'azote 💨"],
              correctAnswer: "Le méthane 🧪"
            },
            {
              question: "Dans quelle zone climatique générale la France est-elle située ?",
              options: ["La zone chaude ☀️", "La zone tempérée 🌤️", "La zone froide ❄️"],
              correctAnswer: "La zone tempérée 🌤️"
            },
            {
              question: "Quelle est la principale caractéristique de la végétation du biome de la toundra ?",
              options: ["Des arbres géants 🌲", "Une absence d'arbres avec présence de mousses et lichens rases ❄️", "Des cactus épineux 🌵"],
              correctAnswer: "Une absence d'arbres avec présence de mousses et lichens rases ❄️"
            },
            {
              question: "Comment le changement climatique modifie-t-il la position des biomes ?",
              options: ["Il les déplace vers l'équateur 🌍", "Il les déplace vers les pôles et en altitude 📈", "Il n'a aucune influence géographique 🤷"],
              correctAnswer: "Il les déplace vers les pôles et en altitude 📈"
            }
          ]
        }
      ]`;

const french_9_12 = `[
        {
          id: "vocabulary-synonyms",
          title: "Les Synonymes et registres",
          emoji: "📚",
          themeColor: "violet",
          badgeId: "vocab-genius",
          badgeName: "Linguiste Expert",
          badgeEmoji: "🗣️",
          cards: [
            {
              title: "Les nuances sémantiques",
              text: "En langue française, deux mots synonymes n'ont presque jamais un sens strictement identique. Ils partagent un sens commun, mais diffèrent par des nuances d'intensité, de précision ou d'intention.\\n\\nPar exemple, *craintif*, *peureux* et *terrifié* renvoient tous à la peur, mais *terrifié* traduit un degré de frayeur extrême que les deux autres n'expriment pas. Choisir le bon synonyme permet d'être précis et d'éviter les approximations dans ses rédactions.",
              emoji: "📏"
            },
            {
              title: "Polysémie et contexte",
              text: "Un mot est dit **polysémique** lorsqu'il possède plusieurs significations différentes. Pour cette raison, le choix d'un synonyme dépend obligatoirement du contexte de la phrase.\\n\\nPar exemple, pour le verbe *glacer*, le synonyme sera *congeler* si l'on parle de nourriture (*glacer des fruits*), mais il sera *terrifier* ou *paralyser* si l'on parle d'une émotion (*cette histoire m'a glacé le sang*). Analyser le contexte est donc indispensable avant de remplacer un mot.",
              emoji: "📚"
            },
            {
              title: "Les types d'antonymes",
              text: "Les antonymes sont des mots de sens contraire. On distingue deux catégories principales de contraires : les antonymes graduels et les antonymes complémentaires.\\n\\nLes **antonymes graduels** décrivent des états opposés mais admettent des degrés intermédiaires (ex. *chaud* et *froid*, entre lesquels existent *tiède* ou *frais*). Les **antonymes complémentaires** s'excluent mutuellement de manière binaire, sans aucun intermédiaire possible : si une proposition est *vraie*, elle ne peut pas être *fausse*, de même qu'un être ne peut être que *vivant* ou *mort*.",
              emoji: "⚖️"
            },
            {
              title: "Dérivation et préfixes",
              text: "L'une des méthodes les plus courantes pour enrichir son vocabulaire et créer des antonymes est la dérivation par l'ajout d'un préfixe de sens négatif ou privatif.\\n\\nLes préfixes *in-*, *im-*, *il-* ou *ir-* (selon la lettre initiale du mot) inversent le sens d'un adjectif (ex. *lisible* / *illisible*, *prévu* / *imprévu*, *réversible* / *irréversible*). Les préfixes *dé-* ou *dés-* indiquent quant à eux l'action inverse pour un verbe (ex. *faire* / *défaire*, *obéir* / *désobéir*).",
              emoji: "✍️"
            },
            {
              title: "Dénotation et connotation",
              text: "Les mots possèdent deux niveaux de signification : la dénotation et la connotation. La **dénotation** est la définition neutre, objective et factuelle du mot, telle qu'on la trouve dans le dictionnaire.\\n\\nLa **connotation** représente la valeur subjective, affective ou culturelle ajoutée à ce mot. Elle peut être méliorative (positive) ou péjorative (négative). Par exemple, les mots *demeure*, *maison* et *baraque* ont la même dénotation (un lieu d'habitation), mais *demeure* connote le luxe et le respect, tandis que *baraque* connote un habitat de piètre qualité.",
              emoji: "🗣️"
            }
          ],
          quiz: [
            {
              question: "Quel terme qualifie un mot ayant plusieurs significations différentes ?",
              options: ["Polysémique 📚", "Homophone 🗣️", "Antonymique ⚖️"],
              correctAnswer: "Polysémique 📚"
            },
            {
              question: "Trouvez le synonyme le plus adapté de 'glacé' dans : 'Ce bruit soudain m'a glacé.'",
              options: ["Congelé ❄️", "Paralysé de peur 😨", "Rafraîchi 🌬️"],
              correctAnswer: "Paralysé de peur 😨"
            },
            {
              question: "Quel type d'antonymes s'excluent mutuellement sans intermédiaire (comme 'présent' et 'absent') ?",
              options: ["Les antonymes graduels 🌡️", "Les antonymes complémentaires ⚖️", "Les synonymes 🤝"],
              correctAnswer: "Les antonymes complémentaires ⚖️"
            },
            {
              question: "Quel préfixe privatif convient pour former l'antonyme de 'légal' ?",
              options: ["Le préfixe ir- ✍️", "Le préfixe il- (illégal) ✍️", "Le préfixe im- ✍️"],
              correctAnswer: "Le préfixe il- (illégal) ✍️"
            },
            {
              question: "Qu'est-ce que la dénotation d'un mot ?",
              options: ["Sa valeur subjective et affective 🗣️", "Sa définition neutre et objective dans le dictionnaire 📖", "Son origine historique 📜"],
              correctAnswer: "Sa définition neutre et objective dans le dictionnaire 📖"
            },
            {
              question: "Quel synonyme de 'grand' exprime une nuance d'immensité physique écrasante ?",
              options: ["Gros 📏", "Gigantesque 📏", "Moyen 📏"],
              correctAnswer: "Gigantesque 📏"
            },
            {
              question: "Quelle est la connotation du mot 'clébard' par rapport à 'chien' ?",
              options: ["Méliorative (positive) 😊", "Péjorative (négative/méprisante) ❌", "Neutre 📖"],
              correctAnswer: "Péjorative (négative/méprisante) ❌"
            },
            {
              question: "Trouvez l'antonyme graduel de 'chaud' :",
              options: ["Froid (avec intermédiaire tiède possible) 🌡️", "Mort 🪦", "Vrai 🟩"],
              correctAnswer: "Froid (avec intermédiaire tiède possible) 🌡️"
            },
            {
              question: "Quel préfixe exprime l'inversion d'une action pour le verbe 'coller' ?",
              options: ["Le préfixe in- ✍️", "Le préfixe dé- (décoller) ✍️", "Le préfixe re- ✍️"],
              correctAnswer: "Le préfixe dé- (décoller) ✍️"
            },
            {
              question: "Quel mot de sens proche possède la connotation la plus méliorative (luxueuse) ?",
              options: ["Un logis 🏠", "Une demeure 🏰", "Une cabane 🛖"],
              correctAnswer: "Une demeure 🏰"
            }
          ]
        },
        {
          id: "grammar-homophones",
          title: "Les Homophones et accords",
          emoji: "✏️",
          themeColor: "violet",
          badgeId: "spelling-champion",
          badgeName: "Syntaxiste Pro",
          badgeEmoji: "📝",
          cards: [
            {
              title: "Les homophones 'leur' et 'leurs'",
              text: "L'homophone **leur** peut avoir deux natures grammaticales différentes, ce qui détermine son orthographe.\\n\\nDevant un verbe, **leur** est un pronom personnel (équivalant à *à eux* ou *à elles*). Dans ce cas, il est strictement invariable et ne prend jamais de -s (*Je leur ai écrit*). Devant un nom, **leur** est un déterminant possessif. Il s'accorde alors en nombre avec le nom qu'il accompagne : il prend un -s si le nom est au pluriel (*leurs livres*), et s'écrit sans -s si le nom est au singulier (*leur maison*).",
              emoji: "🗣️"
            },
            {
              title: "Les pronoms 'ce/se' et 'ces/ses'",
              text: "Ces homophones se distinguent par leur rôle grammatical au sein du groupe nominal ou verbal.\\n\\n**Ce** et **ces** sont des déterminants ou pronoms démonstratifs. Ils servent à montrer un objet ou une personne (*ce* monument, *ces* enfants). On peut les remplacer par *ce...-ci* ou *ces...-là*. **Se** et **ses** ont un lien pronominal ou possessif. **Se** se place toujours devant un verbe pronominal (*il se lave*). **Ses** indique la possession (*ses clés*, qui lui appartiennent). On peut remplacer *ses* par *mes* ou *tes*.",
              emoji: "🎒"
            },
            {
              title: "L'accord du participe passé",
              text: "La règle d'accord du participe passé dépend principalement de l'auxiliaire utilisé.\\n\\nConjugué avec l'auxiliaire **être**, le participe passé s'accorde toujours en genre et en nombre avec son sujet (*Elles sont arrivées*). Conjugué avec l'auxiliaire **avoir**, le participe passé ne s'accorde jamais avec le sujet. Il s'accorde uniquement avec son Complément d'Objet Direct (COD) si celui-ci est placé avant le verbe dans la phrase (*Les fleurs que j'ai cueillies*). Si le COD est après, le participe passé reste invariable (*J'ai cueilli les fleurs*).",
              emoji: "➕"
            },
            {
              title: "Homonymes lexicaux courants",
              text: "Les homonymes lexicaux sont des mots qui partagent la même prononciation mais ont des orthographes et définitions différentes sans lien grammatical direct.\\n\\nPar exemple, on écrit le **maire** (l'élu municipal), la **mère** (le parent féminin) et la **mer** (l'étendue d'eau). L'analyse du contexte et de la classe grammaticale est le seul moyen de choisir la bonne orthographe. D'autres couples célèbres incluent *le ver* (l'animal), *le verre* (le contenant), *vers* (la direction) et *vert* (la couleur).",
              emoji: "🔊"
            },
            {
              title: "Le subjonctif présent",
              text: "Le subjonctif est un mode utilisé pour exprimer un doute, un souhait, une obligation ou une action incertaine. Il est presque toujours introduit par la conjonction *que*.\\n\\nAttention aux homophones de conjugaison entre l'indicatif présent et le subjonctif présent. Par exemple, au présent de l'indicatif, on écrit *je vois* (avec un -s), mais au subjonctif présent, on doit écrire *il faut que je voie* (avec un -e). Pour les verbes du premier groupe, les terminaisons du subjonctif singulier sont identiques à celles de l'indicatif (-e, -es, -e).",
              emoji: "📝"
            }
          ],
          quiz: [
            {
              question: "Dans la phrase : 'Les parents ___ expliquent ___ leçons', complétez avec les bons homophones.",
              options: ["leur / leurs 📚", "leurs / leur 📚", "leur / leur 📚"],
              correctAnswer: "leur / leurs 📚"
            },
            {
              question: "Quelle est l'orthographe correcte dans : 'Il ___ réveille à 6h pour ranger ___ outils.' ?",
              options: ["ce / ces 🛠️", "se / ses 🛠️", "ce / ses 🛠️"],
              correctAnswer: "se / ses 🛠️"
            },
            {
              question: "Accordez correctement le participe passé : 'La chanson qu'elles ont ___ était magnifique.'",
              options: ["chanté 🎤", "chantée 🎤", "chantées 🎤"],
              correctAnswer: "chantée 🎤"
            },
            {
              question: "Complétez la phrase : 'La ___ de Jules est allée se baigner dans la ___.'",
              options: ["mer / mère 👩", "mère / mer (parent / eau) 👩🌊", "maire / mer 🏛️"],
              correctAnswer: "mère / mer (parent / eau) 👩🌊"
            },
            {
              question: "Quelle phrase est correctement conjuguée au subjonctif présent ?",
              options: ["Je veux que tu viennes 💫", "Il faut que je vois ce film 🎬", "Je crois qu'il vient ☀️"],
              correctAnswer: "Je veux que tu viennes 💫"
            },
            {
              question: "Dans la phrase 'Je leur parle', pourquoi 'leur' est-il invariable ?",
              options: ["Parce qu'il s'accorde avec le sujet 🚫", "Parce qu'il est pronom personnel placé devant un verbe 🗣️", "C'est une exception orthographique 📝"],
              correctAnswer: "Parce qu'il est pronom personnel placé devant un verbe 🗣️"
            },
            {
              question: "Comment écrit-on l'homophone dans : 'Il se dirige ___ le sud.' ?",
              options: ["ver 🪱", "verre 🥛", "vers 🧭"],
              correctAnswer: "vers 🧭"
            },
            {
              question: "Quel participe passé est correctement accordé dans la phrase ci-dessous ?",
              options: ["Elles ont achetés des pommes 🍎", "Ils sont partis tôt 🏃‍♂️", "Elle a mangée une tarte 🥧"],
              correctAnswer: "Ils sont partis tôt 🏃‍♂️"
            },
            {
              question: "Quelle est la nature du mot 'ce' dans 'Ce garçon est poli' ?",
              options: ["Un pronom personnel 👤", "Un déterminant démonstratif 🎒", "Un verbe conjugué 📝"],
              correctAnswer: "Un déterminant démonstratif 🎒"
            },
            {
              question: "Quelle est la terminaison de la 1ère personne du singulier au subjonctif présent pour le verbe 'voir' ?",
              options: ["-s 📝", "-e (que je voie) 📝", "-t 📝"],
              correctAnswer: "-e (que je voie) 📝"
            }
          ]
        },
        {
          id: "syntax-conjugation",
          title: "Syntaxe et Conjugaison complexe",
          emoji: "📚",
          themeColor: "violet",
          badgeId: "syntax-champion",
          badgeName: "Grammairien Pro",
          badgeEmoji: "📚",
          cards: [
            {
              title: "La structure de la phrase complexe",
              text: "Au collège, on étudie la distinction entre phrase simple (un seul verbe conjugué, une seule proposition) et phrase complexe (plusieurs verbes conjugués, donc plusieurs propositions).\\n\\nLes propositions d'une phrase complexe peuvent être reliées de trois façons. Elles sont **juxtaposées** lorsqu'elles sont séparées par un signe de ponctuation faible (virgule, point-virgule). Elles sont **coordonnées** lorsqu'elles sont reliées par une conjonction de coordination (mais, ou, et, donc, or, ni, car). Enfin, elles sont liées par **subordination** lorsqu'une proposition dépend d'une proposition principale.",
              emoji: "📝"
            },
            {
              title: "Les propositions subordonnées",
              text: "Une proposition subordonnée dépend d'une proposition principale et ne peut pas exister seule. On distingue trois grands types de subordonnées.\\n\\nLa subordonnée **relative** complète un nom appelé l'antécédent et commence par un pronom relatif (qui, que, quoi, dont, où). La subordonnée **conjonctive complétive** complète un verbe et commence généralement par *que*. Enfin, la subordonnée **conjonctive circonstancielle** apporte des précisions de temps, de cause ou de but et commence par des conjonctions comme *parce que*, *quand* ou *bien que*.",
              emoji: "🔍"
            },
            {
              title: "Les temps du passé de l'indicatif",
              text: "L'expression du passé utilise deux temps principaux de l'indicatif dont les valeurs diffèrent : l'**imparfait** et le **passé simple**.\\n\\nL'imparfait s'utilise pour les actions de second plan, les descriptions, les habitudes ou les actions en cours de déroulement (*Il faisait nuit, la pluie tombait...*). Le passé simple s'utilise pour les actions de premier plan, soudaines, délimitées dans le temps et successives (*Soudain, un éclair éclata*). La maîtrise du passé simple implique d'apprendre par cœur les terminaisons irrégulières (en -us, -is, -ins).",
              emoji: "⏳"
            },
            {
              title: "Le conditionnel présent",
              text: "Le conditionnel présent est un mode utilisé pour exprimer une hypothèse, un souhait, un conseil ou un fait soumis à condition (souvent introduit par une structure en *si*).\\n\\nSa formation est régulière : on prend le radical du futur simple de l'indicatif auquel on ajoute les terminaisons de l'imparfait (-ais, -ais, -ait, -ions, -iez, -aient). Par exemple, pour le verbe *avoir*, le futur est *j'aurai* et le conditionnel est *j'aurais*. Attention à ne pas confondre à la première personne du singulier : *je chanterai* (futur indicatif, certitude) et *je chanterais* (conditionnel, souhait/hypothèse).",
              emoji: "🪄"
            },
            {
              title: "La voix passive",
              text: "En grammaire, la voix désigne le rôle du sujet par rapport à l'action du verbe. À la voix active, le sujet fait l'action (*Le chat mange la souris*).\\n\\nÀ la **voix passive**, le sujet subit l'action faite par un complément d'agent (*La souris est mangée par le chat*). Pour transformer une phrase active au passif, le COD devient sujet passif, le sujet devient complément d'agent (introduit par *par*), et le verbe se conjugue avec l'auxiliaire *être* au temps du verbe actif d'origine, suivi du participe passé qui s'accorde.",
              emoji: "🔄"
            }
          ],
          quiz: [
            {
              question: "Combien de propositions conjuguées comporte une phrase simple ?",
              options: ["Une seule proposition 📝", "Deux propositions 📝", "Trois propositions ou plus 📝"],
              correctAnswer: "Une seule proposition 📝"
            },
            {
              question: "Quelle conjonction introduit la proposition subordonnée conjonctive complétive ?",
              options: ["Qui 🔍", "Que 🔍", "Mais ➕"],
              correctAnswer: "Que 🔍"
            },
            {
              question: "Dans un récit au passé, quel temps décrit une action soudaine de premier plan ?",
              options: ["L'imparfait ⏳", "Le passé simple ⚡", "Le présent de l'indicatif ⏳"],
              correctAnswer: "Le passé simple ⚡"
            },
            {
              question: "Comment est formé le radical du conditionnel présent ?",
              options: ["Sur le radical du présent de l'indicatif 📝", "Sur le radical du futur simple 🔮", "Sur le participe passé ➕"],
              correctAnswer: "Sur le radical du futur simple 🔮"
            },
            {
              question: "Quelle phrase est à la voix passive ?",
              options: ["Le vent souffle fort 💨", "Le gâteau a été dévoré par les enfants 🍰", "Les élèves lisent un livre 📖"],
              correctAnswer: "Le gâteau a été dévoré par les enfants 🍰"
            },
            {
              question: "Comment sont reliées deux propositions séparées par une virgule ?",
              options: ["Elles sont coordonnées ➕", "Elles sont juxtaposées 📝", "Elles sont subordonnées 🔍"],
              correctAnswer: "Elles sont juxtaposées 📝"
            },
            {
              question: "Quel pronom introduit une proposition subordonnée relative ?",
              options: ["Parce que 🗣️", "Dont 🔍", "Mais ➕"],
              correctAnswer: "Dont 🔍"
            },
            {
              question: "Quelle est la terminaison du verbe 'faire' à la 1ère personne du singulier au passé simple ?",
              options: ["je faisais ⏳", "je fis ⚡", "je ferai 🔮"],
              correctAnswer: "je fis ⚡"
            },
            {
              question: "Identifiez l'orthographe du conditionnel présent pour le verbe 'pouvoir' à la 1ère personne du singulier :",
              options: ["je pourrai 🔮", "je pourrais 🔬", "je pouvais ⏳"],
              correctAnswer: "je pourrais 🔬"
            },
            {
              question: "Dans la phrase passive 'La pomme est cueillie par Marc', quelle fonction occupe 'par Marc' ?",
              options: ["Sujet passif 🍎", "Complément d'agent 👤", "Complément circonstanciel de lieu 🗺️"],
              correctAnswer: "Complément d'agent 👤"
            }
          ]
        }
      ]`;

const arts_9_12 = `[
        {
          id: "art-movements",
          title: "L'Impressionnisme et courants",
          emoji: "🖼️",
          themeColor: "pink",
          badgeId: "art-historian",
          badgeName: "Historien d'Art Moderne",
          badgeEmoji: "🎨",
          cards: [
            {
              title: "La révolution impressionniste",
              text: "Né en France dans la seconde moitié du 19ème siècle, l'Impressionnisme marque une rupture radicale avec les peintures académiques exposées au Salon officiel. Les impressionnistes rejettent les sujets historiques ou mythologiques.\\n\\nIls peignent la vie moderne, les gares en activité, les cafés et la nature changeante. Pour capturer la lumière naturelle et ses reflets sur l'eau, des artistes comme Claude Monet sortent de leur atelier pour peindre en extérieur (sur le motif), travaillant rapidement avec des touches de pinceau visibles pour figer l'impression d'un instant fugace.",
              emoji: "🎨"
            },
            {
              title: "La science des couleurs",
              text: "Les peintres impressionnistes se sont fortement inspirés des découvertes scientifiques sur l'optique, notamment les travaux du chimiste français Michel-Eugène Chevreul sur la loi du contraste simultané des couleurs.\\n\\nChevreul a prouvé que deux couleurs complémentaires posées côte à côte (comme le bleu et le orange, ou le rouge et le vert) s'influencent mutuellement et paraissent beaucoup plus lumineuses à l'œil du spectateur. Les peintres évitent ainsi de mélanger les couleurs sur leur palette pour ne pas ternir les pigments, préférant poser des touches de couleurs pures directement sur la toile.",
              emoji: "🏞"
            },
            {
              title: "Le Pointillisme de Seurat",
              text: "Le divisionnisme, plus connu sous le nom de **pointillisme**, est un mouvement dérivé de l'impressionnisme, fondé par Georges Seurat à la fin du 19ème siècle.\\n\\nSeurat applique les théories scientifiques de la lumière avec une rigueur absolue. Au lieu d'étaler la peinture, il juxtapose des millions de minuscules points de couleurs pures sur la toile. À distance, l'œil du spectateur effectue lui-même la synthèse optique des couleurs. Vu de près, le tableau ressemble à une mosaïque abstraite ; de loin, l'image apparaît avec une luminosité vibrante.",
              emoji: "🖌️"
            },
            {
              title: "La naissance de l'Abstraction",
              text: "En 1910, le peintre russe Vassily Kandinsky réalise la première aquarelle totalement abstraite, ouvrant la voie à l'**art abstrait**. Ce mouvement rejette complètement l'idée de représenter des objets réels.\\n\\nKandinsky considérait que l'art devait s'adresser directement à l'âme en utilisant les lignes, les formes géométriques et les couleurs comme une musique visuelle. Pour lui, chaque couleur possède une résonance spirituelle propre (le bleu évoque le calme céleste, le rouge exprime l'énergie de la vie).",
              emoji: "📐"
            },
            {
              title: "Le Cubisme géométrique",
              text: "Initié par Pablo Picasso et Georges Braque aux alentours de 1907, le **cubisme** révolutionne la perspective en peinture. Les cubistes refusent d'imiter la réalité en trois dimensions sur une toile plate.\\n\\nIls déconstruisent les volumes en facettes géométriques (cubes, sphères, cônes) et représentent un sujet sous plusieurs angles de vue différents représentés simultanément. Un portrait cubiste peut ainsi montrer le nez de profil et les yeux de face en même temps, brisant la représentation classique de l'espace.",
              emoji: "👁️"
            }
          ],
          quiz: [
            {
              question: "Où les peintres impressionnistes préféraient-ils peindre pour saisir la lumière ?",
              options: ["Dans des ateliers sombres 🚪", "En extérieur, directement sur le motif ☀️", "Dans des musées nationaux 🏛️"],
              correctAnswer: "En extérieur, directement sur le motif ☀️"
            },
            {
              question: "Quel chimiste a écrit la loi du contraste simultané des couleurs ayant inspiré les impressionnistes ?",
              options: ["Antoine Lavoisier 🧪", "Michel-Eugène Chevreul 🧪", "Louis Pasteur 🔬"],
              correctAnswer: "Michel-Eugène Chevreul 🧪"
            },
            {
              question: "Quel peintre a fondé le Pointillisme avec son chef-d'œuvre de l'Île de la Grande Jatte ?",
              options: ["Claude Monet 🖼️", "Georges Seurat 🎨", "Vincent van Gogh 🌻"],
              correctAnswer: "Georges Seurat 🎨"
            },
            {
              question: "Quelle est l'intention principale de l'art abstrait ?",
              options: ["Représenter des portraits précis de rois 👑", "S'affranchir de la représentation du monde visible pour exprimer des émotions pures 🎨", "Dessiner uniquement des animaux 🦁"],
              correctAnswer: "S'affranchir de la représentation du monde visible pour exprimer des émotions pures 🎨"
            },
            {
              question: "Quel mouvement artistique fondé par Picasso déconstruit les objets en facettes géométriques ?",
              options: ["L'Impressionnisme 🖼️", "Le Cubisme 📐", "Le Pointillisme 🖌️"],
              correctAnswer: "Le Cubisme 📐"
            },
            {
              question: "En quelle année Kandinsky a-t-il peint la première œuvre totalement abstraite ?",
              options: ["1800 📜", "1910 🎨", "1980 💻"],
              correctAnswer: "1910 🎨"
            },
            {
              question: "Comment se fait le mélange des couleurs dans la technique du Pointillisme ?",
              options: ["Par dilution à l'eau 💧", "Par synthèse optique directement dans l'œil du spectateur à distance 👁️", "En mélangeant les pigments au couteau 🎨"],
              correctAnswer: "Par synthèse optique directement dans l'œil du spectateur à distance 👁️"
            },
            {
              question: "Quelle paire de couleurs complémentaires s'exalte mutuellement selon la théorie de Chevreul ?",
              options: ["Le bleu et le orange 🔵🟠", "Le noir et le blanc 🖤🤍", "Le vert et le jaune 🟢💛"],
              correctAnswer: "Le bleu et le orange 🔵🟠"
            },
            {
              question: "Quel peintre impressionniste célèbre est l'auteur de la série des Nymphéas ?",
              options: ["Pablo Picasso 🧑‍🎨", "Claude Monet 🖼️", "Vassily Kandinsky 📐"],
              correctAnswer: "Claude Monet 🖼️"
            },
            {
              question: "Comment les cubistes représentent-ils l'espace sur une toile plate ?",
              options: ["En utilisant une perspective parfaite 📐", "En montrant simultanément plusieurs angles de vue d'un même sujet 👁️", "En peignant uniquement des paysages 🏞️"],
              correctAnswer: "En montrant simultanément plusieurs angles de vue d'un même sujet 👁️"
            }
          ]
        },
        {
          id: "music-tempo",
          title: "Le tempo et le rythme",
          emoji: "⏱️",
          themeColor: "pink",
          badgeId: "tempo-master",
          badgeName: "Musicologue Pro",
          badgeEmoji: "🎼",
          cards: [
            {
              title: "Le Tempo et l'italien",
              text: "Le **tempo** est la vitesse d'exécution d'une œuvre musicale. Depuis la Renaissance, les compositeurs utilisent des termes italiens sur les partitions pour indiquer cette vitesse de manière expressive.\\n\\nLes principaux tempos sont classés du plus lent au plus rapide : *Largo* (très large et lent), *Adagio* (lent, à l'aise), *Andante* (allure de marche), *Moderato* (modéré), *Allegro* (joyeux, rapide) et *Presto* (très rapide). Ces indications sont complétées par des qualificatifs d'expression, comme *con brio* (avec éclat) ou *ma non troppo* (mais pas trop).",
              emoji: "⏱️"
            },
            {
              title: "Le Métronome et les BPM",
              text: "Pour donner une mesure scientifique et précise du tempo, on utilise le métronome, inventé par Johann Nepomuk Mälzel au début du 19ème siècle. Cet appareil indique le tempo en **BPM** (Battements Par Minute).\\n\\nUne indication de $120$ BPM signifie que la pulsation régulière bat 120 fois par minute. C'est le double du rythme de la seconde d'une horloge, soit exactement deux battements par seconde (courant dans la musique pop et de danse). Un tempo de $60$ BPM correspond à un battement par seconde (similaire au rythme cardiaque au repos).",
              emoji: "👏"
            },
            {
              title: "La Portée et la structure des Mesures",
              text: "La musique s'écrit sur une grille de 5 lignes horizontales parallèles appelée la **portée**. L'axe horizontal représente le temps, et l'axe vertical représente la hauteur des notes (aiguë ou grave).\\n\\nLe temps est structuré par des barres verticales qui découpent la portée en **mesures**. Une indication de mesure, comme $4/4$ placée au début, indique qu'il y a 4 temps par mesure. Dans ce cadre, une figure de note ronde vaut 4 temps (toute la mesure), une blanche vaut 2 temps, une noire vaut 1 temps et une croche vaut un demi-temps.",
              emoji: "🎼"
            },
            {
              title: "L'Orchestre symphonique",
              text: "Un orchestre symphonique regroupe plus de 80 musiciens répartis en quatre grandes familles d'instruments. La disposition de ces familles sur scène répond à des lois d'acoustique rigoureuses.\\n\\nLes instruments à cordes (violons, altos, violoncelles) sont placés à l'avant car leur puissance sonore est faible. Derrière eux, s'installent les bois (flûtes, clarinettes, hautbois). Les cuivres (trompettes, trombones, tubas), très puissants, sont placés plus en arrière. Enfin, les percussions (timbales, cymbales) ferment la marche tout au fond pour ne pas écraser les autres instruments.",
              emoji: "🎻"
            },
            {
              title: "Les Nuances expressives",
              text: "L'intensité du volume sonore en musique s'appelle les **nuances**, également indiquées en italien sur les partitions. Elles s'étendent de *pianissimo* ($pp$, très doux) à *fortissimo* ($ff$, très fort).\\n\\nPour indiquer une variation d'intensité au cours d'un morceau, on utilise le **crescendo** (une augmentation progressive du volume du son) ou le **decrescendo** (une baisse progressive). Ces variations d'intensité transmettent une tension émotionnelle forte dans les compositions symphoniques.",
              emoji: "🔊"
            }
          ],
          quiz: [
            {
              question: "Quel terme italien désigne un tempo rapide et joyeux ?",
              options: ["Adagio ⏱️", "Andante 🚶‍♂️", "Allegro ⏱️"],
              correctAnswer: "Allegro ⏱️"
            },
            {
              question: "Que signifie une indication de tempo réglée sur 120 BPM ?",
              options: ["120 battements par seconde ⏱️", "120 battements par minute (soit 2 par seconde) ⏱️", "Une musique très forte 🔊"],
              correctAnswer: "120 battements par minute (soit 2 par seconde) ⏱️"
            },
            {
              question: "Combien de temps dure une figure de note blanche dans une mesure en 4/4 ?",
              options: ["1 temps 🎼", "2 temps 🎼", "4 temps 🎼"],
              correctAnswer: "2 temps 🎼"
            },
            {
              question: "Pourquoi place-t-on les violons tout à l'avant d'un orchestre symphonique ?",
              options: ["Parce que ce sont les instruments les plus chers 💰", "Pour équilibrer leur volume sonore plus doux par rapport aux cuivres placés au fond 🎻", "Pour qu'ils puissent voir le chef d'orchestre 🧑‍💼"],
              correctAnswer: "Pour équilibrer leur volume sonore plus doux par rapport aux cuivres placés au fond 🎻"
            },
            {
              question: "Quel mot italien décrit une hausse progressive du volume sonore ?",
              options: ["Un decrescendo 📉", "Un crescendo 📈", "Un adagio ⏱️"],
              correctAnswer: "Un crescendo 📈"
            },
            {
              question: "Quel instrument fait partie de la famille des percussions dans un orchestre ?",
              options: ["Le hautbois 🎷", "La timbale 🥁", "Le violoncelle 🎻"],
              correctAnswer: "La timbale 🥁"
            },
            {
              question: "Quel mot italien indique le tempo le plus lent ?",
              options: ["Largo ⏱️", "Presto ⏱️", "Moderato ⏱️"],
              correctAnswer: "Largo ⏱️"
            },
            {
              question: "Combien de lignes horizontales comporte une portée musicale classique ?",
              options: ["3 lignes 🎼", "5 lignes 🎼", "7 lignes 🎼"],
              correctAnswer: "5 lignes 🎼"
            },
            {
              question: "Quelle note vaut à elle seule l'équivalent de 4 temps (soit une mesure entière de 4/4) ?",
              options: ["Une croche 🎼", "Une noire 🎼", "Une ronde 🎼"],
              correctAnswer: "Une ronde 🎼"
            },
            {
              question: "Que signifie la nuance 'p' (piano) sur une partition ?",
              options: ["Jouer fort 🔊", "Jouer doucement/faiblement 🎹", "Jouer très vite ⏱️"],
              correctAnswer: "Jouer doucement/faiblement 🎹"
            }
          ]
        },
        {
          id: "visualarts-architecture",
          title: "Perspective et Architecture",
          emoji: "🏛️",
          themeColor: "pink",
          badgeId: "visualarts-badge",
          badgeName: "Architecte Junior",
          badgeEmoji: "🏛️",
          cards: [
            {
              title: "L'invention de la perspective linéaire",
              text: "Avant la Renaissance, les peintres représentaient les personnages selon leur importance religieuse (les rois ou saints étaient peints géants, les serviteurs tout petits), sans réalisme spatial.\\n\\nAu 15ème siècle, l'architecte florentin Filippo Brunelleschi théorise la **perspective linéaire**. Cette méthode géométrique permet de créer l'illusion de la profondeur sur une surface plane. Elle repose sur l'utilisation d'une ligne d'horizon située à hauteur des yeux de l'observateur, et d'un ou plusieurs **points de fuite** vers lesquels convergent toutes les lignes de fuite parallèles de l'image.",
              emoji: "📐"
            },
            {
              title: "Les ordres architecturaux de l'Antiquité",
              text: "L'architecture classique européenne repose sur les règles de proportions inventées par la Grèce antique, appelées les **ordres architecturaux**. On distingue trois styles de colonnes principaux.\\n\\nL'ordre **dorique** est le plus ancien et le plus sobre, avec des colonnes robustes sans décorations sur leur chapiteau (sommet). L'ordre **ionique** est plus élancé et se caractérise par un chapiteau orné de deux spirales appelées volutes. Enfin, l'ordre **corinthien** est le plus riche et décoré, son chapiteau étant sculpté de motifs imitant des feuilles d'acanthe.",
              emoji: "🏛️"
            },
            {
              title: "L'arc en plein cintre et la voûte romaine",
              text: "Les Romains ont révolutionné la construction en perfectionnant l'utilisation de l'**arc en plein cintre** (un arc en demi-cercle parfait) et de la **voûte en berceau**.\\n\\nContrairement aux constructions grecques qui reposaient sur des poutres horizontales rectilignes limitant la portée, l'arc en plein cintre distribue le poids de la pierre de manière latérale vers les piliers de soutien. La pierre centrale au sommet de l'arc, appelée la **clé de voûte**, verrouille l'ensemble de la structure par compression, permettant de bâtir d'immenses ponts, aqueducs et coupoles.",
              emoji: "🧱"
            },
            {
              title: "L'architecture gothique et la croisée d'ogives",
              text: "Au Moyen Âge, à partir du 12ème siècle, l'architecture gothique succède à l'art roman et permet de construire des cathédrales incroyablement hautes et lumineuses grâce à deux innovations techniques.\\n\\nL'**arc brisé** (en pointe) réduit les poussées latérales par rapport à l'arc rond. La **croisée d'ogives** croise des arcs en diagonale pour concentrer tout le poids de la voûte sur quatre piliers d'angle fins. Pour soutenir ces piliers de l'extérieur, les bâtisseurs inventent les **arcs-boutants**, qui rejettent le poids vers de lourds massifs extérieurs, libérant les murs pour y installer d'immenses vitraux colorés.",
              emoji: "⛪"
            },
            {
              title: "Le Bauhaus et le fonctionnalisme moderne",
              text: "Au 20ème siècle, l'école allemande du **Bauhaus**, fondée par Walter Gropius en 1919, révolutionne le design et l'architecture moderne avec la maxime : \\"la fonction détermine la forme\\".\\n\\nCe mouvement rejette toute décoration superflue ou ornementation historique. L'architecture moderne utilise des matériaux industriels comme le béton armé, l'acier et le verre plat. Elle privilégie des structures géométriques épurées, des toits-terrasses et des façades entièrement vitrées (murs-rideaux), adaptant le bâtiment à son usage plutôt qu'à son apparence esthétique extérieure.",
              emoji: "🏢"
            }
          ],
          quiz: [
            {
              question: "Quel artiste et architecte florentin a théorisé la perspective linéaire au 15ème siècle ?",
              options: ["Leonardo da Vinci 🎨", "Filippo Brunelleschi 🏛️", "Michel-Ange 🎨"],
              correctAnswer: "Filippo Brunelleschi 🏛️"
            },
            {
              question: "Où convergent toutes les lignes de fuite parallèles dans un dessin en perspective ?",
              options: ["Sur la clé de voûte 🧱", "Vers le point de fuite sur la ligne d'horizon 📐", "Au centre de gravité ⚖️"],
              correctAnswer: "Vers le point de fuite sur la ligne d'horizon 📐"
            },
            {
              question: "Quel ordre de colonne grec est caractérisé par un chapiteau orné de volutes en spirale ?",
              options: ["L'ordre dorique 🏛️", "L'ordre ionique 🏛️", "L'ordre corinthien 🏛️"],
              correctAnswer: "L'ordre ionique 🏛️"
            },
            {
              question: "Quelle pierre centrale verrouille la structure d'un arc en plein cintre romain ?",
              options: ["La clé de voûte 🧱", "L'ogive ⛪", "Le chapiteau 🏛️"],
              correctAnswer: "La clé de voûte 🧱"
            },
            {
              question: "Quelle innovation gothique permet de reporter la poussée de la voûte vers des piliers extérieurs ?",
              options: ["La clé de voûte 🧱", "L'arc-boutant ⛪", "L'exosquelette 🕷️"],
              correctAnswer: "L'arc-boutant ⛪"
            },
            {
              question: "Quel ordre de colonne grec est sculpté de motifs imitant des feuilles d'acanthe ?",
              options: ["L'ordre dorique 🏛️", "L'ordre ionique 🏛️", "L'ordre corinthien 🏛️"],
              correctAnswer: "L'ordre corinthien 🏛️"
            },
            {
              question: "Quelle est la principale caractéristique d'une voûte gothique par rapport à une voûte romane ?",
              options: ["Elle est plus basse 🛖", "Elle utilise la croisée d'ogives et l'arc brisé pour monter très haut ⛪", "Elle est en bois 🪵"],
              correctAnswer: "Elle utilise la croisée d'ogives et l'arc brisé pour monter très haut ⛪"
            },
            {
              question: "Quelle célèbre école allemande de design a posé les bases du fonctionnalisme moderne en 1919 ?",
              options: ["L'école des Beaux-Arts 🎨", "Le Bauhaus 🏢", "L'Académie de Florence 🏛️"],
              correctAnswer: "Le Bauhaus 🏢"
            },
            {
              question: "Quel slogan résume la philosophie de conception de l'architecture moderne du 20ème siècle ?",
              options: ["L'art pour l'art 🎨", "La fonction détermine la forme 🏢", "Plus c'est décoré, mieux c'est 🏛️"],
              correctAnswer: "La fonction détermine la forme 🏢"
            },
            {
              question: "Pourquoi l'architecture gothique a-t-elle permis d'installer de grands vitraux colorés ?",
              options: ["Parce que le verre a été inventé à cette époque 🥛", "Parce que le poids est supporté par des piliers et des arcs-boutants extérieurs, libérant les murs ⛪", "Pour bloquer le vent 💨"],
              correctAnswer: "Parce que le poids est supporté par des piliers et des arcs-boutants extérieurs, libérant les murs ⛪"
            }
          ]
        }
      ]`;


function findClosingBracket(str, startIndex) {
  let count = 0;
  for (let i = startIndex; i < str.length; i++) {
    if (str[i] === '[') {
      count++;
    } else if (str[i] === ']') {
      count--;
      if (count === 0) {
        return i;
      }
    }
  }
  return -1;
}

// ============================================================================
// INJECTING THE COLLEGE DATA INTO THE "9-12" SECTIONS
// ============================================================================

const replacements = [
  animals_9_12,
  nature_9_12,
  body_9_12,
  space_9_12,
  maths_9_12,
  geography_9_12,
  french_9_12,
  arts_9_12
];

const universes = [
  'animals',
  'nature',
  'body',
  'space',
  'maths',
  'geography',
  'french',
  'arts'
];

for (let idx = 0; idx < universes.length; idx++) {
  const univKey = universes[idx];
  
  // Find where this universe starts
  const univIndex = fileContent.indexOf(`${univKey}: {`);
  if (univIndex === -1) {
    console.error(`Could not find universe key: ${univKey}`);
    process.exit(1);
  }
  
  // Replace the "9-12" array inside this universe
  const dIndex = fileContent.indexOf('"9-12": [', univIndex);
  if (dIndex === -1) {
    console.error(`Could not find "9-12": [ inside ${univKey}`);
    process.exit(1);
  }
  const dStart = dIndex + '"9-12": '.length;
  const dEnd = findClosingBracket(fileContent, dStart);
  if (dEnd === -1) {
    console.error(`Could not find closing bracket for "9-12" in ${univKey}`);
    process.exit(1);
  }
  fileContent = fileContent.substring(0, dStart) + replacements[idx] + fileContent.substring(dEnd + 1);
}

fs.writeFileSync(filePath, fileContent, 'utf8');
console.log('Successfully injected all 24 college-level lessons into the "9-12" sections!');
