import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { HttpConfig } from './config/types';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const documentConfig = new DocumentBuilder()
    .setTitle('URL Shortener')
    .setDescription('The URL Shortener Project APIs Specs.')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs/api/v1', app, document);

  const httpConfig = app.get(ConfigService).get<HttpConfig>('http');
  await app.listen(httpConfig.port, httpConfig.host);
}
bootstrap();
