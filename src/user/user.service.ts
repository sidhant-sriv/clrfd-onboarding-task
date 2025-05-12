import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findByUsername(name: string): Promise<User | null> {
    console.log('Finding user by name:', name);
    const user = await this.userModel.findOne({ where: { name } });
    console.log('Found user:', user?.toJSON());
    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    return this.userModel.create(user);
  }

  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.userModel.update(user, {
      where: { id },
    });
    return this.findOne(id);
  }

  async delete(id: number): Promise<number> {
    return this.userModel.destroy({
      where: { id },
    });
  }
}
