const path = require("path");
const fs = require('fs');
const express = require('express');
const spdy = require("spdy");
const memesRouter = require('./routes/memes');
const memeRouter = require('./routes/meme');
const PORT = 3000;
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use('/images', express.static(`${__dirname}/static/images`));
  server.use('/memes', memesRouter);
  server.use('/meme', memeRouter);
  server.use(express.json());

  server.use("/service-worker.js", express.static(`${__dirname}/static/js/service-worker.js`));

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });

  server.get('/', (req, res) => {
    handle(req, res)
  });

  const options = {
    key: fs.readFileSync(path.resolve(__dirname, './certs', 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, './certs', 'cert.pem'))
  };

  const spdyServer = spdy.createServer(options, server);
  spdyServer.listen(PORT);
  console.log(`The server is running at https://localhost:${PORT}/`);
});
