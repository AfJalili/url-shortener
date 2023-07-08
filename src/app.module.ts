import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import { CacheModule } from '@nestjs/cache-manager';
import configModuleOptions from './config';
import cacheModuleOptions from './config/cache-manager';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    CacheModule.register(cacheModuleOptions),
    UrlsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
