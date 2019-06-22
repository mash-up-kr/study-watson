const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { parse } = require('url');

const port = process.env.PORT || 3333;
const router = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = router.getRequestHandler(app);

dotenv.config();

app.prepare().then(() => {
  const server = express();
  // server.use('static ', express.static('./static'));
  server.use(handle);
  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (pathname === '/static/service-worker.js') {
      //   // const filePath = join(__dirname, '.next', pathname)
      //   app.serveStatic(req, res, path.resolve("./static/service-worker.js"))
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
