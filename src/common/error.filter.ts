import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        errors: exception.getResponse(),
      });
    } else if (exception instanceof ZodError) {
      const errorsMessage = this.formatZodErrors(exception.message);
      // const [key, value] = Object.entries(errors)[0]; // ambil key & value pertama
      response.status(400).json({
        errors: errorsMessage,
      });
    } else {
      response.status(500).json({
        errors: exception.message,
      });
    }
  }

  private formatZodErrors(zodErrors: string): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(zodErrors);
    } catch (error) {
      throw new BadRequestException('Invalid JSON format');
    }

    if (!Array.isArray(parsedBody)) {
      throw new BadRequestException('Expected an array');
    }
    parsedBody.forEach((error) => {
      const path = error.path.join('.');
      if (!formattedErrors[path]) {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(error.message);
    });

    return formattedErrors;
  }
}
