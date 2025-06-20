# Étape 1 : Construction de l'application
FROM node:22.16.0-alpine AS builder

# Installer PNPM
RUN npm install -g pnpm
USER node
WORKDIR /app

# Copier les fichiers de configuration
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copier le reste de l'application
COPY --chown=node:node . .

# Construire l'application
RUN pnpm run build

# Étape 2 : Exécution de l'application
FROM node:22.16.0-alpine

USER node
WORKDIR /app

# Copier les fichiers nécessaires depuis l'étape de construction
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
# Suppression de la ligne suivante si next.config.js n'est pas nécessaire
# COPY --from=builder /app/next.config.js ./

# Installer les dépendances de production
RUN pnpm install --prod

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["pnpm", "start"]