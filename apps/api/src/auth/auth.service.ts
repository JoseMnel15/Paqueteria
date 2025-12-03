import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(dto: LoginDto) {
    // TODO: reemplazar con validación real y JWT
    return {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      user: {
        id: 1,
        name: 'Administrador',
        email: dto.email ?? 'admin@local.test',
        role: 'ADMIN',
      },
    };
  }

  async profile() {
    return {
      id: 1,
      name: 'Administrador',
      email: 'admin@local.test',
      role: 'ADMIN',
    };
  }
}
