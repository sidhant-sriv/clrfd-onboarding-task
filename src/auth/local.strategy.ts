import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { AuthService } from './auth.service';
import type { User } from 'src/user/user.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate(name: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUser(name, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return user;
  }
}
