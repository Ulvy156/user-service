// src/common/validation.pipe.ts
import { BadRequestException, ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  exceptionFactory: (errors) => {
    const messages = errors.map((err) => Object.values(err.constraints)).flat();
    return new BadRequestException(messages);
  },
});
