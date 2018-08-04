const path = require("path");
const fs = require('fs');
const express = require('express');
const http = require('http');
const https = require('https');
const spdy = require("spdy");
const cors = require("cors");
const config = require("dotenv").config().parsed;

const memesRouter = require('./routes/memes');
const memeRouter = require('./routes/meme');
const favoriteRouter = require('./routes/favorite');
const favoritesRouter = require('./routes/favorites');
const PORT = config.PORT;
const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cors());
  server.use('/images', express.static(`${__dirname}/static/images`));
  server.use('/memes', memesRouter);
  server.use('/meme', memeRouter);
  server.use('/favorite', favoriteRouter);
  server.use('/favorites', favoritesRouter);
  server.use(express.json());

  if (config.USE_SW === 'true') {
    server.use("/service-worker.js", express.static(`${__dirname}/static/js/service-worker.js`));
  }

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  if (config.USE_HTTPS === 'true') {
    const options = {
      key: fs.readFileSync(path.resolve(__dirname, './certs', 'key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs', 'cert.pem'))
    };

    if (config.USE_HTTP2 === 'true') {
      spdy.createServer(options, server).listen(PORT, (error) => {
        if (error) throw new Error(error);
        console.log(`The http/2 server is running at https://localhost:${PORT}/`);
      });
    } else {
      https.createServer(options, server).listen(PORT, (error) => {
        if (error) throw new Error(error);
        console.log(`The https server is running at https://localhost:${PORT}/`);
      });
    }
  } else {
    http.createServer(server).listen(PORT, (error) => {
      if (error) throw new Error(error);
      console.log(`The http server is running at http://localhost:${PORT}/`);
    })
  }
});
