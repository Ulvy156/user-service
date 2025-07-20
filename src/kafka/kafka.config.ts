// src/kafka/kafka.config.ts
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export const kafkaConfig: MicroserviceOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'user-service',
      brokers: ['127.0.0.1:29092'],
    },
    consumer: {
      groupId: 'user-consumer-group',
    },
  },
};
