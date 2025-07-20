import { kafkaConfig } from './kafka/kafka.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { globalValidationPipe } from './config/validation.pipe';
import { AllExceptionsFilter } from './common/utils/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //start microservice
  app.connectMicroservice(kafkaConfig);
  // Make sure to start all microservices!
  await app.startAllMicroservices();

  app.use(cookieParser());

  app.useGlobalPipes(globalValidationPipe);
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
