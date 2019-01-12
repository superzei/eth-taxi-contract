FROM node:latest

# installing webservers
RUN npm -g install ganache-cli

EXPOSE 8545
ENTRYPOINT [ "ganache-cli", "-a", "100", "-e", "200", "-h", "0.0.0.0", "-p", "8545" ]