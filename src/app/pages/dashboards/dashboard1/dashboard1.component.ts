import { Component, OnInit, TemplateRef } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LeadsService } from 'src/app/services/leads.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { error } from 'console';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LeadStatus, LeadsOption, LeadStatusDropdown, LeadsOptionDropdown } from 'src/app/core/status';
import { mailboxList } from '../../apps/email/email-data';
import { Category, filter, label, mailbox } from '../../apps/email/listing/categories';
import { mailGlobalVariable, mailService } from '../../apps/email/email.service';
import { Router } from '@angular/router';
import { getUser } from '../../apps/email/user-data';
import { Leadbox, Mailbox } from '../../apps/email/email';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListingDialogDataExampleDialogComponent } from '../../apps/email/listing/listing.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Location } from '@angular/common';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { format, isToday, isYesterday } from 'date-fns';


export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Sunil Joshi',
    position: 'Web Designer',
    productName: 'Elite Admin',
    budget: 3.9,
    priority: 'low'
  },
]


@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss'],

})

export class AppDashboard1Component implements OnInit {
  allLeads              : any[] = [];
  filteredLeads         : any[] = [];
  Newleads              : any;
  Assignleads           : any;
  Connectedleads        : any;
  Coldleads             : any;
  Warmleads             : any;
  Hotleads              : any;
  MeetingSchduledeleads : any;
  MeetingComplate       : any;
  NoAnswer              : any;
  LowBuget              : any;
  NotResponding         : any;
  IncorrectDetail       : any;
  Agent                 : any;
  Junk                  : any;
  userData              : any;
  user                  : any;
  role                  : any;
  loginUserId           : any
  sidebarVisible        = false;
  allAgents             : any;
  isNextDisabled        : any;
  ResponsibleUser       : any;  
  previousIndex         : any;
  nextIndex             : any;
  lastActiveAgent       : any;
  leadInfo              : any = {};
  updateleadform        : FormGroup;
  leadoptions           : LeadsOption[] = [];
  leadoptions2          : LeadsOptionDropdown[] = [];
  newLeadId             : any;
  agentName             : any;
  sidePanelOpened       = true;
  displayMode           = 'default';
  p                     = 1;
  hide                  : any;
  currentselectdstatus  : any; 
  stateCtrl         = new FormControl('');
  filteredStates: Observable<LeadsOptionDropdown[]>;
  itemsPerPage: number = 12;

  constructor(private leadsService:LeadsService,private fb:FormBuilder, private mailService:mailService, public ms: mailGlobalVariable, private router:Router,public dialog: MatDialog, private _Location :Location) { 

    this.filteredStates = this.stateCtrl.valueChanges.pipe(startWith(''), map((state) => (state ? this._filterStates(state) : this.leadoptions2.slice())));

   }

   private _filterStates(value: string): LeadsOption[] {
    const filterValue = value.toLowerCase();

    return this.leadoptions2.filter((leadoptions2) =>
    leadoptions2.label.toLowerCase().includes(filterValue)
    );
  }
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);
  mailboxes     : Category[]    = mailbox;
  filters       : Category[]    = filter;
  labels        : Category[]    = label;
  selectedIndex : string;

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }
  
  async ngOnInit(): Promise<void> {

      // console.log(this.leadoptions2);

    this.updateleadform = this.fb.group({
      lead_status  : new FormControl('', [Validators.required]),
      lead_id      : new FormControl(''),
      lead_comment : new FormControl('',[Validators.required]),
    });

    this.leadoptions  = LeadStatus.leads;
    this.leadoptions2 = LeadStatusDropdown.leadsoption;
    this.userData     = localStorage.getItem('userData');
    this.user         = JSON.parse(this.userData);
    this.role         = this.user.client_user_role;
    this.loginUserId  = this.user.client_user_id;
  if (this.role == 1) {
      if (this.ms.type == '' || this.ms.type === '') {
          await this.mailboxesChanged('Assigned Lead');
      } else {
          await this.mailboxesChanged('Assigned Lead');
      }
  } else if (this.role == 2) {
    if (this.ms.type == '' || this.ms.type === '') {
      await this.mailboxesChanged('Assigned Lead');
  } else {
      await this.mailboxesChanged('Assigned Lead');
  }
    this.Newleads = 0;  
  }
  
  // this._WebsocketService.connect().subscribe(
  //   (message) => {
  //     // Handle incoming messages
  //     console.log(message);
  //   },
  //   (error) => {
  //     // Handle errors
  //   },
  //   () => {
  //     // Handle WebSocket close
  //   }
  // );
  
 }

  //  private _filter(value: any): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.firstoption.filter((option) => option.toLowerCase().includes(filterValue));
  // }
  // updateLeadStatus(event: MatAutocompleteSelectedEvent): void {
  //   const selectedLead: any = event.option.value;
  //   this.leadInfo = selectedLead;
  // }

  async loadAllLeads() {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.role = this.user.client_user_role;
    const agent_id = this.user.client_user_id;
    try {
      const res: any = await this.leadsService.GetAgentAndAdminWiseLeads().toPromise();
      this.allLeads       = res;
      this.Newleads       = [];
      this.Assignleads    = [];
      this.Connectedleads = [];
      this.Coldleads      = [];
      this.Warmleads      = [];
      this.Hotleads       = [];
      this.MeetingSchduledeleads = [];
      this.MeetingComplate = [];
      this.NoAnswer        = [];
      this.LowBuget        = [];
      this.NotResponding   = [];  
      this.IncorrectDetail = [];
      this.Agent           = [];
      this.Junk            = [];
      var leadsstatus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      if (this.role == 2) {
        leadsstatus.forEach((leadStatus) => {
          this.fetchLeadsForAgent(leadStatus, agent_id);
        });
      } else {
        leadsstatus.forEach((leadStatus) => {
          this.filterLeads(leadStatus);
        });
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  }

  fetchLeadsForAgent(leadStatus: number,agent_id: any){
    if (agent_id) {
      if (leadStatus === 1) {
        this.Newleads = this.allLeads.filter((lead) => lead.lead_status == 1 && lead.agent_id == agent_id);
      } else if (leadStatus === 2) {
        this.Assignleads = this.allLeads.filter((lead) => lead.lead_status == 2 && lead.agent_id == agent_id);
      } else if (leadStatus === 3) {
        this.Connectedleads = this.allLeads.filter((lead) => lead.lead_status == 3 && lead.agent_id == agent_id);
      } else if (leadStatus === 4) {
        this.Coldleads = this.allLeads.filter((lead) => lead.lead_status == 4 && lead.agent_id == agent_id);
      } else if (leadStatus === 5) {
        this.Warmleads = this.allLeads.filter((lead) => lead.lead_status == 5 && lead.agent_id == agent_id);
      } else if (leadStatus === 6) {
        this.Hotleads = this.allLeads.filter((lead) => lead.lead_status == 6 && lead.agent_id == agent_id);
      } else if (leadStatus === 7) {
        this.MeetingSchduledeleads = this.allLeads.filter((lead) => lead.lead_status == 7 && lead.agent_id == agent_id);
      } else if (leadStatus === 8) {
        this.MeetingComplate = this.allLeads.filter((lead) => lead.lead_status == 8 && lead.agent_id == agent_id);
      } else if (leadStatus === 9) {
        this.NoAnswer = this.allLeads.filter((lead) => lead.lead_status == 9 && lead.agent_id == agent_id);
      } else if (leadStatus === 10) {
        this.LowBuget = this.allLeads.filter((lead) => lead.lead_status == 10 && lead.agent_id == agent_id);
      } else if (leadStatus === 11) {
        this.NotResponding = this.allLeads.filter((lead) => lead.lead_status == 11 && lead.agent_id == agent_id);
      } else if (leadStatus === 12) {
        this.IncorrectDetail = this.allLeads.filter((lead) => lead.lead_status == 12 && lead.agent_id == agent_id);
      } else if (leadStatus === 13) {
        this.Agent = this.allLeads.filter((lead) => lead.lead_status == 13 && lead.agent_id == agent_id);
      } else if (leadStatus === 14) {
        this.Junk = this.allLeads.filter((lead) => lead.lead_status == 14 && lead.agent_id == agent_id);
      } 
    }
  }
  
  filterLeads(leadStatus: number) {
    if (leadStatus === 1) {
      this.Newleads = this.allLeads.filter((lead) => lead.lead_status == 1);
    } else if (leadStatus === 2) {
      this.Assignleads = this.allLeads.filter((lead) => lead.lead_status == 2);
    }else if (leadStatus === 3) {
      this.Connectedleads = this.allLeads.filter((lead) => lead.lead_status == 3);
    }else if (leadStatus === 4) {
      this.Coldleads = this.allLeads.filter((lead) => lead.lead_status == 4);
    }else if (leadStatus === 5) {
      this.Warmleads = this.allLeads.filter((lead) => lead.lead_status == 5);
    }else if (leadStatus === 6) {
      this.Hotleads = this.allLeads.filter((lead) => lead.lead_status == 6);
    }else if (leadStatus === 7) {
      this.MeetingSchduledeleads = this.allLeads.filter((lead) => lead.lead_status == 7);
    }else if (leadStatus === 8) {
      this.MeetingComplate = this.allLeads.filter((lead) => lead.lead_status == 8);
    }else if (leadStatus === 9) {
      this.NoAnswer = this.allLeads.filter((lead) => lead.lead_status == 9);
    }else if (leadStatus === 10) {
      this.LowBuget = this.allLeads.filter((lead) => lead.lead_status == 10);
    }else if (leadStatus === 11) {
      this.NotResponding = this.allLeads.filter((lead) => lead.lead_status == 11);
    }else if (leadStatus === 12) {
      this.IncorrectDetail = this.allLeads.filter((lead) => lead.lead_status == 12);
    }else if (leadStatus === 13) {
      this.Agent = this.allLeads.filter((lead) => lead.lead_status == 13);
    }else if (leadStatus === 14) {
      this.Junk = this.allLeads.filter((lead) => lead.lead_status == 14);
    }
  }

  leadUser(data: any): boolean {
    var indexofArray = data[2];
    var leadInfoArry = data[0];
    var currecntRecord = data[1];
    if(currecntRecord.user_id == null && indexofArray > 0){
      return false;
    }  
    return true;
  }

  getAgentName(id: any){
    this.leadsService.AgentNameById(id).subscribe(
      (res: any) => {
        if (res && res.length > 0) { 
          this.agentName = res[0].client_user_name;
        } else {
          console.log('Could Not find Any User');
        }
      },
      (error) => {
        console.error('Error fetching agent name:', error);
        console.log('An error occurred while fetching agent name');
      }
    );
  }




  previousPage() {
    if (this.p > 1) {
      this.p--;
    }
  }
  
  nextPage() {
    if (this.p < this.getTotalPages()) {
      this.p++;
    }
  }
  
  goToPage(pageNumber: number) {
    this.p = pageNumber;
  }
  
  getTotalPages(): number {
    return Math.ceil(this.ms.leadList.length / this.itemsPerPage);
  }
  
  // getPageNumbers(): number[] {
  //   const totalPages = this.getTotalPages();
  //   return Array.from({ length: totalPages }, (_, i) => i + 1);
  // }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const currentPage = this.p;
    const maxVisiblePages = 3; // Set the maximum number of visible page buttons
    let startPage: number;
    let endPage: number;
  
    if (totalPages <= maxVisiblePages) {
      // If total pages are less than or equal to maxVisiblePages, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages to display
      const middlePage = Math.floor(maxVisiblePages / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage   + middlePage >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage   = totalPages;
      } else {
        startPage = currentPage - middlePage;
        endPage   = currentPage + middlePage;
      }
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
  











  mailSelected(lead: Leadbox): void {
    this.ms.selectedLead = null;
    this.ms.selectedLead = lead;
    this.selectedIndex = lead.lead_id;
    this.ms.selectedLead.seen = true;
    lead.seen = true;
    this.ms.addClass = true;
    this.leadInfo = lead;
  }

  zeroforNewLead(){
    if(this.role == 2){
      this.Newleads = 0;
    }else{

    }
  }

  removeClass(): void {
    this.ms.addClass = false;
  }
  
  async mailboxesChanged(type: any): Promise<void> {
    if (this.role == 2 && type === 'New Lead') {
      Swal.fire({ title: 'Sorry', html: 'You do not have permission to access New leads', timer: 2000, showConfirmButton: false,})
      return;
    }
    await this.loadAllLeads();
    switch (type) {
      case 'New Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Newleads;
        this.ms.topLable = 'New Lead';
        this.mailActiveClass(type);
        this.ms.type = 'newleads';
        break;
      case 'Assigned Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Assignleads;
        this.ms.topLable = 'Assigned';
        this.mailActiveClass(type);
        this.ms.type = 'assignedleads';
       this.zeroforNewLead()
        break;
      case 'Connected Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Connectedleads;
        this.ms.topLable = 'Connected';
        this.mailActiveClass(type);
        this.ms.type = 'connectedleads';
        this.zeroforNewLead()
        break;
      case 'Cold Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Coldleads;
        this.ms.topLable = 'Cold';
        this.mailActiveClass(type);
        this.ms.type = 'connectedleads';
        this.zeroforNewLead()
        break;
      case 'Warm Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Warmleads;
        this.ms.topLable = 'Warm';
        this.mailActiveClass(type);
        this.ms.type = 'warmleads';
        this.zeroforNewLead()
        break;
      case 'Hot Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Hotleads;
        this.ms.topLable = 'Hot';
        this.mailActiveClass(type);
        this.ms.type = 'hotleads';
        this.zeroforNewLead()
        break;
      case 'Meeting Schdulede':
        this.ms.selectedLead = null;
          this.ms.leadList = this.MeetingSchduledeleads;
          this.ms.topLable = 'Meeting Schdulede';
          this.mailActiveClass(type);
          this.ms.type = 'meetingschdulede';
          this.zeroforNewLead()
        break;
      case 'Meeting Complate':
        this.ms.selectedLead = null;
          this.ms.leadList = this.MeetingComplate;
          this.ms.topLable = 'Meeting Complate';
          this.mailActiveClass(type);
          this.ms.type = 'meetingschdulede';
          this.zeroforNewLead()
        break;
        case 'No-Answer':
          this.ms.selectedLead = null;
            this.ms.leadList = this.NoAnswer;
            this.ms.topLable = 'No-Answer';
            this.mailActiveClass(type);
            this.ms.type = 'noanswer';
            this.zeroforNewLead()
          break;
        case 'Low-Buget':
            this.ms.selectedLead = null;
            this.ms.leadList = this.LowBuget;
            this.ms.topLable = 'Low-Buget';
            this.mailActiveClass(type);
            this.ms.type = 'lowbuget';
            this.zeroforNewLead()
          break;
      case 'Not-Responding':
        this.ms.selectedLead = null;
          this.ms.leadList = this.NotResponding;
          this.ms.topLable = 'Not-Responding';
          this.mailActiveClass(type);
          this.ms.type = 'notresponding';
          this.zeroforNewLead()
        break;  
      case 'Incorrect Detail':
        this.ms.selectedLead = null;
          this.ms.leadList = this.IncorrectDetail;
          this.ms.topLable = 'Incorrect Detail';
          this.mailActiveClass(type);
          this.ms.type = 'incorrectdetail';
          this.zeroforNewLead()
        break;
      case 'Agent':
          this.ms.selectedLead = null;
          this.ms.leadList = this.Agent;
          this.ms.topLable = 'Agent';
          this.mailActiveClass(type);
          this.ms.type = 'agent';
          this.zeroforNewLead()
        break;
      case 'Junk':
        this.ms.selectedLead = null;
          this.ms.leadList = this.Junk;
          this.ms.topLable = 'Junk';
          this.mailActiveClass(type);
          this.ms.type = 'junk';
          this.zeroforNewLead()
        break;
      default:
        // Handle the default case if necessary
        break;
    }
  }
  mailActiveClass(type: string): void {
    for (const fil of filter) { fil.active = false; }
    for (const lab of label) {
      lab.active = false;
    }
    for (const mail of mailbox) { mail.active = false; }
    mailbox.find((m) => m.name === type)!.active = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ListingDialogDataExampleDialogComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // displayLeadLabel(status: any): string {
  //   return status ? status.label : '';
  // }


  onOptionSelected(e: MatAutocompleteSelectedEvent){
    this.currentselectdstatus = e.option.value;
    // console.log(this.currentselectdstatus);
    }

    displayLeadLabel(status: any): string {
      return status ? status.label : '';
    }

  async updateLeadStaus(event: Event, agent_id:any): Promise<void> {
    event.preventDefault();
    console.log(this.updateleadform.value);
    if (this.updateleadform.valid){
        const filed = this.updateleadform.value;
        var fd = new FormData();
        fd.append('lead_status', filed.lead_status.lead_status)
        fd.append('lead_id', filed.lead_id)
        fd.append('lead_comment', filed.lead_comment)
        fd.append('agent_id', agent_id);
        if(this.role == 1){
          fd.append('user_id', this.loginUserId);
        }else{
          fd.append('user_id', '');
        }
        this.leadsService.UpdateSingLead(fd).subscribe(async (res: any) => {
            if (res.status === "success") {
                Swal.fire({
                    title: 'Success',
                    html: 'Lead Update Successfully',
                    timer: 2000,
                    showConfirmButton: false,
                });
                this.updateleadform.reset();
                this.ms.selectedLead = null;  // Hide
                const leadTypes: { [key: string]: string } = {    
                  'newleads'         : 'New Lead',
                  'assignedleads'    : 'Assigned Lead',
                  'connectedleads'   : 'Connected Lead',
                  'coldleads'        : 'Cold Lead',
                  'warmleads'        : 'Warm Lead',
                  'hotleads'         : 'Hot Lead',
                  'meetingschdulede' : 'Meeting Schdulede ',
                  'meetingcomplate'  : 'Meeting Complate',
                  'lowbuget'         : 'Low-Buget',
                  'noanswer'         : 'No-Answer',
                  'notresponding'    : 'Not-Responding',
                  'incorrectdetail'  : 'Incorrect Detail',
                  'agent'            : 'Agent',
                  'junk'             : 'Junk',
                };
                const leadType = this.ms.type;
                if (leadTypes.hasOwnProperty(leadType)) {
                  await this.mailboxesChanged(leadTypes[leadType]);
                }
            }
        }, (error: any) => {
            console.log(error);
        });
    }
}


displayedColumns1: string[] = ['Name/Position', 'Mobile', 'Whatsapp', 'Email', 'Responsible'];
dataSource1 = PRODUCT_DATA;


  

// formatDateOrToday(value: Date): any {
//   console.log(value);
//   const currentDate = new Date();
//   console.log(currentDate);
//   // if (isToday(value)) {
//   //   return `Today ${this.formatTime12Hour(value)}`;
//   // } else if (isYesterday(value)) {
//   //   return `Yesterday ${this.formatTime12Hour(value)}`;
//   // } else {
//   //   return format(value, 'PP') + ' ' + this.formatTime12Hour(value);
//   // }
// }

formatDateOrToday(value: Date): any {
  const currentDate = new Date();
  const date = new Date(value);
  if (this.isSameDate(date, currentDate)) {
    return `Today ${this.formatTime12Hour(date)}`;
  }
  const yesterday = new Date(currentDate);
  yesterday.setDate(currentDate.getDate() - 1);
  if (this.isSameDate(date, yesterday)) {
    return `Yesterday ${this.formatTime12Hour(date)}`;
  }
  return new DatePipe('en-US').transform(date, 'short');
}


private formatTime12Hour(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}


// private formatTime12Hour(date: Date): string {
//   const hours = date.getHours() % 12 || 12;
//   const minutes = date.getMinutes().toString().padStart(2, '0');
//   const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
//   return `${hours}:${minutes} ${amPm}`;
// }

private isSameDate(date1: Date, date2: Date): boolean {
  return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
}





get f(){ return this.updateleadform.controls; }

  
}




























