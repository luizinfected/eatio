import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap, throwError } from 'rxjs';

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  // Add other fields from your Prisma User model
}

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    private readonly logger: Logger,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(userDto: User): Observable<void> {
    this.logger.log('Creating User', AppService.name);
    return this.client.send('createUser', userDto).pipe(
      tap((response) => this.logger.log('userCreated', response)),
      catchError((error: Error) => {
        this.logger.error('Error creating user:', error);
        return throwError(() => error);
      }),
    ) as Observable<void>;
  }

  getUser(id: string): Observable<User> {
    this.logger.log('Get User: ', id);
    return this.client.send('getUser', { id }) as Observable<User>;
  }
}
