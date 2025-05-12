import { Injectable } from '@nestjs/common';
// biome-ignore lint/style/useImportType: <explanation>
import { UserService } from 'src/user/user.service';
// biome-ignore lint/style/useImportType: <explanation>
import { JwtService } from '@nestjs/jwt';
import type { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(name);
    if (!user) return null;

    console.log(
      'DB password:',
      user.dataValues.password,
      'Input password:',
      pass,
    );

    // For now, simple password comparison
    if (user.dataValues.password !== pass) return null;

    const { password, ...result } = user.toJSON();
    return result;
  }

  async login(user: User) {
    const payload = {
      name: user.name,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }
}
