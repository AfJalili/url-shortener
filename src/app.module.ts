import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import { CacheModule } from '@nestjs/cache-manager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require('cache-manager-redis-store').redisStore;
@Module({
  imports: [
    UrlsModule,
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      // todo import configuration;
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
