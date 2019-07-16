const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { parse } = require('url');

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

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
