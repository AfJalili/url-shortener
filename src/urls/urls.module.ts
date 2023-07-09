import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { StorageService } from '../storage/storage.service';
@Module({
  imports: [],
  controllers: [UrlsController],
  providers: [UrlsService, StorageService],
})
export class UrlsModule {}
