import { Injectable } from '@nestjs/common';
import { CustomerInputDto } from './dto/customer.dto';
import { CustomerRepository } from './customer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/cusromer.model.entity';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerRepository)
    private repo: CustomerRepository,
  ) {}

  // @InjectRepository(CustomerRepository)
  // private customerRepository: CustomerRepository,
  async createCustomer(customerDto: CustomerInputDto): Promise<Customer> {
    return this.repo.createCustomer(customerDto);
  }

  async getAll(query: PaginateQuery): Promise<Paginated<Customer>> {
    return paginate(query, this.repo, {
      sortableColumns: ['id', 'firstName', 'lastName', 'email'],
      searchableColumns: ['firstName', 'lastName', 'email'],
      defaultSortBy: [['id', 'DESC']],
      maxLimit: 40,
      defaultLimit: 50,
      filterableColumns: {
        id: [FilterOperator.EQ],
        email: [FilterOperator.EQ],
        mobile: [FilterOperator.EQ],
      },
    });
  }
}
