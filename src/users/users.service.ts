import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    return this.userRepository.save(newUser);
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { username } };
    return this.userRepository.findOne(options);
  }
  async findOneById(userId: number): Promise<User | undefined> {
    const options: FindOneOptions<User> = { where: { id: userId } };
    return this.userRepository.findOne(options);
  }
}
