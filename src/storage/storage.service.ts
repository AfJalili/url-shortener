import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { RedisConfig } from '../config/types';

@Injectable()
export class StorageService implements OnApplicationBootstrap {
  private redisClient: RedisClientType;
  private readonly redisClientOptions;
  constructor(private readonly configService: ConfigService) {
    this.redisClientOptions = {
      url: this.configService.get<RedisConfig>('redis').url,
    };
  }
  async onApplicationBootstrap(): Promise<void> {
    this.redisClient = createClient(this.redisClientOptions);
    await this.redisClient.connect();
  }

  async set(key: string, value: string): Promise<string> {
    return await this.redisClient.set(key, value);
  }

  async get(key: string): Promise<string | undefined> {
    return await this.redisClient.get(key);
  }
}
