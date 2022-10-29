import { Body, Headers, Controller, Get, Post, Put } from '@nestjs/common';
import { documentTypeMock, userTokenMock } from '../mocks/auth.mock';
import { AuthService } from '../core/services/auth.service';
import { LoginUserDto } from '../core/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Get('document-type')
    getDocumentType() {
        return this.authService.findAll();
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
        // const { nroDocument, password, documentType } = body;
        // if (nroDocument == '74916852' && password == 'megaLogin' && documentType == 1) {
        //     return {
        //         message: 'Se logueó correctamente',
        //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        //     }
        // }
        // return {
        //     message: 'error',
        //     error: 'Usuario o contraseña incorrectos'
        // }
    }

    @Get('validate-token')
    validateToken(@Headers() headers) {
        const { token } = headers;
        if (token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c') {
            return userTokenMock;
        } else {
            return {
                message: 'Error Token no válido o expirado',
                token: ''
            }
        }
    }

    @Get('logout')
    logout() {
        return {
            message: 'Se cerró la sesión correctamente',
        }
    }

    @Get('identify-yourself')
    forgotPassword(@Headers() headers) {
        const { cell, nrodocument, documenttype } = headers;
        console.log(cell, nrodocument, documenttype);
        console.log(headers);

        if (cell == '970556242' && nrodocument == '74916852' && documenttype == 1) {
            return {
                message: 'Se envió correctamente',
                body: {
                    id: 1,
                    name: 'Juan',
                    lastName: 'Perez',
                    documentType: 1,
                    nroDocument: '12345678',
                    cell: '123456789',
                    sendCode: '123456' // GLOBAL VARIABLE
                }
            }
        } else {
            return {
                message: 'error',
                error: 'Datos incorrectos'
            }
        }
    }

    @Post('answer-secret-question')
    answerQuestion(@Body() body) {
        const { response, documentNumber } = body;
        if (response == 'Saco Oliveros') {
            return {
                message: 'Se envió correctamente',
            }
        } else {
            return {
                message: 'error',
                error: 'Respuesta incorrecta'
            }
        }
    }

    @Put('change-password')
    changePassword(@Body() body) {
        const { password1, password2, dni } = body;
        if (password1 == '123456' && password2 == '123456') {
            return {
                message: 'Se envió correctamente',
            }
        } else {
            return {
                message: 'error',
                error: 'Contraseñas no coinciden'
            }
        }
    }
}