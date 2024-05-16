import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { Logger } from 'winston';
import { Contact, User } from '@prisma/client';
import { ContactResponse, CreateContactRequest } from '../model/contact.model';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    const createRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: {
        ...createRequest,
        ...{ username: user.username },
      },
    });
    return this.toContactResponse(contact)
  }

  async get(user: User, contactId: number): Promise<ContactResponse>{
    const contact = await this.prismaService.contact.findFirst({
      where: {
        id: contactId,
        username: user.username
      }
    })
    if (!contact) {
      throw new HttpException('Contact is not found',404)
    }
    return this.toContactResponse(contact)
  }

  toContactResponse(contact: Contact): ContactResponse{
    return {
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    };
  }
}
