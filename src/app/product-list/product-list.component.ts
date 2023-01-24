import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductModel } from '../shared/model/product.model';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  prodList: any[] = [];
  newProdListForBag: any[] = [];
  amtTotal: any;

  constructor(private pServe: ProductService) {

    this.prodList = this.pServe.getRecipeList();
    this.pServe.productEmitter.subscribe((updatedData: any) => {
      this.prodList = updatedData;
      console.log(this.prodList)
    })
  }
  ngOnInit(): void { }

  countIncr(prod: any) {
    prod.quantity++
  }
  countDcr(prod: any) {
    if (prod.quantity <= 1) {
      return
    } else {
      prod.quantity--
    }
  }

  sendData(prod: any) {
    let flag = false;
    let newObj = Object.assign({}, prod);

    for (let i of this.newProdListForBag) {
      if (i.id === prod.id) {
        i.quantity = prod.quantity;
        flag = true;
      }
    }
    if (!flag) {
      this.newProdListForBag.push(newObj);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.amtTotal = 0;
    for (let i of this.newProdListForBag) {
      this.amtTotal += i.productPrice * i.quantity;
    }
  }
}
