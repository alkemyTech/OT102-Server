#!/bin/bash
sudo chmod -R 777 /home/ubuntu/g102-api
cd /home/ubuntu/g102-api
# add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# decrypt .env file
base64 --decode env_encrypted.txt > .env
# install node modules
npm install
npm run prod:secure