export const config = {
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'music-land',
    username: 'postgres',
    password: 'your password',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
  aws: {
    AWS_S3_BUCKET_NAME: 'music-land',
    ACCESS_KEY_ID: 'ACCESS_KEY_ID',
    SECRET_ACCESS_KEY: 'SECRET_ACCESS_KEY/G5Zt',
    cdnUrl: 'cdnUrl',
  },
  nodeMailerOptions: {
    transport: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        username: 'username',
        pass: 'pass',
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
  },
  frontEndKeys: {
    url: 'localhost',
    port: 4200,
    endpoints: ['auth/reset-password', 'auth/verify-email'],
  },


  vapidKeys: {
    publicKey: 'publicKey',
    privateKey: 'privateKey',
  },


};
