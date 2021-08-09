docker build . -t cookit/node-web-app
docker run -p 8080:8080 -d cookit/node-web-app
