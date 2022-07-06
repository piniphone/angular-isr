import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { ISRHandler } from 'ngx-isr';


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  const isr = new ISRHandler({
    indexHtml,
    skipCachingOnHttpError: true,
    invalidateSecretToken: 'MY_SECRET_TOKEN',
    enableLogging: true,
  });
  
  const server = express();

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);


  server.get( "/api/invalidate",  async (req, res, next) => {
    await isr.invalidate(req, res).catch(next)
  })

  // TODO: implement data requests securely
  server.get('/api/**', (req, res) => {
    res.status(404).send('data requests are not yet supported');
  });

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  

  server.get('*',
    // Serve page if it exists in cache
    async (req, res, next) => await isr.serveFromCache(req, res, next, {
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    }),
    // Server side render the page and add to cache if needed
    async (req, res, next) => await isr.render(req, res, next, {
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    }),
  );

  return server;
}

function run() {
  const port = process.env['PORT'] || 8080;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
