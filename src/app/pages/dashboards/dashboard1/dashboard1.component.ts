import { Component, OnInit, TemplateRef } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LeadsService } from 'src/app/services/leads.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { error } from 'console';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LeadStatus, LeadsOption } from 'src/app/core/status';
import { mailboxList } from '../../apps/email/email-data';
import { Category, filter, label, mailbox } from '../../apps/email/listing/categories';
import { mailGlobalVariable, mailService } from '../../apps/email/email.service';
import { Router } from '@angular/router';
import { getUser } from '../../apps/email/user-data';
import { Leadbox, Mailbox } from '../../apps/email/email';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListingDialogDataExampleDialogComponent } from '../../apps/email/listing/listing.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


// components
// import { AppTopCardsComponent } from '../../../components/dashboard1/top-cards/top-cards.component';
// import { AppRevenueUpdatesComponent } from '../../../components/dashboard1/revenue-updates/revenue-updates.component';
// import { AppYearlyBreakupComponent } from '../../../components/dashboard1/yearly-breakup/yearly-breakup.component';
// import { AppMonthlyEarningsComponent } from '../../../components/dashboard1/monthly-earnings/monthly-earnings.component';
// import { AppEmployeeSalaryComponent } from '../../../components/dashboard1/employee-salary/employee-salary.component';
// import { AppCustomersComponent } from '../../../components/dashboard1/customers/customers.component';
// import { AppProductsComponent } from '../../../components/dashboard2/products/products.component';
// import { AppSocialCardComponent } from '../../../components/dashboard1/social-card/social-card.component';
// import { AppSellingProductComponent } from '../../../components/dashboard1/selling-product/selling-product.component';
// import { AppWeeklyStatsComponent } from '../../../components/dashboard1/weekly-stats/weekly-stats.component';
// import { AppTopProjectsComponent } from '../../../components/dashboard1/top-projects/top-projects.component';
// import { AppProjectsComponent } from '../../../components/dashboard1/projects/projects.component';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};


@Component({
  selector: 'app-dashboard1',
  // imports: [
  //   TablerIconsModule,
  //   AppTopCardsComponent,
  //   AppRevenueUpdatesComponent,
  //   AppYearlyBreakupComponent,
  //   AppMonthlyEarningsComponent,
  //   AppEmployeeSalaryComponent,
  //   AppCustomersComponent,
  //   AppProductsComponent,
  //   AppSocialCardComponent,
  //   AppSellingProductComponent,
  //   AppWeeklyStatsComponent,
  //   AppTopProjectsComponent,
  //   AppProjectsComponent
  // ],
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
  newLeadId             : any;
  agentName             : any;
  sidePanelOpened       = true;

  displayMode = 'default';
  p = 1;
  hide:any;

  // firstoption: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  // firstControl = new FormControl('');
  // firstControl = new FormControl();

  constructor(private leadsService:LeadsService,private fb:FormBuilder, private mailService:mailService, public ms: mailGlobalVariable, private router:Router,public dialog: MatDialog) {  }

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);
  mailboxes : Category[]    = mailbox;
  filters   : Category[]    = filter;
  labels    : Category[]    = label;
  selectedIndex : string;

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }
  
  async ngOnInit(): Promise<void> {
    this.updateleadform = this.fb.group({
      lead_status  : new FormControl('', [Validators.required]),
      lead_id      : new FormControl(''),
      lead_comment : new FormControl('',[Validators.required]),
    });

    this.leadoptions = LeadStatus.leads;

    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.role = this.user.client_user_role;
    const id = this.user.client_user_id;

    if (this.role == 1) {
      if (this.ms.type == '' || this.ms.type === '') {
          await this.mailboxesChanged('New Lead');
      } else {
          await this.mailboxesChanged('New Lead');
      }
  } else if (this.role == 2) {
   
    if (this.ms.type == '' || this.ms.type === '') {
      await this.mailboxesChanged('Assigned Lead');
  } else {
      await this.mailboxesChanged('Assigned Lead');
  }
    this.Newleads = 0;
  }
  
  }

  displayLeadLabel(lead: any): string {
    return lead ? lead.label : '';
  }
  
  updateLeadStatus(event: MatAutocompleteSelectedEvent): void {
    const selectedLead: any = event.option.value;
    this.leadInfo = selectedLead;
  }


  async loadAllLeads() {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.role = this.user.client_user_role;
    const agent_id = this.user.client_user_id;
    // id, this.role
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
      // leadsstatus.forEach(status => {
      //   switch (status) {
      //      case 1:
      //       this.Newleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //       break;
      //      case 2:
      //       this.Assignleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //       break;
      //       case 3:
      //         this.Connectedleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 4:
      //         this.Coldleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 5:
      //         this.Warmleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 6:
      //         this.Hotleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 7:
      //         this.MeetingSchduledeleads.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 8:
      //         this.MeetingComplate.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 9:
      //         this.NoAnswer.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 10:
      //       this.LowBuget.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 11:
      //       this.NotResponding.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 12:
      //       this.IncorrectDetail.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 13:
      //       this.Agent.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //      case 14:
      //       this.Junk.push(...this.allLeads.filter(lead => lead.lead_status == status));
      //      break;
      //   }
      // });
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


  // getLead() {
  //   this.leadsService.getallleadsdata().subscribe(
  //     (res: any) => {
  //       if (res && res.length > 0) { 
  //         this.allLeads = res;
  //       } else {
  //         console.log('Could Not find Any User');
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching agent name:', error);
  //       console.log('An error occurred while fetching agent name');
  //     }
  //   );
  // }

  getAgentName(id: any) {
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


  // sendButtonClick(): void {
  //   this.ms.replyShow = false;
  // }
  removeClass(): void {
    this.ms.addClass = false;
  }

  async mailboxesChanged(type: any): Promise<void> {
    if (this.role == 2 && type === 'New Lead') {
      // Do nothing or show a message indicating that the user cannot access this option
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
          
        // this.router.navigate(['dashboards/dashboard1/new-leads']);
        break;
      case 'Assigned Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Assignleads;
        this.ms.topLable = 'Assigned';
        this.mailActiveClass(type);
        this.ms.type = 'assignedleads';
       this.zeroforNewLead()
        // this.router.navigate(['dashboards/dashboard1/assigned-leads']);
        break;
      case 'Connected Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Connectedleads;
        this.ms.topLable = 'Connected';
        this.mailActiveClass(type);
        this.ms.type = 'connectedleads';
        this.zeroforNewLead()
        // this.router.navigate(['dashboards/dashboard1/connected-leads']);
        break;
      case 'Cold Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Coldleads;
        this.ms.topLable = 'Cold';
        this.mailActiveClass(type);
        this.ms.type = 'connectedleads';
        this.zeroforNewLead()
        // this.router.navigate(['dashboards/dashboard1/connected-leads']);
        break;
      case 'Warm Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Warmleads;
        this.ms.topLable = 'Warm';
        this.mailActiveClass(type);
        this.ms.type = 'warmleads';
        this.zeroforNewLead()
        // this.router.navigate(['dashboards/dashboard1/warm-leads']);
        break;
      case 'Hot Lead':
        this.ms.selectedLead = null;
        this.ms.leadList = this.Hotleads;
        this.ms.topLable = 'Hot';
        this.mailActiveClass(type);
        this.ms.type = 'hotleads';
        this.zeroforNewLead()
        // this.router.navigate(['dashboards/dashboard1/hot-leads']);
        break;
      case 'Meeting Schdulede':
        this.ms.selectedLead = null;
          this.ms.leadList = this.MeetingSchduledeleads;
          this.ms.topLable = 'Meeting Schdulede';
          this.mailActiveClass(type);
          this.ms.type = 'meetingschdulede';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/meeting-schdulede']);
        break;
      case 'Meeting Complate':
        this.ms.selectedLead = null;
          this.ms.leadList = this.MeetingSchduledeleads;
          this.ms.topLable = 'Meeting Complate';
          this.mailActiveClass(type);
          this.ms.type = 'meetingschdulede';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/meeting-schdulede']);
        break;
      case 'Low-Buget':
          this.ms.selectedLead = null;
          this.ms.leadList = this.LowBuget;
          this.ms.topLable = 'Low-Buget';
          this.mailActiveClass(type);
          this.ms.type = 'lowbuget';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/low-buget']);
        break;
      case 'No-Answer':
        this.ms.selectedLead = null;
          this.ms.leadList = this.NoAnswer;
          this.ms.topLable = 'No-Answer';
          this.mailActiveClass(type);
          this.ms.type = 'noanswer';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/no-answer']);
        break;
      case 'Not-Responding':
        this.ms.selectedLead = null;
          this.ms.leadList = this.NotResponding;
          this.ms.topLable = 'Not-Responding';
          this.mailActiveClass(type);
          this.ms.type = 'notresponding';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/not-responding']);
        break;  
      case 'Incorrect Detail':
        this.ms.selectedLead = null;
          this.ms.leadList = this.IncorrectDetail;
          this.ms.topLable = 'Incorrect Detail';
          this.mailActiveClass(type);
          this.ms.type = 'incorrectdetail';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/incorrect-detail']);
        break;
      case 'Agent':
          this.ms.selectedLead = null;
          this.ms.leadList = this.Agent;
          this.ms.topLable = 'Agent';
          this.mailActiveClass(type);
          this.ms.type = 'agent';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/agent']);
        break;
      case 'Junk':
        this.ms.selectedLead = null;
          this.ms.leadList = this.Junk;
          this.ms.topLable = 'Junk';
          this.mailActiveClass(type);
          this.ms.type = 'junk';
          this.zeroforNewLead()
          // this.router.navigate(['dashboards/dashboard1/junk']);
        break;
      default:
        // Handle the default case if necessary
        break;
    }
  }
  mailActiveClass(type: string): void {
    for (const fil of filter) {
      fil.active = false;
    }
    for (const lab of label) {
      lab.active = false;
    }
    for (const mail of mailbox) {
      mail.active = false;
    }
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



  async updateLeadStaus(event: Event): Promise<void> {
    event.preventDefault();
    if (this.updateleadform.valid) {
        const filed = this.updateleadform.value;
        var fd = new FormData();
        fd.append('lead_status', filed.lead_status.lead_status)
        fd.append('lead_id', filed.lead_id)
        fd.append('lead_comment', filed.lead_comment)

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
                const leadTypes: { [key: string]: string } = {    // Reload again
                  'newleads': 'New Lead',
                  'assignedleads': 'Assigned Lead',
                  'connectedleads': 'Connected Lead',
                  'coldleads': 'Cold Lead',
                  'warmleads': 'Warm Lead',
                  'hotleads': 'Hot Lead',
                  'meetingschdulede' : 'Meeting Schdulede ',
                  'meetingcomplate'  : 'Meeting Complate',
                  'lowbuget' : 'Low-Buget',
                  'noanswer' : 'No-Answer',
                  'notresponding' : 'Not-Responding',
                  'incorrectdetail' : 'Incorrect Detail',
                  'agent' : 'Agent',
                  'junk'  : 'Junk',
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

// loadDataAfterUpdate(){
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
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${amPm}`;
}

private isSameDate(date1: Date, date2: Date): boolean {
  return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
}

  get f(){ return this.updateleadform.controls; }

  
}




























