export enum TypeEnum {
  WEBSITE = 'WEBSITE',
}

export abstract class BaseItem<ItemType> {
  pk: string;
  sk: string;
  type: TypeEnum;
  data: ItemType; // data é a definição da entidade
  gsipk?: string;
  gsisk?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
