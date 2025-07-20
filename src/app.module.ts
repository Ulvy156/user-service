import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [PrismaModule, UserModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
