import { Body, Controller, Get, HttpException, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('/login')
    login(@Res() res: Response) 
    {
        console.log('AuthController');
        return res.render('auth/login');
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async loginPost(@Body() authPayload:AuthPayloadDto){
        const user = await this.authService.validateUser(authPayload);
        if(!user){
            throw new HttpException('Invalid credentials', 401);
        }
        return user;
    }

    @UseGuards(JwtGuard)
    @Get('/profile')
    profile(@Res() res: Response) {
        return res.render('auth/profile');
    }

    @Get('/register')
    register(@Res() res: Response) {
        return res.render('auth/register');
    }

    @Get('/logout')
    logout(@Res() res: Response) {
        return res.render('auth/logout');
    }
}
