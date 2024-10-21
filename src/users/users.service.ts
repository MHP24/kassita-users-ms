import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient, ValidRoles } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { FindEmployeeDto, UpdateRolesDto } from './dto';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  logger = new Logger(UsersService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connection ready');
  }

  // * Find active employees available
  findEmployees() {
    try {
      return this.user.findMany({
        where: {
          isActive: true,
          roles: {
            has: ValidRoles.employee,
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new RpcException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred getting employees, try again',
      });
    }
  }

  // * Find employee by id
  async findEmployeeById({ userId }: FindEmployeeDto) {
    const employee = await this.user.findUnique({
      where: {
        id: userId,
        roles: {
          has: ValidRoles.employee,
        },
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        username: true,
        roles: true,
      },
    });

    if (!employee) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Employee with id: ${userId} not found`,
      });
    }

    return employee;
  }

  // * Update roles for specific user
  updateRoles({ userId, roles }: UpdateRolesDto) {
    try {
      return this.user.update({
        where: {
          id: userId,
        },
        data: {
          roles,
        },
        select: {
          id: true,
          username: true,
          email: true,
          roles: true,
        },
      });
    } catch (error) {
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      });
    }
  }
}
