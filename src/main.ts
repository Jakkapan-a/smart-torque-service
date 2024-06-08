import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import * as hbs from 'hbs';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function printRoutes(server: any) {
  // Get the routes map
  const router = server._router;
  const availableRoutes = router.stack.filter((r) => r.route).map((r) =>{
    return {
      route: {
        path: r.route.path,
        method: r.route.stack[0].method,
      },
    };
  });

  // Print the routes
  console.table(availableRoutes.map((r) => r));
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'src/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  // app.registerPartials(join(__dirname, '..', 'src/views/partials'));
  app.engine('hbs', hbs.__express);
  app.setViewEngine('hbs');
  
  const server = app.getHttpAdapter().getInstance();
  hbs.registerPartials(join(__dirname, '..', 'src/views/partials'));
  app.set('view options', { layout: 'layouts/main' });
  const configService = app.get(ConfigService);
  console.log(configService.get('port'));
  console.log(configService.get('database'));


  await app.listen(configService.get('port'));
  printRoutes(server); 

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
