export interface Option {
    value   ? : number;
    name ? :string;
  }
  export class OptionStatus {
    public static optionvalue: Option[] = [
      { 'value': 0, 'name': 'InActive'},
      { 'value': 1, 'name': "Active"},
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
      lead_status?: any | number;
      label?: any | number;
      role?: string | number;
    }
    export class LeadStatusDropdown {
      public static leadsoption: LeadsOptionDropdown[] = [
        { lead_status: '3', label: 'Connected Lead', role: '' },
        { lead_status: '4', label: 'Cold Leads', role: '' },
        { lead_status: '5', label: 'Warm Leads', role: '' },
        { lead_status: '6', label: 'Hot Leads', role: '' },
        { lead_status: '7', label: 'Meeting Schdulede', role: '' },
        { lead_status: '8', label: 'Meeting Complate', role: '' },
        { lead_status: '9', label: 'No Answer', role: '' },
        { lead_status: '10', label: 'Low Buget', role: '' },
        { lead_status: '11', label: 'Not Responding AnyMore', role: '' },
        { lead_status: '12', label: 'Incorrect Detail', role: '' },
        { lead_status: '13', label: 'Agent', role: '' },
        { lead_status: '14', label: 'Junk', role: '' },
        { lead_status: '2', label: 'Re-Assign', role: '1' },
      ];
    }