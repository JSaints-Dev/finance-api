import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ActiveUserId } from 'src/shared/decorators/active-user-id';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.categoriesService.findAll(userId);
  }
}
