
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import { bindings } from './inversify.config';
import { PipeLineSetUp } from './src/middleware/pipeline-setup';
import './src/controller/home'

(async () => {

  const port = 8080;
  const container = new Container();
  await container.loadAsync(bindings);
  const server = new InversifyExpressServer(container);

  server.setConfig(PipeLineSetUp.configFn)
    .setErrorConfig(PipeLineSetUp.HandleError);


  const app = server.build();

  app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`)
  });

})();