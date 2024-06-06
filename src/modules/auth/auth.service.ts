import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

// Username and password for the user
const fakeUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin',
    },
    {
        id: 2,
        username: 'user',
        password: 'user',
    }
]

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {}

    async validateUser({ username, password }: AuthPayloadDto):Promise<{ access_token: string }> {
        const findUser = await fakeUsers.find((user) => user.username === username);
        if (!findUser) return null;
        if (password === findUser.password) {
            const { password, ...user } = findUser;
            // return this.jwtService.sign(user);
            return {
                access_token: await this.jwtService.signAsync(user),
              };
        }
    }

    async login() {
        return 'This action logs a user in';
    }
}
