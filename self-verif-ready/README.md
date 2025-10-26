# Self Verif (Next.js + Self Protocol)

Démo minimaliste pour vérifier un utilisateur via **Self** (staging).

## Variables d'environnement (Vercel)
- `NEXT_PUBLIC_SELF_APP_NAME` = `Self Demo`
- `NEXT_PUBLIC_SELF_SCOPE` = `self-playground`
- `NEXT_PUBLIC_SELF_ENDPOINT` = `https://playground.self.xyz`

## Passage en production
- Dans `app/api/verify/route.ts`: `mockPassport` -> `false` et utilise l'endpoint de prod.
- Dans `app/page.tsx`: `endpointType` -> endpoint de prod.
- Garde une config **identique** front/back (âge, pays, OFAC), sinon la preuve échoue.
