import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UserService {
    private readonly users: User[];
    constructor() {
        this.users = [
            { userId: 1, username: 'user1', password: 'user1' },
            { userId: 2, username: 'user2', password: 'user2' }
        ]
    }
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
