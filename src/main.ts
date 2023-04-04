import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';
import { AppModule } from './app.module';

// Initialize client.
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
// @ts-ignore
const redisStore = new RedisStore({
  // @ts-ignore
  client: redisClient,
  prefix: 'naat', // naat for nest api auth test
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // we add sessions middleware
  app.use(
    session({
      store: redisStore,
      secret: 'super-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
