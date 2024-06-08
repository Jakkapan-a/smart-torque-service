import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from './modules/models/models.module';
import { RouterModule } from '@nestjs/core';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { SequenceController } from './modules/sequence/sequence.controller';
import { SequenceService } from './modules/sequence/sequence.service';
import { SequenceModule } from './modules/sequence/sequence.module';
import { HistoryModule } from './modules/history/history.module';
import { LogService } from './modules/log/log.service';
import { LogModule } from './modules/log/log.module';
import { ProcessModule } from './modules/process/process.module';
import { CardRfidModule } from './modules/card-rfid/card-rfid.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    }),
    RouterModule.register([
      {
        path: '/api',
        module: ModelsModule,
      },
    ]),
    
    ModelsModule,
    AuthModule,
    UserModule,
    SequenceModule,
    HistoryModule,
    LogModule,
    ProcessModule,
    CardRfidModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}