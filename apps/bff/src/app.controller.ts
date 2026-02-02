import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import type { ClientProxy } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user')
  getUser(): Observable<string> {
    return this.client.send('getUser', {
      name: 'luiz',
    });
    // return 'ola';
  }
}
