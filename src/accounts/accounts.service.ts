import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';
import { User } from '../user/user.model';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountModel.findAll({
      include: [User],
    });
  }

  async findOne(id: number): Promise<Account | null> {
    return this.accountModel.findByPk(id, {
      include: [User],
    });
  }

  async create(name: string, userId: number): Promise<Account> {
    return this.accountModel.create({ name, user_id: userId });
  }

  async update(id: number, name: string): Promise<[number, Account[]]> {
    return this.accountModel.update(
      { name },
      { where: { id }, returning: true },
    );
  }

  async remove(id: number): Promise<number> {
    return this.accountModel.destroy({ where: { id } });
  }

  async findByUser(userId: number): Promise<Account[]> {
    return this.accountModel.findAll({
      where: { user_id: userId },
      include: [User],
    });
  }
}
