import { PartialType } from '@nestjs/mapped-types';
import { CustomerInputDto } from './customer.dto';

export class CustomerUpdateDto extends PartialType(CustomerInputDto) {
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // firstName: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // lastName: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // @IsPhoneNumber()
  // mobile: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // company: string;
  //
  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // address: string;
  //
  // @IsOptional()
  // @IsNotEmpty()
  // postalCode: string;
  //
  // @IsOptional()
  // @IsFile()
  // @HasMimeType(['image/jpeg', 'image/png'])
  // avatar?: FileSystemStoredFile;
}
