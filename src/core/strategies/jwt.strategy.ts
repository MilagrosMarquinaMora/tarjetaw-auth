import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { LoginAuth } from '../entities/Login';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(LoginAuth)
        private readonly loginRepository: Repository<LoginAuth>,

        configService: ConfigService
    ) {

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }


    async validate(payload: any): Promise<any> {

        const { id } = payload;

        const user = await this.loginRepository.findOneBy({ id });

        if (!user)
            throw new UnauthorizedException('Token not valid')

        if (!user.isActive)
            throw new UnauthorizedException('User is inactive, talk with an admin');


        return user;
    }

}