yarn &&
node ace build --ignore-ts-errors &&
cd build &&
yarn install --production &&
node bin/server.js