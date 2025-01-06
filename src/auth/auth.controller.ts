import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private readonly logger = new Logger('AUTHSERVICE');

  @MessagePattern({ cmd: 'generate_token' })
  generateToken(payload: Record<string, any>) {
    this.logger.log('Creacion de token');
    return this.authService.generateToken(payload);
  }

  @MessagePattern({ cmd: 'validate_token' })
  validateToken(token: string) {
    try {
      const payload = this.authService.validateToken(token);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}
