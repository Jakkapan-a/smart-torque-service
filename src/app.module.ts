import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from './modules/models/models.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ServeStaticModule.forRoot({
//   rootPath: join(__dirname, '..', 'src/assets'),
// }),