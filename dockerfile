FROM node:lts as dependencies
WORKDIR /dateslot
COPY package.json ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /dateslot
COPY . .
COPY --from=dependencies /dateslot/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /dateslot
ENV NODE_ENV production

COPY --from=builder /dateslot/public ./public
COPY --from=builder /dateslot/package.json ./package.json
COPY --from=builder /dateslot/.next ./.next
COPY --from=builder /dateslot/node_modules ./node_modules

EXPOSE 3000
CMD ["yarn", "start"]