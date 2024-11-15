import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const rcpError = exception.getError();

    if (
      typeof rcpError === 'object' &&
      'status' in rcpError &&
      'message' in rcpError
    ) {
      const status = isNaN(+rcpError.status) ? 400 : +rcpError.status;
      return response.status(status).json(rcpError);
    }

    return response.status(400).json({
      status: 400,
      message: rcpError,
    });
  }
}
