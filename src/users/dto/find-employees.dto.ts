import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsOptional, IsBoolean } from 'class-validator';

export class FindEmployeesDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
