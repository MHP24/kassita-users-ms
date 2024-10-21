import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { FindEmployeesDto, UpdateRolesDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.find-employees')
  findEmployees(@Payload() findEmployeesDto: FindEmployeesDto) {
    return { findEmployeesDto };
  }

  @MessagePattern('users.update-roles')
  updateRoles(@Payload() updateRolesDto: UpdateRolesDto) {
    return { updateRolesDto };
  }
}
