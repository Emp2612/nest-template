import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'ebi',
        password: 'changeme',
        permission: ['userProfile']
      }
    ];
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findByUserId(userId: number): Promise<User | undefined> {
    return this.users.find(user => user.userId === userId);
  }
}
