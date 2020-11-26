FROM node:8
WORKDIR .
RUN npm install -g serve
COPY . .
RUN npm install
RUN npm run build
CMD serve -l 80 -s /build
EXPOSE 80