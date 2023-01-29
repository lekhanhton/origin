import { BigNumber } from '../data-types/big-number';

export interface ISavingPlan {
  amount: BigNumber;
  reachDate: Date;
  monthTotal: BigNumber;
  monthlyAmount: BigNumber;
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
}
