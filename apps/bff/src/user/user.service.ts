import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from 'apps/user/prisma/generated/browser';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    private readonly logger: Logger,
  ) {}

  createUser(userDto: User): Observable<void> {
    this.logger.log('Creating User', UserService.name);
    return this.client.send('createUser', userDto).pipe(
      tap((response) => this.logger.log('userCreated', response)),
      catchError((error: Error) => {
        this.logger.error('Error creating user:', error);
        return throwError(() => error);
      }),
    ) as Observable<void>;
  }

  getUser(id: string): Observable<User> {
    this.logger.log(`Retrieving Information from user microservice`);
    return this.client.send('getUser', { id });
  }
}
