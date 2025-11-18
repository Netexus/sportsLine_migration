import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    ) {}

    findAll() {
        return this.userRepo.find();
    }
}
