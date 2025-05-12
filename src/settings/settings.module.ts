import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Settings } from './settings.model';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [SequelizeModule.forFeature([Settings]), AccountsModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
