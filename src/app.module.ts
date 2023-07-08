import { Module } from '@nestjs/common';
import { UrlsModule } from './urls/urls.module';
import configModuleOptions from './config';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ThrottlerModule.forRoot(),
    UrlsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
