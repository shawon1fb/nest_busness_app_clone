import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Unique,
} from 'typeorm';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';
import { Exclude } from 'class-transformer';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;

  @Column()
  company: string;

  @Column()
  address: string;

  @Column()
  postalCode: string;

  // @Exclude()
  @Column()
  avatar?: string;
}
