import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ClientKafka, RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.userClient.connect();
    console.log('UserService Kafka client connected');
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // saltRounds=10
    const data = {
      ...createUserDto,
      password: hashedPassword,
    };
    return this.prismaService.user.create({ data });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  async validateUser(email: string, psw: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user)
      throw new RpcException({ message: 'User Not found', statusCode: 404 });

    const isMatchPsw = await bcrypt.compare(psw, user.password);

    if (!isMatchPsw)
      throw new RpcException({ message: 'Invalid password', statusCode: 401 });

    return user;
  }
}
