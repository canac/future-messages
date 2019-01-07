declare module 'express-async-await' {
  import * as express from 'express';

  function aa(app: express.Application): express.Application;

  namespace aa {}

  export = aa;
}
