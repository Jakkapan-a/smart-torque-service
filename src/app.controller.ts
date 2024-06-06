import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  root(@Res() res: Response) {
    return { title: 'Home', message: 'Welcome to the Home Page' };
  }
  
  // about returns a JSON object
  @Get('about')
  about() {
    return this.appService.getAbout();
  }
}
