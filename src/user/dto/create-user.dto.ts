import {
  IsEmail,
  IsEnum,
  IsString,
  IsBoolean,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  HR = 'HR',
  MANAGER = 'MANAGER',
  EMPLOYEE = 'EMPLOYEE',
  VIEWER = 'VIEWER',
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  employeeID?: string;
}
