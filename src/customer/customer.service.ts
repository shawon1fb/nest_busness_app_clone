import { Injectable, NotFoundException } from '@nestjs/common';
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
import { CustomerUpdateDto } from './dto/customer_update_dto';
import { last } from 'rxjs';

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

  async customerUpdate(
    customerDto: CustomerUpdateDto,
    id: number,
  ): Promise<Customer> {
    const customer = await this.getCustomerById(id);
    const {
      firstName,
      lastName,
      email,
      mobile,
      company,
      postalCode,
      address,
      avatar,
    } = customerDto;
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.mobile = mobile;
    customer.company = company;
    customer.address = address;
    customer.postalCode = postalCode;
    customer.avatar = avatar?.originalName;
    await customer.save();
    await customer.reload();

    return customer;
  }

  async getCustomerById(id: number): Promise<Customer> {
    const task = await this.repo.findOne({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return task;
  }

  async deleteCustomer(id: number): Promise<Customer> {
    const customer = await this.getCustomerById(id);
    const result = await this.repo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }
}
