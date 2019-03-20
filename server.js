const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware

function bouncer(req, res, next) {
  res.status(404).json( 'these are not the droids you\'re looking for' )
}

function teamNamer(req, res, next) {
  req.team = 'Web XVII'; //middleware can modify the request
  next(); // go ahead and execute the next middleware/route handler
}

function oneRing(req, res, next) {
  const seconds = new Date().getSeconds()
  if (seconds%3 === 0 ){
  res.status(403).send('You shall not pass')
  } else {
  next()}
}

// server.use(bouncer)
server.use(express.json());
server.use(helmet())
server.use(teamNamer)
// server.use(oneRing)

//routing
server.use('/api/hubs', hubsRouter);

server.get('/', restricted, (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

function restricted(req, res, next) {
  const password = req.headers.password;
}

module.exports = server;
