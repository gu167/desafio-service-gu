import { UserDefinition } from 'src/03-model/user.definition';
import { BaseItem, TypeEnum } from './item';

const USER_PREFIX = '##USER'; // pk prefix
const AGE_PREFIX = '##AGE'; // sk prefix

// o data do Item é o objeto criado apartir da definição da entidade
export class UserItem extends BaseItem<UserDefinition> {
  public static Pk(uuid: string) {
    return `${USER_PREFIX}#${uuid}`;
  }

  public static Sk(age: number) {
    return `${AGE_PREFIX}#${age}`;
  }

  // UserItem.From(userDefiniton); User Item feito apartir de user definition
  public static From(user: UserDefinition): UserItem {
    const pk = this.Pk(user.id);
    const sk = this.Sk(user.age);

    return { pk, sk, data: user, type: TypeEnum.USER };
  }
}
