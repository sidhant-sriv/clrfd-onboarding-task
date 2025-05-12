import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import type { Account } from './account.model';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(@Request() req): Promise<Account[]> {
    // Only return the user's own accounts
    return this.accountsService.findByUser(req.user.userId);
  }

  @Get('my')
  async findMyAccounts(@Request() req): Promise<Account[]> {
    return this.accountsService.findByUser(req.user.userId);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Request() req,
  ): Promise<Account | null> {
    const account = await this.accountsService.findOne(+id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    // Check if account belongs to the authenticated user
    if (account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to access this account',
      );
    }

    return account;
  }

  @Post()
  async create(@Body('name') name: string, @Request() req): Promise<Account> {
    return this.accountsService.create(name, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Request() req,
  ): Promise<[number, Account[]]> {
    const account = await this.accountsService.findOne(+id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    // Check if account belongs to the authenticated user
    if (account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to update this account',
      );
    }

    return this.accountsService.update(+id, name);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<number> {
    const account = await this.accountsService.findOne(+id);

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    // Check if account belongs to the authenticated user
    if (account.user_id !== req.user.userId) {
      throw new ForbiddenException(
        'You do not have permission to delete this account',
      );
    }

    return this.accountsService.remove(+id);
  }
}
