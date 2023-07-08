import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { CacheModule } from '@nestjs/cache-manager';
import cacheModuleOptions from '../config/cache-manager';
@Module({
  imports: [CacheModule.register(cacheModuleOptions)],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
