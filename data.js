// Structure en arbre : level 0 -> 1 (chapitres) -> 2 (QCM) -> 3 (réponses).
// Une réponse porte `correct: true|false`. Un QCM peut avoir 1+ bonnes réponses.

const APP_DATA = {
  level: 0,
  id: "root",
  title: "CCNA Training",
  children: [
    {
      level: 1,
      id: "ch1",
      title: "Chapitre 1 — Network Fundamentals",
      children: [
        {
          level: 2,
          id: "ch1_q1",
          title: "Quelle couche du modèle OSI gère le routage IP ?",
          children: [
            { level: 3, id: "ch1_q1_a1", text: "Couche 2 (Liaison)",     correct: false },
            { level: 3, id: "ch1_q1_a2", text: "Couche 3 (Réseau)",      correct: true  },
            { level: 3, id: "ch1_q1_a3", text: "Couche 4 (Transport)",   correct: false },
            { level: 3, id: "ch1_q1_a4", text: "Couche 7 (Application)", correct: false }
          ]
        },
        {
          level: 2,
          id: "ch1_q2",
          title: "Parmi ces adresses, lesquelles sont privées (RFC 1918) ?",
          children: [
            { level: 3, id: "ch1_q2_a1", text: "10.0.0.5",      correct: true  },
            { level: 3, id: "ch1_q2_a2", text: "172.20.10.1",   correct: true  },
            { level: 3, id: "ch1_q2_a3", text: "192.168.1.254", correct: true  },
            { level: 3, id: "ch1_q2_a4", text: "8.8.8.8",       correct: false }
          ]
        }
      ]
    },
    {
      level: 1,
      id: "ch2",
      title: "Chapitre 2 — Routing & Switching",
      children: [
        {
          level: 2,
          id: "ch2_q1",
          title: "Quelle commande IOS affiche la table de routage ?",
          children: [
            { level: 3, id: "ch2_q1_a1", text: "show running-config", correct: false },
            { level: 3, id: "ch2_q1_a2", text: "show ip route",       correct: true  },
            { level: 3, id: "ch2_q1_a3", text: "show interfaces",     correct: false },
            { level: 3, id: "ch2_q1_a4", text: "show arp",            correct: false }
          ]
        },
        {
          level: 2,
          id: "ch2_q2",
          title: "STP : quels rôles de port existent ? (plusieurs)",
          children: [
            { level: 3, id: "ch2_q2_a1", text: "Root port",       correct: true  },
            { level: 3, id: "ch2_q2_a2", text: "Designated port", correct: true  },
            { level: 3, id: "ch2_q2_a3", text: "Blocking port",   correct: true  },
            { level: 3, id: "ch2_q2_a4", text: "Transit port",    correct: false }
          ]
        }
      ]
    }
  ]
};
