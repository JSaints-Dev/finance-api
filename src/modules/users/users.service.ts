import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const emailExists = await this.usersRepository.findUnique({
      where: { email: createUserDto.email },
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const user = await this.usersRepository.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Salário', icon: 'money', type: 'INCOME' },
              { name: 'Freelance', icon: 'freelance', type: 'INCOME' },
              { name: 'Investimentos', icon: 'invest', type: 'INCOME' },
              { name: 'Outros', icon: 'others', type: 'INCOME' },
              { name: 'Casa', icon: 'home', type: 'OUTCOME' },
              { name: 'Alimentação', icon: 'food', type: 'OUTCOME' },
              { name: 'Educação', icon: 'education', type: 'OUTCOME' },
              { name: 'Lazer', icon: 'heart', type: 'OUTCOME' },
              { name: 'Mercado', icon: 'market', type: 'OUTCOME' },
              { name: 'Roupas', icon: 'clothes', type: 'OUTCOME' },
              { name: 'Transporte', icon: 'car', type: 'OUTCOME' },
              { name: 'Viagem', icon: 'travel', type: 'OUTCOME' },
              { name: 'Moradia', icon: 'home', type: 'OUTCOME' },
              { name: 'Saúde', icon: 'health', type: 'OUTCOME' },
              { name: 'Outros', icon: 'others', type: 'OUTCOME' },
            ],
          },
        },
      },
    });
    return {
      name: user.name,
      email: user.email,
    };
  }
}
