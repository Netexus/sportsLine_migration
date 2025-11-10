import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth() {
    const version =
      this.configService.get<string>('app.version') ??
      this.configService.get<string>('npm_package_version') ??
      '0.0.1';

    return {
      name: this.configService.get<string>('app.name'),
      status: 'ok',
      environment: this.configService.get<string>('app.env'),
      version,
    };
  }
}
