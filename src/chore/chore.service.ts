import { Injectable } from '@nestjs/common';
import { CreateChoreDto } from './dto/create-chore.dto';
import { UpdateChoreDto } from './dto/update-chore.dto';

@Injectable()
export class ChoreService {
  create(createChoreDto: CreateChoreDto) {
    return 'This action adds a new chore';
  }

  findAll() {
    return `This action returns all chore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chore`;
  }

  update(id: number, updateChoreDto: UpdateChoreDto) {
    return `This action updates a #${id} chore`;
  }

  remove(id: number) {
    return `This action removes a #${id} chore`;
  }
}
