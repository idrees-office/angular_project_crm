export interface Option {
    index   ? : number;
    optname ? :string;
  }
  export class OptionStatus {
    public static optionvalue: Option[] = [
      { 'index': 0, 'optname': 'InActive'},
      { 'index': 1, 'optname': "Active"},
    ]
  }

  export interface LeadsOption {
      lead_status   ? : string | number;
      label         ? : string | number;
      notes         ? : string | number;
    }
    export class LeadStatus {
      public static leads: LeadsOption[] = [
        { 'lead_status' : '1',  'label' : 'A New Leads created by', 'notes': 'From New Lead'},
        { 'lead_status' : '2',  'label' : 'Assigned Leads to', 'notes' : 'From Assigned'},
        { 'lead_status' : '3',  'label' : 'Moved to: Connected', 'notes': 'From Connected'},
        { 'lead_status' : '4',  'label' : 'Moved to: Cold', 'notes': 'From Cold'},
        { 'lead_status' : '5',  'label' : 'Moved to: Warm', 'notes': 'From Warm'},
        { 'lead_status' : '6',  'label' : 'Moved to: Hot Leads', 'notes': 'From Hot'},
        { 'lead_status' : '7',  'label' : 'Moved to: Meeting Schdulede', 'notes': 'From Meeting Schdulede'},
        { 'lead_status' : '8',  'label' : 'Moved to: Meeting Complate', 'notes': 'From Meeting Complate'},
        { 'lead_status' : '9',  'label' : 'Moved to: No Answer', 'notes': 'From No Answer'},
        { 'lead_status' : '10', 'label' : 'Moved to: Low Buget', 'notes': 'From Low Buget'},
        { 'lead_status' : '11', 'label' : 'Moved to: Not Responding AnyMore', 'notes': 'From Not Responding AnyMore'},
        { 'lead_status' : '12', 'label' : 'Moved to: Incorrect Detail', 'notes': 'From Incorrect Detail'},
        { 'lead_status' : '13', 'label' : 'Moved to: Agent', 'notes': 'From Agent '},
        { 'lead_status' : '14', 'label' : 'Moved to: Junk', 'notes': 'From Junk'},
      ]
    }

    export interface LeadsOptionDropdown {
      // [x: string]: any;
      lead_status   ? : any | number;
      label         ? : any | number;
    }
    export class LeadStatusDropdown {
      public static leadsoption: LeadsOption[] = [
        { 'lead_status' : '3',   'label' :  'Connected Lead'},
        { 'lead_status' : '4',   'label' :  'Cold Leads'},
        { 'lead_status' : '5',   'label' :  'Warm Leads',},
        { 'lead_status' : '6',   'label' :  'Hot Leads',},
        { 'lead_status' : '7',   'label' :  'Meeting Schdulede',},
        { 'lead_status' : '8',   'label' :  'Meeting Complate',},
        { 'lead_status' : '9',   'label' :  'No Answer'},
        { 'lead_status' : '10',  'label' :  'Low Buget'},
        { 'lead_status' : '11',  'label' :  'Not Responding AnyMore'},
        { 'lead_status' : '12',  'label' :  'Incorrect Detail'},
        { 'lead_status' : '13',  'label' :  'Agent'},
        { 'lead_status' : '14',  'label' :  'Junk'},
      ]
    }