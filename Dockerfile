FROM node:alpine
WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/client/.next
USER nextjs

EXPOSE 3000

CMD ["npm", "run", "start"]