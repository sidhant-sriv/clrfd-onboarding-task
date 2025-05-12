import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './account.model';


@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private readonly accountModel: typeof Account,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountModel.findAll();
  }

  async findOne(id: number): Promise<Account | null> {
    return this.accountModel.findByPk(id);
  }

  async create(name: string): Promise<Account> {
    return this.accountModel.create({ name });
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
}
