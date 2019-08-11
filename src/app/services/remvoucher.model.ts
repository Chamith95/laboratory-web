import { item } from './item.model';

export interface remvoucher {
    Voucher_Id: string;
    Date_Removed:String;
    items:item[];
  }