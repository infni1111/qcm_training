// Generated from PostgreSQL db_course.cisco (81 rows) — do not hand-edit.
// Regenerate with: node /tmp/gen_data.mjs  (after dumping the table to /tmp/cisco_dump.json).
//
// Flashcard tree: root(0) -> chapters(1) -> chapter(2) -> card(3).
// Each card: { concept, explanation }. The UI is self-assessment ("I know" /
// "I don't know"), so cards have NO answers/children.

export const APP_DATA = {
  "level": 0,
  "id": "root",
  "title": "CCNA Training",
  "children": [
    {
      "level": 1,
      "id": "chapters",
      "title": "Chapters",
      "children": [
        {
          "level": 2,
          "id": "cisco",
          "title": "Cisco Concepts",
          "children": [
            {
              "level": 3,
              "id": "c1",
              "concept": "4-step of STA",
              "explanation": "elect a root Bridge, choose the Root Ports, choose de designated ports, block alternate ports"
            },
            {
              "level": 3,
              "id": "c2",
              "concept": "Root Bridge",
              "explanation": "is the central reference point of the entire STP topology"
            },
            {
              "level": 3,
              "id": "c3",
              "concept": "BID",
              "explanation": "Bridge ID, is the id which is what determines who wins the election"
            },
            {
              "level": 3,
              "id": "c4",
              "concept": "Bridge Priority",
              "explanation": "default value on all Cisco switches : 32768"
            },
            {
              "level": 3,
              "id": "c5",
              "concept": "Extended System ID",
              "explanation": "Simply the Vlan number whitch added to the priority so that each vlan can have its own independent stp instance"
            },
            {
              "level": 3,
              "id": "c6",
              "concept": "BPDU",
              "explanation": "the messages exchanged between switches during election, it is send every 2 seconds"
            },
            {
              "level": 3,
              "id": "c7",
              "concept": "monocast address",
              "explanation": "is mac address that the last bit of its first octet is 0"
            },
            {
              "level": 3,
              "id": "c8",
              "concept": "multicat address",
              "explanation": "is an mac address  01:00:5E:1xxx:xxxx:xxxx"
            },
            {
              "level": 3,
              "id": "c9",
              "concept": "importance de la redondance des chemins",
              "explanation": "La redondance des chemins assure de nombreux services réseau, en évitant le risque \nd avoir un point de défaillance unique"
            },
            {
              "level": 3,
              "id": "c10",
              "concept": "consequence boucle",
              "explanation": "Une boucle de couche 2 peut entraîner \nl instabilité de la table d adresses MAC, la saturation des liaisons et une utilisation élevée \nde processeur sur les commutateurs et les terminaux"
            },
            {
              "level": 3,
              "id": "c11",
              "concept": "prevention de boucle au niveau de la couche 3 et ipv4",
              "explanation": "Un routeur décrémentera la TTL (Time to Live) dans chaque \npaquet IPv4"
            },
            {
              "level": 3,
              "id": "c12",
              "concept": "prevention de boucle au niveau de la couche 3 et ipv6",
              "explanation": "le champ Hop Limit dans chaque paquet"
            },
            {
              "level": 3,
              "id": "c13",
              "concept": " Une tempête de diffusion",
              "explanation": "nombre anormalement élevé de diffusions qui \nsubmergent le réseau pendant une durée déterminée"
            },
            {
              "level": 3,
              "id": "c14",
              "concept": "causes tempetes de diffusion",
              "explanation": "Les tempêtes de diffusion peuvent être \nprovoquées par un problème matériel tel qu une carte d interface réseau \ndéfectueuse ou par une boucle de couche 2 dans le réseau."
            },
            {
              "level": 3,
              "id": "c15",
              "concept": "comment les voisins icmpv6 sont découvert",
              "explanation": "Les paquets IPv6 ne \nsoient jamais transférés en tant que diffusion de couche 2, la découverte de \nvoisins d ICMPv6 utilise des multidiffusions de couche 2."
            },
            {
              "level": 3,
              "id": "c16",
              "concept": "Que se passe t il lorsque un hôte est pris dans une boucle de couche 2",
              "explanation": "Lorsque un hôte est pris dans une boucle de couche 2, les autres hôtes du réseau ne peuvent pas y accéder"
            },
            {
              "level": 3,
              "id": "c17",
              "concept": "Comment la STA crée-t-elle une topologie sans boucle?",
              "explanation": "Sélection d un pont racine, Sélection d un pont racine , Créer une topologie sans boucle, Recalculer en cas de défaillance du lien"
            },
            {
              "level": 3,
              "id": "c18",
              "concept": "4 phases du STA",
              "explanation": "choix du pont racine, choix du port racine, choix des ports désignés, choix des ports alternatives ou bloqués "
            },
            {
              "level": 3,
              "id": "c19",
              "concept": "contenue d un BID",
              "explanation": "ID de pont contient une valeur de priorité, l adresse MAC du commutateur et un ID \nsystème étendu. La valeur d ID de pont la plus basse est déterminée par une combinaison de ces trois champs."
            },
            {
              "level": 3,
              "id": "c20",
              "concept": "valeur de priorité par défaut pour tout les commutateurs cisco",
              "explanation": "32768"
            },
            {
              "level": 3,
              "id": "c21",
              "concept": "ID du système étendue",
              "explanation": "La valeur de l ID système étendu est une valeur décimale \najoutée à la valeur de priorité du pont du BID afin d identifier le VLAN de cette BPDU."
            },
            {
              "level": 3,
              "id": "c22",
              "concept": "utilité de la mac dans le STA",
              "explanation": " Lorsque deux commutateurs sont configurés avec la même priorité et \npossèdent le même ID système étendu, le commutateur dont l adresse MAC de \nvaleur est la plus faible, exprimée au format hexadécimal, aura le BID le plus bas."
            },
            {
              "level": 3,
              "id": "c23",
              "concept": "Processus de détermination des coût du chemin racine",
              "explanation": "Les informations relatives au chemin, appelées coût du \nchemin racine interne, sont déterminées en additionnant les coûts de port individuels le long du \nchemin entre le commutateur et le pont racine., Lorsqu un commutateur reçoit le BPDU, il ajoute le coût du port d entrée du segment pour \ndéterminer le coût de chemin racine interne associé., Les coûts du port par défaut sont définis par la vitesse de fonctionnement du port, Bien qu un coût de port par défaut soit associé aux ports des commutateurs, il est possible de configurer le coût des ports "
            },
            {
              "level": 3,
              "id": "c24",
              "concept": "Coût de STP : IEEE 802.1D-1998",
              "explanation": "2 pour 10 Gbit/s, 4 pour 1 Gbit/s, 19 pour 100 Mbit/s, 100 pour 10 Mbit/s"
            },
            {
              "level": 3,
              "id": "c25",
              "concept": "Coût de RSTP : IEEE 802.1w-2004",
              "explanation": "2000 pour 10 Gbit/s, 20000 pour 1 Gbit/s, 200000 pour 100 Mbit/s, 2000000 pour 10 Mbit/s"
            },
            {
              "level": 3,
              "id": "c26",
              "concept": "port racine",
              "explanation": " Le port racine est le port le \nplus proche du pont racine en termes de \ncoûts généraux vers le pont racine"
            },
            {
              "level": 3,
              "id": "c27",
              "concept": " chemin racine interne",
              "explanation": "coût global d un port non root bridge vers le root bridge"
            },
            {
              "level": 3,
              "id": "c28",
              "concept": "port désigné",
              "explanation": "Le port désigné est un port sur le \nsegment qui a le coût du chemin \nracine interne vers le pont racine. En \nd autres termes, le port désigné a le \nmeilleur chemin pour recevoir le trafic \nqui conduit au pont racine."
            },
            {
              "level": 3,
              "id": "c29",
              "concept": "port alternatif ou bloqué",
              "explanation": " Ce qui n est pas un port racine ou un \nport désigné devient un port alternatif ou bloqué. "
            },
            {
              "level": 3,
              "id": "c30",
              "concept": "comment le commutateur détermine un port lorsque les cout sont égales",
              "explanation": "Lorsqu un commutateur possède plusieurs chemins d accès à coût égal vers le pont racine, le commutateur détermine un port en utilisant les critères suivants ID de pont d émetteur le plus faible Priorité de port le plus faible ID de port émetteur le plus faible"
            },
            {
              "level": 3,
              "id": "c31",
              "concept": "Port priority",
              "explanation": "propriété d un port utilisé pour l election du root port lorsque le bridge priority est le même"
            },
            {
              "level": 3,
              "id": "c32",
              "concept": "hello timer",
              "explanation": "intervalle entre les BPDU, avec la valeur par défaut de 2s , les valeurs authorisées partent de 1-10"
            },
            {
              "level": 3,
              "id": "c33",
              "concept": "forward delay timer",
              "explanation": "temps passé à l etat d ecoute et d apprentissage, valeur par default de 4 et peut être modifiée de 4 à 30 "
            },
            {
              "level": 3,
              "id": "c34",
              "concept": "max age time",
              "explanation": "durée maximal d attente d un commutateur avant de tenter de modifier sa topologie STP. valeur par défaut de 20 secondes et peut être modifiée de 4 à 40 s"
            },
            {
              "level": 3,
              "id": "c35",
              "concept": "blocage",
              "explanation": "BPDU sont en mode uniquement recevoir, pas de mise à jour de la mac table, pas de transmission de données"
            },
            {
              "level": 3,
              "id": "c36",
              "concept": "Etoute",
              "explanation": "BPDU sont ern mode recevoir et envoyé, pase de mise à jour de la mac table, pas de transmission de données"
            },
            {
              "level": 3,
              "id": "c37",
              "concept": "apprentissage",
              "explanation": "BPDU sont en mode recevoir et envoyé, mise à jour de la mac table, pas de transmission de données"
            },
            {
              "level": 3,
              "id": "c38",
              "concept": "acheminement",
              "explanation": "BPDU sont en mode recevoir et envoyer, mise à jour de la table, transmission de données"
            },
            {
              "level": 3,
              "id": "c39",
              "concept": "désactivé",
              "explanation": "BPDU sont en mode aucun envoie et reception, pas de mise à jour de la table, pas de transmission de données "
            },
            {
              "level": 3,
              "id": "c40",
              "concept": "PVST",
              "explanation": "Per-Vlan Spanning Tree"
            },
            {
              "level": 3,
              "id": "c41",
              "concept": "PVST+",
              "explanation": "PVST+ (Per-VLAN Spanning Tree) est une version améliorée du protocole STP proposée par Cisco, qui \noffre une instance Spanning Tree 802.1D séparée pour chaque VLAN configuré dans le réseau. PVST+ \nprend en charge PortFast, UplinkFast, BackboneFast, la protection BPDU, le filtre BPDU, la protection de racine et la protection de boucle."
            },
            {
              "level": 3,
              "id": "c42",
              "concept": "802.1D 2004",
              "explanation": "C est une version mise à jour du protocole STP standard, intégrant IEEE 802.1w."
            },
            {
              "level": 3,
              "id": "c43",
              "concept": "RSTP",
              "explanation": " Protocole RSTP (Rapid Spanning Tree Protocol) ou IEEE 802.1w est une version évoluée du protocole \nSTP, qui offre une convergence plus rapide."
            },
            {
              "level": 3,
              "id": "c44",
              "concept": "Rapid PVST+",
              "explanation": "Il s agit d une version améliorée de RSTP proposée par Cisco qui utilise PVST+ et fournit une instance \ndistincte de 802.1w par VLAN. Chaque instance séparée prend en charge PortFast, la protection BPDU, le filtre BPDU, la protection de racine et la protection de boucle."
            },
            {
              "level": 3,
              "id": "c45",
              "concept": "MSTP",
              "explanation": "MSTP (Multiple Spanning Tree Protocol) est un standard IEEE inspiré de l implémentation MISTP plus \nancienne de Cisco (Multiple Instance STP). MSTP mappe plusieurs VLAN dans une même instance \nSpanning Tree"
            },
            {
              "level": 3,
              "id": "c46",
              "concept": "MST",
              "explanation": "Multiple SpanningTree(MST) est l implémentation Cisco de MSTP, elle fournit jusqu à 16 instances du \nprotocole RSTP et allie plusieurs VLAN avec la même topologie physique et logique au sein d une \ninstance courante du protocole RSTP. Chaque instance prend en charge PortFast, la protection BPDU, \nle filtre BPDU, la protection de racine et la protection de boucle."
            },
            {
              "level": 3,
              "id": "c47",
              "concept": "corespondance etat entre RSTP ET STP ",
              "explanation": "disabled, blocking, listening de stp correspond à discarding de rstp, learning de stp corespond à learning de rstp, forwarding de stp corespond à forwarding de rstp"
            },
            {
              "level": 3,
              "id": "c48",
              "concept": "corespondance type de port entre stp et rstp",
              "explanation": "root port de stp correspond à root port de rstp, designated port de stp corespondand à designated port de rstp, blocking port de stp correspond à backup port et alternate port de rstp"
            },
            {
              "level": 3,
              "id": "c49",
              "concept": "PortFast",
              "explanation": "c est une configuration du port qui pert à ce port de passer directement de l Etat blockage à l etat transfert "
            },
            {
              "level": 3,
              "id": "c50",
              "concept": "Protection BPDU",
              "explanation": " Lorsqu elle est activée, la protection BPDU place immédiatement le port à \nl état errdisabled (erreur désactivée) lors de la réception d une trame BPDU"
            },
            {
              "level": 3,
              "id": "c51",
              "concept": "key",
              "explanation": "value"
            },
            {
              "level": 3,
              "id": "c52",
              "concept": "OSPF",
              "explanation": "OSPF (Open Shortest Path First) est un protocole de routage à état de liens qui a été\ndéveloppé comme alternative au protocole de routage à vecteur de distance, ou RIP"
            },
            {
              "level": 3,
              "id": "c53",
              "concept": "stub network",
              "explanation": "A stub network is a network that has only one connection to the rest of the network."
            },
            {
              "level": 3,
              "id": "c54",
              "concept": "transit network",
              "explanation": "A transit network is a network that carries traffic between other networks."
            },
            {
              "level": 3,
              "id": "c55",
              "concept": "Paquet DBD",
              "explanation": "Paquet DBD de description de base de données"
            },
            {
              "level": 3,
              "id": "c56",
              "concept": "Paquet LSR",
              "explanation": "Paquet LSR de demande d état de liens"
            },
            {
              "level": 3,
              "id": "c57",
              "concept": "Paquet LSU",
              "explanation": "Paquet LSU de mise à jour d état de liens"
            },
            {
              "level": 3,
              "id": "c59",
              "concept": "Paquet LSA",
              "explanation": "Paquet d accusé de reception d etats de liens"
            },
            {
              "level": 3,
              "id": "c60",
              "concept": "Base de données de contiguïté",
              "explanation": "Table de voisinage , •Répertorie tous les routeurs voisins avec lesquels un routeur a établi une communication bidirectionnelle. •Cette table est unique pour chaque routeur •Accessible via la commande show ip ospf neighbor ."
            },
            {
              "level": 3,
              "id": "c61",
              "concept": "\nBase de données d états de liens (LSDB)",
              "explanation": "Table topologique •Liste des informations relatives à tous les autres routeurs du réseau\n•La base de données représente le réseau LSDB.\n•Tous les routeurs au sein d une zone possèdent des LSDB identiques\n•Accessible via la commande show ip ospf database"
            },
            {
              "level": 3,
              "id": "c62",
              "concept": "\nBase de\ndonnées de\nréachemine\nment",
              "explanation": "Table de\nroutage •Liste de routes générée lors de l exécution d un algorithme sur la base de données d états\nde liens. •La table de routage de chaque routeur est unique et contient des informations sur les\nmodalités (la façon et l endroit) d envoi des paquets aux autres routeurs\n•Accessible via la commande show ip route "
            },
            {
              "level": 3,
              "id": "c63",
              "concept": "étapes de routage d état de lien",
              "explanation": " 1. Établissement des contiguïtés de voisinage\n2. Échange d annonces à état de liens\n3. Créer la base de données de l état des liens\n4. Exécution de l algorithme SPF\n5. Choisissez la meilleure route"
            },
            {
              "level": 3,
              "id": "c64",
              "concept": "Zone OSPF",
              "explanation": "groupe de routeurs qui\npartagent les mêmes informations d état de liens dans leurs LSDB"
            },
            {
              "level": 3,
              "id": "c65",
              "concept": "OSPF à zone unique",
              "explanation": "Tous les routeurs sont dans une zone. La meilleure pratique\nconsiste à utiliser la zone 0."
            },
            {
              "level": 3,
              "id": "c66",
              "concept": "OSPF à zone plusieurs",
              "explanation": "le protocole OSPF est mis en œuvre à l aide de plusieurs zones,\nde façon hiérarchique. Toutes les zones doivent se connecter à la zone de réseau\nfédérateur (zone 0). Les routeurs qui relient les zones entre elles sont des routeurs ABR\n(Area Border Router)."
            },
            {
              "level": 3,
              "id": "c67",
              "concept": "Avantages conception topologie hiérarchique ospf",
              "explanation": "Tables de routage plus petites, Réduction de la charge de mise à jour des états de liens, Réduction de la fréquence des calculs SPF"
            },
            {
              "level": 3,
              "id": "c68",
              "concept": "OSPFv3",
              "explanation": "OSPFv3 est l équivalent OSPFv2 pour l échange de préfixes IPv6. L OSPFv3\néchange des informations de routage pour renseigner la table de routage IPv6 avec\ndes préfixes distants."
            },
            {
              "level": 3,
              "id": "c69",
              "concept": "État Down",
              "explanation": "Aucun paquet Hello reçu = Down.\n•Le routeur envoie des paquets Hello.\n•Transition vers l état Init."
            },
            {
              "level": 3,
              "id": "c70",
              "concept": "Etat init",
              "explanation": "•Les paquets Hello sont reçus du voisin.\n•Ils contiennent des ID de routeur du routeur expéditeur.\n•Transition vers l état Two-Way."
            },
            {
              "level": 3,
              "id": "c71",
              "concept": "État Two-Way",
              "explanation": "•Dans cet état, la communication entre les deux routeurs est\nbidirectionnelle. •Sur les liens à accès multiple, les routeurs choisissent un DR et un BDR.\n•Transition vers l état ExStart."
            },
            {
              "level": 3,
              "id": "c72",
              "concept": "État ExStart",
              "explanation": " Sur les réseaux point à point, les deux routeurs décident quel routeur\ninitiera l échange de paquets DBD et décident du numéro de séquence de\npaquets DBD initial."
            },
            {
              "level": 3,
              "id": "c73",
              "concept": "État Exchange",
              "explanation": "•Les routeurs échangent des paquets DBD.\n•Si d autres informations de routeur sont nécessaires, passez à l état\nLoading. Sinon, passez à l état Full."
            },
            {
              "level": 3,
              "id": "c74",
              "concept": "État Loading",
              "explanation": "•Les paquets LSR et LSU permettent d obtenir des informations\nsupplémentaires sur les routes.\n•Les routes sont traitées à l aide de l algorithme SPF.\n•Transition vers l état Full."
            },
            {
              "level": 3,
              "id": "c75",
              "concept": "État Full",
              "explanation": "La base de données d état de liaison du routeur est entièrement\nsynchronisée."
            },
            {
              "level": 3,
              "id": "c76",
              "concept": "État Down vers état Init",
              "explanation": "Lorsque OSPFv2 est activé sur l interface, R1 passe de Down à Init et commence à\nenvoyer des paquets Hello OSPFv2 hors de l interface pour tenter de découvrir des\nvoisins."
            },
            {
              "level": 3,
              "id": "c77",
              "concept": "État Init",
              "explanation": "Lorsqu un R2 reçoit un paquet Hello du routeur R1 précédemment inconnu, il ajoute l ID\ndu routeur de R1 à la liste des voisins et répond avec un paquet Hello contenant son\npropre ID de routeur."
            },
            {
              "level": 3,
              "id": "c78",
              "concept": "État Two-Way",
              "explanation": "R1 reçoit le paquet Hello de R2 et remarque que le message contient l ID du routeur R1\ndans la liste des voisins de R2. R1 ajoute l ID de routeur de R2 à la liste des voisins et\neffectue des transitions vers l état bidirectionnel.\nSi R1 et R2 sont connectés à une liaison point à point, ils passent à l état ExStart\nSi R1 et R2 sont connectés sur un réseau Ethernet commun, l option DR/BDR se produit."
            },
            {
              "level": 3,
              "id": "c79",
              "concept": "Choisir le routeur\ndésigné (DR) et le\nrouteur désigné de\nsecours (BDR)",
              "explanation": "L option DR et BDR se produit, où le routeur ayant l ID de routeur le plus élevé ou la\npriorité la plus élevée est élu comme DR, et le deuxième plus élevé est le BDR"
            },
            {
              "level": 3,
              "id": "c80",
              "concept": " Synchronisation des bases de données OSPF",
              "explanation": "Décider du premier routeur, DBD Exchange:, Envoyer un LSR "
            },
            {
              "level": 3,
              "id": "c81",
              "concept": "problématiques pour le protocole OSPF\nconcernant l inondation des LSA",
              "explanation": "Création de plusieurs contiguïtés, Diffusion massive de paquets LSA );\n);\n);\n;\n'"
            },
            {
              "level": 3,
              "id": "c82",
              "concept": "DROTHER",
              "explanation": "un DROTHER est un routeur qui n est ni le routeur DR\nni le routeur BDR."
            }
          ]
        }
      ]
    }
  ]
};

// Live alias to the single chapter's children (the 81 concept cards).
export const CHAPTERS = APP_DATA.children[0].children;
