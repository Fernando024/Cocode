import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::navbar.navbar', {
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },
});
