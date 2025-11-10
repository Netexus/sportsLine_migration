import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'app.name') return 'Test App';
              if (key === 'app.env') return 'test';
              if (key === 'app.version') return '0.0.1';
              return undefined;
            }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return API health info', () => {
      expect(appController.health()).toMatchObject({
        name: 'Test App',
        status: 'ok',
        environment: 'test',
      });
    });
  });
});
