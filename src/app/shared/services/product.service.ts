import { EventEmitter, Injectable } from "@angular/core";
import { ProductModel } from "../model/product.model";

@Injectable({providedIn : 'root'})

export class ProductService{
    productList  = [
        new ProductModel('Anjir', 1000, "https://m.media-amazon.com/images/I/61zCWZ3av9L._SX522_.jpg"),
        new ProductModel('Pistachio', 1200, 'https://m.media-amazon.com/images/I/71aNMEtTWrL._SX569_.jpg'),
        new ProductModel('Black Raisins', 450, 'https://anahafoods.in/wp-content/uploads/2020/10/New-2.jpg')
    ];
    productEmitter = new EventEmitter();

    getRecipeList(){
        return this.productList.slice();
    }
    addProducts(prod : any){
        this.productList.push(prod)
        this.productEmitter.emit(this.productList.slice())
        console.log(this.productList);
    }
}

