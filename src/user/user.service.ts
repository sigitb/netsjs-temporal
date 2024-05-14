import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "../common/prisma.service";
import { ValidationService } from "../common/validation.service";
import { RegisterUserRequest, UserResponse } from "src/model/user.model";
import { Logger } from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService,
    ){}

    async register(request: RegisterUserRequest): Promise<UserResponse> {
        this.logger.info(`Register new user ${JSON.stringify(request)}`)
        const registerRequest = this.validationService.validate(UserValidation.REGISTER, request);
        const totalUserWithUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username
            },
        });

        if (totalUserWithUsername != 0) {
            throw new HttpException('Username already exist',400)
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);
        const user = await this.prismaService.user.create({
            data:registerRequest
        })

        return {
            username: user.username,
            name:user.name
        }
    }
}