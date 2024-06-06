import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!777';
  }

  getIndex(): { status: string; message: string; } {
    return { status : 'success', message : 'Server is running!' };
  }
  // about returns a JSON object

  getAbout(): any {
    return {
      name: 'Nest.js',
      version: '1.0',
      description: 'Nest.js is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
    };
  }
}
