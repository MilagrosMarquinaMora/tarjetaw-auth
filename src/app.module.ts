import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { AuthController } from './controllers/auth.controller';
import { RegisterController } from './controllers/register.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
  controllers: [AuthController, RegisterController],
  providers: [AppService],
})

export class AppModule { }
