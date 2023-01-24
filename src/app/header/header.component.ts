import {Component, OnInit} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductModel } from "../shared/model/product.model";
import { ProductService } from "../shared/services/product.service";

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.css']
})

export class HeaderComponent implements OnInit{
    myForm : FormGroup | any;
    img : any = '';
    myImgFile : any;

    constructor(private pServ : ProductService){}

    ngOnInit(): void {
      this.myForm = new FormGroup({
        productName : new FormControl('', Validators.required),
        productPrice : new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        productImg : new FormControl('', [Validators.required]),
      })
    }
    onSubmit(){
        console.log(this.myForm)
        const newProductObj = new ProductModel(this.myForm.value.productName, this.myForm.value.productPrice, this.myImgFile);
        this.pServ.addProducts(newProductObj);
        this.myForm.reset();
    }
    getFile(eve:any){
      console.log(eve.target.files[0].size);
      this.img = eve.target.files[0]
      console.log("File", this.img)
      let reader = new FileReader();
      reader.readAsDataURL(this.img);
      reader.onload = (ev: any)=>{
      this.myImgFile = ev.target.result;
    }
  }
}