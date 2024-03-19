export interface Category {
  id     : number;
  name   : string;
  icon   : string;
  count  : number;
  color? : string;
  active : boolean;
}

export const mailbox = [

  // {
  //   id: 1,
  //   name: 'New Lead',
  //   icon: 'mail',
  //   count: 0,
  //   active: true,
  // },

  {
    id: 2,
    name: 'Assigned Lead',
    icon: 'send',
    count: 0,
    active: false,
  },
  {
    id: 3,
    name: 'Connected Lead',
    icon: 'note',
    count: 0,
    active: false,
  },
  {
    id: 4,
    name: 'Cold Lead',
    icon: 'flag',
    count: 0,
    active: false,
  },
  {
    id: 5,
    name: 'Warm Lead',
    icon: 'star',
    count: 0,
    active: false,
  },

  {
    id: 6,
    name: 'Hot Lead',
    icon: 'star',
    count: 0,
    active: false,
  },


  {
    id: 7,
    name: 'Meeting Schdulede',
    icon: 'info-circle',
    count: 0,
    active: false,
  },

  {
    id: 8,
    name: 'Meeting Complate',
    icon: 'folder',
    count: 0,
    active: false,
  },

  {
    id: 9,
    name: 'No-Answer',
    icon: 'info-circle',
    count: 0,
    active: false,
  },

  {
    id: 10,
    name: 'Low-Buget',
    icon: 'info-circle',
    count: 0,
    active: false,
  },

  { 
    id: 11,
    name: 'Not-Responding-Any-More',
    icon: 'info-circle',
    count: 0,
    active: false,
  },


  {
    id: 12,
    name: 'Incorrect Detail',
    icon: 'info-circle',
    count: 0,
    active: false,
  },

  {
    id: 13,
    name: 'Agent',
    icon: 'info-circle',
    count: 0,
    active: false,
  },

  {
    id: 14,
    name: 'Junk',
    icon: 'trash',
    count: 0,
    active: false,
  },




  // {
  //   id: 7,
  //   name: 'Trash',
  //   icon: 'trash',
  //   count: 0,
  //   active: false,
  // },

 

];

export const filter = [
  {
    id: 501,
    name: 'Star',
    icon: 'star',
    count: 0,
    active: false,
  },
  {
    id: 502,
    name: 'Important',
    icon: 'info-circle',
    count: 0,
    active: false,
  },
];

export const label: Category[] = [
  {
    id: 701,
    name: 'Personal',
    icon: 'folder',
    count: 0,
    color: '#5D87FF',
    active: false,
  },
  {
    id: 702,
    name: 'Work',
    icon: 'folder',
    count: 0,
    color: '#49BEFF',
    active: false,
  },
  {
    id: 703,
    name: 'Payments',
    icon: 'folder',
    count: 0,
    color: '#FA896B',
    active: false,
  },
  {
    id: 704,
    name: 'Accounts',
    icon: 'folder',
    count: 0,
    color: '#FFAE1F',
    active: false,
  },
];
