import { Roles, UserDefinition } from 'src/03-model/user.definition';
import { v4 as uuidv4 } from 'uuid';

export class UserDataBuilder {
  id: string;
  userRole: number;
  name: string;
  nacionalidade: string;
  age: number;

  constructor() {
    // o default é sempre o caso de sucesso
    this.id = uuidv4();
    this.userRole = Roles.STUDENT;
    this.name = 'Gugu';
    this.nacionalidade = 'Irlandense do norte';
    this.age = 25;
  }

  static aUser() {
    // ponto de entrada
    // retorna a instancia padrao ou seja o caso de sucesso
    return new UserDataBuilder();
  }

  withInvalidParams() {
    // modifica atributos e retorna a instancia de UserDataBuilder
    this.id = '';
    this.userRole = 0;
    this.name = '';
    this.nacionalidade = '';
    this.age = 17;

    return this;
  }

  build() {
    // retorna a entidade instanciada final UserDefinition
    // ponto de saida
    return new UserDefinition(
      this.id,
      this.userRole,
      this.name,
      this.nacionalidade,
      this.age,
    );
  }
}
