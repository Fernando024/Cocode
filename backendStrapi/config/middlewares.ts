const cfPublicUrl = process.env.CF_PUBLIC_URL || 'https://pub-*.r2.dev';

const config = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'img-src': ["'self'", 'data:', 'blob:', cfPublicUrl],
          'media-src': ["'self'", 'data:', 'blob:', cfPublicUrl],
          'frame-src': ["'self'", 'https://www.youtube.com', 'https://www.google.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
