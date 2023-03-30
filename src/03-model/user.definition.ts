import {
  IsInt,
  Length,
  IsUUID,
  Min,
  Max,
  validateSync,
  IsNotEmpty,
  IsString,
  IsEnum,
} from 'class-validator';
export enum Roles {
  ADMIN = 1,
  STANDARD = 2,
  STUDENT = 3,
  TEACHER = 4,
}
export class UserDefinition {
  @IsUUID()
  id: string;

  @IsEnum(Roles, {
    message: 'Must be a Role number between 1 and 4',
  })
  userRole: number;

  @Length(1, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  nacionalidade: string;

  @IsInt()
  @Min(18, {
    message: 'User must be above 17 years',
  })
  @Max(99, {
    message: 'Invalid User age, cannot exceed 100',
  })
  age: number;

  constructor(
    id: string,
    userRole: number,
    name: string,
    nacionalidade: string,
    age: number,
  ) {
    this.id = id;
    this.userRole = userRole;
    this.name = name;
    this.nacionalidade = nacionalidade;
    this.age = age;
    this.validator();
  }

  public clone() {
    return new UserDefinition(
      this.id,
      this.userRole,
      this.name,
      this.nacionalidade,
      this.age,
    );
  }

  private validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`User Errors: ${errors}`);
    }

    return;
  }
}
