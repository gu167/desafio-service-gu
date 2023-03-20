import { IsInt, Length, IsUUID, Min, Max, validateSync } from 'class-validator';

export class UserDefinition {
  @IsUUID()
  id: string;

  @Length(1, 50)
  name: string;

  @IsInt()
  @Min(18, {
    message: 'User must be above 17 years',
  })
  @Max(99, {
    message: 'Invalid User age, cannot exceed 100',
  })
  age: number;

  constructor(id: string, name: string, age: number) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.validator();
  }

  public clone() {
    return new UserDefinition(this.id, this.name, this.age);
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
