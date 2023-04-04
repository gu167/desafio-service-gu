import { ErrorTypeEnum } from 'src/_shared/errorType.enum';

export type BaseServiceResponse = {
  data: any;
  status: boolean;
  errorType?: ErrorTypeEnum;
};
