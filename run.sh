#!/usr/local/bin/zsh

CURRENT_DIR=${PWD}
cd $CURRENT_DIR/totodo-server;
npm run watch &
cd ../totodo-client;
npm start