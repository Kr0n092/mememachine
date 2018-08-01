// const path = require("path");
// const fs = require('fs');
const express = require('express');
//const spdy = require("spdy");
const cors = require("cors");

const memesRouter = require('./routes/memes');
const memeRouter = require('./routes/meme');
const PORT = 3000;
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler();

// let mainFile = "";
// let mainScript = "";
// if (!dev) {
//   let scripts = [];
//   scripts = fs.readdirSync(path.join(__dirname, '.next', 'static', 'commons'));
//   mainScript = scripts.map(script => {
//     if (script.includes("main")) return script;
//   });
//   mainFile = fs.readFileSync(path.join(__dirname, '.next', 'static', 'commons', `${mainScript}`));
// }
app.prepare().then(() => {
  const server = express();
  server.use(cors());
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

  server.get('*', (req, res) => {
    // if (!dev && res.push) {
    //   const headers = {
    //     req: {'accept': '**/*'}, res: {'content-type': 'application/javascript'}
    //   };
    //   res.push(`/static/styles/index.css`, headers, (error, stream) => {
    //     if (error) {
    //       console.log(error);
    //       return;
    //     }
    //     stream.end(fs.readFileSync(path.join(__dirname, 'static', 'styles', 'index.css')));;
    //   });
    //   res.push(`/static/styles/Layout.css`, headers, (error, stream) => {
    //     if (error) {
    //       console.log(error);
    //       return;
    //     }
    //     stream.end(fs.readFileSync(path.join(__dirname, 'static', 'styles', 'Layout.css')));;
    //   });
    //   res.push(`/_next/static/commons/${mainScript}`, headers, (error, stream) => {
    //     if (error) {
    //       console.log(error);
    //       return;
    //     }
    //     stream.end(mainFile);
    //   });
    // }
    handle(req, res);
  });

  // if (!dev) {
  //   const options = {
  //     key: fs.readFileSync(path.resolve(__dirname, './certs', 'key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, './certs', 'cert.pem'))
  //   };

  //   spdy.createServer(options, server).listen(PORT, (err) => {
  //     if (err) throw new Error(err);
  //     console.log(`The server is running at https://localhost:${PORT}/`);
  //   });
  // } else {
    server.listen(PORT, (error) => {
      if (error) throw new Error(error);
      console.log(`The server is running at https://localhost:${PORT}/`);
    })
  //}
});
