import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import 'winston-daily-rotate-file';
import * as path from 'path';
import { AuthMiddleware } from './auth.middleware';

@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
        winston.format.printf(({ timestamp, level, message }) => {
          return JSON.stringify({
            timestamp,
            level,
            message,
          });
        }),
      ),
      transports: [
        // new winston.transports.DailyRotateFile({
        //     dirname: path.join(__dirname, '../logs'),
        //     filename: 'application-%DATE%.log',
        //     datePattern: 'YYYY-MM-DD',
        //     zippedArchive: true,
        //     maxSize: '20m',
        //     maxFiles: '14d'
        //   }),
        new winston.transports.Console(),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    PrismaService,
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [PrismaService, ValidationService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/api/*');
  }
}
