import { Customer } from './entity/cusromer.model.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CustomerInputDto } from './dto/customer.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async createCustomer(customerDto: CustomerInputDto): Promise<Customer> {
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

    const customer = new Customer();
    customer.firstName = firstName;
    customer.lastName = lastName;
    customer.email = email;
    customer.mobile = mobile;
    customer.company = company;
    customer.postalCode = postalCode;
    customer.address = address;
    customer.avatar = avatar?.originalName || '';
    try {
      await customer.save();
      return customer;
    } catch (error) {
      //   console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(['email already exists']);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAllCustomer(): Promise<Customer[]> {
    const query = this.createQueryBuilder('customer');
    const customers = await query.getMany();
    return customers;
  }
}
