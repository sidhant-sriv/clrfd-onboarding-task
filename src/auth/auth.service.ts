import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, pass: string): Promise<any> {
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

  async login(user: any) {
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
