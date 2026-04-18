// Arbre QCM CCNA : root -> chapitres -> QCM -> reponses.
// Chaque reponse : { correct: true|false }. Un QCM peut avoir plusieurs bonnes reponses.

const APP_DATA = {
  level: 0,
  id: "root",
  title: "CCNA Training",
  children: [
    {
      level: 1, id: "ch1", title: "Ch. 1 — Network Fundamentals",
      children: [
        { level: 2, id: "ch1_q1", title: "Quelle couche du modèle OSI gère le routage IP ?", children: [
          { level: 3, id: "ch1_q1_a1", text: "Couche 2 (Liaison)",     correct: false },
          { level: 3, id: "ch1_q1_a2", text: "Couche 3 (Réseau)",      correct: true  },
          { level: 3, id: "ch1_q1_a3", text: "Couche 4 (Transport)",   correct: false },
          { level: 3, id: "ch1_q1_a4", text: "Couche 7 (Application)", correct: false },
        ]},
        { level: 2, id: "ch1_q2", title: "Parmi ces adresses, lesquelles sont privées (RFC 1918) ?", children: [
          { level: 3, id: "ch1_q2_a1", text: "10.0.0.5",      correct: true  },
          { level: 3, id: "ch1_q2_a2", text: "172.20.10.1",   correct: true  },
          { level: 3, id: "ch1_q2_a3", text: "192.168.1.254", correct: true  },
          { level: 3, id: "ch1_q2_a4", text: "8.8.8.8",       correct: false },
        ]},
        { level: 2, id: "ch1_q3", title: "Quel protocole de transport est orienté connexion ?", children: [
          { level: 3, id: "ch1_q3_a1", text: "UDP",  correct: false },
          { level: 3, id: "ch1_q3_a2", text: "TCP",  correct: true  },
          { level: 3, id: "ch1_q3_a3", text: "ICMP", correct: false },
          { level: 3, id: "ch1_q3_a4", text: "ARP",  correct: false },
        ]},
        { level: 2, id: "ch1_q4", title: "Quelle est la taille d'une adresse MAC ?", children: [
          { level: 3, id: "ch1_q4_a1", text: "32 bits",  correct: false },
          { level: 3, id: "ch1_q4_a2", text: "48 bits",  correct: true  },
          { level: 3, id: "ch1_q4_a3", text: "64 bits",  correct: false },
          { level: 3, id: "ch1_q4_a4", text: "128 bits", correct: false },
        ]},
        { level: 2, id: "ch1_q5", title: "Masque par défaut d'une adresse de classe C ?", children: [
          { level: 3, id: "ch1_q5_a1", text: "/8  (255.0.0.0)",       correct: false },
          { level: 3, id: "ch1_q5_a2", text: "/16 (255.255.0.0)",     correct: false },
          { level: 3, id: "ch1_q5_a3", text: "/24 (255.255.255.0)",   correct: true  },
          { level: 3, id: "ch1_q5_a4", text: "/30 (255.255.255.252)", correct: false },
        ]},
      ]
    },
    {
      level: 1, id: "ch2", title: "Ch. 2 — Network Access (VLAN, STP)",
      children: [
        { level: 2, id: "ch2_q1", title: "Quelle commande IOS affiche la table de routage ?", children: [
          { level: 3, id: "ch2_q1_a1", text: "show running-config", correct: false },
          { level: 3, id: "ch2_q1_a2", text: "show ip route",       correct: true  },
          { level: 3, id: "ch2_q1_a3", text: "show interfaces",     correct: false },
          { level: 3, id: "ch2_q1_a4", text: "show arp",            correct: false },
        ]},
        { level: 2, id: "ch2_q2", title: "STP : quels rôles de port existent ? (plusieurs)", children: [
          { level: 3, id: "ch2_q2_a1", text: "Root port",       correct: true  },
          { level: 3, id: "ch2_q2_a2", text: "Designated port", correct: true  },
          { level: 3, id: "ch2_q2_a3", text: "Blocking port",   correct: true  },
          { level: 3, id: "ch2_q2_a4", text: "Transit port",    correct: false },
        ]},
        { level: 2, id: "ch2_q3", title: "VLAN par défaut sur un switch Cisco ?", children: [
          { level: 3, id: "ch2_q3_a1", text: "VLAN 0",    correct: false },
          { level: 3, id: "ch2_q3_a2", text: "VLAN 1",    correct: true  },
          { level: 3, id: "ch2_q3_a3", text: "VLAN 99",   correct: false },
          { level: 3, id: "ch2_q3_a4", text: "VLAN 1002", correct: false },
        ]},
        { level: 2, id: "ch2_q4", title: "Taille du tag 802.1Q ajouté à une trame ?", children: [
          { level: 3, id: "ch2_q4_a1", text: "2 octets", correct: false },
          { level: 3, id: "ch2_q4_a2", text: "4 octets", correct: true  },
          { level: 3, id: "ch2_q4_a3", text: "6 octets", correct: false },
          { level: 3, id: "ch2_q4_a4", text: "8 octets", correct: false },
        ]},
        { level: 2, id: "ch2_q5", title: "Quels protocoles négocient un EtherChannel ? (plusieurs)", children: [
          { level: 3, id: "ch2_q5_a1", text: "LACP (802.3ad)", correct: true  },
          { level: 3, id: "ch2_q5_a2", text: "PAgP (Cisco)",   correct: true  },
          { level: 3, id: "ch2_q5_a3", text: "CDP",            correct: false },
          { level: 3, id: "ch2_q5_a4", text: "LLDP",           correct: false },
        ]},
      ]
    },
    {
      level: 1, id: "ch3", title: "Ch. 3 — IP Connectivity (Routing)",
      children: [
        { level: 2, id: "ch3_q1", title: "Lesquels sont des IGP ? (plusieurs)", children: [
          { level: 3, id: "ch3_q1_a1", text: "OSPF",  correct: true  },
          { level: 3, id: "ch3_q1_a2", text: "EIGRP", correct: true  },
          { level: 3, id: "ch3_q1_a3", text: "RIP",   correct: true  },
          { level: 3, id: "ch3_q1_a4", text: "BGP",   correct: false },
        ]},
        { level: 2, id: "ch3_q2", title: "Rôle de l'area 0 en OSPF ?", children: [
          { level: 3, id: "ch3_q2_a1", text: "Stub area",                 correct: false },
          { level: 3, id: "ch3_q2_a2", text: "Backbone area",             correct: true  },
          { level: 3, id: "ch3_q2_a3", text: "Totally stubby area",       correct: false },
          { level: 3, id: "ch3_q2_a4", text: "NSSA (not-so-stubby area)", correct: false },
        ]},
        { level: 2, id: "ch3_q3", title: "Distance administrative (AD) d'OSPF ?", children: [
          { level: 3, id: "ch3_q3_a1", text: "1",   correct: false },
          { level: 3, id: "ch3_q3_a2", text: "90",  correct: false },
          { level: 3, id: "ch3_q3_a3", text: "110", correct: true  },
          { level: 3, id: "ch3_q3_a4", text: "120", correct: false },
        ]},
        { level: 2, id: "ch3_q4", title: "Quelle est la route par défaut IPv4 ?", children: [
          { level: 3, id: "ch3_q4_a1", text: "0.0.0.0/0",       correct: true  },
          { level: 3, id: "ch3_q4_a2", text: "127.0.0.1/32",    correct: false },
          { level: 3, id: "ch3_q4_a3", text: "255.255.255.255", correct: false },
          { level: 3, id: "ch3_q4_a4", text: "224.0.0.0/4",     correct: false },
        ]},
        { level: 2, id: "ch3_q5", title: "Quelle commande crée une route statique sur IOS ?", children: [
          { level: 3, id: "ch3_q5_a1", text: "ip route 10.0.0.0 255.0.0.0 192.168.1.1", correct: true  },
          { level: 3, id: "ch3_q5_a2", text: "route add 10.0.0.0/8 via 192.168.1.1",    correct: false },
          { level: 3, id: "ch3_q5_a3", text: "static-route 10.0.0.0/8 192.168.1.1",     correct: false },
          { level: 3, id: "ch3_q5_a4", text: "ip default-gateway 192.168.1.1",          correct: false },
        ]},
      ]
    },
    {
      level: 1, id: "ch4", title: "Ch. 4 — IP Services (DHCP, NAT…)",
      children: [
        { level: 2, id: "ch4_q1", title: "Ordre des messages DHCP pour obtenir une IP ?", children: [
          { level: 3, id: "ch4_q1_a1", text: "Discover, Offer, Request, Ack (DORA)", correct: true  },
          { level: 3, id: "ch4_q1_a2", text: "Request, Offer, Discover, Ack",        correct: false },
          { level: 3, id: "ch4_q1_a3", text: "Offer, Discover, Ack, Request",        correct: false },
          { level: 3, id: "ch4_q1_a4", text: "Discover, Request, Offer, Ack",        correct: false },
        ]},
        { level: 2, id: "ch4_q2", title: "Types de NAT possibles sur IOS ? (plusieurs)", children: [
          { level: 3, id: "ch4_q2_a1", text: "NAT statique",    correct: true  },
          { level: 3, id: "ch4_q2_a2", text: "NAT dynamique",   correct: true  },
          { level: 3, id: "ch4_q2_a3", text: "PAT (overload)",  correct: true  },
          { level: 3, id: "ch4_q2_a4", text: "NAT multicast",   correct: false },
        ]},
        { level: 2, id: "ch4_q3", title: "Port et transport utilisés par NTP ?", children: [
          { level: 3, id: "ch4_q3_a1", text: "TCP 123", correct: false },
          { level: 3, id: "ch4_q3_a2", text: "UDP 123", correct: true  },
          { level: 3, id: "ch4_q3_a3", text: "UDP 67",  correct: false },
          { level: 3, id: "ch4_q3_a4", text: "TCP 69",  correct: false },
        ]},
        { level: 2, id: "ch4_q4", title: "Syslog : quel est le niveau de sévérité 0 ?", children: [
          { level: 3, id: "ch4_q4_a1", text: "Debug",         correct: false },
          { level: 3, id: "ch4_q4_a2", text: "Informational", correct: false },
          { level: 3, id: "ch4_q4_a3", text: "Critical",      correct: false },
          { level: 3, id: "ch4_q4_a4", text: "Emergency",     correct: true  },
        ]},
        { level: 2, id: "ch4_q5", title: "Quel protocole attribue dynamiquement des adresses IPv6 via SLAAC ?", children: [
          { level: 3, id: "ch4_q5_a1", text: "DHCPv6",       correct: false },
          { level: 3, id: "ch4_q5_a2", text: "ICMPv6 (RA/RS)", correct: true },
          { level: 3, id: "ch4_q5_a3", text: "ARP",          correct: false },
          { level: 3, id: "ch4_q5_a4", text: "NAT64",        correct: false },
        ]},
      ]
    },
    {
      level: 1, id: "ch5", title: "Ch. 5 — Security Fundamentals",
      children: [
        { level: 2, id: "ch5_q1", title: "Types d'ACL standards sur Cisco IOS ? (plusieurs)", children: [
          { level: 3, id: "ch5_q1_a1", text: "ACL standard",  correct: true  },
          { level: 3, id: "ch5_q1_a2", text: "ACL étendue",   correct: true  },
          { level: 3, id: "ch5_q1_a3", text: "ACL dynamique", correct: false },
          { level: 3, id: "ch5_q1_a4", text: "ACL multicast", correct: false },
        ]},
        { level: 2, id: "ch5_q2", title: "Sur quel port TCP SSH écoute-t-il par défaut ?", children: [
          { level: 3, id: "ch5_q2_a1", text: "22",  correct: true  },
          { level: 3, id: "ch5_q2_a2", text: "23",  correct: false },
          { level: 3, id: "ch5_q2_a3", text: "80",  correct: false },
          { level: 3, id: "ch5_q2_a4", text: "443", correct: false },
        ]},
        { level: 2, id: "ch5_q3", title: "Modes de violation en port-security ? (plusieurs)", children: [
          { level: 3, id: "ch5_q3_a1", text: "protect",  correct: true  },
          { level: 3, id: "ch5_q3_a2", text: "restrict", correct: true  },
          { level: 3, id: "ch5_q3_a3", text: "shutdown", correct: true  },
          { level: 3, id: "ch5_q3_a4", text: "reset",    correct: false },
        ]},
        { level: 2, id: "ch5_q4", title: "Quel chiffrement WPA2 est recommandé ?", children: [
          { level: 3, id: "ch5_q4_a1", text: "WEP",      correct: false },
          { level: 3, id: "ch5_q4_a2", text: "TKIP",     correct: false },
          { level: 3, id: "ch5_q4_a3", text: "AES/CCMP", correct: true  },
          { level: 3, id: "ch5_q4_a4", text: "DES",      correct: false },
        ]},
        { level: 2, id: "ch5_q5", title: "Différence entre enable password et enable secret ?", children: [
          { level: 3, id: "ch5_q5_a1", text: "enable secret est haché (type 5/9), password est en clair", correct: true  },
          { level: 3, id: "ch5_q5_a2", text: "Aucune différence, alias l'un de l'autre",                   correct: false },
          { level: 3, id: "ch5_q5_a3", text: "enable password chiffre en AES-256",                         correct: false },
          { level: 3, id: "ch5_q5_a4", text: "enable secret n'est utilisable qu'en SSH",                   correct: false },
        ]},
      ]
    },
    {
      level: 1, id: "ch6", title: "Ch. 6 — Automation & Programmability",
      children: [
        { level: 2, id: "ch6_q1", title: "Caractéristiques d'une API REST ? (plusieurs)", children: [
          { level: 3, id: "ch6_q1_a1", text: "Stateless",                correct: true  },
          { level: 3, id: "ch6_q1_a2", text: "Utilise HTTP (GET/POST…)", correct: true  },
          { level: 3, id: "ch6_q1_a3", text: "Nécessite une session TCP persistante", correct: false },
          { level: 3, id: "ch6_q1_a4", text: "Payload souvent JSON",     correct: true  },
        ]},
        { level: 2, id: "ch6_q2", title: "Quel format est le plus léger généralement ?", children: [
          { level: 3, id: "ch6_q2_a1", text: "JSON", correct: true  },
          { level: 3, id: "ch6_q2_a2", text: "XML",  correct: false },
          { level: 3, id: "ch6_q2_a3", text: "YAML", correct: false },
          { level: 3, id: "ch6_q2_a4", text: "CSV",  correct: false },
        ]},
        { level: 2, id: "ch6_q3", title: "Ansible est-il agent-less ?", children: [
          { level: 3, id: "ch6_q3_a1", text: "Oui, il utilise SSH (ou WinRM)", correct: true  },
          { level: 3, id: "ch6_q3_a2", text: "Non, agent obligatoire",          correct: false },
          { level: 3, id: "ch6_q3_a3", text: "Uniquement avec un agent Python", correct: false },
          { level: 3, id: "ch6_q3_a4", text: "Uniquement via SNMP",             correct: false },
        ]},
        { level: 2, id: "ch6_q4", title: "En SDN, le plan de contrôle est…", children: [
          { level: 3, id: "ch6_q4_a1", text: "Distribué sur chaque équipement",   correct: false },
          { level: 3, id: "ch6_q4_a2", text: "Centralisé sur un contrôleur",      correct: true  },
          { level: 3, id: "ch6_q4_a3", text: "Supprimé totalement",               correct: false },
          { level: 3, id: "ch6_q4_a4", text: "Implémenté en hardware uniquement", correct: false },
        ]},
        { level: 2, id: "ch6_q5", title: "YANG est utilisé avec quels protocoles ? (plusieurs)", children: [
          { level: 3, id: "ch6_q5_a1", text: "NETCONF",  correct: true  },
          { level: 3, id: "ch6_q5_a2", text: "RESTCONF", correct: true  },
          { level: 3, id: "ch6_q5_a3", text: "SNMP",     correct: false },
          { level: 3, id: "ch6_q5_a4", text: "Syslog",   correct: false },
        ]},
      ]
    }
  ]
};
