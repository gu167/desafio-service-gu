import { UserDataBuilder } from './user.data-builder';

// tod0s os metodos sao estaticos
export class UserObjectMother {
  public static validUser() {
    return UserDataBuilder.aUser().build();
  }

  public static invalidUser() {
    return UserDataBuilder.aUser().withInvalidParams().build();
  }
}
