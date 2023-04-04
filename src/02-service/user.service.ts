import { IsEmpty } from 'class-validator';
import { UserDefinition } from 'src/03-model/user.definition';
import { DynamoTable } from 'src/04-infrastructure/dynamoTable';
import { TypeEnum } from 'src/04-infrastructure/items/item';
import { UserItem } from 'src/04-infrastructure/items/user.type';
import { ErrorTypeEnum } from 'src/_shared/errorType.enum';
import { BaseService } from './base.service';
import { BaseServiceResponse } from './interface/service.interface';

// TODO retornar um usuario apartir de um id
// * fazer direito
// ! fazer bem direitinho

export class UserService extends BaseService {
  constructor(readonly dynamoTable: DynamoTable) {
    super();
  }

  async getOne(userId: string): Promise<BaseServiceResponse> {
    try {
      const userPk = UserItem.Pk(userId);
      const [user] = await this.dynamoTable.queryItemByPk(userPk);

      if (IsEmpty(user)) {
        return { data: [], status: false, errorType: ErrorTypeEnum.NOT_FOUND };
      }

      return { data: user, status: true };
    } catch (error) {
      return {
        data: error.message,
        status: false,
        errorType: ErrorTypeEnum.INTERNAL_ERROR,
      };
    }
  }

  async getAll(): Promise<BaseServiceResponse> {
    try {
      const allUsers = await this.dynamoTable.queryItems(TypeEnum.USER);

      if (allUsers.length === 0) {
        return { data: [], status: false, errorType: ErrorTypeEnum.NOT_FOUND };
      }

      return { data: allUsers, status: true };
    } catch (error) {
      return {
        data: [],
        status: false,
        errorType: ErrorTypeEnum.INTERNAL_ERROR,
      };
    }
  }

  async create(user: UserDefinition): Promise<BaseServiceResponse> {
    try {
      //TODO
      // const newUser = UserItem.From(user);
      // let userItemFormat = {
      //   id: '',
      //   userRole: 1,
      //   name: 'Se Passar Esse Ta Errado',
      //   nacionalidade: 'Haleluhja',
      //   age: 22,
      // };
      // userItemFormat = newUser;
      // const aindanao = UserDataBuilder.aUser().build(user);
      // return await this.dynamoTable.putItem(newUser);
    } catch (error) {
      return {
        data: [],
        errorType: ErrorTypeEnum.INTERNAL_ERROR,
        status: false,
      };
    }
  }

  async update(data: UserDefinition): Promise<BaseServiceResponse> {
    try {
      //TODO
    } catch (error) {
      return {
        data: [],
        errorType: ErrorTypeEnum.INTERNAL_ERROR,
        status: false,
      };
    }
  }

  async delete(id: string): Promise<BaseServiceResponse> {
    try {
      //TODO
    } catch (error) {
      return {
        data: [],
        errorType: ErrorTypeEnum.INTERNAL_ERROR,
        status: false,
      };
    }
  }
}
