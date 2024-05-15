import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { WebResponse } from '../model/web.model';
import { LoginUserRequest, RegisterUserRequest, UserResponse } from '../model/user.model';
import { Auth } from '../common/auth.decorator';
import { User } from '@prisma/client';

@Controller('/api/users')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post()
    @HttpCode(200)
    async register(@Body() request: RegisterUserRequest): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.register(request);
        return {
            data:result,
        }
    }
    
    @Post('/login')
    @HttpCode(200)
    async Login(@Body() request: LoginUserRequest): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.login(request);
        return {
            data:result,
        }
    }
    
    @Get('/current')
    @HttpCode(200)
    async get(@Auth() user: User): Promise<WebResponse<UserResponse>> {
        const result = await this.userService.get(user);
        return {
            data:result,
        }
    }
}