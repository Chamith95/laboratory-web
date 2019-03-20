import { item } from './item.model';

export interface Addvoucher {
    Voucher_Id: string;
    Recieved_from:string;
    Date_Recieved:Date;
    items:item[];
  }