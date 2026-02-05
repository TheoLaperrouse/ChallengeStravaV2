# Challenge Strava V2

Application web pour organiser des challenges sportifs entre amis en se basant sur les donnees Strava. Synchronisez vos activites, suivez vos statistiques et comparez-vous dans un classement general.

## Fonctionnalites

- **Authentification Strava** — Connexion via OAuth, aucun compte a creer
- **Synchronisation des activites** — Import automatique depuis l'API Strava
- **Dashboard personnel** — Distance, temps, denivele, graphiques mensuels
- **Classement global** — Leaderboard par distance avec stats comparatives
- **Multi-sport** — Filtrage par discipline : Course/Trail, Velo, Natation

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Vue 3, Vue Router, Tailwind CSS v4, Chart.js |
| Backend | Hono, Node.js |
| Base de donnees | PostgreSQL, Drizzle ORM |
| Tooling | pnpm workspaces, BiomeJS, TypeScript |
| Infra | Docker, Nginx |

## Structure du projet

```
ChallengeStravaV2/
├── packages/
│   ├── back/          # API Hono + Drizzle
│   │   └── src/
│   │       ├── db/           # Schema, connexion, migrations
│   │       ├── routes/       # auth, activities, dashboard, users
│   │       ├── middleware/    # Session cookie auth
│   │       └── services/     # Client Strava API
│   └── front/         # SPA Vue 3 + Vite
│       └── src/
│           ├── pages/        # Login, PersonalDashboard, GlobalDashboard
│           ├── components/   # Tables, charts, filtres, navbar
│           ├── composables/  # useAuth, useApi
│           └── types/        # Types partages
├── docker-compose.yml
├── biome.json
└── pnpm-workspace.yaml
```

## Prerequis

- Node.js >= 22
- pnpm >= 9
- PostgreSQL 16 (ou Docker)
- Un compte [Strava API](https://www.strava.com/settings/api)

## Installation

```bash
# Cloner le depot
git clone <repo-url> && cd ChallengeStravaV2

# Installer les dependances
pnpm install

# Copier et remplir les variables d'environnement
cp .env.example .env
```

Renseignez dans `.env` :

```
DATABASE_URL=postgres://strava:strava@localhost:5432/challenge_strava
STRAVA_CLIENT_ID=votre_client_id
STRAVA_CLIENT_SECRET=votre_client_secret
STRAVA_REDIRECT_URI=http://localhost:3000/api/auth/callback
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=une_chaine_secrete_de_32_caracteres
```

## Developpement

```bash
# Demarrer PostgreSQL (via Docker)
docker compose up postgres -d

# Lancer le backend (port 3000)
pnpm dev:back

# Lancer le frontend (port 5173)
pnpm dev:front
```

Le serveur Vite proxy les appels `/api` vers le backend automatiquement.

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `pnpm dev:back` | Lance le backend en mode watch |
| `pnpm dev:front` | Lance le frontend Vite |
| `pnpm build:back` | Compile le backend TypeScript |
| `pnpm build:front` | Type-check + build Vite |
| `pnpm lint` | Verifie le code avec BiomeJS |
| `pnpm lint:fix` | Corrige automatiquement le formatage |
| `pnpm db:generate` | Genere une migration Drizzle |
| `pnpm db:migrate` | Applique les migrations |

## Docker

```bash
# Lancer toute la stack (PostgreSQL + backend + frontend)
docker compose up --build
```

Services :

| Service | Port | Description |
|---------|------|-------------|
| `postgres` | 5432 | Base de donnees PostgreSQL |
| `back` | 3000 | API Hono |
| `front` | 5173 | Nginx servant le SPA Vue |

Les migrations sont executees automatiquement au demarrage du backend.

## API

### Auth
| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/api/auth/login` | Redirige vers Strava OAuth |
| GET | `/api/auth/callback` | Callback OAuth, cree la session |
| GET | `/api/auth/me` | Retourne l'utilisateur connecte |
| POST | `/api/auth/logout` | Deconnexion |

### Activities
| Methode | Route | Description |
|---------|-------|-------------|
| POST | `/api/activities/sync` | Synchronise depuis Strava |
| GET | `/api/activities?type=Run\|Ride\|Swim` | Liste les activites filtrees |

### Dashboard
| Methode | Route | Description |
|---------|-------|-------------|
| GET | `/api/dashboard/personal?type=Run` | Stats personnelles |
| GET | `/api/dashboard/global?type=Run` | Leaderboard + stats globales |

## Configuration Strava

1. Rendez-vous sur [strava.com/settings/api](https://www.strava.com/settings/api)
2. Creez une application
3. Renseignez le **Authorization Callback Domain** : `localhost`
4. Copiez le **Client ID** et le **Client Secret** dans votre `.env`

## Licence

[MIT](./LICENSE)
