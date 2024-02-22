export class saleorder {
    constructor(
      public itemName: string = '',
      public unitPrice: number = 0,
      // public units: number = 0,
      // public unitTotalPrice: number = 0,
    ) {}
  }
  
  export class saleInvoiceList {
    constructor(
      public id: number = 0,
      public project_name: any = '',
      public selling_price: any = '',
      public bedrooms : any= '',
      public total_area: any = '',
      public built_up_area : any = '',
      public payable_now : any = '',
      public orders: saleorder[] = [],
      public orderDate: Date = new Date(),
      public totalCost: number = 0,
      public vat: number = 0,
      public grandTotal: number = 0,
      public status: string = '',
      public completed: boolean = false,
      public isSelected: boolean = false,
    ) {}
  }
  