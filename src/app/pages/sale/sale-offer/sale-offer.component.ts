import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, FormControl, Validators, UntypedFormGroup, UntypedFormArray, UntypedFormBuilder,NgForm } from '@angular/forms';
import { ServiceinvoiceService } from '../../apps/invoice/serviceinvoice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddedDialogComponent } from '../../apps/invoice/add-invoice/added-dialog/added-dialog.component';

import { saleorder, saleInvoiceList } from './saleofferlist';

@Component({
  selector: 'app-sale-offer',
  templateUrl: './sale-offer.component.html',
  styleUrls: ['./sale-offer.component.scss']
})
export class SaleOfferComponent implements OnInit {
  
  // addForm: UntypedFormGroup | any;
  // rows: UntypedFormArray;
  // invoice: InvoiceList = new InvoiceList();
  // saleForm : FormGroup;
  

  // subTotal = 0;
  // vat = 0;
  // grandTotal = 0;
 
  // constructor(private _fb:FormBuilder, __fb:UntypedFormBuilder){}
  ngOnInit(): void {
  //   // this.saleForm = this._fb.group({
  //   //   project_name         : new FormControl('',[Validators.required]),
  //   //   selling_price        : new FormControl('',[Validators.required]),
  //   //   bedrooms             : new FormControl('',[Validators.required]),
  //   //   total_area           : new FormControl('',[Validators.required]),
  //   //   built_up_area        : new FormControl('',[Validators.required]),
  //   //   payable_now          : new FormControl('',[Validators.required]),
  //   //   Ist_installment_date : new FormControl('',[Validators.required]),
  //   //   Ist_installment_price : new FormControl('',[Validators.required]),
  //   //   second_installment_date : new FormControl('',[Validators.required]),
  //   //   second_installment_price : new FormControl('',[Validators.required]),
  //   //   third_installment_date : new FormControl('',[Validators.required]),
  //   //   third_installment_price : new FormControl('',[Validators.required]),
  //   //   fourth_installment_date : new FormControl('',[Validators.required]),
  //   //   fourth_installment_price : new FormControl('',[Validators.required]),
  //   //   hand_over : new FormControl(''),
  //   // })
  }

  addForm: UntypedFormGroup | any;
  rows: UntypedFormArray;
  invoice: saleInvoiceList = new saleInvoiceList();

  ///////////////////////////////////////////////////////////
  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(private fb: UntypedFormBuilder,private invoiceService: ServiceinvoiceService, private router: Router, public dialog: MatDialog,) {
    // tslint:disable-next-line - Disables all
    this.invoice.id =
      Math.max.apply(Math,this.invoiceService.getInvoiceList().map(function (o: any) { return o.id; }),
      ) + 1;
    this.invoice.status = 'Pending';

    ///////////////////////////////////////////////////////////

    this.addForm = this.fb.group({});

    this.rows = this.fb.array([]);
    this.addForm.addControl('rows', this.rows);
    this.rows.push(this.createItemFormGroup());
  }

  ////////////////////////////////////////////////////////////////////////////////////
  onAddRow(): void { this.rows.push(this.createItemFormGroup()); }

  onRemoveRow(rowIndex: number): void {
    const totalCostOfItem = this.addForm.get('rows')?.value[rowIndex].unitPrice * this.addForm.get('rows')?.value[rowIndex].units;
    this.subTotal = this.subTotal - totalCostOfItem;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
    this.rows.removeAt(rowIndex);

  }

  createItemFormGroup(): UntypedFormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      units: ['', Validators.required],
      unitPrice: ['', Validators.required],
      itemTotal: ['0'],
    });
  }

  itemsChanged(): void {
    let total: number = 0;
    // tslint:disable-next-line - Disables all
    for (let t = 0; t < (<UntypedFormArray>this.addForm.get('rows')).length; t++) {
      if (
        this.addForm.get('rows')?.value[t].unitPrice !== '' &&
        this.addForm.get('rows')?.value[t].units
      ) {
        total =
          this.addForm.get('rows')?.value[t].unitPrice * this.addForm.get('rows')?.value[t].units +
          total;
      }
    }
    this.subTotal = total;
    this.vat = this.subTotal / 10;
    this.grandTotal = this.subTotal + this.vat;
  }
  ////////////////////////////////////////////////////////////////////

  saveDetail(): void {
    this.invoice.grandTotal = this.grandTotal;
    this.invoice.totalCost = this.subTotal;
    this.invoice.vat = this.vat;
    // tslint:disable-next-line - Disables all
    for (let t = 0; t < (<UntypedFormArray>this.addForm.get('rows')).length; t++) {
      const o: saleorder = new saleorder();
      o.itemName = this.addForm.get('rows')?.value[t].itemName;
      o.unitPrice = this.addForm.get('rows')?.value[t].unitPrice;
      o.units = this.addForm.get('rows')?.value[t].units;
      o.unitTotalPrice = o.units * o.unitPrice;
      this.invoice.orders.push(o);
    }
    this.dialog.open(AddedDialogComponent);
    this.invoiceService.addInvoice(this.invoice);
    this.router.navigate(['/apps/invoice']);
  }



  // onAddRow(){

  // }

   ////////////////////////////////////////////////////////////////////////////////////
  //  onAddRow(): void { this.rows.push(this.createItemFormGroup()); }

  //  onRemoveRow(rowIndex: number): void {
  //    const totalCostOfItem = this.addForm.get('rows')?.value[rowIndex].unitPrice * this.addForm.get('rows')?.value[rowIndex].units;
  //    this.subTotal = this.subTotal - totalCostOfItem;
  //    this.vat = this.subTotal / 10;
  //    this.grandTotal = this.subTotal + this.vat;
  //    this.rows.removeAt(rowIndex);
  //  }
  //  createItemFormGroup(): UntypedFormGroup {
  //    return this.__fb.group({
  //      itemName: ['', Validators.required],
  //      units: ['', Validators.required],
  //      unitPrice: ['', Validators.required],
  //      itemTotal: ['0'],
  //    });
  //  }


  // itemsChanged(): void {
  //   let total: number = 0;
  //   // tslint:disable-next-line - Disables all
  //   for (let t = 0; t < (<UntypedFormArray>this.addForm.get('rows')).length; t++) {
  //     if (
  //       this.addForm.get('rows')?.value[t].unitPrice !== '' &&
  //       this.addForm.get('rows')?.value[t].units
  //     ) {
  //       total =
  //         this.addForm.get('rows')?.value[t].unitPrice * this.addForm.get('rows')?.value[t].units +
  //         total;
  //     }
  //   }
  //   this.subTotal = total;
  //   this.vat = this.subTotal / 10;
  //   this.grandTotal = this.subTotal + this.vat;
  // }


//   updateHandOver(event: any) {
//     const fourth_installment_price = parseFloat(event.target.value); // Parse the input value to a float
//     const selling_price = this.saleForm?.get('selling_price')?.value;
//     const payable_now = this.saleForm?.get('payable_now')?.value;
//     const firstInstallmentPrice = this.saleForm?.get('Ist_installment_price')?.value;
//     const secondInstallmentPrice = this.saleForm?.get('second_installment_price')?.value;
//     const thirdInstallmentPrice = this.saleForm?.get('third_installment_price')?.value;

//     // Calculate the sum of all installment prices and the fourth installment price
//     const sum = payable_now + firstInstallmentPrice + secondInstallmentPrice + thirdInstallmentPrice + fourth_installment_price;

//     if(sum < selling_price){
//       const handover = parseFloat(selling_price) - sum; // Calculate the handover amount
//       this.saleForm?.get('hand_over')?.setValue(handover);
//     }else{
//       alert
//     }

    





    
// }
 


  // updateHandOver(event: any){
  //   const fourth_installment_date = event.target.value;
  //   const selling_price = this.saleForm?.get('selling_price')?.value;
  //   const payable_now = this.saleForm?.get('payable_now')?.value;
  //   const firstInstallmentPrice = this.saleForm?.get('Ist_installment_price')?.value;
  //   const secondInstallmentPrice = this.saleForm?.get('second_installment_price')?.value;
  //   const thirdInstallmentPrice = this.saleForm?.get('third_installment_price')?.value;

  //   const sum = payable_now +  firstInstallmentPrice + secondInstallmentPrice + thirdInstallmentPrice + fourth_installment_date;

  //   const handover  = Number(selling_price) - Number(sum);

  //   console.log(handover)

  // }



  submitForm(e:Event){
    console.log(e);
  }

  // get f(){
  //   return this.saleForm.controls;
  // }

}
