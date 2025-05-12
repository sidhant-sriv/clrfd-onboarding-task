import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { Settings } from './settings.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AccountsService } from '../accounts/accounts.service';

@Controller('settings')
@UseGuards(JwtAuthGuard)
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly accountsService: AccountsService,
  ) {}

  @Post()
  async create(@Body() settings: Partial<Settings>, @Request() req) {
    if (!settings.account_id) {
      throw new BadRequestException('account_id is required');
    }

    // Verify the account belongs to the authenticated user
    const account = await this.accountsService.findOne(settings.account_id);

    if (!account) {
      throw new NotFoundException(
        `Account with id ${settings.account_id} not found`,
      );
    }

    if (account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to create settings for this account',
      );
    }

    return this.settingsService.create(settings);
  }

  @Get()
  async findAll(@Request() req) {
    // Get all accounts owned by the user
    const userAccounts = await this.accountsService.findByUser(req.user.userId);

    // Extract account ids
    const accountIds = userAccounts.map((account) => account.id);

    // Return settings only for those accounts
    return this.settingsService.findByAccounts(accountIds);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const setting = await this.settingsService.findOne(+id);

    if (!setting) {
      throw new NotFoundException(`Setting with id ${id} not found`);
    }

    // Verify the setting's account belongs to the authenticated user
    const account = await this.accountsService.findOne(setting.account_id);

    if (!account || account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this setting',
      );
    }

    return setting;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() setting: Partial<Settings>,
    @Request() req,
  ): Promise<[number, Settings[]]> {
    const existingSetting = await this.settingsService.findOne(+id);

    if (!existingSetting) {
      throw new NotFoundException(`Setting with id ${id} not found`);
    }

    // Verify the setting's account belongs to the authenticated user
    const account = await this.accountsService.findOne(
      existingSetting.account_id,
    );

    if (!account || account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to update this setting',
      );
    }

    return this.settingsService.update(+id, setting);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const setting = await this.settingsService.findOne(+id);

    if (!setting) {
      throw new NotFoundException(`Setting with id ${id} not found`);
    }

    // Verify the setting's account belongs to the authenticated user
    const account = await this.accountsService.findOne(setting.account_id);

    if (!account || account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this setting',
      );
    }

    return this.settingsService.remove(+id);
  }
}
