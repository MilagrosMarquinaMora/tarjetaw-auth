import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDocumento } from '../entities/TipoDocumento';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuth } from '../entities/Login';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');
    constructor(
        @InjectRepository(TipoDocumento)
        private readonly tipoRepository: Repository<TipoDocumento>,
        @InjectRepository(LoginAuth)
        private readonly loginRepository: Repository<LoginAuth>,
        private readonly jwtService: JwtService,

    ) { }

    async findAll() {
        return await this.tipoRepository.find();
    }


    async login(loginUserDto: LoginUserDto) {
        try {
            const { nroDocument, password, documentType } = loginUserDto;
            // obtener ms-usuario ?=> id 
            const user = await this.loginRepository.findOne(
                {
                    where: {
                        nroDocument: nroDocument,
                        documentType: documentType
                    }
                });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            if (!bcrypt.compareSync(password, user.password)) {
                throw new BadRequestException('Invalid credentials');
            }
            return {
                message: 'Se logueó correctamente',
                token: this.getJwtToken({ id: user.idUsuario }) // !! id usuario consultara al ms-usuario
            }
        } catch (error) {

            this.logger.error(error.message, error.stack);
            throw new InternalServerErrorException(error.message);
        }

    }

    private getJwtToken(user: any) {

        const token = this.jwtService.sign(user);
        return token;

    }
}