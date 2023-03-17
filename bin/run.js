#!/usr/bin/env node

import createApp from '../app/app.js';
import { createServer } from 'http';
import { launch } from 'puppeteer';
import { createTerminus } from '@godaddy/terminus';

const browser = await launch({ headless: true })
const app = createApp(browser)

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = createServer(app);

const onSignal = async () => {
  console.log('server is starting cleanup')
  await browser.close()
}

const onHealthCheck = async () => { }

/**
 * Handle graceful shutdowns.
 */
createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal
})

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;

  console.log('Listening on ' + bind);
}
