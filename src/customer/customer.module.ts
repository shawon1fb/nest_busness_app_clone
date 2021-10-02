import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import {
  FormDataInterceptorConfig,
  NestjsFormDataConfigFactory,
} from 'nestjs-form-data/dist/interfaces';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './customer.repository';
import { AuthModule } from '../auth/auth.module';

class MyNestJsFormDataConfigService implements NestjsFormDataConfigFactory {
  configAsync():
    | Promise<FormDataInterceptorConfig>
    | FormDataInterceptorConfig {
    return {
      storage: FileSystemStoredFile,
      fileSystemStoragePath: 'tmp/nestjs-fd',
    };
  }
}

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CustomerRepository]),
    NestjsFormDataModule.configAsync({
      useClass: MyNestJsFormDataConfigService,
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
