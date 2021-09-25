import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
} from 'class-validator';
import {
  FileSystemStoredFile,
  HasMimeType,
  IsFile,
  IsFiles,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

export class CustomerInputDto {
  // @IsString()
  // @IsNotEmpty()
  // firstName: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // lastName: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // @IsEmail()
  // email: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // @IsPhoneNumber()
  // mobile: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // company: string;
  //
  // @IsString()
  // @IsNotEmpty()
  // address: string;
  //
  // @IsNotEmpty()
  // @IsPostalCode()
  // @IsNumber()
  // postalCode: number;

  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  avatar: FileSystemStoredFile;
}
