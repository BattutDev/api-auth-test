import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as NestConfig from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    NestConfig.ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
