export interface Option {
    index?: number;
    optname?:string;
  }
  
  export class OptionStatus {
    public static optionvalue: Option[] = [
      { 'index': 0, 'optname': 'InActive'},
      { 'index': 1, 'optname': "Active"},
    ]
  }
  
  
  export interface LeadsOption {
      lead_status   ? : string | number;
      label ? : string| number;
      // backgroundColor: any;
    }
    export class LeadStatus {
      public static leads: LeadsOption[] = [
        // { 'lead_status' : '1', 'label' :  'New Leads'},
        { 'lead_status' : '2', 'label' :  'Assigned Leads'},
        { 'lead_status' : '3', 'label' :  'Connected Leads'},
        { 'lead_status' : '4', 'label' :  'Cold Leads'},
        { 'lead_status' : '5', 'label' :  'Warm Leads'},
        { 'lead_status' : '6', 'label' :  'Hot Leads'},
        { 'lead_status' : '7', 'label' :  'Meeting Schdulede'},
        { 'lead_status' : '8', 'label' :  'Meeting Complate'},
        { 'lead_status' : '9', 'label' :  'No Answer'},
        { 'lead_status' : '10', 'label' : 'Low Buget'},
        { 'lead_status' : '11', 'label' : 'Not Responding AnyMore'},
        { 'lead_status' : '12', 'label' : 'Incorrect Detail'},
        { 'lead_status' : '13', 'label' : 'Agent'},
        { 'lead_status' : '14', 'label' : 'Junk'},
      ]
    }