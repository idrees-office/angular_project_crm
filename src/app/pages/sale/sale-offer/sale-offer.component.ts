import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ServiceinvoiceService } from '../../apps/invoice/serviceinvoice.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddedDialogComponent } from '../../apps/invoice/add-invoice/added-dialog/added-dialog.component';
import { saleorder, saleInvoiceList } from './saleofferlist';
import { SellofferService } from 'src/app/services/selloffer.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-sale-offer',
  templateUrl: './sale-offer.component.html',
  styleUrls: ['./sale-offer.component.scss']
})


export class SaleOfferComponent implements OnInit {
  saleForm : FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder,private invoiceService: ServiceinvoiceService, private router: Router, public dialog: MatDialog, private _SellofferService:SellofferService) {}
  
  ngOnInit(): void {

    this.saleForm = this.fb.group({
      project_name         : new FormControl('',[Validators.required]),
      unit_number          :  new FormControl('',[Validators.required]),
      selling_price        : new FormControl('',[Validators.required]),
      bedrooms             : new FormControl('',[Validators.required]),
      total_area           : new FormControl('',[Validators.required]),
      built_up_area        : new FormControl('',[Validators.required]),
      payable_now          : new FormControl('',[Validators.required]),
      datePriceArray       : this.fb.array([this.createDatePriceRow()]),
      hand_over            : new FormControl(''),
      vat_rate             : new FormControl('',[Validators.required]),
      payable_to_seller    : new FormControl('',[Validators.required]),
      dld_fee              : new FormControl('',[Validators.required]),
      noc_fee              : new FormControl('',[Validators.required]),
      trustee_fee          : new FormControl('',[Validators.required]),
      property_type        : new FormControl('',[Validators.required]),
    })
  }
  subTotal = 0;
  vat = 0;
  grandTotal = 0;

  createDatePriceRow(): FormGroup {
    return this.fb.group({
      date  : ['', Validators.required],
      price : ['', Validators.required],
      percent: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      // vat_rate : ['', Validators.required],
    });
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        console.log(this.selectedFile);
    }
  }

  get datePriceArray(): FormArray {
    return this.saleForm.get('datePriceArray') as FormArray;
  }

  addDatePriceRow(): void {
    this.datePriceArray.push(this.createDatePriceRow());
  }

  removeDatePriceRow(index: number): void {
    this.datePriceArray.removeAt(index);
  }

  onPriceChange(): any {
    const sellingPrice = this.saleForm.get('selling_price')?.value;
    if(!sellingPrice){
      alert('Please Enter the sale price first');
      return false;
    }
    const payable_now = this.saleForm.get('payable_now')?.value;
    if(!payable_now){
      alert('Please Enter the Payable Price');
      return false;
    }
    const prices   = this.datePriceArray.controls.map(row => row.get('price')?.value);
    const pricesum = prices.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
    const sum      = pricesum +  payable_now;
    const remaing  =  sellingPrice -  sum;
    this.saleForm?.get('hand_over')?.setValue(remaing);
  }

  submitForm(e:Event){
    if(this.saleForm.invalid){
      console.log(this.saleForm.value); 
       console.log('Invalide');
       return  }
    if(this.saleForm.valid){
      const formData = new FormData();
      const filed = this.saleForm.value;
      formData.append('project_name', filed.project_name);
      formData.append('unit_number', filed.unit_number);
      formData.append('selling_price', filed.selling_price);
      formData.append('bedrooms', filed.bedrooms);
      formData.append('total_area', filed.total_area);
      formData.append('built_up_area', filed.built_up_area);
      formData.append('payable_now', filed.payable_now);
      formData.append('hand_over', filed.hand_over);
      formData.append('vat_rate', filed.vat_rate);
      formData.append('payable_to_seller', filed.payable_to_seller);
      formData.append('dld_fee', filed.dld_fee);
      formData.append('noc_fee', filed.noc_fee);
      formData.append('trustee_fee', filed.trustee_fee);
      formData.append('property_type', filed.property_type);

      if(this.selectedFile){
        formData.append('image', this.selectedFile);
      }
      this.datePriceArray.controls.forEach((control, index) => {
        formData.append(`datePriceArray[${index}][price]`, control.get('price')?.value);
        formData.append(`datePriceArray[${index}][date]`, control.get('date')?.value);
        formData.append(`datePriceArray[${index}][percent]`, control.get('percent')?.value);
      });
      this._SellofferService.CreateSaleOffer(formData).subscribe((res:any) => {
        if(res.status === "success"){
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: `Create Sale Offer Successfully`, icon: 'success' });
          this.saleForm.reset();
          this.router.navigate(['/sale/list-sale-offer']);
        }
      })
    }
  }


  optionSelected(event: any){
      
      const selectedOptionName = event;
      
        console.log(selectedOptionName);

  }

  get f(){
    return this.saleForm.controls;
  }

}
