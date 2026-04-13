# ── Stage 1: deps ────────────────────────────────────────────────────────────
# Install production + dev dependencies so the build stage has everything it
# needs (prisma CLI, next, typescript, etc.).
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json ./
RUN npm install

# ── Stage 2: builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Bring in installed node_modules from the deps stage.
COPY --from=deps /app/node_modules ./node_modules

# Copy the full source tree.
COPY . .

# Generate the Prisma client, then build Next.js.
# DATABASE_URL is not needed at build time for `prisma generate` (it only
# reads the schema), but Next.js may reference env vars during the build.
# Pass a placeholder so the build doesn't fail if any module imports prisma.
RUN npx prisma generate && npm run build

# ── Stage 3: runner ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy only what Next.js needs to run in standalone/production mode.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# Prisma schema + generated client are embedded in node_modules, but copy the
# schema so runtime migrations / introspection work if needed.
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start"]
