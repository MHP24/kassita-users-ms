import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { ValidRoles } from '@prisma/client';

export class UpdateRolesDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @IsEnum(ValidRoles, { each: true })
  roles: ValidRoles[];
}
