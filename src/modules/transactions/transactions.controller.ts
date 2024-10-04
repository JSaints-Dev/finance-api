import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';
import { ParseUUIDPipeOptional } from 'src/shared/pipes/parse-uuid-pipes-optional';
import { ParseEnumPipeOptional } from 'src/shared/pipes/parse-enum-pipes-optional';
import { TransactionCategoryType } from './entities/transaction';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @ActiveUserId() userId: string,
  ) {
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  findAll(
    @ActiveUserId() userId: string,
    @Query('month', ParseIntPipe) month: string,
    @Query('year', ParseIntPipe) year: string,
    @Query('bankAccountId', ParseUUIDPipeOptional) bankAccountId: string,
    @Query('type', new ParseEnumPipeOptional(TransactionCategoryType))
    type: TransactionCategoryType,
  ) {
    return this.transactionsService.findAllByUserId(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }

  @Put(':transactionId')
  update(
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @ActiveUserId() userId: string,
  ) {
    return this.transactionsService.update(
      transactionId,
      updateTransactionDto,
      userId,
    );
  }

  @Delete(':transactionId')
  remove(
    @Param('transactionId', ParseUUIDPipe) transactionId: string,
    @ActiveUserId() userId: string,
  ) {
    return this.transactionsService.remove(transactionId, userId);
  }
}
