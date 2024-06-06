import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  root(@Res() res: Response) {
    const name = 'Nest.js';
    return res.render('index', { name });
  }
  // about returns a JSON object
  @Get('about')
  about() {
    return this.appService.getAbout();
  }
}
