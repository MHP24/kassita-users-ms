import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { FindEmployeeDto, UpdateRolesDto } from './dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.find-employees')
  findEmployees() {
    return this.usersService.findEmployees();
  }

  @MessagePattern('users.find-employee')
  findEmployee(@Payload() findEmployeeDto: FindEmployeeDto) {
    return this.usersService.findEmployeeById(findEmployeeDto);
  }

  @MessagePattern('users.update-roles')
  updateRoles(@Payload() updateRolesDto: UpdateRolesDto) {
    return this.usersService.updateRoles(updateRolesDto);
  }
}
