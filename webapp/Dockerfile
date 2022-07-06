FROM node:16.15.1
ENV APP_ROOT /home/pinapp
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}
RUN yarn --frozen-lockfile
RUN npm run build:ssr
# esto lo lanza el docker-compose
CMD ["node", "dist/server/main.js"]
