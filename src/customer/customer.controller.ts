import { CustomerService } from './customer.service';
import { Body, Controller, Post } from '@nestjs/common';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { CustomerInputDto } from './customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @Post('file')
  @FormDataRequest({ storage: FileSystemStoredFile, autoDeleteFile: false })
  getHello(@Body() testDto: CustomerInputDto) {
    console.log(testDto);
    return testDto;
  }
}
