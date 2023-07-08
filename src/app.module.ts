import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import configModuleOptions from './config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), UrlsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
