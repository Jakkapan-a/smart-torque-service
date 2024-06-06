import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'src/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));

  app.engine('hbs', hbs.__express);
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
