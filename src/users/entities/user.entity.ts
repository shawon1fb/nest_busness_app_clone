import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  mobile: string;

  @Column()
  address: string;

  @Column()
  postalCode: string;

  // @Exclude()
  @Column()
  avatar?: string;
}
