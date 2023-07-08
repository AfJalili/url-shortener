import { ConfigService } from '@nestjs/config';
import { RedisConfig } from './types';
import { CacheModuleOptions } from '@nestjs/cache-manager';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redisStore = require('cache-manager-redis-store').redisStore;
export default {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const redisConfig = configService.get<RedisConfig>('redis');
    return {
      store: redisStore,
      host: redisConfig.host,
      port: redisConfig.port,
    } as CacheModuleOptions;
  },
};
