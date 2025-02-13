import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from 'src/app/services/food-item.service';

export interface customerData {
  name: string;
  phone: number;
  address: string;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {

  cData!: customerData;
  order!: any;
  total: any;
  table: any;
  invoiceID!:string;
  currentDate = new Date();
  
  constructor(private _route: ActivatedRoute, private _order: FoodItemService, private route: Router) {
  }

  ngOnInit(): void {
    this.invoiceID=this.generateInvoiceNumber();
    this.someAsyncFunction();
  }


  async someAsyncFunction() {
    try {
      const result1 = await this.firstAsyncOperation();
      const result2 = await this.secondAsyncOperation(result1);
      const result3 = await this.thirdAsyncOperation(result2);
      // ... continue with more asynchronous operations if needed
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  firstAsyncOperation(): Promise<any> {
    this.total = 0;
    return new Promise((resolve, reject) => {
      this._route.params.subscribe(parameter => {
        this.cData = { name: parameter['name'], phone: parameter['phone'], address: parameter['address'] };
        this.table = parameter['table'];
        this.order = JSON.parse(this._order.getOrderByTable(this.table) || '{}');
        console.log(JSON.stringify(this.order));
        this.order.forEach((element: any) => {
          // console.log("previous total="+this.total + ",, price & qty="+element.price +"  "+element.qty);
          this.total = this.total + (element.qty * element.price);
          // console.log("new Total ="+this.total);
        });
      });
      setTimeout(() => {
        resolve('Result 1');
      }, 1000);
    });
  }

  secondAsyncOperation(input: any): Promise<any> {
    return new Promise((resolve, reject) => {
      window.print();
      setTimeout(() => {
        resolve(`Result 2 based on ${input}`);
      },);
    });
  }

  thirdAsyncOperation(input: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.route.navigate(["billing/"+this.table]);
      setTimeout(() => {
        resolve(`Result 3 based on ${input}`);
      },);
    });
  }


  generateInvoiceNumber(): string {
    // You can replace this with your own logic to generate the invoice number.
    // For example, generating a random number with a prefix.
    const prefix = 'SLW';
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${prefix}-${randomNumber}`;
  }

}
