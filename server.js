const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const http = require('http');
const { parse } = require('url');
const { resolve } = require('path');

// setInterval(function() {
//   http.get('http://study-watson.herokuapp.com');
// }, 300000);

const port = process.env.PORT || 8080;
const router = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = router.getRequestHandler(app);

dotenv.config();

app.prepare().then(() => {
  const server = express();
  server.use('static ', express.static('./static'));
  server.use(handle);
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  http
    .createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      if (pathname === '/service-worker.js') {
        app.serveStatic(req, res, resolve('./static/service-worker.js'));
      } else {
        handle(req, res, parsedUrl);
      }
    })
    .listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
});
