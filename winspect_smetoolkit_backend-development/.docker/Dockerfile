FROM public.ecr.aws/docker/library/node:18.2-alpine
RUN apk update && \
    apk upgrade && \
    apk add --no-cache curl libc6-compat

WORKDIR /app
COPY package.json /app
RUN npm install

COPY . /app
EXPOSE 3000

CMD [ "npm", "run", "migrate-and-start" ]
