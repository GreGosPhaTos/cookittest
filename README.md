# COOK IT Interview test

## Build and run with docker (prod)

`docker build . -t cookit/node-web-app`

`docker run --name cookitapi -p 8080:8080 -d cookit/node-web-app`

## Build and run with docker (locally)

`docker build . -f Dockerfile.dev -t cookit/node-web-app-dev`

`docker run --name cookitapi -p 8080:8080 -v $(pwd):/usr/src/app -d cookit/node-web-app-dev`


## Run the tests

`npm run test`

and the linter

`npm run lint`
