import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDocumento } from '../entities/TipoDocumento';

@Injectable()
export class AuthService {

    private readonly logger = new Logger('AuthService');
    constructor(
        @InjectRepository(TipoDocumento)
        private readonly userRepository: Repository<TipoDocumento>,
        // private readonly jwtService: JwtService,
        // private readonly mailService: MailService,
        // private readonly smsService: SmsService,
        // private readonly passwordService: PasswordService,
        // private readonly configService: ConfigService,
    ) { }

    async findAll() {
        return await this.userRepository.find();
    }

}