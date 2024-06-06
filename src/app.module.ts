import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from './modules/models/models.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RouterModule.register([
      {
        path: '/api',
        module: ModelsModule,
      },
    ]),
    ModelsModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}

// ServeStaticModule.forRoot({
//   rootPath: join(__dirname, '..', 'src/assets'),
// }),