import { UserDefinition } from 'src/03-model/user.definition';
import { BaseServiceResponse } from './interface/service.interface';

export abstract class BaseService {
  async getOne(id: string): Promise<BaseServiceResponse> {
    throw new Error('Invalid UserId or User not Found');
  }

  async getAll(): Promise<BaseServiceResponse> {
    throw new Error('Improssibru pegar tudo');
  }
  async create(data: UserDefinition): Promise<BaseServiceResponse> {
    throw new Error('not implemented');
  }

  async update(data: UserDefinition): Promise<BaseServiceResponse> {
    throw new Error('not implemented');
  }

  async delete(id: string): Promise<BaseServiceResponse> {
    throw new Error('not implemented');
  }
}
