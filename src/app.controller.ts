import { Controller, Get, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private configService: ConfigService
  ) {}
 
  @Get()
  @Render('index')
  root() {
    const jig_no = this.configService.get('JIG_NO');
    return { title: "SMART TORQUE", message: 'Welcome to the Home Page' ,jig_no: jig_no};
  }
  
  // about returns a JSON object
  @Get('about')
  about() {
    return this.appService.getAbout();
  }
}
