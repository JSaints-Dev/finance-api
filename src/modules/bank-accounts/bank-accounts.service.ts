import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-ownership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  create(createBankAccountDto: CreateBankAccountDto, userId: string) {
    const { color, initialBalance, name, type } = createBankAccountDto;
    return this.bankAccountsRepository.create({
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            amount: true,
            type: true,
          },
        },
      },
    });

    const bankAccountsWithTotalBalance = bankAccounts.map((account) => {
      const incomeTransactionsSum = account.transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.amount
            : -transaction.amount),
        0,
      );

      const totalBalance = account.initialBalance + incomeTransactionsSum;

      return {
        ...account,
        totalBalance,
      };
    });

    return bankAccountsWithTotalBalance;
  }

  async update(
    bankAccountId: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;

    await this.validateBankAccountOwnershipService.validate({
      bankAccountId,
      userId,
    });

    return await this.bankAccountsRepository.update({
      where: {
        id: bankAccountId,
      },
      data: {
        color,
        initialBalance,
        name,
        type,
        userId,
      },
    });
  }

  async remove(bankAccountId: string, userId: string) {
    await this.validateBankAccountOwnershipService.validate({
      bankAccountId,
      userId,
    });

    await this.bankAccountsRepository.delete({
      where: {
        id: bankAccountId,
      },
    });

    return {
      message: 'Bank account deleted successfully',
    };
  }
}
