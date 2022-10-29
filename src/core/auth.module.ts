import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LoginAuth } from './entities/Login';
import { TipoDocumento } from './entities/TipoDocumento';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        ConfigModule,

        TypeOrmModule.forFeature([TipoDocumento,LoginAuth]),

        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                // console.log('JWT Secret', configService.get('JWT_SECRET') )
                // console.log('JWT SECRET', process.env.JWT_SECRET)
                return {
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        expiresIn: '2h'
                    }
                }
            }
        })
        // JwtModule.register({
        // secret: process.env.JWT_SECRET,
        // signOptions: {
        //   expiresIn:'2h'
        // }
        // })

    ],
    exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
