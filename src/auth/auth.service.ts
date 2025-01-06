import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: any) {
    return  await this.jwtService.signAsync(payload);
  }

  async validateToken(token: string) {
    try {
      return await this.jwtService.verify(token); 
    } catch (error) {
      throw new Error('Token inválido o expirado'); 
    }
  }
}
