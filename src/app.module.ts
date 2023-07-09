import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import configModuleOptions from './config';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRoot(),
    UrlsModule,
  ],
  controllers: [],
  providers: [StorageService],
})
export class AppModule {}
