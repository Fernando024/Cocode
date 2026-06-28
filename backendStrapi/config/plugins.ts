import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CF_PUBLIC_URL'),
        rootPath: 'media',
        s3Options: {
          region: 'auto',
          endpoint: env('CF_ENDPOINT'),
          forcePathStyle: true,
          credentials: {
            accessKeyId: env('CF_ACCESS_KEY_ID'),
            secretAccessKey: env('CF_SECRET_ACCESS_KEY'),
          },
          params: {
            Bucket: env('CF_BUCKET'),
            ACL: undefined,
          },
        },
      },
    },
  },
});

export default config;
