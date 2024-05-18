import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginUserDto, RegisterUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

    private readonly logger = new Logger('AuthService');

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Database conected');
    }

    async registerUser( registerUserDto: RegisterUserDto ) {

        const { userName, password, name } = registerUserDto;

        try {
            
            const user = await this.user.findFirst({
                where: { userName }
            });

            if ( user ) {
                throw new BadRequestException('User already exists')
            }

            const newUser = await this.user.create({
                data: {
                    userName: userName,
                    password: bcrypt.hashSync(password, 10),
                    name: name,
                }

            });

            const { password: __, ...rest } = newUser

            return {
                user: rest
            }

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async loginUser( loginUserDto: LoginUserDto ){

        const { userName, password } = loginUserDto;

        try {
            
            const user = await this.user.findUnique({
                where: { userName }
            });

            if ( !user ) {
                throw new BadRequestException('User not valid')
            }

            if ( !user.isActive ) {
                throw new UnauthorizedException('User not valid')
            }

            const isPasswordValid = bcrypt.compareSync( password, user.password );
            if( !isPasswordValid ) {
                throw new BadRequestException('User not valid')
            }

            const { password: __, ...rest } = user;

            return rest;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getAllUsers() {

        try {
            
            const users = await this.user.findMany({});

            return users;

        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

    async getUserById( id: string ) {

        try {
            const user = await this.user.findFirst({
                where: { id }
            });

            if ( !user ) {
                throw new BadRequestException(`User with id ${id} not found`)
            }

            return user;

        } catch (error) {
            throw new BadRequestException(error.message)
        }

    }

    async updateUser(updateUserDto: UpdateUserDto ) {

        const { id, ...data} = updateUserDto;

        if( data.password ) {
            data.password = bcrypt.hashSync(data.password, 10)
        }
        
        await this.getUserById(id);

        return this.user.update({
            where: { id },
            data: data
        })

    }

    async chanceActiveUser(id: string) {

        const user = await this.getUserById(id);

        return this.user.update({
            where: { id },
            data: {
                isActive: !user.isActive
            }
        })

    }
  
}
