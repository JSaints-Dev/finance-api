import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/validate-bank-account-ownership.service';
import { ValidateCategoryOwnershipService } from '../categories/validate-category-ownership.service';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
    private readonly validateTransactionOwnershipService: ValidateTransactionOwnershipService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const { bankAccountId, amount, categoryId, date, name, type } =
      createTransactionDto;

    await this.validateTransactionOwnership({
      bankAccountId,
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
      select: {
        name: true,
        amount: true,
        type: true,
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

  async update(
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ) {
    const { bankAccountId, categoryId, amount, date, name, type } =
      updateTransactionDto;

    await this.validateTransactionOwnership({
      bankAccountId,
      categoryId,
      userId,
      transactionId,
    });
    return this.transactionsRepository.update({
      where: {
        id: transactionId,
      },
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

  async remove(transactionId: string, userId: string) {
    await this.validateTransactionOwnershipService.validate({
      transactionId,
      userId,
    });

    await this.transactionsRepository.delete({
      where: {
        id: transactionId,
      },
    });

    return 'Transaction deleted successfully';
  }

  private async validateTransactionOwnership({
    bankAccountId,
    categoryId,
    transactionId,
    userId,
  }: {
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
    userId: string;
  }) {
    await Promise.all([
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate({
          bankAccountId,
          userId,
        }),
      categoryId &&
        this.validateCategoryOwnershipService.validate({
          categoryId,
          userId,
        }),
      transactionId &&
        this.validateTransactionOwnershipService.validate({
          transactionId,
          userId,
        }),
    ]);
  }
}
