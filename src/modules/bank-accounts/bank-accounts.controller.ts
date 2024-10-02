import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.create(createBankAccountDto, userId);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Put(':bankAccountId')
  update(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.update(
      bankAccountId,
      userId,
      updateBankAccountDto,
    );
  }

  @Delete(':bankAccountId')
  remove(
    @Param('bankAccountId', ParseUUIDPipe) bankAccountId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.remove(bankAccountId, userId);
  }
}
