import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as webPush from 'web-push';
import { config } from './config';
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet); // protect incoming requests
  app.enableCors(); // specifying the apis that will share this api
  app.use(csurf()); // reject unauthorized requests from hackers when they stall the token from the cookie
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.set('trust proxy', 1); // ensuring that protocol in trust proxy

  // setting the identity of the server when sending notifications to the user
  webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    config.vapidKeys.publicKey,
    config.vapidKeys.privateKey
  );

  // registering static folders/files middleware
  app.useStaticAssets(join(__dirname, '..', 'files'));

  await app.listen(process.env.PORT || 3000);
};
bootstrap();
