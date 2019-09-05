#!/usr/local/bin/zsh

CURRENT_DIR=${PWD}
echo $CURRENT_DIR;
cd $CURRENT_DIR/totodo-server;
npm install;
npm run watch &
cd ../totodo-client;
npm install;
npm start