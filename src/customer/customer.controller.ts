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
  UseInterceptors,
} from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CustomerInputDto } from './dto/customer.dto';
import { Customer } from './entity/cusromer.model.entity';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Post('create')
  @FormDataRequest({ storage: FileSystemStoredFile, autoDeleteFile: false })
  getHello(@Body() customerDto: CustomerInputDto): Promise<Customer> {
    return this.service.createCustomer(customerDto);
  }

  @Get('all')
  getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Customer>> {
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
