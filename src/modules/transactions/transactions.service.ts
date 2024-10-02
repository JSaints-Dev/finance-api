import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/validate-category-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const { bankAccountId, amount, categoryId, date, name, type } =
      createTransactionDto;

    await this.validateBankAccountOwnershipService.validate({
      bankAccountId,
      userId,
    });

    await this.validateCategoryOwnershipService.validate({
      categoryId,
      userId,
    });

    return this.transactionsRepository.create({
      data: {
        amount,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
      },
    });
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
