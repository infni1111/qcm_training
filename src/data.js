// Tree data: root -> chapters (wrapper) -> chapter -> QCM -> answer.
// Levels: root=0, chapters=1, chapter=2, QCM=3, answer=4.
// Each QCM: { title, explanation, children: [answers] }.
// Each answer: { text, correct }. A QCM may have several correct answers.

export const APP_DATA = {
  level: 0,
  id: 'root',
  title: 'CCNA Training',
  children: [
    {
      level: 1,
      id: 'chapters',
      title: 'Chapters',
      children: [
    {
      level: 2, id: 'ch1', title: 'Ch. 1 — Network Fundamentals',
      children: [
        { level: 3, id: 'ch1_q1', title: "Quelle couche du modèle OSI gère le routage IP ?",
          explanation: "Le routage IP s'effectue à la couche 3 (Réseau) du modèle OSI. Cette couche gère l'adressage logique (IP) et la sélection du meilleur chemin entre réseaux distincts. La couche 2 manipule des adresses MAC (même segment), la couche 4 gère le transport de bout en bout (TCP/UDP), et la couche 7 est applicative (HTTP, DNS…).",
          children: [
            { level: 4, id: 'ch1_q1_a1', text: 'Couche 2 (Liaison)',     correct: false },
            { level: 4, id: 'ch1_q1_a2', text: 'Couche 3 (Réseau)',      correct: true  },
            { level: 4, id: 'ch1_q1_a3', text: 'Couche 4 (Transport)',   correct: false },
            { level: 4, id: 'ch1_q1_a4', text: 'Couche 7 (Application)', correct: false },
          ]},
        { level: 3, id: 'ch1_q2', title: "Parmi ces adresses, lesquelles sont privées (RFC 1918) ?",
          explanation: "La RFC 1918 définit trois plages privées, non routables sur Internet : 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 – 172.31.255.255) et 192.168.0.0/16. 8.8.8.8 est une adresse publique (DNS Google). Ces plages privées nécessitent du NAT pour sortir vers Internet.",
          children: [
            { level: 4, id: 'ch1_q2_a1', text: '10.0.0.5',      correct: true  },
            { level: 4, id: 'ch1_q2_a2', text: '172.20.10.1',   correct: true  },
            { level: 4, id: 'ch1_q2_a3', text: '192.168.1.254', correct: true  },
            { level: 4, id: 'ch1_q2_a4', text: '8.8.8.8',       correct: false },
          ]},
        { level: 3, id: 'ch1_q3', title: "Quel protocole de transport est orienté connexion ?",
          explanation: "TCP établit une connexion fiable via un 3-way handshake (SYN, SYN-ACK, ACK), numérote les segments, retransmet en cas de perte et contrôle le flux. UDP est sans connexion, plus rapide mais sans garantie (utile pour DNS, VoIP, streaming). ICMP sert au contrôle/diagnostic (ping), ARP résout IP↔MAC.",
          children: [
            { level: 4, id: 'ch1_q3_a1', text: 'UDP',  correct: false },
            { level: 4, id: 'ch1_q3_a2', text: 'TCP',  correct: true  },
            { level: 4, id: 'ch1_q3_a3', text: 'ICMP', correct: false },
            { level: 4, id: 'ch1_q3_a4', text: 'ARP',  correct: false },
          ]},
        { level: 3, id: 'ch1_q4', title: "Quelle est la taille d'une adresse MAC ?",
          explanation: "Une adresse MAC fait 48 bits (6 octets), notée en hexadécimal, ex : 00:1A:2B:3C:4D:5E. Les 3 premiers octets (OUI) identifient le fabricant, les 3 derniers sont attribués par lui. Elle est gravée sur la carte réseau mais peut être modifiée logiquement (MAC spoofing).",
          children: [
            { level: 4, id: 'ch1_q4_a1', text: '32 bits',  correct: false },
            { level: 4, id: 'ch1_q4_a2', text: '48 bits',  correct: true  },
            { level: 4, id: 'ch1_q4_a3', text: '64 bits',  correct: false },
            { level: 4, id: 'ch1_q4_a4', text: '128 bits', correct: false },
          ]},
        { level: 3, id: 'ch1_q5', title: "Masque par défaut d'une adresse de classe C ?",
          explanation: "En adressage classful (historique), la classe C couvre 192.0.0.0 – 223.255.255.255 avec un masque par défaut /24 (255.255.255.0), soit 256 adresses par réseau. Aujourd'hui on utilise CIDR (VLSM) : le masque est explicite et peut être /25, /26, /30… selon le besoin.",
          children: [
            { level: 4, id: 'ch1_q5_a1', text: '/8  (255.0.0.0)',       correct: false },
            { level: 4, id: 'ch1_q5_a2', text: '/16 (255.255.0.0)',     correct: false },
            { level: 4, id: 'ch1_q5_a3', text: '/24 (255.255.255.0)',   correct: true  },
            { level: 4, id: 'ch1_q5_a4', text: '/30 (255.255.255.252)', correct: false },
          ]},
      ]
    },
    {
      level: 2, id: 'ch2', title: 'Ch. 2 — Network Access (VLAN, STP)',
      children: [
        { level: 3, id: 'ch2_q1', title: "Quelle commande IOS affiche la table de routage ?",
          explanation: "`show ip route` affiche la table de routage IPv4 : réseaux connus, code source (C=Connected, S=Static, O=OSPF, D=EIGRP, R=RIP, B=BGP), distance administrative, métrique et next-hop. `show running-config` affiche la config active, `show interfaces` l'état physique/logique des interfaces.",
          children: [
            { level: 4, id: 'ch2_q1_a1', text: 'show running-config', correct: false },
            { level: 4, id: 'ch2_q1_a2', text: 'show ip route',       correct: true  },
            { level: 4, id: 'ch2_q1_a3', text: 'show interfaces',     correct: false },
            { level: 4, id: 'ch2_q1_a4', text: 'show arp',            correct: false },
          ]},
        { level: 3, id: 'ch2_q2', title: "STP : quels rôles de port existent ? (plusieurs)",
          explanation: "STP (802.1D) évite les boucles L2. Rôles : Root Port (un seul par switch non-root, vers la racine), Designated Port (un par segment, expédie le trafic), Non-Designated/Blocking (bloque pour casser la boucle). RSTP (802.1w) ajoute Alternate et Backup. « Transit port » n'existe pas.",
          children: [
            { level: 4, id: 'ch2_q2_a1', text: 'Root port',       correct: true  },
            { level: 4, id: 'ch2_q2_a2', text: 'Designated port', correct: true  },
            { level: 4, id: 'ch2_q2_a3', text: 'Blocking port',   correct: true  },
            { level: 4, id: 'ch2_q2_a4', text: 'Transit port',    correct: false },
          ]},
        { level: 3, id: 'ch2_q3', title: "VLAN par défaut sur un switch Cisco ?",
          explanation: "Le VLAN 1 est le VLAN par défaut : tous les ports y sont assignés après un reset (boot factory). Il ne peut pas être supprimé. Les VLAN 1002–1005 sont réservés à Token Ring/FDDI. Bonne pratique : ne jamais laisser du trafic utilisateur sur le VLAN 1 (cible des attaques).",
          children: [
            { level: 4, id: 'ch2_q3_a1', text: 'VLAN 0',    correct: false },
            { level: 4, id: 'ch2_q3_a2', text: 'VLAN 1',    correct: true  },
            { level: 4, id: 'ch2_q3_a3', text: 'VLAN 99',   correct: false },
            { level: 4, id: 'ch2_q3_a4', text: 'VLAN 1002', correct: false },
          ]},
        { level: 3, id: 'ch2_q4', title: "Taille du tag 802.1Q ajouté à une trame ?",
          explanation: "Le tag 802.1Q fait 4 octets, inséré après l'adresse MAC source : 2 octets TPID (0x8100 identifie un tag VLAN) + 2 octets TCI (Priority 3 bits CoS, DEI 1 bit, VLAN ID 12 bits → 4096 VLAN possibles). ISL (Cisco, obsolète) encapsulait au lieu de tagger.",
          children: [
            { level: 4, id: 'ch2_q4_a1', text: '2 octets', correct: false },
            { level: 4, id: 'ch2_q4_a2', text: '4 octets', correct: true  },
            { level: 4, id: 'ch2_q4_a3', text: '6 octets', correct: false },
            { level: 4, id: 'ch2_q4_a4', text: '8 octets', correct: false },
          ]},
        { level: 3, id: 'ch2_q5', title: "Quels protocoles négocient un EtherChannel ? (plusieurs)",
          explanation: "EtherChannel agrège plusieurs liens physiques en un lien logique. Deux protocoles de négociation : LACP (standard IEEE 802.3ad, modes active/passive) et PAgP (propriétaire Cisco, modes desirable/auto). Mode « on » = pas de négociation. CDP/LLDP sont des protocoles de découverte voisins, rien à voir.",
          children: [
            { level: 4, id: 'ch2_q5_a1', text: 'LACP (802.3ad)', correct: true  },
            { level: 4, id: 'ch2_q5_a2', text: 'PAgP (Cisco)',   correct: true  },
            { level: 4, id: 'ch2_q5_a3', text: 'CDP',            correct: false },
            { level: 4, id: 'ch2_q5_a4', text: 'LLDP',           correct: false },
          ]},
      ]
    },
    {
      level: 2, id: 'ch3', title: 'Ch. 3 — IP Connectivity (Routing)',
      children: [
        { level: 3, id: 'ch3_q1', title: "Lesquels sont des IGP ? (plusieurs)",
          explanation: "Un IGP (Interior Gateway Protocol) route à l'intérieur d'un AS : OSPF (link-state), EIGRP (hybride Cisco), RIP (distance-vector), IS-IS (link-state). BGP est un EGP (Exterior Gateway Protocol), utilisé entre AS sur Internet, path-vector.",
          children: [
            { level: 4, id: 'ch3_q1_a1', text: 'OSPF',  correct: true  },
            { level: 4, id: 'ch3_q1_a2', text: 'EIGRP', correct: true  },
            { level: 4, id: 'ch3_q1_a3', text: 'RIP',   correct: true  },
            { level: 4, id: 'ch3_q1_a4', text: 'BGP',   correct: false },
          ]},
        { level: 3, id: 'ch3_q2', title: "Rôle de l'area 0 en OSPF ?",
          explanation: "L'area 0 est la backbone area : toutes les autres areas (stub, totally stubby, NSSA) doivent s'y connecter directement ou via un virtual link. Cette topologie hiérarchique évite les boucles inter-area et limite la propagation des LSA.",
          children: [
            { level: 4, id: 'ch3_q2_a1', text: 'Stub area',                 correct: false },
            { level: 4, id: 'ch3_q2_a2', text: 'Backbone area',             correct: true  },
            { level: 4, id: 'ch3_q2_a3', text: 'Totally stubby area',       correct: false },
            { level: 4, id: 'ch3_q2_a4', text: 'NSSA (not-so-stubby area)', correct: false },
          ]},
        { level: 3, id: 'ch3_q3', title: "Distance administrative (AD) d'OSPF ?",
          explanation: "L'AD départage deux routes vers la même destination apprises par des sources différentes (la plus petite gagne). Valeurs Cisco usuelles : Connected 0, Static 1, eBGP 20, EIGRP interne 90, OSPF 110, IS-IS 115, RIP 120, EIGRP externe 170, iBGP 200.",
          children: [
            { level: 4, id: 'ch3_q3_a1', text: '1',   correct: false },
            { level: 4, id: 'ch3_q3_a2', text: '90',  correct: false },
            { level: 4, id: 'ch3_q3_a3', text: '110', correct: true  },
            { level: 4, id: 'ch3_q3_a4', text: '120', correct: false },
          ]},
        { level: 3, id: 'ch3_q4', title: "Quelle est la route par défaut IPv4 ?",
          explanation: "La route par défaut 0.0.0.0/0 (masque /0) matche toute destination et sert de « gateway of last resort » quand aucune route plus spécifique ne correspond. En IPv6 c'est ::/0. 127.0.0.1 est la loopback, 255.255.255.255 le broadcast limité, 224.0.0.0/4 le multicast.",
          children: [
            { level: 4, id: 'ch3_q4_a1', text: '0.0.0.0/0',       correct: true  },
            { level: 4, id: 'ch3_q4_a2', text: '127.0.0.1/32',    correct: false },
            { level: 4, id: 'ch3_q4_a3', text: '255.255.255.255', correct: false },
            { level: 4, id: 'ch3_q4_a4', text: '224.0.0.0/4',     correct: false },
          ]},
        { level: 3, id: 'ch3_q5', title: "Quelle commande crée une route statique sur IOS ?",
          explanation: "Syntaxe : `ip route <réseau> <masque> <next-hop | interface> [AD] [tag]`. Exemple : `ip route 10.0.0.0 255.0.0.0 192.168.1.1`. `ip default-gateway` ne concerne que les devices sans routage activé (switches L2). Les autres syntaxes proposées sont inventées.",
          children: [
            { level: 4, id: 'ch3_q5_a1', text: 'ip route 10.0.0.0 255.0.0.0 192.168.1.1', correct: true  },
            { level: 4, id: 'ch3_q5_a2', text: 'route add 10.0.0.0/8 via 192.168.1.1',    correct: false },
            { level: 4, id: 'ch3_q5_a3', text: 'static-route 10.0.0.0/8 192.168.1.1',     correct: false },
            { level: 4, id: 'ch3_q5_a4', text: 'ip default-gateway 192.168.1.1',          correct: false },
          ]},
      ]
    },
    {
      level: 2, id: 'ch4', title: 'Ch. 4 — IP Services (DHCP, NAT…)',
      children: [
        { level: 3, id: 'ch4_q1', title: "Ordre des messages DHCP pour obtenir une IP ?",
          explanation: "DORA : Discover (client en broadcast 255.255.255.255 sur UDP 67/68), Offer (serveur propose une IP), Request (client demande formellement), Ack (serveur confirme et fournit lease, masque, gateway, DNS). Un DHCP relay (`ip helper-address`) transporte le Discover vers un serveur d'un autre subnet.",
          children: [
            { level: 4, id: 'ch4_q1_a1', text: 'Discover, Offer, Request, Ack (DORA)', correct: true  },
            { level: 4, id: 'ch4_q1_a2', text: 'Request, Offer, Discover, Ack',        correct: false },
            { level: 4, id: 'ch4_q1_a3', text: 'Offer, Discover, Ack, Request',        correct: false },
            { level: 4, id: 'ch4_q1_a4', text: 'Discover, Request, Offer, Ack',        correct: false },
          ]},
        { level: 3, id: 'ch4_q2', title: "Types de NAT possibles sur IOS ? (plusieurs)",
          explanation: "NAT statique (mapping 1:1 fixe, ex : serveur interne vers IP publique). NAT dynamique (1:1 depuis un pool, à la volée). PAT / NAT overload (N:1, plusieurs IP internes partagent une IP publique via des ports différents, cas le plus courant en home/SMB). « NAT multicast » n'existe pas comme type.",
          children: [
            { level: 4, id: 'ch4_q2_a1', text: 'NAT statique',    correct: true  },
            { level: 4, id: 'ch4_q2_a2', text: 'NAT dynamique',   correct: true  },
            { level: 4, id: 'ch4_q2_a3', text: 'PAT (overload)',  correct: true  },
            { level: 4, id: 'ch4_q2_a4', text: 'NAT multicast',   correct: false },
          ]},
        { level: 3, id: 'ch4_q3', title: "Port et transport utilisés par NTP ?",
          explanation: "NTP utilise UDP port 123. La notion de stratum indique la distance à la source : stratum 0 = horloge de référence (GPS, atomique), stratum 1 = serveur connecté à la source, … stratum 15 = limite, stratum 16 = non-synchronisé. UDP 67 = DHCP serveur, TCP 69 = TFTP (en réalité UDP 69).",
          children: [
            { level: 4, id: 'ch4_q3_a1', text: 'TCP 123', correct: false },
            { level: 4, id: 'ch4_q3_a2', text: 'UDP 123', correct: true  },
            { level: 4, id: 'ch4_q3_a3', text: 'UDP 67',  correct: false },
            { level: 4, id: 'ch4_q3_a4', text: 'TCP 69',  correct: false },
          ]},
        { level: 3, id: 'ch4_q4', title: "Syslog : quel est le niveau de sévérité 0 ?",
          explanation: "Niveaux de sévérité Syslog (0 = le plus grave) : 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug. `logging trap 4` envoie tout ce qui est ≤ warning. Mnémonique : « Every Awesome Cisco Engineer Will Need Ice-cream Daily ».",
          children: [
            { level: 4, id: 'ch4_q4_a1', text: 'Debug',         correct: false },
            { level: 4, id: 'ch4_q4_a2', text: 'Informational', correct: false },
            { level: 4, id: 'ch4_q4_a3', text: 'Critical',      correct: false },
            { level: 4, id: 'ch4_q4_a4', text: 'Emergency',     correct: true  },
          ]},
        { level: 3, id: 'ch4_q5', title: "Quel protocole attribue dynamiquement des adresses IPv6 via SLAAC ?",
          explanation: "SLAAC (StateLess Address Auto-Configuration) : le client envoie un Router Solicitation (RS) en ICMPv6, le routeur répond par un Router Advertisement (RA) contenant le préfixe /64. Le client forge son adresse en concaténant le préfixe + son interface ID (EUI-64 ou random). DHCPv6 est stateful, complémentaire ou alternatif.",
          children: [
            { level: 4, id: 'ch4_q5_a1', text: 'DHCPv6',         correct: false },
            { level: 4, id: 'ch4_q5_a2', text: 'ICMPv6 (RA/RS)', correct: true  },
            { level: 4, id: 'ch4_q5_a3', text: 'ARP',            correct: false },
            { level: 4, id: 'ch4_q5_a4', text: 'NAT64',          correct: false },
          ]},
      ]
    },
    {
      level: 2, id: 'ch5', title: 'Ch. 5 — Security Fundamentals',
      children: [
        { level: 3, id: 'ch5_q1', title: "Types d'ACL standards sur Cisco IOS ? (plusieurs)",
          explanation: "ACL standard (1-99, 1300-1999) : filtre uniquement sur l'IP source. ACL étendue (100-199, 2000-2699) : filtre source/destination/protocole/ports. Les ACL nommées (ex : `ip access-list extended BLOCK_WEB`) sont une notation, pas un type supplémentaire. « ACL dynamique » (lock-and-key) existe mais pas au CCNA de base.",
          children: [
            { level: 4, id: 'ch5_q1_a1', text: 'ACL standard',  correct: true  },
            { level: 4, id: 'ch5_q1_a2', text: 'ACL étendue',   correct: true  },
            { level: 4, id: 'ch5_q1_a3', text: 'ACL dynamique', correct: false },
            { level: 4, id: 'ch5_q1_a4', text: 'ACL multicast', correct: false },
          ]},
        { level: 3, id: 'ch5_q2', title: "Sur quel port TCP SSH écoute-t-il par défaut ?",
          explanation: "SSH = TCP 22, chiffré (AES, clés RSA/ECDSA). Telnet = TCP 23, en clair, à proscrire. HTTP = 80, HTTPS = 443. Sur IOS : `line vty 0 4` puis `transport input ssh` pour n'autoriser que SSH, + `crypto key generate rsa` pour la clé et `username ... secret ...` pour un compte local.",
          children: [
            { level: 4, id: 'ch5_q2_a1', text: '22',  correct: true  },
            { level: 4, id: 'ch5_q2_a2', text: '23',  correct: false },
            { level: 4, id: 'ch5_q2_a3', text: '80',  correct: false },
            { level: 4, id: 'ch5_q2_a4', text: '443', correct: false },
          ]},
        { level: 3, id: 'ch5_q3', title: "Modes de violation en port-security ? (plusieurs)",
          explanation: "`switchport port-security violation {protect|restrict|shutdown}`. protect = drop silencieux des trames non autorisées ; restrict = drop + log SNMP/Syslog + incrément du compteur ; shutdown (défaut) = met l'interface en err-disabled, à réactiver manuellement ou via `errdisable recovery`.",
          children: [
            { level: 4, id: 'ch5_q3_a1', text: 'protect',  correct: true  },
            { level: 4, id: 'ch5_q3_a2', text: 'restrict', correct: true  },
            { level: 4, id: 'ch5_q3_a3', text: 'shutdown', correct: true  },
            { level: 4, id: 'ch5_q3_a4', text: 'reset',    correct: false },
          ]},
        { level: 3, id: 'ch5_q4', title: "Quel chiffrement WPA2 est recommandé ?",
          explanation: "WPA2 utilise CCMP (basé sur AES), solide cryptographiquement. TKIP date de WPA1 (mitigation de WEP), aujourd'hui considéré faible. WEP (clé RC4 40/104 bits) est cassé depuis longtemps. WPA3 (depuis 2018) introduit SAE (Simultaneous Authentication of Equals) contre les attaques par dictionnaire.",
          children: [
            { level: 4, id: 'ch5_q4_a1', text: 'WEP',      correct: false },
            { level: 4, id: 'ch5_q4_a2', text: 'TKIP',     correct: false },
            { level: 4, id: 'ch5_q4_a3', text: 'AES/CCMP', correct: true  },
            { level: 4, id: 'ch5_q4_a4', text: 'DES',      correct: false },
          ]},
        { level: 3, id: 'ch5_q5', title: "Différence entre enable password et enable secret ?",
          explanation: "`enable password` : stocké en clair (type 0) ou faiblement chiffré (type 7 Vigenère, réversible en secondes). `enable secret` : haché en MD5 (type 5) ou scrypt (type 9, recommandé). Si les deux sont configurés, enable secret gagne. `service password-encryption` chiffre les autres mots de passe en type 7 (trompeur, pas sécurisé).",
          children: [
            { level: 4, id: 'ch5_q5_a1', text: "enable secret est haché (type 5/9), password est en clair", correct: true  },
            { level: 4, id: 'ch5_q5_a2', text: "Aucune différence, alias l'un de l'autre",                  correct: false },
            { level: 4, id: 'ch5_q5_a3', text: "enable password chiffre en AES-256",                        correct: false },
            { level: 4, id: 'ch5_q5_a4', text: "enable secret n'est utilisable qu'en SSH",                  correct: false },
          ]},
      ]
    },
    {
      level: 2, id: 'ch6', title: 'Ch. 6 — Automation & Programmability',
      children: [
        { level: 3, id: 'ch6_q1', title: "Caractéristiques d'une API REST ? (plusieurs)",
          explanation: "REST (Representational State Transfer) : stateless (chaque requête est autonome, aucun état conservé côté serveur entre les appels), utilise HTTP (GET lire, POST créer, PUT/PATCH modifier, DELETE supprimer), ressources identifiées par URI, payload souvent JSON. Pas besoin de session TCP persistante.",
          children: [
            { level: 4, id: 'ch6_q1_a1', text: 'Stateless',                correct: true  },
            { level: 4, id: 'ch6_q1_a2', text: 'Utilise HTTP (GET/POST…)', correct: true  },
            { level: 4, id: 'ch6_q1_a3', text: 'Nécessite une session TCP persistante', correct: false },
            { level: 4, id: 'ch6_q1_a4', text: 'Payload souvent JSON',     correct: true  },
          ]},
        { level: 3, id: 'ch6_q2', title: "Quel format est le plus léger généralement ?",
          explanation: "JSON est plus compact que XML à données égales (pas de balises fermantes, pas de déclaration de schéma obligatoire). YAML est lisible mais comparable à JSON en taille. CSV est le plus dense pour des tableaux purs mais non hiérarchique. Pour des API modernes : JSON ; pour de la config humaine : YAML.",
          children: [
            { level: 4, id: 'ch6_q2_a1', text: 'JSON', correct: true  },
            { level: 4, id: 'ch6_q2_a2', text: 'XML',  correct: false },
            { level: 4, id: 'ch6_q2_a3', text: 'YAML', correct: false },
            { level: 4, id: 'ch6_q2_a4', text: 'CSV',  correct: false },
          ]},
        { level: 3, id: 'ch6_q3', title: "Ansible est-il agent-less ?",
          explanation: "Ansible est agent-less : il se connecte en SSH (Linux/équipements réseau) ou WinRM (Windows) depuis le control node, copie et exécute des modules Python temporairement. Aucun agent permanent à installer/maintenir. Les alternatives comme Puppet/Chef nécessitent classiquement un agent.",
          children: [
            { level: 4, id: 'ch6_q3_a1', text: 'Oui, il utilise SSH (ou WinRM)', correct: true  },
            { level: 4, id: 'ch6_q3_a2', text: 'Non, agent obligatoire',         correct: false },
            { level: 4, id: 'ch6_q3_a3', text: 'Uniquement avec un agent Python',correct: false },
            { level: 4, id: 'ch6_q3_a4', text: 'Uniquement via SNMP',            correct: false },
          ]},
        { level: 3, id: 'ch6_q4', title: "En SDN, le plan de contrôle est…",
          explanation: "SDN (Software-Defined Networking) sépare le control plane (décisions de routage) du data plane (forwarding). Le control plane est centralisé sur un contrôleur (Cisco DNA Center, ACI APIC, ONOS, OpenDaylight) qui programme les équipements via OpenFlow / NETCONF / REST. Vision globale du réseau → politiques cohérentes.",
          children: [
            { level: 4, id: 'ch6_q4_a1', text: 'Distribué sur chaque équipement',   correct: false },
            { level: 4, id: 'ch6_q4_a2', text: 'Centralisé sur un contrôleur',      correct: true  },
            { level: 4, id: 'ch6_q4_a3', text: 'Supprimé totalement',               correct: false },
            { level: 4, id: 'ch6_q4_a4', text: 'Implémenté en hardware uniquement', correct: false },
          ]},
        { level: 3, id: 'ch6_q5', title: "YANG est utilisé avec quels protocoles ? (plusieurs)",
          explanation: "YANG (RFC 7950) est un langage de modélisation de données réseau (décrit la structure de la config/état). Il est consommé par NETCONF (transport SSH, encodage XML) et RESTCONF (HTTP/HTTPS, JSON ou XML). SNMP utilise MIBs (ASN.1), Syslog n'est pas concerné.",
          children: [
            { level: 4, id: 'ch6_q5_a1', text: 'NETCONF',  correct: true  },
            { level: 4, id: 'ch6_q5_a2', text: 'RESTCONF', correct: true  },
            { level: 4, id: 'ch6_q5_a3', text: 'SNMP',     correct: false },
            { level: 4, id: 'ch6_q5_a4', text: 'Syslog',   correct: false },
          ]},
      ]
    }
      ]
    }
  ]
};

// Convenience accessor: the list of chapters under the 'chapters' wrapper.
export const CHAPTERS = APP_DATA.children[0].children;
