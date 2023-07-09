import {
  IsEnum,
  IsNumber,
  IsPort,
  IsString,
  ValidateNested,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class UrlsModuleOptions {
  @IsNumber()
  keyLength = 8;
}

export class RedisConfig {
  @IsString()
  url: string;
}

export class HttpConfig {
  @IsString()
  host: string;

  @IsPort()
  port: string;
}
export class Configuration {
  // @IsEnum(Environment) todo fix: throws an error every time
  environment: Environment;

  @ValidateNested()
  http: HttpConfig;

  @ValidateNested()
  redis: RedisConfig;

  @ValidateNested()
  urlsModuleOptions: UrlsModuleOptions;
}
