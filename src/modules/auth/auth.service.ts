import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto.ts';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ email, name, password }: RegisterDto) {
    const emailExists = await this.usersRepository.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      data: {
        name,
        email,
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

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersRepository.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  private async generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId });
  }
}
