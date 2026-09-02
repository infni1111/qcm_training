> **Ce fichier n'est pas un README pour humains.** C'est la mémoire de continuité
> d'une instance Claude Code sur ce projet. Le principe : une instance Claude
> Code est définie par sa mémoire — donc lire ce fichier au démarrage d'une
> session ne revient pas à "découvrir" le projet, mais à **reprendre le fil**
> exactement là où une session précédente (potentiellement dans un tout autre
> environnement — Codespace, autre machine) s'est arrêtée. Garde-le précis et à
> jour : documente aussi les erreurs rencontrées et comment elles ont été
> contournées, pas seulement l'état qui marche — une erreur est un savoir
> versionné, pas du bruit à effacer.

## Qui est l'utilisateur

- Login machine `hacker`, email `genius@indomi.cm`. Basé au Cameroun (Yaoundé).
  Environnement habituel : Windows 11 + WSL2 Kali Linux, machine peu puissante
  (~3,6 Go RAM) → développement **CLI-only**, pas d'IDE lourd. Teste sur
  téléphone physique réel, jamais d'émulateur.
- Plusieurs casquettes : technicien télécom terrain (SOCAPRESCO, sous-traitant
  MTN Cameroun), apprenant CCNA, apprenti reverse engineering/cybersécurité
  éthique, développeur freelance (GitHub `infni1111`), automaticien réseau
  (GNS3 + Ansible). Niveau technique intermédiaire-avancé, curieux,
  pragmatique, philosophique.
- Communique en français, attend des réponses en français.

## Comment travailler avec lui

1. **Expliquer le pourquoi, pas juste le comment** — il apprend activement.
2. **Ne pas noyer de questions.** Décider seul sur les choix non ambigus,
   livrer vite un résultat testable. Réserver les questions aux vraies
   ambiguïtés ou aux actions destructrices/irréversibles.
3. **Clarifier en prose**, pas via des menus à choix imposés.
4. **Rythme incrémental**, un point validé à la fois.
5. Toujours **vérifier l'état réel du code** avant de diagnostiquer.
6. **Git à chaque étape importante** — ce projet a déjà un historique de
   commits par étapes (`Step 1 done`, `Step 2...`), continuer ce style.

## Infrastructure transverse (partagée entre projets)

- **Supabase** : projet `primary-db` (ref `zxbbxfevsrczstrmrmpk`, org
  `infni1111`, région eu-west-3). Pooler `aws-1-eu-west-3.pooler.supabase.com`
  — port 6543 transaction, port 5432 session (dump/restore/Django). Mot de
  passe dans la table `pwd` de `db_hacker`.
- GitHub : compte `infni1111`, repos publics par défaut sauf données clients
  réelles.

## Ce que fait ce projet

Outil d'entraînement CCNA — flashcards d'auto-évaluation (a migré depuis un
format QCM à choix multiples, voir `Step 2` dans l'historique), avec un mode
vocal (flashcards audio) pour utilisateurs malvoyants. Frontend Vite,
`server.py` (Flask/FastAPI probable) pour le backend, déployé sur Render
(`render.yaml`). Déjà sur GitHub : `infni1111/qcm_training`.

## État au 2026-09-02

Travail en cours non encore commité au moment de la mise en place de ce
`CLAUDE.md` : ajout d'icônes PWA (`public/*.png`), ajustements
`vite.config.js`/`index.html`/`server.py`, mise à jour des dépendances
(`package-lock.json`), et un script `serve.sh`. Committé et poussé dans la
foulée de l'ajout de ce fichier de mémoire.
