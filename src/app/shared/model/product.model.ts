import { v4 as uuid } from 'uuid';

export class ProductModel{
    constructor(public productName: string, public productPrice:number, public productImg: string, public quantity? : number, public id? : any){
        this.quantity = 1;
        this.id = uuid();
    }
}