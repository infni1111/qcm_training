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
        },
        {
          "level": 2,
          "id": "mod1",
          "title": "Chapter 1 — OSPF Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch1c1",
              "concept": "What OSPF is",
              "explanation": "OSPF is a link-state routing protocol that was developed as an alternative to the distance vector routing protocol, RIP."
            },
            {
              "level": 3,
              "id": "ch1c2",
              "concept": "OSPF and the concept of areas",
              "explanation": "OSPF is a link-state routing protocol that supports the concept of areas to provide scalability."
            },
            {
              "level": 3,
              "id": "ch1c3",
              "concept": "What a link is in OSPF",
              "explanation": "A link is an interface on a router. A link is also a network segment that connects two routers, or a stub network such as an Ethernet LAN connected to a single router."
            },
            {
              "level": 3,
              "id": "ch1c4",
              "concept": "Link-state information",
              "explanation": "All link-state information includes the network prefix, the prefix length, and the cost."
            },
            {
              "level": 3,
              "id": "ch1c5",
              "concept": "Role of routing protocol messages",
              "explanation": "All routing protocols use routing protocol messages to exchange routing information. The messages help build data structures, which are then processed using a routing algorithm."
            },
            {
              "level": 3,
              "id": "ch1c6",
              "concept": "The five OSPF packet types",
              "explanation": "Routers running OSPF exchange messages to convey routing information using five types of packets: the hello packet, the database description packet, the link-state request packet, the link-state update packet, and the link-state acknowledgment packet."
            },
            {
              "level": 3,
              "id": "ch1c7",
              "concept": "The three OSPF databases",
              "explanation": "OSPF messages are used to create and maintain three OSPF databases: the adjacency database creates the neighbor table, the link-state database (LSDB) creates the topology table, and the forwarding database creates the routing table."
            },
            {
              "level": 3,
              "id": "ch1c8",
              "concept": "Dijkstra's SPF algorithm and cost",
              "explanation": "The router creates the topology table using the results of calculations based on Dijkstra's SPF algorithm. The SPF algorithm is based on the cumulative cost to reach a destination. In OSPF, cost is used to determine the best path to the destination."
            },
            {
              "level": 3,
              "id": "ch1c9",
              "concept": "Link-state routing process (convergence)",
              "explanation": "To maintain routing information, OSPF routers complete a generic link-state routing process to reach convergence: establish adjacencies, exchange link-state advertisements, build the link-state database, run the SPF algorithm, and choose the best route."
            },
            {
              "level": 3,
              "id": "ch1c10",
              "concept": "Single-area OSPF: area number",
              "explanation": "With single-area OSPF any number can be used for the area; the best practice is to use area 0."
            },
            {
              "level": 3,
              "id": "ch1c11",
              "concept": "When single-area OSPF is useful",
              "explanation": "Single-area OSPF is useful in smaller networks with few routers."
            },
            {
              "level": 3,
              "id": "ch1c12",
              "concept": "Multiarea OSPF and hierarchical routing",
              "explanation": "With multiarea OSPF, a large routing domain can be divided into smaller areas to support hierarchical routing. With hierarchical routing, routing still occurs between the areas (interarea routing), while most of the processor-intensive routing operations, such as recalculating the database, are kept within an area."
            },
            {
              "level": 3,
              "id": "ch1c13",
              "concept": "OSPFv3 and IPv6",
              "explanation": "OSPFv3 is the OSPFv2 equivalent for exchanging IPv6 prefixes. Remember that in IPv6 the network address is referred to as the prefix and the subnet mask is called the prefix length."
            },
            {
              "level": 3,
              "id": "ch1c14",
              "concept": "OSPF LSP packets (Hello, DBD, LSR, LSU, LSAck)",
              "explanation": "OSPF uses link-state packets (LSPs) to establish and maintain neighbor adjacencies and to exchange routing updates: 1 Hello, 2 DBD, 3 LSR, 4 LSU, and 5 LSAck."
            },
            {
              "level": 3,
              "id": "ch1c15",
              "concept": "Role of LSU packets",
              "explanation": "LSU packets are also used to forward OSPF routing updates, such as link changes."
            },
            {
              "level": 3,
              "id": "ch1c16",
              "concept": "Role of Hello packets",
              "explanation": "Hello packets are used to discover OSPF neighbors, establish neighbor adjacencies, advertise the parameters that both routers must agree on to become neighbors, and elect the designated router (DR) and backup designated router (BDR) on multiaccess networks such as Ethernet. Point-to-point links do not require a DR or BDR."
            },
            {
              "level": 3,
              "id": "ch1c17",
              "concept": "Important fields in the Hello packet",
              "explanation": "Some important fields in the hello packet are the type, router ID, area ID, network mask, hello interval, router priority, dead interval, DR, BDR, and the list of neighbors."
            },
            {
              "level": 3,
              "id": "ch1c18",
              "concept": "OSPF convergence states",
              "explanation": "The states through which OSPF progresses to reach convergence are the Down state, Init state, Two-Way state, ExStart state, Exchange state, Loading state, and Full state."
            },
            {
              "level": 3,
              "id": "ch1c19",
              "concept": "Neighbor discovery when OSPF is enabled",
              "explanation": "When OSPF is enabled on an interface, the router must determine whether there is another OSPF neighbor on the link by sending a hello packet that contains its router ID out all OSPF-enabled interfaces."
            },
            {
              "level": 3,
              "id": "ch1c20",
              "concept": "Multicast address of the Hello packet",
              "explanation": "The hello packet is sent to the reserved All OSPF Routers IPv4 multicast address 224.0.0.5. Only OSPFv2 routers process these packets."
            },
            {
              "level": 3,
              "id": "ch1c21",
              "concept": "Establishing an adjacency (Hello from an unknown neighbor)",
              "explanation": "When an OSPF-enabled neighbor router receives a hello packet with a router ID that is not in its neighbor list, the receiving router attempts to establish an adjacency with the initiating router."
            },
            {
              "level": 3,
              "id": "ch1c22",
              "concept": "After the Two-Way state",
              "explanation": "After the two-way communication state, the routers progressively transition to database synchronization states."
            },
            {
              "level": 3,
              "id": "ch1c23",
              "concept": "OSPF challenges on multiaccess networks",
              "explanation": "Multiaccess networks can create two challenges for OSPF regarding LSA flooding: the creation of multiple adjacencies and the extensive flooding of LSA packets."
            },
            {
              "level": 3,
              "id": "ch1c24",
              "concept": "Impact of increasing the number of routers",
              "explanation": "A dramatic increase in the number of routers also dramatically increases the number of LSAs exchanged between the routers."
            },
            {
              "level": 3,
              "id": "ch1c25",
              "concept": "Why DR/BDR election is needed",
              "explanation": "This LSA flooding significantly affects the operation of OSPF. If every router on a multiaccess network had to flood and acknowledge all received LSAs to all other routers on that multiaccess network, the network traffic would become chaotic. This is why a DR and BDR election is necessary."
            },
            {
              "level": 3,
              "id": "ch1c26",
              "concept": "Role of the DR and BDR on multiaccess networks",
              "explanation": "On multiaccess networks, OSPF elects a DR to be the collection and distribution point for sent and received LSAs. A BDR is also elected in case the DR router fails."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod2",
          "title": "Chapter 2 — Single-Area OSPFv2 Configuration",
          "children": [
            {
              "level": 3,
              "id": "ch2c1",
              "concept": "Enabling OSPFv2",
              "explanation": "You can enable OSPFv2 using the router ospf process-id command in global configuration mode. The process-id value is a number between 1 and 65,535 and is selected by the network administrator."
            },
            {
              "level": 3,
              "id": "ch2c2",
              "concept": "OSPF router ID",
              "explanation": "An OSPF router ID is a 32-bit value represented as an IPv4 address. The router ID is used by an OSPF-enabled router to synchronize the OSPF databases and to participate in the DR and BDR election."
            },
            {
              "level": 3,
              "id": "ch2c3",
              "concept": "How the router ID is determined",
              "explanation": "Cisco routers derive the router ID based on one of three criteria, in this order: 1) the router ID is explicitly configured using the router-id rid command in OSPF router configuration mode, 2) the router chooses the highest IPv4 address of any configured loopback interfaces, or 3) the router chooses the highest active IPv4 address of any of its physical interfaces."
            },
            {
              "level": 3,
              "id": "ch2c4",
              "concept": "The network command syntax",
              "explanation": "The basic syntax of the network command is network network-address wildcard-mask area area-id. Any interface on a router that matches the network address in the network command will be enabled to send and receive OSPF packets."
            },
            {
              "level": 3,
              "id": "ch2c5",
              "concept": "area-id in single-area OSPFv2",
              "explanation": "When configuring single-area OSPFv2, the network command must be configured with the same area-id value on all routers. The wildcard mask is typically the inverse of the subnet mask configured on that interface, but it can also be a quad-zero wildcard mask, which would specify the exact interface."
            },
            {
              "level": 3,
              "id": "ch2c6",
              "concept": "Configuring OSPF on the interface",
              "explanation": "To configure OSPF directly on the interface, use the ip ospf interface configuration mode command. The syntax is ip ospf process-id area area-id."
            },
            {
              "level": 3,
              "id": "ch2c7",
              "concept": "Passive interface",
              "explanation": "Use the passive-interface router configuration mode command to prevent a router interface from transmitting routing messages, while still allowing that network to be advertised to other routers."
            },
            {
              "level": 3,
              "id": "ch2c8",
              "concept": "Disabling DR/BDR election on point-to-point links",
              "explanation": "The DR/BDR election process is not required because there can only be two routers on the point-to-point network between R1 and R2. Use the ip ospf network point-to-point interface configuration command on all interfaces where you want to disable the DR/BDR election process."
            },
            {
              "level": 3,
              "id": "ch2c9",
              "concept": "Loopback interfaces advertised as point-to-point",
              "explanation": "By default, loopback interfaces are advertised as /32 host routes. To simulate a real LAN, the Loopback0 interface is configured as a point-to-point network."
            },
            {
              "level": 3,
              "id": "ch2c10",
              "concept": "Role of the DR",
              "explanation": "The DR is responsible for collecting and distributing LSAs. The DR uses the IPv4 multicast address 224.0.0.5, which is intended for all OSPF routers. When the DR stops producing hello packets, the BDR promotes itself as DR and assumes the role. All other routers become a DROTHER."
            },
            {
              "level": 3,
              "id": "ch2c11",
              "concept": "How DROTHERs send packets",
              "explanation": "DROTHERs use the multicast address 224.0.0.6 (all designated routers) to send OSPF packets to the DR and BDR. Only the DR and BDR listen on 224.0.0.6."
            },
            {
              "level": 3,
              "id": "ch2c12",
              "concept": "Verifying OSPFv2 router roles",
              "explanation": "To verify OSPFv2 router roles, use the show ip ospf interface command."
            },
            {
              "level": 3,
              "id": "ch2c13",
              "concept": "Verifying OSPFv2 adjacencies",
              "explanation": "To verify OSPFv2 adjacencies, use the show ip ospf neighbor command. The neighbor state on multiaccess networks can be FULL/DROTHER, FULL/DR, FULL/BDR, or 2-WAY/DROTHER."
            },
            {
              "level": 3,
              "id": "ch2c14",
              "concept": "DR and BDR election decision",
              "explanation": "The OSPF DR and BDR election decision is based on the router with the highest interface priority becoming the DR. The router with the second highest interface priority is elected as the BDR. If the interface priorities are equal, the router with the highest router ID is chosen as DR. The router with the second highest router ID is chosen as BDR."
            },
            {
              "level": 3,
              "id": "ch2c15",
              "concept": "Interface priority range",
              "explanation": "The interface priority can be configured to be any number between 0 and 255. If the interface priority value is set to 0, that interface cannot be elected as DR or BDR. The default priority of multiaccess broadcast interfaces is 1."
            },
            {
              "level": 3,
              "id": "ch2c16",
              "concept": "OSPF DR/BDR elections are not preemptive",
              "explanation": "OSPF DR and BDR selections are not preemptive. If the DR fails, the BDR automatically becomes the DR."
            },
            {
              "level": 3,
              "id": "ch2c17",
              "concept": "Setting interface priority",
              "explanation": "To set the priority of an interface, use the ip ospf priority value command, where the value is 0 to 255. If the value is 0, the router will not become DR or BDR. If the value is between 1 and 255, the router with the highest priority value will more likely become the DR or BDR for the interface."
            },
            {
              "level": 3,
              "id": "ch2c18",
              "concept": "OSPF metric is cost",
              "explanation": "OSPF uses cost as the metric. A lower cost indicates a better path than a higher cost."
            },
            {
              "level": 3,
              "id": "ch2c19",
              "concept": "OSPF cost formula",
              "explanation": "The formula used to calculate OSPF cost is: Cost = reference bandwidth / interface bandwidth."
            },
            {
              "level": 3,
              "id": "ch2c20",
              "concept": "Adjusting the reference bandwidth",
              "explanation": "Because the OSPF cost value must be an integer, FastEthernet, Gigabit Ethernet, and 10 GigE interfaces share the same cost. To correct this, you can adjust the reference bandwidth using the auto-cost reference-bandwidth command on each OSPF router, or manually set the OSPF cost value using the ip ospf cost command."
            },
            {
              "level": 3,
              "id": "ch2c21",
              "concept": "Accumulated cost of an OSPF route",
              "explanation": "The cost of an OSPF route is the accumulated value from one router to the destination network. OSPF cost values can be manipulated to influence the route chosen by OSPF. To change the cost value advertised by the local OSPF router to other OSPF routers, use the ip ospf cost value interface configuration command."
            },
            {
              "level": 3,
              "id": "ch2c22",
              "concept": "Dead interval expiration",
              "explanation": "If the Dead interval expires before the routers receive a hello packet, OSPF removes the neighbor from its LSDB. The router floods the information about the down neighbor to the LSDB out all OSPF-enabled interfaces."
            },
            {
              "level": 3,
              "id": "ch2c23",
              "concept": "Default dead interval",
              "explanation": "Cisco uses a default value of 4 times the hello interval, or 40 seconds, on multiaccess and point-to-point networks. To verify the OSPFv2 interface intervals, use the show ip ospf interface command."
            },
            {
              "level": 3,
              "id": "ch2c24",
              "concept": "Modifying hello and dead intervals",
              "explanation": "The OSPFv2 hello and dead intervals can be manually modified using the following interface configuration mode commands: ip ospf hello-interval and ip ospf dead-interval."
            },
            {
              "level": 3,
              "id": "ch2c25",
              "concept": "ASBR and default route propagation",
              "explanation": "In OSPF terminology, the router located between an OSPF routing domain and a non-OSPF network is called the ASBR. To propagate a default route, the ASBR must be configured with a default static route using the ip route 0.0.0.0 0.0.0.0 [next-hop-address | exit-intf] command, and the default-information originate router configuration command."
            },
            {
              "level": 3,
              "id": "ch2c26",
              "concept": "Verifying the default route on the ASBR",
              "explanation": "Verify the default route settings on the ASBR with the show ip route command."
            },
            {
              "level": 3,
              "id": "ch2c27",
              "concept": "Additional OSPF verification commands",
              "explanation": "Additional commands to determine that OSPF is operating as expected include: show ip ospf neighbor, show ip protocols, show ip ospf, and show ip ospf interface."
            },
            {
              "level": 3,
              "id": "ch2c28",
              "concept": "Verifying adjacencies with show ip ospf neighbor",
              "explanation": "Use the show ip ospf neighbor command to verify that an adjacency is properly established between the router and its neighbor routers."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod3",
          "title": "Chapter 3 — Network Security Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch3c1",
              "concept": "Impact of network security breaches",
              "explanation": "Network security breaches can disrupt e-commerce, cause the loss of business data, threaten people's privacy, and compromise the integrity of information."
            },
            {
              "level": 3,
              "id": "ch3c2",
              "concept": "Addressing vulnerabilities",
              "explanation": "Vulnerabilities must be addressed before they become a threat and are exploited. Mitigation techniques are required before, during, and after an attack."
            },
            {
              "level": 3,
              "id": "ch3c3",
              "concept": "Attack vector",
              "explanation": "An attack vector is a path by which a threat actor can gain access to a server, host, or network. Attack vectors originate from inside or outside the corporate network."
            },
            {
              "level": 3,
              "id": "ch3c4",
              "concept": "Threat actor",
              "explanation": "The term 'threat actor' includes hackers and any device, person, group, or nation state that is, intentionally or not, the source of an attack."
            },
            {
              "level": 3,
              "id": "ch3c5",
              "concept": "Evolution of attack tools",
              "explanation": "Attack tools have become more sophisticated and highly automated. These new tools require less technical knowledge to implement."
            },
            {
              "level": 3,
              "id": "ch3c6",
              "concept": "Most common attack types",
              "explanation": "The most common types of attacks are: eavesdropping, data modification, IP address spoofing, password, denial of service, man-in-the-middle, compromised key, and sniffer."
            },
            {
              "level": 3,
              "id": "ch3c7",
              "concept": "Three common types of malware",
              "explanation": "The three most common types of malware are worms, viruses, and Trojan horses."
            },
            {
              "level": 3,
              "id": "ch3c8",
              "concept": "Network attack categories",
              "explanation": "Networks are susceptible to the following types of attacks: reconnaissance, access, and DoS."
            },
            {
              "level": 3,
              "id": "ch3c9",
              "concept": "Types of access attacks",
              "explanation": "The types of access attacks are: password, spoofing, trust exploitation, port redirection, man-in-the-middle, and buffer overflow."
            },
            {
              "level": 3,
              "id": "ch3c10",
              "concept": "IP attack techniques",
              "explanation": "IP attack techniques include: ICMP attacks, amplification and reflection, address spoofing, MITM, and session hijacking."
            },
            {
              "level": 3,
              "id": "ch3c11",
              "concept": "ICMP used for reconnaissance",
              "explanation": "Threat actors use ICMP for reconnaissance and scanning attacks. They launch information-gathering attacks to map a network topology, discover which hosts are active (reachable), identify the host operating system (OS fingerprinting), and determine the state of a firewall. Threat actors often use amplification and reflection techniques to create DoS attacks."
            },
            {
              "level": 3,
              "id": "ch3c12",
              "concept": "TCP and UDP attacks",
              "explanation": "TCP attacks include: the TCP SYN flood attack, the TCP reset attack, and TCP session hijacking. UDP flood attacks send a flood of UDP packets, often from a spoofed host, to a server on the subnet. The result is very similar to a DoS attack."
            },
            {
              "level": 3,
              "id": "ch3c13",
              "concept": "Gratuitous ARP and ARP poisoning",
              "explanation": "Any client can send an unsolicited ARP reply called a 'gratuitous ARP.' This means any host can claim to be the owner of any IP or MAC address. A threat actor can poison the ARP cache of devices on the local network, creating a MITM attack to redirect traffic."
            },
            {
              "level": 3,
              "id": "ch3c14",
              "concept": "DNS attacks",
              "explanation": "DNS attacks include: open resolver attacks, stealth attacks, domain shadowing attacks, and tunneling attacks. To stop DNS tunneling, the network administrator must use a filter that inspects DNS traffic."
            },
            {
              "level": 3,
              "id": "ch3c15",
              "concept": "DHCP spoofing attack",
              "explanation": "A DHCP spoofing attack occurs when a rogue DHCP server is connected to the network and provides false IP configuration parameters to legitimate clients."
            },
            {
              "level": 3,
              "id": "ch3c16",
              "concept": "CIA triad",
              "explanation": "Most organizations follow the CIA information security triad: confidentiality, integrity, and availability."
            },
            {
              "level": 3,
              "id": "ch3c17",
              "concept": "Defense in depth",
              "explanation": "To ensure secure communications across both public and private networks, you must secure devices, including routers, switches, servers, and hosts. This is known as defense in depth."
            },
            {
              "level": 3,
              "id": "ch3c18",
              "concept": "Firewall",
              "explanation": "A firewall is a system, or group of systems, that enforces an access control policy between networks."
            },
            {
              "level": 3,
              "id": "ch3c19",
              "concept": "IDS and IPS",
              "explanation": "To defend against fast and evolving attacks, you may need an intrusion detection system (IDS) or the more scalable intrusion prevention systems (IPS)."
            },
            {
              "level": 3,
              "id": "ch3c20",
              "concept": "Four elements of secure communications",
              "explanation": "The four elements of secure communications are data integrity, origin authentication, data confidentiality, and data non-repudiation."
            },
            {
              "level": 3,
              "id": "ch3c21",
              "concept": "Hash functions",
              "explanation": "Hash functions guarantee that message data has not been changed accidentally or intentionally."
            },
            {
              "level": 3,
              "id": "ch3c22",
              "concept": "Well-known hash functions",
              "explanation": "Three well-known hash functions are MD5 with a 128-bit digest, the SHA hashing algorithm, and SHA-2."
            },
            {
              "level": 3,
              "id": "ch3c23",
              "concept": "HMAC",
              "explanation": "To add authentication to integrity assurance, use a keyed-hash message authentication code (HMAC). HMAC is calculated using any cryptographic algorithm that combines a cryptographic hash function with a secret key."
            },
            {
              "level": 3,
              "id": "ch3c24",
              "concept": "Symmetric encryption algorithms",
              "explanation": "Symmetric encryption algorithms using DES, 3DES, AES, SEAL, and RC are based on the premise that each communicating party knows the pre-shared key."
            },
            {
              "level": 3,
              "id": "ch3c25",
              "concept": "Asymmetric algorithms",
              "explanation": "Data confidentiality can also be ensured using asymmetric algorithms, including Rivest, Shamir, and Adleman (RSA) and public key infrastructure (PKI). Diffie-Hellman (DH) is an asymmetric mathematical algorithm where two computers generate an identical shared secret key without having communicated before."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod4",
          "title": "Chapter 4 — ACL Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch4c1",
              "concept": "What an ACL is",
              "explanation": "An access control list (ACL) is a series of IOS commands that determine whether a router forwards or drops packets based on the information found in the packet header."
            },
            {
              "level": 3,
              "id": "ch4c2",
              "concept": "Default ACL state",
              "explanation": "A router does not have any ACLs configured by default."
            },
            {
              "level": 3,
              "id": "ch4c3",
              "concept": "ACL applied to an interface",
              "explanation": "However, when an ACL is applied to an interface, the router additionally evaluates all network packets as they cross the interface to determine whether they can be forwarded."
            },
            {
              "level": 3,
              "id": "ch4c4",
              "concept": "ACEs",
              "explanation": "An ACL uses a sequential list of permit or deny statements, known as ACEs."
            },
            {
              "level": 3,
              "id": "ch4c5",
              "concept": "Two types of ACLs",
              "explanation": "Cisco routers support two types of ACLs: standard ACLs and extended ACLs."
            },
            {
              "level": 3,
              "id": "ch4c6",
              "concept": "Inbound ACL",
              "explanation": "An inbound ACL filters packets before they are routed to the outbound interface. If the packet is permitted by the ACL, it is then processed for routing."
            },
            {
              "level": 3,
              "id": "ch4c7",
              "concept": "Outbound ACL",
              "explanation": "Outbound ACLs filter packets after they have been routed, regardless of the exit interface."
            },
            {
              "level": 3,
              "id": "ch4c8",
              "concept": "IPv4 ACE wildcard mask",
              "explanation": "An IPv4 ACE uses a 32-bit wildcard mask to determine which bits of the address to examine for a match."
            },
            {
              "level": 3,
              "id": "ch4c9",
              "concept": "How a wildcard mask works",
              "explanation": "A wildcard mask is similar to a subnet mask in that it uses the ANDing process to identify which bits in an IPv4 address to match. However, they differ in the way they match binary 1s and 0s. A wildcard mask bit 0 matches the value of the corresponding bit in the address; a wildcard mask bit 1 ignores the value of the corresponding bit in the address."
            },
            {
              "level": 3,
              "id": "ch4c10",
              "concept": "Calculating a wildcard mask",
              "explanation": "Another way to calculate a wildcard mask is to subtract the subnet mask from 255.255.255.255."
            },
            {
              "level": 3,
              "id": "ch4c11",
              "concept": "host and any keywords",
              "explanation": "Working with decimal representations of binary wildcard mask bits can be simplified using the Cisco IOS host and any keywords to identify the most common uses of wildcard masking."
            },
            {
              "level": 3,
              "id": "ch4c12",
              "concept": "Number of ACLs per interface",
              "explanation": "The number of ACLs that can be applied on a router interface is limited."
            },
            {
              "level": 3,
              "id": "ch4c13",
              "concept": "ACL direction depends on policy",
              "explanation": "It is not necessary to configure ACLs in both directions. The number of ACLs and their applied direction on the interface will depend on the organization's security policy."
            },
            {
              "level": 3,
              "id": "ch4c14",
              "concept": "Standard ACLs",
              "explanation": "Standard ACLs permit or deny packets based on the source IPv4 address only."
            },
            {
              "level": 3,
              "id": "ch4c15",
              "concept": "Extended ACLs",
              "explanation": "Extended ACLs permit or deny packets based on the source IPv4 address and destination IPv4 address, protocol type, source and destination TCP or UDP ports, and more."
            },
            {
              "level": 3,
              "id": "ch4c16",
              "concept": "Numbered ACL ranges",
              "explanation": "ACLs numbered 1-99 or 1300-1999 are standard ACLs. ACLs numbered 100-199, or 2000-2699, are extended ACLs."
            },
            {
              "level": 3,
              "id": "ch4c17",
              "concept": "Named ACLs are preferred",
              "explanation": "Named ACLs are the preferred method to use when configuring ACLs."
            },
            {
              "level": 3,
              "id": "ch4c18",
              "concept": "Naming standard and extended ACLs",
              "explanation": "Specifically, both standard and extended ACLs can be named to provide information about the purpose of the ACL."
            },
            {
              "level": 3,
              "id": "ch4c19",
              "concept": "ACL placement",
              "explanation": "Every ACL should be placed where it has the greatest impact on performance."
            },
            {
              "level": 3,
              "id": "ch4c20",
              "concept": "Extended ACL placement",
              "explanation": "Extended ACLs should be placed as close as possible to the source of the traffic to be filtered. This way, undesirable traffic is denied close to the source network and does not cross the network infrastructure."
            },
            {
              "level": 3,
              "id": "ch4c21",
              "concept": "Standard ACL placement",
              "explanation": "Standard ACLs should be placed as close as possible to the destination. If a standard ACL were placed at the source of the traffic, the 'permit' or 'deny' statement would be applied based on the source address, regardless of the traffic destination."
            },
            {
              "level": 3,
              "id": "ch4c22",
              "concept": "Factors affecting ACL placement",
              "explanation": "ACL placement can depend on the extent of organizational control, the bandwidth of the networks, and the ease of configuration."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod5",
          "title": "Chapter 5 — ACLs for IPv4 Configuration",
          "children": [
            {
              "level": 3,
              "id": "ch5c1",
              "concept": "Creating a numbered standard ACL",
              "explanation": "To create a numbered standard ACL, use the ip access-list standard access-list-name global configuration command."
            },
            {
              "level": 3,
              "id": "ch5c2",
              "concept": "Deleting a numbered standard ACL",
              "explanation": "Use the no access-list access-list-number global configuration command to delete a numbered standard ACL."
            },
            {
              "level": 3,
              "id": "ch5c3",
              "concept": "Verifying an ACL on an interface",
              "explanation": "Use the show ip interface command to verify whether an ACL is applied to an interface."
            },
            {
              "level": 3,
              "id": "ch5c4",
              "concept": "Creating a named standard ACL",
              "explanation": "To create a named standard ACL, use the ip access-list standard access-list-name global configuration command."
            },
            {
              "level": 3,
              "id": "ch5c5",
              "concept": "Deleting a named standard ACL",
              "explanation": "Use the no ip access-list standard access-list-name global configuration command to delete a named standard IPv4 ACL."
            },
            {
              "level": 3,
              "id": "ch5c6",
              "concept": "Binding a standard ACL to an interface",
              "explanation": "To bind a numbered or named standard IPv4 ACL to an interface, use the ip access-group {access-list-number | access-list-name} {in | out} global configuration command."
            },
            {
              "level": 3,
              "id": "ch5c7",
              "concept": "Removing an ACL from an interface",
              "explanation": "To remove an ACL from an interface, first enter the no ip access-group interface configuration command."
            },
            {
              "level": 3,
              "id": "ch5c8",
              "concept": "Removing the ACL from the router",
              "explanation": "To remove the ACL from the router, use the no access-list global configuration command."
            },
            {
              "level": 3,
              "id": "ch5c9",
              "concept": "What extended ACLs can filter on",
              "explanation": "Extended ACLs can filter on the source address, destination address, protocol (that is, IP, TCP, UDP, ICMP), and port number."
            },
            {
              "level": 3,
              "id": "ch5c10",
              "concept": "Creating a numbered extended ACL",
              "explanation": "To create a numbered extended ACL, use the global configuration command Router(config)# access-list access-list-number {deny | permit | remark text} protocol source source-wildcard [operator [port]] destination destination-wildcard [operator [port]] [established] [log]."
            },
            {
              "level": 3,
              "id": "ch5c11",
              "concept": "Stateful firewall with established keyword",
              "explanation": "ACLs can also perform basic stateful firewall services using the TCP established keyword."
            },
            {
              "level": 3,
              "id": "ch5c12",
              "concept": "Verifying the ACL and direction",
              "explanation": "The show ip interface command verifies the ACL on the interface and the direction in which it was applied."
            },
            {
              "level": 3,
              "id": "ch5c13",
              "concept": "Editing an ACL",
              "explanation": "To edit an ACL, use a text editor or use sequence numbers."
            },
            {
              "level": 3,
              "id": "ch5c14",
              "concept": "Removing or adding an ACE by sequence number",
              "explanation": "An ACL ACE can also be removed or added using ACL sequence numbers."
            },
            {
              "level": 3,
              "id": "ch5c15",
              "concept": "Sequence numbers are auto-assigned",
              "explanation": "Sequence numbers are automatically assigned when an ACE is entered."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod6",
          "title": "Chapter 6 — NAT for IPv4",
          "children": [
            {
              "level": 3,
              "id": "ch6c1",
              "concept": "Shortage of public IPv4 addresses",
              "explanation": "There are not enough public IPv4 addresses to assign a unique address to each device connected to the internet."
            },
            {
              "level": 3,
              "id": "ch6c2",
              "concept": "Primary use of NAT",
              "explanation": "The primary use of NAT is to conserve public IPv4 addresses."
            },
            {
              "level": 3,
              "id": "ch6c3",
              "concept": "Inside and outside networks",
              "explanation": "In NAT terminology, the inside network is the set of networks subject to translation. The outside network refers to all other networks."
            },
            {
              "level": 3,
              "id": "ch6c4",
              "concept": "NAT terminology perspective",
              "explanation": "NAT terminology is always applied from the perspective of the device with the translated address."
            },
            {
              "level": 3,
              "id": "ch6c5",
              "concept": "Inside address",
              "explanation": "The inside address is the address of the device that is translated by NAT."
            },
            {
              "level": 3,
              "id": "ch6c6",
              "concept": "Outside address",
              "explanation": "The outside address is the address of the destination device."
            },
            {
              "level": 3,
              "id": "ch6c7",
              "concept": "Local address",
              "explanation": "The local address is any address that appears on the inside portion of the network."
            },
            {
              "level": 3,
              "id": "ch6c8",
              "concept": "Global address",
              "explanation": "The global address is any address that appears on the outside portion of the network."
            },
            {
              "level": 3,
              "id": "ch6c9",
              "concept": "Static NAT",
              "explanation": "Static NAT uses a one-to-one mapping of local and global addresses."
            },
            {
              "level": 3,
              "id": "ch6c10",
              "concept": "Dynamic NAT",
              "explanation": "Dynamic NAT uses a pool of public addresses and assigns them on a first-come, first-served basis."
            },
            {
              "level": 3,
              "id": "ch6c11",
              "concept": "PAT (NAT overload)",
              "explanation": "Port Address Translation (PAT), also called NAT overload, maps multiple private IPv4 addresses to a single public IPv4 address or a few addresses."
            },
            {
              "level": 3,
              "id": "ch6c12",
              "concept": "NAT increases forwarding delay",
              "explanation": "NAT increases forwarding delays because translating each IPv4 address in the packet headers takes time."
            },
            {
              "level": 3,
              "id": "ch6c13",
              "concept": "NAT complicates tunneling",
              "explanation": "NAT complicates the use of tunneling protocols, such as IPsec, because NAT modifies values in the headers, causing integrity checks to fail."
            },
            {
              "level": 3,
              "id": "ch6c14",
              "concept": "show ip nat translations",
              "explanation": "The show ip nat translations command shows all static translations that have been configured as well as any dynamic translations created by traffic."
            },
            {
              "level": 3,
              "id": "ch6c15",
              "concept": "clear ip nat translation",
              "explanation": "To clear dynamic entries before the timeout expires, use the clear ip nat translation privileged EXEC mode command."
            },
            {
              "level": 3,
              "id": "ch6c16",
              "concept": "IPv6 and NAT",
              "explanation": "IPv6 was developed with the intention of making NAT for IPv4 and translation between public and private IPv4 addresses unnecessary."
            },
            {
              "level": 3,
              "id": "ch6c17",
              "concept": "IPv6 unique local addresses (ULA)",
              "explanation": "IPv6 unique local addresses (ULAs) are similar to RFC 1918 private addresses in IPv4 but have a different purpose."
            },
            {
              "level": 3,
              "id": "ch6c18",
              "concept": "NAT64",
              "explanation": "IPv6 allows protocol translation between IPv4 and IPv6 known as NAT64."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod7",
          "title": "Chapter 7 — WAN Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch7c1",
              "concept": "Purpose of a WAN",
              "explanation": "A wide area network (WAN) is required to connect beyond the boundaries of the local network."
            },
            {
              "level": 3,
              "id": "ch7c2",
              "concept": "Private WAN",
              "explanation": "A private WAN is a dedicated connection to a single customer."
            },
            {
              "level": 3,
              "id": "ch7c3",
              "concept": "Public WAN",
              "explanation": "A public WAN connection is typically provided by an ISP or telecommunications service provider using the internet."
            },
            {
              "level": 3,
              "id": "ch7c4",
              "concept": "WAN logical topologies",
              "explanation": "WANs are implemented using the following logical topologies: point-to-point, hub-and-spoke, dual-homed, fully meshed, and partially meshed."
            },
            {
              "level": 3,
              "id": "ch7c5",
              "concept": "Dual-carrier connection",
              "explanation": "A dual-carrier connection provides redundancy and increases network availability. The organization negotiates separate service level agreements with two different service providers."
            },
            {
              "level": 3,
              "id": "ch7c6",
              "concept": "Site-to-site and remote-access VPNs",
              "explanation": "Site-to-site and remote-access virtual private networks allow an enterprise to use the internet to connect easily and securely with employees and facilities anywhere in the world."
            },
            {
              "level": 3,
              "id": "ch7c7",
              "concept": "WAN access standards",
              "explanation": "WAN access standards are defined and managed by several recognized authorities."
            },
            {
              "level": 3,
              "id": "ch7c8",
              "concept": "Layer 1 optical fiber standards",
              "explanation": "Layer 1 optical fiber protocol standards include SDH, SONET, and DWDM. Layer 2 protocols determine how the data is encapsulated."
            },
            {
              "level": 3,
              "id": "ch7c9",
              "concept": "Layer 2 WAN protocols",
              "explanation": "Layer 2 protocols include broadband, wireless, Ethernet WAN, MPLS, PPP, and HDLC."
            },
            {
              "level": 3,
              "id": "ch7c10",
              "concept": "Serial vs parallel communication",
              "explanation": "Serial communication transmits bits sequentially over a single channel. In contrast, parallel communications transmit several bits simultaneously using multiple wires."
            },
            {
              "level": 3,
              "id": "ch7c11",
              "concept": "Circuit-switched WAN technologies",
              "explanation": "The two most common types of circuit-switched WAN technologies are PSTN and ISDN."
            },
            {
              "level": 3,
              "id": "ch7c12",
              "concept": "Packet-switched WAN technologies",
              "explanation": "Common types of packet-switched WAN technologies are Ethernet WAN and MPLS. There are two OSI Layer 1 optical fiber standards."
            },
            {
              "level": 3,
              "id": "ch7c13",
              "concept": "Optical fiber standards purpose",
              "explanation": "These standards define how to transfer multiple data, voice, and video traffic over optical fiber using lasers or LEDs over great distances."
            },
            {
              "level": 3,
              "id": "ch7c14",
              "concept": "Circuit-switched connections via PSTN",
              "explanation": "Circuit-switched connections have been provided by PSTN carriers."
            },
            {
              "level": 3,
              "id": "ch7c15",
              "concept": "ISDN",
              "explanation": "ISDN is a circuit-switching technology that enables the local loop of the PSTN to carry digital signals."
            },
            {
              "level": 3,
              "id": "ch7c16",
              "concept": "Packet switching",
              "explanation": "Packet switching splits traffic into packets that are routed over a shared network."
            },
            {
              "level": 3,
              "id": "ch7c17",
              "concept": "Frame Relay",
              "explanation": "Frame Relay is a simple Layer 2 NBMA (non-broadcast multi-access) WAN technology used to connect enterprise LANs together."
            },
            {
              "level": 3,
              "id": "ch7c18",
              "concept": "ATM",
              "explanation": "Asynchronous Transfer Mode (ATM) technology can transfer voice, video, and data over private and public networks. It is built on a cell-based architecture rather than a frame-based architecture."
            },
            {
              "level": 3,
              "id": "ch7c19",
              "concept": "Modern WAN connectivity options",
              "explanation": "Modern WAN connectivity options include dedicated broadband, Ethernet WAN, and MPLS (packet-switched), as well as various wired and wireless versions of internet-based broadband."
            },
            {
              "level": 3,
              "id": "ch7c20",
              "concept": "MPLS",
              "explanation": "MPLS is a high-performance service provider WAN routing technology to interconnect customers. MPLS supports various customer access methods (for example, Ethernet, DSL, cable, Frame Relay). MPLS can encapsulate all types of protocols, including IPv4 or IPv6 traffic."
            },
            {
              "level": 3,
              "id": "ch7c21",
              "concept": "Internet-based broadband",
              "explanation": "Internet-based broadband connectivity is an alternative to using dedicated WAN options."
            },
            {
              "level": 3,
              "id": "ch7c22",
              "concept": "Wired broadband examples",
              "explanation": "Digital subscriber line (DSL), cable connections, and fiber-optic networks are examples of wired broadband connectivity."
            },
            {
              "level": 3,
              "id": "ch7c23",
              "concept": "Wireless broadband examples",
              "explanation": "Examples of wireless broadband services include 3G/4G/5G cellular services or satellite internet services."
            },
            {
              "level": 3,
              "id": "ch7c24",
              "concept": "DSL technology",
              "explanation": "DSL technology is an always-on connection technology that uses existing twisted-pair telephone lines to transmit high-bandwidth data and provides IP services to subscribers."
            },
            {
              "level": 3,
              "id": "ch7c25",
              "concept": "Cable technology",
              "explanation": "Cable technology is an always-on, high-speed connection technology that uses a coaxial cable from the cable TV provider to deliver IP services to users."
            },
            {
              "level": 3,
              "id": "ch7c26",
              "concept": "Newest wireless technologies",
              "explanation": "The newest developments in wireless technology include municipal Wi-Fi, cellular, satellite internet, and WiMAX."
            },
            {
              "level": 3,
              "id": "ch7c27",
              "concept": "VPN tunnels over the internet",
              "explanation": "VPN tunnels are routed through the internet from the company's private network to the remote site or the employee's host."
            },
            {
              "level": 3,
              "id": "ch7c28",
              "concept": "ISP connectivity options",
              "explanation": "ISP connectivity options include single-homed, dual-homed, multihomed, and dual-multihomed."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod8",
          "title": "Chapter 8 — VPN and IPsec Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch8c1",
              "concept": "What makes a VPN private",
              "explanation": "A VPN is private in the sense that the traffic is encrypted to keep the data confidential while it transits across the public network."
            },
            {
              "level": 3,
              "id": "ch8c2",
              "concept": "Benefits of VPNs",
              "explanation": "The benefits of VPNs are cost savings, security, scalability, and compatibility."
            },
            {
              "level": 3,
              "id": "ch8c3",
              "concept": "Remote-access VPNs",
              "explanation": "Remote-access VPNs let remote and mobile users securely connect to the enterprise by creating an encrypted tunnel. Remote-access VPNs can be created using IPsec or SSL."
            },
            {
              "level": 3,
              "id": "ch8c4",
              "concept": "Site-to-site VPNs",
              "explanation": "Site-to-site VPNs are used to connect networks across an untrusted network such as the internet."
            },
            {
              "level": 3,
              "id": "ch8c5",
              "concept": "VPN gateway in a site-to-site VPN",
              "explanation": "In a site-to-site VPN, end hosts send and receive normal unencrypted TCP/IP traffic through a VPN terminating device. The VPN terminating device is typically called a VPN gateway."
            },
            {
              "level": 3,
              "id": "ch8c6",
              "concept": "GRE",
              "explanation": "GRE is an unsecured site-to-site VPN tunneling protocol."
            },
            {
              "level": 3,
              "id": "ch8c7",
              "concept": "DMVPN",
              "explanation": "DMVPN is a Cisco software solution for easily building multiple, dynamic, and scalable VPNs."
            },
            {
              "level": 3,
              "id": "ch8c8",
              "concept": "IPsec VTI",
              "explanation": "Like DMVPN, IPsec VTI simplifies the configuration process required to support multiple sites and remote access."
            },
            {
              "level": 3,
              "id": "ch8c9",
              "concept": "IPsec protects IP packets",
              "explanation": "IPsec protects and authenticates IP packets between the source and destination."
            },
            {
              "level": 3,
              "id": "ch8c10",
              "concept": "IPsec protects Layer 4 to 7",
              "explanation": "IPsec can protect traffic from Layer 4 to Layer 7."
            },
            {
              "level": 3,
              "id": "ch8c11",
              "concept": "IPsec framework services",
              "explanation": "Using the IPsec framework, IPsec provides confidentiality, integrity, origin authentication, and Diffie-Hellman."
            },
            {
              "level": 3,
              "id": "ch8c12",
              "concept": "IPsec encapsulation",
              "explanation": "IPsec encapsulates packets using AH or ESP."
            },
            {
              "level": 3,
              "id": "ch8c13",
              "concept": "Degree of confidentiality",
              "explanation": "The degree of confidentiality depends on the encryption algorithm and the key length used in the encryption algorithm."
            },
            {
              "level": 3,
              "id": "ch8c14",
              "concept": "Diffie-Hellman",
              "explanation": "DH allows two peers to establish a shared secret key that only they know, even though they communicate over an insecure channel."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod9",
          "title": "Chapter 9 — QoS Concepts",
          "children": [
            {
              "level": 3,
              "id": "ch9c1",
              "concept": "Need for QoS",
              "explanation": "Live voice and video transmissions create higher quality expectations among users and create a need for quality of service (QoS)."
            },
            {
              "level": 3,
              "id": "ch9c2",
              "concept": "No QoS mechanisms",
              "explanation": "Without QoS mechanisms, packets are processed in the order in which they arrive. During congestion, network devices such as routers and switches may drop packets."
            },
            {
              "level": 3,
              "id": "ch9c3",
              "concept": "Impact on time-sensitive traffic",
              "explanation": "Without QoS, time-sensitive packets, such as real-time video and voice, will be dropped at the same rate as non-time-sensitive data, such as email and web browsing."
            },
            {
              "level": 3,
              "id": "ch9c4",
              "concept": "Queuing causes delays",
              "explanation": "This queuing can cause delays because new packets cannot be transmitted until previous packets are processed."
            },
            {
              "level": 3,
              "id": "ch9c5",
              "concept": "Fixed and variable delay",
              "explanation": "There is fixed delay and variable delay."
            },
            {
              "level": 3,
              "id": "ch9c6",
              "concept": "Sources of delay",
              "explanation": "Sources of delay are code delay, packetization delay, queuing delay, serialization delay, propagation delay, and jitter (delay variation)."
            },
            {
              "level": 3,
              "id": "ch9c7",
              "concept": "Jitter",
              "explanation": "Jitter is the variation in delay between received packets."
            },
            {
              "level": 3,
              "id": "ch9c8",
              "concept": "Voice and video drive QoS",
              "explanation": "Voice and video traffic are two of the main reasons for quality of service."
            },
            {
              "level": 3,
              "id": "ch9c9",
              "concept": "Voice traffic characteristics",
              "explanation": "Voice traffic is smooth and benign, but it is sensitive to drops and delays."
            },
            {
              "level": 3,
              "id": "ch9c10",
              "concept": "Voice tolerance",
              "explanation": "Voice can tolerate a certain degree of latency, jitter, and loss without noticeable effects."
            },
            {
              "level": 3,
              "id": "ch9c11",
              "concept": "Video traffic is demanding",
              "explanation": "Video traffic is more demanding than voice traffic because the size of the packets it sends over the network is larger."
            },
            {
              "level": 3,
              "id": "ch9c12",
              "concept": "Video traffic characteristics",
              "explanation": "Video traffic is bursty, resource-consuming, and sensitive to packet drops and delays."
            },
            {
              "level": 3,
              "id": "ch9c13",
              "concept": "Data traffic characteristics",
              "explanation": "Data traffic is not as demanding as voice and video traffic. Data packets often use TCP applications that can retransmit data and, therefore, are not sensitive to drops and delays."
            },
            {
              "level": 3,
              "id": "ch9c14",
              "concept": "QoS policy activates during congestion",
              "explanation": "The QoS policy that the network administrator has implemented becomes active when there is congestion on the link."
            },
            {
              "level": 3,
              "id": "ch9c15",
              "concept": "Queuing as congestion management",
              "explanation": "Queuing is a congestion-management tool that buffers, prioritizes, and, if necessary, reorders packets before they are transmitted to the destination."
            },
            {
              "level": 3,
              "id": "ch9c16",
              "concept": "FIFO",
              "explanation": "The FIFO algorithm queues packets and forwards them in the order of their arrival. FIFO has no concept of priority or class of traffic and therefore makes no decision about packet priority."
            },
            {
              "level": 3,
              "id": "ch9c17",
              "concept": "WFQ",
              "explanation": "WFQ is an automated scheduling method whereby bandwidth is allocated fairly to network traffic. It applies priorities, or weights, to identified traffic and classifies it into conversations or flows."
            },
            {
              "level": 3,
              "id": "ch9c18",
              "concept": "CBWFQ",
              "explanation": "CBWFQ extends the standard weighted fair queuing (WFQ) functionality to provide support for user-defined traffic classes. With CBWFQ, you define traffic classes based on match criteria including protocols, access control lists (ACLs), and input interfaces. With LLQ, the CBWFQ policy gains a strict priority queuing (PQ) capability."
            },
            {
              "level": 3,
              "id": "ch9c19",
              "concept": "Three QoS implementation models",
              "explanation": "There are three QoS implementation models: best effort, integrated services (IntServ), and differentiated services (DiffServ)."
            },
            {
              "level": 3,
              "id": "ch9c20",
              "concept": "IntServ model",
              "explanation": "The IntServ architecture model was developed to meet the needs of real-time applications, such as remote video, multimedia conferencing, data visualization applications, and virtual reality."
            },
            {
              "level": 3,
              "id": "ch9c21",
              "concept": "DiffServ model",
              "explanation": "The DiffServ QoS model specifies a simple and scalable mechanism for classifying and managing network traffic. The DiffServ model design overcomes the limitations associated with the best-effort and integrated-services models."
            },
            {
              "level": 3,
              "id": "ch9c22",
              "concept": "Three categories of QoS tools",
              "explanation": "There are three categories of QoS tools: classification and marking tools, congestion-avoidance tools, and congestion-management tools."
            },
            {
              "level": 3,
              "id": "ch9c23",
              "concept": "Classification",
              "explanation": "Classification determines the class of traffic to which packets or frames belong."
            },
            {
              "level": 3,
              "id": "ch9c24",
              "concept": "Methods to classify traffic",
              "explanation": "To classify Layer 2 and 3 traffic, several methods are possible, including interfaces, ACLs, and class maps. It can also be classified at Layers 4 to 7 using Network Based Application Recognition (NBAR)."
            },
            {
              "level": 3,
              "id": "ch9c25",
              "concept": "Congestion management",
              "explanation": "Congestion management relies on queuing and scheduling methods, whereby excess traffic is buffered or queued (and sometimes dropped) while it waits to be sent on an egress interface."
            },
            {
              "level": 3,
              "id": "ch9c26",
              "concept": "Congestion-avoidance tools",
              "explanation": "Congestion-avoidance tools monitor network traffic loads in order to anticipate and avoid congestion at common network and internet bottlenecks before congestion becomes a problem."
            },
            {
              "level": 3,
              "id": "ch9c27",
              "concept": "WRED",
              "explanation": "Cisco IOS includes a congestion-avoidance solution based on weighted random early detection (WRED)."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod10",
          "title": "Chapter 10 — Network Management",
          "children": [
            {
              "level": 3,
              "id": "ch10c1",
              "concept": "CDP",
              "explanation": "CDP (Cisco Discovery Protocol) is a Cisco proprietary Layer 2 protocol used to gather information about Cisco devices that share the same data link."
            },
            {
              "level": 3,
              "id": "ch10c2",
              "concept": "CDP as a network discovery tool",
              "explanation": "CDP can be used as a network discovery tool to gather information about neighboring devices. This data collected by CDP can help you build a logical topology of a network when documentation is missing or lacking detail."
            },
            {
              "level": 3,
              "id": "ch10c3",
              "concept": "Enabling CDP",
              "explanation": "CDP is enabled by default on Cisco devices. To enable CDP globally for all supported interfaces on the device, enter cdp run in global configuration mode. To enable CDP on a specific interface, enter the cdp enable command."
            },
            {
              "level": 3,
              "id": "ch10c4",
              "concept": "Verifying CDP",
              "explanation": "To verify the status of CDP and display a list of neighbors, use the show cdp neighbors command in privileged EXEC mode."
            },
            {
              "level": 3,
              "id": "ch10c5",
              "concept": "LLDP",
              "explanation": "Cisco devices also support the Link Layer Discovery Protocol (LLDP), which is a vendor-independent neighbor discovery protocol similar to CDP."
            },
            {
              "level": 3,
              "id": "ch10c6",
              "concept": "Enabling LLDP",
              "explanation": "To enable LLDP globally on a Cisco network device, enter the lldp run command in global configuration mode."
            },
            {
              "level": 3,
              "id": "ch10c7",
              "concept": "Verifying LLDP",
              "explanation": "When LLDP is enabled, the device's neighbors can be discovered using the show lldp neighbors command. For more information about the neighbors, use the show lldp neighbors detail command, which provides the IOS version and IP address of the neighbors as well as the device capability."
            },
            {
              "level": 3,
              "id": "ch10c8",
              "concept": "Importance of time synchronization",
              "explanation": "If the time is not synchronized between devices, it will be impossible for you to determine the order of events and their causes."
            },
            {
              "level": 3,
              "id": "ch10c9",
              "concept": "Manual time vs NTP",
              "explanation": "You can manually configure the date and time, or you can configure NTP, which allows devices on the network to synchronize their time settings with an NTP server."
            },
            {
              "level": 3,
              "id": "ch10c10",
              "concept": "NTP stratum hierarchy",
              "explanation": "NTP networks use a hierarchical system of time sources, and each level of this system is called a stratum. Authoritative time sources, also called stratum 0 devices, are high-precision timekeeping devices. Stratum 1 devices are directly connected to the authoritative time sources. Stratum 2 devices, such as NTP clients, synchronize their clock using the NTP packets from stratum 1 servers."
            },
            {
              "level": 3,
              "id": "ch10c11",
              "concept": "Configuring an NTP server",
              "explanation": "The ntp server ip-address command is issued in global configuration mode to configure a device as an NTP server."
            },
            {
              "level": 3,
              "id": "ch10c12",
              "concept": "Verifying NTP",
              "explanation": "To verify that the time source is set to NTP, use the show clock detail command again. The show ntp associations and show ntp status commands are used to verify that a device is synchronized with the NTP server."
            },
            {
              "level": 3,
              "id": "ch10c13",
              "concept": "SNMP",
              "explanation": "SNMP is an application-layer protocol that provides a message format for communication between managers and agents."
            },
            {
              "level": 3,
              "id": "ch10c14",
              "concept": "Three SNMP elements",
              "explanation": "The SNMP system consists of three elements: SNMP manager, SNMP agents, and the MIB."
            },
            {
              "level": 3,
              "id": "ch10c15",
              "concept": "SNMP get, set, and traps",
              "explanation": "The SNMP manager can collect information from an SNMP agent using the 'get' action and change configurations on an agent using the 'set' action. SNMP agents can forward information directly to a network manager using 'traps.'"
            },
            {
              "level": 3,
              "id": "ch10c16",
              "concept": "SNMP versions",
              "explanation": "SNMPv1, SNMPv2c, and SNMPv3 are all versions of SNMP. SNMPv1 is a legacy solution. Both SNMPv1 and SNMPv2c use a community-based form of security. SNMPv3 provides services for both security models and security levels."
            },
            {
              "level": 3,
              "id": "ch10c17",
              "concept": "MIB and OIDs",
              "explanation": "The MIB database organizes variables hierarchically. OIDs uniquely identify the managed objects within the MIB hierarchy. The Cisco SNMP browser at http://www.cisco.com allows a network administrator to research details about a particular OID."
            },
            {
              "level": 3,
              "id": "ch10c18",
              "concept": "Syslog and port 514",
              "explanation": "The syslog protocol uses port 514 to allow network devices to send their system messages across the network to syslog servers."
            },
            {
              "level": 3,
              "id": "ch10c19",
              "concept": "Three syslog functions",
              "explanation": "The syslog logging service provides three main functions: gathering logging information for monitoring and troubleshooting, selecting the type of logging information captured, and specifying the destinations of captured syslog messages."
            },
            {
              "level": 3,
              "id": "ch10c20",
              "concept": "Syslog message destinations",
              "explanation": "Syslog message destinations include the logging buffer (RAM inside a router or switch), the console line, the terminal line, and the syslog server."
            },
            {
              "level": 3,
              "id": "ch10c21",
              "concept": "Syslog facilities",
              "explanation": "Syslog facilities help determine and categorize system status data for event and error message reporting. Common syslog message services reported on Cisco IOS routers include: IP, OSPF protocol, SYS operating system, IPsec, and IF."
            },
            {
              "level": 3,
              "id": "ch10c22",
              "concept": "Default syslog message format",
              "explanation": "The default format of syslog messages on Cisco IOS software is: %facility-severity-MNEMONIC: description."
            },
            {
              "level": 3,
              "id": "ch10c23",
              "concept": "service timestamps",
              "explanation": "Use the service timestamps log datetime command to force logged events to display the date and time."
            },
            {
              "level": 3,
              "id": "ch10c24",
              "concept": "Cisco IFS",
              "explanation": "The Cisco IFS allows the administrator to navigate to different directories and list the files in a directory, and to create subdirectories in flash memory or on a disk."
            },
            {
              "level": 3,
              "id": "ch10c25",
              "concept": "show file systems",
              "explanation": "Use the show file systems command to view the file systems on a Catalyst switch or Cisco router."
            },
            {
              "level": 3,
              "id": "ch10c26",
              "concept": "Saving configs with Tera Term",
              "explanation": "You can also use Tera Term to save configuration files to a text document. A configuration can be copied from a file and then pasted directly onto a device."
            },
            {
              "level": 3,
              "id": "ch10c27",
              "concept": "Storing configs on TFTP or USB",
              "explanation": "Configuration files can be stored on a TFTP (Trivial File Transfer Protocol) server or on a USB storage device."
            },
            {
              "level": 3,
              "id": "ch10c28",
              "concept": "Saving config to a TFTP server",
              "explanation": "To save the running configuration or the startup configuration to a TFTP server, use either the copy running-config tftp or copy startup-config tftp command."
            },
            {
              "level": 3,
              "id": "ch10c29",
              "concept": "Central TFTP storage of IOS images",
              "explanation": "Cisco IOS software images and configuration files can be stored on a central TFTP server to control the number of IOS images and corresponding revisions, as well as the configuration files that must be maintained."
            },
            {
              "level": 3,
              "id": "ch10c30",
              "concept": "Selecting an IOS image",
              "explanation": "Select a Cisco IOS image file that meets the platform, feature, and software requirements. Download the file from cisco.com and transfer it to the TFTP server."
            },
            {
              "level": 3,
              "id": "ch10c31",
              "concept": "Booting the new IOS image",
              "explanation": "To switch to the copied IOS image after it has been saved to the router's flash memory, configure the router to load the new image at startup using the boot system command."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod11",
          "title": "Chapter 11 — Network Design",
          "children": [
            {
              "level": 3,
              "id": "ch11c1",
              "concept": "Cisco Borderless Network",
              "explanation": "The Cisco Borderless Network provides the framework to unify wired and wireless access, and is built on a scalable and resilient hierarchical hardware infrastructure."
            },
            {
              "level": 3,
              "id": "ch11c2",
              "concept": "Two hierarchical design frameworks",
              "explanation": "Two proven hierarchical design frameworks for campus networks are the three-tier layer model and the two-tier layer model."
            },
            {
              "level": 3,
              "id": "ch11c3",
              "concept": "Three critical layers",
              "explanation": "The three critical layers in these multitier designs are the access, distribution, and core layers."
            },
            {
              "level": 3,
              "id": "ch11c4",
              "concept": "Redundant links",
              "explanation": "Implement redundant links between critical devices and between access-layer and core-layer devices."
            },
            {
              "level": 3,
              "id": "ch11c5",
              "concept": "Link aggregation",
              "explanation": "Implement multiple links between equipment, with link aggregation (EtherChannel) or equal-cost load balancing, to increase bandwidth."
            },
            {
              "level": 3,
              "id": "ch11c6",
              "concept": "Scalable routing protocol",
              "explanation": "Use a scalable routing protocol and implement features to reduce the size of the routing table."
            },
            {
              "level": 3,
              "id": "ch11c7",
              "concept": "Wireless connectivity",
              "explanation": "Implement wireless connectivity to allow mobility and expansion."
            },
            {
              "level": 3,
              "id": "ch11c8",
              "concept": "Types of networks",
              "explanation": "There are campus LANs, cloud-managed networks, data centers, service providers, and virtual networks."
            },
            {
              "level": 3,
              "id": "ch11c9",
              "concept": "Switch form factors",
              "explanation": "Form factors for switches include fixed configuration, modular configuration, and stackable."
            },
            {
              "level": 3,
              "id": "ch11c10",
              "concept": "Routers use the network portion",
              "explanation": "Routers use the network portion (prefix) of the destination IP address to send packets to the appropriate destination."
            },
            {
              "level": 3,
              "id": "ch11c11",
              "concept": "Routers select alternate paths",
              "explanation": "Routers select an alternate path if a link or path goes down."
            },
            {
              "level": 3,
              "id": "ch11c12",
              "concept": "Cisco router categories",
              "explanation": "Cisco has several categories of routers, including branch, network edge, service provider, and industrial."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod12",
          "title": "Chapter 12 — Network Troubleshooting",
          "children": [
            {
              "level": 3,
              "id": "ch12c1",
              "concept": "Common network documentation",
              "explanation": "Common network documentation includes physical and logical network topologies, network device documentation, and network performance baseline documentation."
            },
            {
              "level": 3,
              "id": "ch12c2",
              "concept": "Seven-step troubleshooting process",
              "explanation": "The troubleshooting process should be guided by structured methods such as the seven-step troubleshooting process: 1. Define the problem, 2. Gather information, 3. Analyze the information, 4. Eliminate possible causes, 5. Propose a hypothesis, 6. Test the hypothesis, and 7. Solve the problem."
            },
            {
              "level": 3,
              "id": "ch12c3",
              "concept": "Troubleshooting tools",
              "explanation": "Troubleshooting tools include NMS tools, knowledge bases, baseline tools, protocol analyzers, digital multimeters, cable testers, cable analyzers, portable network analyzers, Cisco Prime NAM, and syslog servers."
            },
            {
              "level": 3,
              "id": "ch12c4",
              "concept": "Problems by OSI layer",
              "explanation": "Physical layer problems cause failures and suboptimal conditions. Data link layer problems are usually caused by encapsulation errors, address mapping errors, framing errors, and STP failures or loops. Network layer problems include IPv4, IPv6, and routing protocols (such as EIGRP, OSPF, etc.). Transport layer problems can be misconfigured NAT or ACLs. Application layer problems can result in resources being unreachable or unusable."
            },
            {
              "level": 3,
              "id": "ch12c5",
              "concept": "Bottom-up troubleshooting method",
              "explanation": "A bottom-up troubleshooting method can be used to solve connectivity problems. Start by checking the physical layer, check for duplex mismatches, verify addressing and the default gateway, verify that the correct path is taken, and verify the transport layer."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod13",
          "title": "Chapter 13 — Network Virtualization",
          "children": [
            {
              "level": 3,
              "id": "ch13c1",
              "concept": "Cloud computing",
              "explanation": "Cloud computing involves a large number of computers connected through a network that can be physically located anywhere. Cloud computing reduces operational costs by optimizing the use of resources."
            },
            {
              "level": 3,
              "id": "ch13c2",
              "concept": "Three cloud computing services",
              "explanation": "The three main cloud computing services defined by the National Institute of Standards and Technology (NIST) are Software as a Service (SaaS), Platform as a Service (PaaS), and Infrastructure as a Service (IaaS)."
            },
            {
              "level": 3,
              "id": "ch13c3",
              "concept": "Four cloud types",
              "explanation": "The four types of clouds are: public, private, hybrid, and community."
            },
            {
              "level": 3,
              "id": "ch13c4",
              "concept": "Virtualization is the foundation of cloud",
              "explanation": "Virtualization forms the foundation of cloud computing. Virtualization separates the operating system (OS) from the hardware."
            },
            {
              "level": 3,
              "id": "ch13c5",
              "concept": "Benefits of virtualization",
              "explanation": "Companies need less space and equipment and consume less power. It allows easier prototyping, faster server provisioning, increased server uptime, improved disaster recovery, and support for legacy systems."
            },
            {
              "level": 3,
              "id": "ch13c6",
              "concept": "Type 1 vs Type 2 hypervisors",
              "explanation": "A type 1 hypervisor is installed directly on the server or networking hardware. A type 2 hypervisor is software that creates and runs VM instances. It can be installed on top of the OS or between the firmware and the OS."
            },
            {
              "level": 3,
              "id": "ch13c7",
              "concept": "Type 1 hypervisors are bare-metal",
              "explanation": "Type 1 hypervisors are also called 'bare metal' because they are installed directly on the hardware. Type 1 hypervisors have direct access to the hardware resources and are more efficient than hosted architectures. They improve performance, scalability, and robustness."
            },
            {
              "level": 3,
              "id": "ch13c8",
              "concept": "Managing type 1 hypervisors",
              "explanation": "Managing type 1 hypervisors requires a 'management console.'"
            },
            {
              "level": 3,
              "id": "ch13c9",
              "concept": "Server virtualization hides resources",
              "explanation": "Server virtualization hides server resources from users, such as the number and identity of physical servers, processors, and operating systems. This situation can raise issues when the data center relies on traditional network architectures."
            },
            {
              "level": 3,
              "id": "ch13c10",
              "concept": "Data center traffic flows",
              "explanation": "Traffic flows in the data center differ considerably from the traditional client-server model. Typically, a data center has a considerable amount of traffic exchanged between virtual servers (East-West traffic) and can change location and intensity over time. North-South traffic occurs between the distribution and core layers and is generally destined for off-site locations such as another data center, other cloud providers, or the internet."
            },
            {
              "level": 3,
              "id": "ch13c11",
              "concept": "Two major network architectures",
              "explanation": "Two major network architectures have been developed to support network virtualization: Software-Defined Networking (SDN) and Cisco Application Centric Infrastructure (ACI)."
            },
            {
              "level": 3,
              "id": "ch13c12",
              "concept": "SDN components",
              "explanation": "SDN components can include OpenFlow, OpenStack, and other components."
            },
            {
              "level": 3,
              "id": "ch13c13",
              "concept": "Control plane and data plane",
              "explanation": "A network device contains a control plane and a data plane. The control plane is considered the brain of a device."
            },
            {
              "level": 3,
              "id": "ch13c14",
              "concept": "What SDN is",
              "explanation": "SDN is essentially the separation of the control plane and the data plane. To virtualize the network, the control plane function is removed from each device and centralized on a single controller."
            },
            {
              "level": 3,
              "id": "ch13c15",
              "concept": "SDN controller",
              "explanation": "The SDN controller is a logical entity that allows network administrators to manage and define how the data plane of virtual routers and switches should handle network traffic."
            },
            {
              "level": 3,
              "id": "ch13c16",
              "concept": "Data plane (forwarding plane)",
              "explanation": "The data plane, also called the forwarding plane, is typically the switching fabric connecting the various network ports on a device, and is used to forward traffic flows."
            },
            {
              "level": 3,
              "id": "ch13c17",
              "concept": "Management plane",
              "explanation": "The management plane is responsible for managing a device through its connection to the network."
            },
            {
              "level": 3,
              "id": "ch13c18",
              "concept": "Cisco ACI",
              "explanation": "Cisco developed the Application Centric Infrastructure (ACI) to allow them to achieve these objectives using a more advanced and innovative method than earlier SDN approaches."
            },
            {
              "level": 3,
              "id": "ch13c19",
              "concept": "ACI is a hardware solution",
              "explanation": "Cisco ACI is a specialized hardware solution that provides integrated management of cloud computing and the data center."
            },
            {
              "level": 3,
              "id": "ch13c20",
              "concept": "Removing policy from the data plane",
              "explanation": "At a high level, anything related to network policy is removed from the data plane. This makes it much easier to create data center networks."
            },
            {
              "level": 3,
              "id": "ch13c21",
              "concept": "Three ACI components",
              "explanation": "The three main components of the ACI architecture are the Application Network Profile (ANP), the Application Policy Infrastructure Controller (APIC), and the Cisco Nexus 9000 series switches."
            },
            {
              "level": 3,
              "id": "ch13c22",
              "concept": "ACI fabric",
              "explanation": "The Cisco ACI fabric is composed of the APIC and the Cisco Nexus 9000 series switches using a two-tier topology."
            },
            {
              "level": 3,
              "id": "ch13c23",
              "concept": "APIC does not manipulate the data path",
              "explanation": "Unlike in an SDN infrastructure, the APIC controller does not directly manipulate the data path. Instead, it centralizes policy definition and programs the leaf switches to forward traffic based on the defined policies."
            },
            {
              "level": 3,
              "id": "ch13c24",
              "concept": "Three types of SDN",
              "explanation": "There are three types of SDN: device-based SDN, controller-based SDN, and policy-based SDN."
            },
            {
              "level": 3,
              "id": "ch13c25",
              "concept": "Policy-based SDN",
              "explanation": "Policy-based SDN includes an additional policy layer that operates at a higher level of abstraction. Policy-based SDN is the most robust approach, as it offers a simple method for network-wide policy control and management."
            },
            {
              "level": 3,
              "id": "ch13c26",
              "concept": "Cisco APIC-EM",
              "explanation": "Cisco APIC-EM is an example of policy-based SDN. Cisco APIC-EM provides a single interface for network management, including discovery and access to device and host inventories, topology visualization, tracing a path between endpoints, and policy definition."
            },
            {
              "level": 3,
              "id": "ch13c27",
              "concept": "APIC-EM Path Trace",
              "explanation": "The APIC-EM Path Trace tool allows the administrator to easily visualize traffic flows and discover any conflicting, duplicate, or shadowed ACL entries. This tool examines specific ACLs on the path between two end nodes and lists potential problems."
            }
          ]
        },
        {
          "level": 2,
          "id": "mod14",
          "title": "Chapter 14 — Network Automation",
          "children": [
            {
              "level": 3,
              "id": "ch14c1",
              "concept": "Automation",
              "explanation": "Automation is any self-driven process that reduces and potentially eliminates the need for human intervention."
            },
            {
              "level": 3,
              "id": "ch14c2",
              "concept": "Smart devices",
              "explanation": "Whenever an action is taken by a device based on outside information, that device is a smart device. For smart devices to 'think,' they must be programmed using network automation tools."
            },
            {
              "level": 3,
              "id": "ch14c3",
              "concept": "Data formats",
              "explanation": "Data formats are simply a way to store and exchange data in a structured format."
            },
            {
              "level": 3,
              "id": "ch14c4",
              "concept": "Common data formats",
              "explanation": "Common data formats used in many applications, including network automation and programmability, are JavaScript Object Notation (JSON), eXtensible Markup Language (XML), and YAML Ain't Markup Language (YAML)."
            },
            {
              "level": 3,
              "id": "ch14c5",
              "concept": "Data formats have rules",
              "explanation": "Data formats have rules and structure similar to those we have with programming and written languages."
            },
            {
              "level": 3,
              "id": "ch14c6",
              "concept": "API",
              "explanation": "An API is a set of rules describing how one application can interact with another, and the instructions to allow the interaction to occur."
            },
            {
              "level": 3,
              "id": "ch14c7",
              "concept": "API types by access",
              "explanation": "Open/public APIs are, as the name suggests, publicly available. Internal/private APIs are used only within an organization. Partner APIs are used between a company and its business partners."
            },
            {
              "level": 3,
              "id": "ch14c8",
              "concept": "Four web service API types",
              "explanation": "There are four types of web service APIs: SOAP (Simple Object Access Protocol), REST (Representational State Transfer), eXtensible Markup Language-Remote Procedure Call (XML-RPC), and JavaScript Object Notation-Remote Procedure Call (JSON-RPC)."
            },
            {
              "level": 3,
              "id": "ch14c9",
              "concept": "REST API",
              "explanation": "A REST API defines a set of functions that developers can use to perform requests and receive responses via the HTTP protocol such as GET and POST."
            },
            {
              "level": 3,
              "id": "ch14c10",
              "concept": "RESTful",
              "explanation": "Conformity to the constraints of the REST architecture is generally referred to as 'RESTful.'"
            },
            {
              "level": 3,
              "id": "ch14c11",
              "concept": "RESTful HTTP methods (CRUD)",
              "explanation": "RESTful APIs use common HTTP methods, including POST, GET, PUT, PATCH, and DELETE. These methods correspond to the RESTful operations: create, read, update, and delete (or CRUD)."
            },
            {
              "level": 3,
              "id": "ch14c12",
              "concept": "URI, URN, and URL",
              "explanation": "Web resources and web services such as RESTful APIs are identified using a URI. A URI has two specializations: Uniform Resource Name (URN) and Uniform Resource Locator (URL)."
            },
            {
              "level": 3,
              "id": "ch14c13",
              "concept": "RESTful request and response",
              "explanation": "In a RESTful web service, a request to the URI of a resource will elicit a response. The response will be a payload typically formatted in JSON."
            },
            {
              "level": 3,
              "id": "ch14c14",
              "concept": "Parts of an API request",
              "explanation": "The different parts of the API request are the API server, the resources, and the query. Queries can include the format, the key, and the parameters."
            },
            {
              "level": 3,
              "id": "ch14c15",
              "concept": "New methods to manage the network",
              "explanation": "There are now new and different methods that allow network operators to automatically monitor, manage, and configure the network. These include protocols and technologies such as REST, Ansible, Puppet, Chef, Python, JSON, XML, etc."
            },
            {
              "level": 3,
              "id": "ch14c16",
              "concept": "Configuration management tools use REST APIs",
              "explanation": "Configuration management tools use RESTful API requests to automate tasks and scale across thousands of devices."
            },
            {
              "level": 3,
              "id": "ch14c17",
              "concept": "Network features that benefit from automation",
              "explanation": "Network features that benefit from automation include software and version control, device attributes such as names, addressing, and security, protocol configurations, and ACL configurations."
            },
            {
              "level": 3,
              "id": "ch14c18",
              "concept": "Automation and orchestration",
              "explanation": "Configuration management tools typically include automation and orchestration. Orchestration is the organization of automated tasks that results in a coordinated process or workflow."
            },
            {
              "level": 3,
              "id": "ch14c19",
              "concept": "IBN",
              "explanation": "IBN builds on SDN and takes a fully automated, software-centric approach to designing and operating networks."
            },
            {
              "level": 3,
              "id": "ch14c20",
              "concept": "Three IBN functions",
              "explanation": "Cisco considers IBN to have three essential functions: translation, activation, and assurance."
            },
            {
              "level": 3,
              "id": "ch14c21",
              "concept": "Fabric (overlay)",
              "explanation": "The physical and virtual network infrastructure is a fabric. The term fabric describes an overlay that represents the logical topology used to virtually connect to the devices."
            },
            {
              "level": 3,
              "id": "ch14c22",
              "concept": "Underlay network",
              "explanation": "The underlay network is the physical topology that includes all the hardware required to meet the business objectives."
            },
            {
              "level": 3,
              "id": "ch14c23",
              "concept": "Cisco DNA",
              "explanation": "Cisco implements the IBN fabric using Cisco DNA. The business intent is securely deployed into the network infrastructure (the fabric). Cisco DNA then continuously collects data from a multitude of sources (devices and applications) to provide a rich context of information."
            },
            {
              "level": 3,
              "id": "ch14c24",
              "concept": "Cisco DNA Center",
              "explanation": "Cisco DNA Center is a network management and command center for provisioning and configuring network devices. It is a single-interface hardware and software platform that focuses on assurance, analytics, and automation."
            }
          ]
        }
      ]
    }
  ]
};

// Live alias to the single chapter's children (the 81 concept cards).
export const CHAPTERS = APP_DATA.children[0].children;
