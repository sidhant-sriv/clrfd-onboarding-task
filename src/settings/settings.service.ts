import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Settings } from './settings.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Settings)
    private settingsModel: typeof Settings,
  ) {}

  async findAll(): Promise<Settings[]> {
    return this.settingsModel.findAll();
  }

  async findByAccounts(accountIds: number[]): Promise<Settings[]> {
    return this.settingsModel.findAll({
      where: {
        account_id: accountIds,
      },
    });
  }

  async findOne(id: number): Promise<Settings | null> {
    return this.settingsModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(settings: Partial<Settings>): Promise<Settings> {
    return this.settingsModel.create(settings);
  }
  async update(
    id: number,
    settings: Partial<Settings>,
  ): Promise<[number, Settings[]]> {
    return this.settingsModel.update(settings, {
      where: {
        id,
      },
      returning: true,
    });
  }
  async remove(id: number): Promise<number> {
    return this.settingsModel.destroy({
      where: {
        id,
      },
    });
  }
}
