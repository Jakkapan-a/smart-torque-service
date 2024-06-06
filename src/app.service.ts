import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!777';
  }

  getIndex(): { status: string; message: string; } {
    return { status : 'success', message : 'Server is running!' };
  }
}
