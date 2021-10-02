import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    const status = exception?.getStatus();
    //  console.log('HttpExceptionFilter = ', exception);

    let d: { statusCode: number; message: string[]; error: string };
    if (exception.getResponse() instanceof Object) {
      console.log('ok ---');
      const message = exception.getResponse();
    }

    response.status(status).json({
      statusCode: status,
      message: [exception.getResponse()],
    });
  }
}

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception?.getStatus();
    console.log('NotFoundExceptionFilter');
    response.status(status).json({
      statusCode: status,
      message: [exception?.getResponse()],
    });
  }
}

@Catch(Error)
export class ServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = 501;

    response.status(status).json({
      statusCode: status,
      message: [exception?.message],
    });
  }
}
