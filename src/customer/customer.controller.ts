import { CustomerService } from './customer.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CustomerInputDto } from './dto/customer.dto';
import { Customer } from './entity/cusromer.model.entity';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CustomerUpdateDto } from './dto/customer_update_dto';
import { JwtAuthGuard } from '../auth/guard/jwt-guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from '../auth/enum/role.enum';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Post('create')
  @FormDataRequest({ storage: FileSystemStoredFile, autoDeleteFile: false })
  createCustomer(@Body() customerDto: CustomerInputDto): Promise<Customer> {
    return this.service.createCustomer(customerDto);
  }

  @Post('update/:id')
  @FormDataRequest({ storage: FileSystemStoredFile, autoDeleteFile: false })
  updateCustomer(
    @Body() customerDto: CustomerUpdateDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Customer> {
    return this.service.customerUpdate(customerDto, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Staff, Role.Admin)
  @Get('all')
  getAll(
    @Paginate() query: PaginateQuery,
    // @GetUser() user: User, //: Promise<Paginated<Customer>>
  ) {
    return this.service.getAll(query);
  }

  @Get('customer/:id')
  getCustomerById(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.service.getCustomerById(id);
  }

  @Delete('delete/:id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Customer> {
    return this.service.deleteCustomer(id);
  }
}
