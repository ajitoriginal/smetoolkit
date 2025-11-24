FROM public.ecr.aws/docker/library/node:lts-alpine3.18 AS deps

ENV NEXT_PUBLIC_APP_NAME="https://api.smetoolkit.winsmb.com/"

RUN apk update
RUN apk upgrade
RUN apk -a info curl
RUN apk add curl
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY ./ /usr/app
# RUN npm uninstall node-sass
# RUN npm install sass
RUN npm install -f
RUN npm run build
EXPOSE 3000
ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]