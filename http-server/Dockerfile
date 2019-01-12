FROM node:latest

COPY node/ /home/node/
WORKDIR /home/node

RUN npm -g install http-server

# installing packages for web server
RUN npm init -y
#RUN npm install ethereum/web3.js --save
RUN npm install jquery --save
RUN npm install bootstrap --save

# add write permission so host can edit them without ROOT permission
RUN chmod +w .

EXPOSE 8080
ENTRYPOINT [ "http-server", "-o", "--cors", "-p", "8080" ]