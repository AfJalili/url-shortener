import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';
import { UrlsModuleOptions } from '../config/types';
import { StorageService } from '../storage/storage.service';
@Injectable()
export class UrlsService {
  private readonly options: UrlsModuleOptions;
  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {
    this.options =
      this.configService.get<UrlsModuleOptions>('urlsModuleOptions');
  }
  async shortenUrl(url: string): Promise<string> {
    let id: string | undefined = await this.storageService.get(url);
    if (!id) {
      id = nanoid(this.options.keyLength);
      await Promise.all([
        this.storageService.set(id, url),
        this.storageService.set(url, id),
      ]);
    }
    return id;
  }

  findOne(id: string): Promise<string | undefined> {
    return this.storageService.get(id);
  }
}
