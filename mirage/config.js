import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: { ...discoverEmberDataModels(), ...config.models },
    routes() {
      this.delete('/accounts/:id');
      this.get('/accounts');
      this.post('/accounts');
    },
  };

  return createServer(finalConfig);
}
