FROM node:latest

WORKDIR /app

# install app dependencies
COPY package.json .
RUN npm install

# add project files
COPY . .

ENV REACT_APP_PRIVATE_KEY ""
ENV REACT_APP_BOARD_CID ""
ENV REACT_APP_BEAN_TOKEN ""
ENV REACT_APP_GAME_MASTER ""
ENV REACT_APP_LOTERIA_TOKEN ""

# start app
CMD ["npm", "start"]
