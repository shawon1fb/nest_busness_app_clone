import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class CustomerUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  mobile: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  postalCode: string;

  @IsOptional()
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  avatar?: FileSystemStoredFile;
}
