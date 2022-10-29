import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AuthController } from './controllers/auth.controller';
import { RegisterController } from './controllers/register.controller';
import { TipoDocumento } from './core/entities/TipoDocumento';
import { AuthService } from './core/services/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([TipoDocumento])
  ],
  controllers: [AuthController, RegisterController],
  providers: [AuthService],
})

export class AppModule { }
