import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './account.model';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account | null> {
    return this.accountsService.findOne(+id);
  }

  @Post()
  async create(@Body('name') name: string): Promise<Account> {
    return this.accountsService.create(name);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<[number, Account[]]> {
    return this.accountsService.update(+id, name);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.accountsService.remove(+id);
  }
}
