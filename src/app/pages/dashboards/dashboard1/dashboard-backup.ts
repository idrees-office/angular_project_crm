import { Component, OnInit, TemplateRef } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { LeadsService } from 'src/app/services/leads.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { error } from 'console';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LeadStatus, LeadsOption } from 'src/app/core/status';

import { mailboxList } from '../../apps/email/email-data';
import { Category, filter, label, mailbox } from '../../apps/email/listing/categories';
import { mailGlobalVariable, mailService } from '../../apps/email/email.service';
import { Router } from '@angular/router';
import { getUser } from '../../apps/email/user-data';
import { Mailbox } from '../../apps/email/email';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListingDialogDataExampleDialogComponent } from '../../apps/email/listing/listing.component';


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
previousPage() {
throw new Error('Method not implemented.');
}
  allLeads              : any[] = [];
  filteredLeads         : any[] = [];
  Newleads              : any[] = [];
  Assignleads           : any[] = [];
  Connectedleads        : any[] = [];
  Coldleads             : any[] = [];
  Warmleads             : any[] = [];
  Hotleads              : any[] = [];
  MeetingSchduledeleads : any[] = [];
  MeetingComplate       : any[] = [];
  NoAnswer              : any[] = [];
  LowBuget              : any[] = [];
  NotResponding         : any[] = [];
  IncorrectDetail       : any[] = [];
  Agent                 : any[] = [];
  Junk                  : any[] = [];
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

  constructor(private leadsService:LeadsService,private fb:FormBuilder, private mailService:mailService, public ms: mailGlobalVariable, private router:Router,public dialog: MatDialog) { 
  }

  

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);
  mailboxes: Category[]    = mailbox;
  
  filters  : Category[]    = filter;
  labels   : Category[]    = label;
  selectedIndex:string;

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  ngOnInit(): void {
    
    this.updateleadform = this.fb.group({
      lead_status  : new FormControl(''),
      lead_id      : new FormControl(''),
      lead_comment : new FormControl('',[Validators.required]),
    });
     this.updateleadform.valueChanges.subscribe((v) => {
       this.isNextDisabled = !this.updateleadform.valid;
     });
    this.leadoptions = LeadStatus.leads;
    // this.getLead();




    this.ms.inboxList = this.mailService.getInbox();
    this.ms.sentList = this.mailService.getSent();
    this.ms.draftList = this.mailService.getDraft();
    this.ms.spamList = this.mailService.getSpam();
    this.ms.trashList = this.mailService.getTrash();
    this.ms.mailList = this.ms.inboxList;
    this.ms.collectionSize = this.ms.mailList.length;

    for (const mail of this.ms.inboxList) {
      const User = getUser(mail.fromId);
      if (User !== null) {
        this.ms.users.push(User);
      }
    }

    this.ms.topLable = 'All New Leads';
    this.ms.global();



    this.hasPermission();


  }


//   getLead(){
//     this.leadsService.getallleadsdata().subscribe((res:any)=>{
//       this.allLeads = res;
//       this.allLeads.forEach((element:any) => {
//           this.getAgentName(element.agent_id);
//       });
//       // this.hasPermission();
//     })
//   }

//   getAgentName(id: any) {
//     this.leadsService.AgentNameById(id).subscribe(
//       (res: any) => {
//         if (res && res.length > 0) { 
//           this.agentName = res[0].client_user_name;
//         } else {
//           console.log('Could Not find Any User');
//         }
//       },
//       (error) => {
//         console.error('Error fetching agent name:', error);
//         console.log('An error occurred while fetching agent name');
//       }
//     );
//   }
//   // Get lead Agents wise and admin wise
  async hasPermission() {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    const agent_id = this.user.client_user_id;
    this.role = this.user.client_user_role;
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

//   formatDateOrToday(value: Date): any {
//     const currentDate = new Date();
//     const date = new Date(value);
//     if (this.isSameDate(date, currentDate)) {
//       return `Today ${this.formatTime12Hour(date)}`;
//     }
//     const yesterday = new Date(currentDate);
//     yesterday.setDate(currentDate.getDate() - 1);
//     if (this.isSameDate(date, yesterday)) {
//       return `Yesterday ${this.formatTime12Hour(date)}`;
//     }
//     return new DatePipe('en-US').transform(date, 'short');
//   }

//   private formatTime12Hour(date: Date): string {
//     const hours = date.getHours() % 12 || 12;
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
//     return `${hours}:${minutes} ${amPm}`;
//   }
//   private isSameDate(date1: Date, date2: Date): boolean {
//     return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
//   }
  
//   hideDetials(event:Event){    
//     this.sidebarVisible = false;
//     this.updateleadform.reset();
//   }
//   selectedAgent       :any;
//   assignLeadAgentName :any;
//   assignLeadAgenId    :any;
//   SelectAgent(event: Event) {
//     const typedEvent = event as any;
//     if (typedEvent.client_user_name) {
//       const name = typedEvent.client_user_name;
//       const id   = typedEvent.client_user_id;
//       this.assignLeadAgentName = typedEvent.client_user_name;
//       this.assignLeadAgenId    = typedEvent.client_user_id; 
//     }
//   }

//   resposibleusername:any;

//   getLeadInfo(lead_id: any, lead_status: any, event: Event) {
//     const id = lead_id;
//     // -------------------- Next And Previous Index --------------------
//     this.nextIndex = lead_status;
//     this.previousIndex = this.nextIndex - Number(1);
//     // ------------------------------------------------------------------
//     this.sidebarVisible = true;
//     this.leadsService.GetInfo(id).subscribe(
//         (res: any) => {
//             if (res) {
//                 this.leadInfo = res;
//                 if(this.leadInfo.agent === null || this.leadInfo.agent == null){
//                   this.resposibleusername = "User Can Not Found";
//                 }else{
//                   this.resposibleusername = this.leadInfo?.agent?.client_user_name || "User Can Not Found";

//                   // this.resposibleusername = this.leadInfo?.agent.client_user_name;
//                 }
                
//             }
//         },
//         (error: any) => {
//             console.log(error);
//         }
//     );
//  }

//  updateLeadStaus(event:Event){
//   if(this.updateleadform.valid){
//     const filed = this.updateleadform.value;
//     var fd = new FormData();
//     fd.append('lead_status',filed.lead_status)
//     fd.append('lead_id',filed.lead_id)
//     fd.append('lead_comment',filed.lead_comment)
//     fd.append('prev_status',this.previousIndex)
//     fd.append('next_status',this.nextIndex)
//     this.leadsService.UpdateSingLead(fd).subscribe((res:any) => {
//       if(res.status === "success"){      
//         Swal.fire({
//           title: 'Success',
//           html: 'Lead Update Successfully',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         this.updateleadform.reset();
//         this.sidebarVisible = false;
//         this.getLead();
//       }
//     }, (error:any) => {
//         console.log(error);
//   });
//   }
//  }

//   onLeadStatusChange(newLeadStatus: any): void {
//     if (newLeadStatus === undefined) {
//       console.log('Nothing to update');
//     } else {
//       const previousLeadStatus = this.leadInfo.lead_status;
//       const pev = previousLeadStatus - 1; 
//       const nextLeadStatus = newLeadStatus.lead_status;
//       this.previousIndex = pev;
//       this.nextIndex = nextLeadStatus;
//     }
//   }

//   Cancel(event:Event){   
//     Swal.fire({
//       title: 'Are you sure want to Cancel ?',
//       showCancelButton: false,
//       confirmButtonText: 'Yes',
//     }).then((result) => {
//       if(result.isConfirmed == true){
//         this.sidebarVisible = false;
//         this.updateleadform.reset();
//       }
//     })
//   }

//   AssignNewLead(event: Event, lead_id: any, content: TemplateRef<any>) {
//     this.newLeadId = lead_id;
//     this.leadsService.getAgentInfo().subscribe(
//       (res: any) => {
//         this.allAgents = res;
//       },
//       (error: any) => {
//         console.error('Error fetching agents:', error);
//       }
//     );
//     this.openModal(content);
//   }

//   openModal(content: TemplateRef<any>) {
//     // this.modalService.open(content, { windowClass: 'animated rotateInUpRight' });
//   }

//   AssignLeadFromNewLead() {
//     if(this.assignLeadAgenId == undefined || this.assignLeadAgenId === undefined){
//       Swal.fire('Please select at least one agent Name', '', 'error');
//       return
//     }else{
//       var fd = new FormData();
//       // fd.append("agent_name", this.assignLeadAgentName);
//       fd.append("agent_id", this.assignLeadAgenId);
//       fd.append("lead_id", this.newLeadId);
//       this.leadsService.BulkLeadtoAssign(fd).subscribe((res: any) => {
//         if (res.status === "success") {
//           Swal.fire({
//             title: "Success",
//             html: "Assign Lead Successfully",
//             timer: 2000,
//             showConfirmButton: false
//           }).then(() => {
//             this.selectedAgent = null;
//             // this.modalService.dismissAll();
//           });
//           this.getLead();
//         }
//       });
//     }
//   }





  mailSelected(mail: Mailbox): void {
    this.ms.selectedMail = null;
    this.ms.selectedMail = mail;
    this.selectedIndex = mail.MailId;
    this.ms.selectedMail.seen = true;
    mail.seen = true;
    this.ms.addClass = true;
    this.ms.selectedUser = getUser(mail.fromId);
    this.ms.global();
    if (this.ms.type === 'newleads') {
      this.router.navigate(['dashboards/dashboard1/new-leads', mail.MailId]);
    }
    if (this.ms.type === 'assignedleads') {
      this.router.navigate(['dashboards/dashboard1/assigned-leads', mail.MailId]);
    }
    if (this.ms.type === 'connectedleads') {
      this.router.navigate(['dashboards/dashboard1/connected-leads', mail.MailId]);
    }
    if (this.ms.type === 'coldleads') {
      this.router.navigate(['dashboards/dashboard1/cold-leads', mail.MailId]);
    }
  }

  mailboxesChanged(type: string): void {
    if (type === 'New Lead'){

      this.ms.mailList = this.ms.inboxList;
      console.log(this.ms.mailList);
      this.ms.users = [];
      for (const mail of this.ms.mailList) {
        const User = getUser(mail.fromId);
        if (User !== null) {
          this.ms.users.push(User);
        }
      }
      this.ms.collectionSize = this.ms.inboxList.length;
      this.ms.selectedMail = null;
      this.ms.topLable = 'All New Lead';
      this.mailActiveClass(type);
      this.ms.type = 'newleads';
      this.router.navigate(['dashboards/dashboard1/new-leads']);


    } else if (type === 'Assigned') {
      this.ms.mailList = this.ms.sentList;
      this.ms.users = [];
      for (const mail of this.ms.mailList) {
        const User = getUser(mail.fromId);
        if (User !== null) {
          this.ms.users.push(User);
        }
      }
      this.ms.collectionSize = this.ms.sentList.length;
      this.ms.selectedMail = null;
      this.ms.topLable = 'All Assigned Lead';
      this.mailActiveClass(type);
      // this.ms.type = 'assignedleads';
      // this.router.navigate(['dashboards/dashboard1/assigned-leads']);

    } 
    
  }
    
    // else if (type === 'Connected Lead') {

    //   this.ms.mailList = this.ms.draftList;
    //   this.ms.users = [];
    //   for (const mail of this.ms.mailList) {
    //     const User = getUser(mail.fromId);
    //     if (User !== null) {
    //       this.ms.users.push(User);
    //     }
    //   }
    //   this.ms.collectionSize = this.ms.draftList.length;
    //   this.ms.selectedMail = null;
    //   this.ms.topLable = 'All Connected Lead';
    //   this.mailActiveClass(type);
    //   this.ms.type = 'connectedleads';
    //   this.router.navigate(['dashboards/dashboard1/connected-leads']);
    // }else if (type === 'Cold Lead') {
    //   this.ms.mailList = this.ms.spamList;
    //   this.ms.users = [];
    //   for (const mail of this.ms.mailList) {
    //     const User = getUser(mail.fromId);
    //     if (User !== null) {
    //       this.ms.users.push(User);
    //     }
    //   }
    //   this.ms.collectionSize = this.ms.spamList.length;
    //   this.ms.selectedMail = null;
    //   this.ms.topLable = 'All Cold Lead';
    //   this.mailActiveClass(type);
    //   this.ms.type = 'coldleads';
    //   this.router.navigate(['dashboards/dashboard1/cold-leads']);
    // }


  

  // }


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
    // tslint:disable-next-line: no-non-null-assertion
    mailbox.find((m) => m.name === type)!.active = true;
  }

  filtersClick(type: string): void {}
  // filtersClick(type: string): void {
  //   if (type === 'Star') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       for (const fil of mail.filter) {
  //         if (fil === 'Star') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }
  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }
  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.topLable = 'Starred';
  //     this.ms.selectedMail = null;

  //     this.filterActiveClass(type);
  //     this.ms.type = 'star';
  //     this.router.navigate(['apps/email/star']);
  //   } else if (type === 'Important') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       for (const fil of mail.filter) {
  //         if (fil === 'Important') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }
  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }
  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.topLable = 'Important';
  //     this.ms.selectedMail = null;
  //     this.filterActiveClass(type);
  //     this.ms.type = 'important';
  //     this.router.navigate(['apps/email/important']);
  //   }
  // }


  // filterActiveClass(type: string): void {
  //   for (const fil of filter) {
  //     fil.active = false;
  //   }

  //   for (const lab of label) {
  //     lab.active = false;
  //   }

  //   for (const mail of mailbox) {
  //     mail.active = false;
  //   }
  //   // tslint:disable-next-line: no-non-null-assertion
  //   filter.find((fil) => fil.name === type)!.active = true;
  // }



  // labelActiveClass(type: string): void {
  //   for (const fil of filter) {
  //     fil.active = false;
  //   }

  //   for (const lab of label) {
  //     lab.active = false;
  //   }

  //   for (const mail of mailbox) {
  //     mail.active = false;
  //   }

  //   if (label !== undefined) {
  //     // tslint:disable-next-line: no-non-null-assertion
  //     label.find((l) => l.name === type)!.active = true;
  //   }
  // }




  labelChange(type:string):void{

  }

  // labelChange(type: string): void {
  //   if (type === 'Personal') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       // tslint:disable-next-line: no-shadowed-variable
  //       for (const label of mail.label) {
  //         if (label === 'Personal') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }

  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }
  //     this.labelActiveClass(type);
  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.selectedMail = null;
  //     this.ms.topLable = 'Personal';
  //     this.ms.type = 'Personal';
  //     this.router.navigate(['apps/email/personal']);
  //   } else if (type === 'Work') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       // tslint:disable-next-line: no-shadowed-variable
  //       for (const label of mail.label) {
  //         if (label === 'Work') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }

  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }

  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.selectedMail = null;
  //     this.ms.topLable = 'Work';
  //     this.labelActiveClass(type);
  //     this.ms.type = 'Work';
  //     this.router.navigate(['apps/email/work']);
  //   } else if (type === 'Payments') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       // tslint:disable-next-line: no-shadowed-variable
  //       for (const label of mail.label) {
  //         if (label === 'Payments') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }

  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }

  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.selectedMail = null;
  //     this.ms.topLable = 'Payments';
  //     this.labelActiveClass(type);
  //     this.ms.type = 'Payments';
  //     this.router.navigate(['apps/email/payments']);
  //   } else if (type === 'Accounts') {
  //     this.ms.mailList = [];

  //     for (const mail of mailboxList) {
  //       // tslint:disable-next-line: no-shadowed-variable
  //       for (const label of mail.label) {
  //         if (label === 'Accounts') {
  //           this.ms.mailList.push(mail);
  //         }
  //       }
  //     }

  //     this.ms.users = [];
  //     for (const mail of this.ms.mailList) {
  //       const User = getUser(mail.fromId);
  //       if (User !== null) {
  //         this.ms.users.push(User);
  //       }
  //     }

  //     this.ms.collectionSize = this.ms.mailList.length;
  //     this.ms.selectedMail = null;
  //     this.ms.topLable = 'Accounts';
  //     this.labelActiveClass(type);
  //     this.ms.type = 'Accounts';
  //     this.router.navigate(['apps/email/accounts']);
  //   } else if (type === 'Forums') {
  //   }
  // }

  openDialog(): void {
    const dialogRef = this.dialog.open(ListingDialogDataExampleDialogComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }




  //  else if (type === 'Draft') {
    //   this.ms.mailList = this.ms.draftList;
    //   this.ms.users = [];
    //   for (const mail of this.ms.mailList) {
    //     const User = getUser(mail.fromId);
    //     if (User !== null) {
    //       this.ms.users.push(User);
    //     }
    //   }
    //   this.ms.collectionSize = this.ms.draftList.length;
    //   this.ms.selectedMail = null;
    //   this.ms.topLable = 'Draft';
    //   this.mailActiveClass(type);
    //   this.ms.type = 'draft';
    //   this.router.navigate(['apps/email/draft']);
    // } else if (type === 'Spam') {
    //   this.ms.mailList = this.ms.spamList;
    //   this.ms.users = [];
    //   for (const mail of this.ms.mailList) {
    //     const User = getUser(mail.fromId);
    //     if (User !== null) {
    //       this.ms.users.push(User);
    //     }
    //   }
    //   this.ms.collectionSize = this.ms.spamList.length;
    //   this.ms.selectedMail = null;
    //   this.ms.topLable = 'Spam';
    //   this.mailActiveClass(type);
    //   this.ms.type = 'spam';
    //   this.router.navigate(['apps/email/spam']);
    // } else if (type === 'Trash') {
    //   this.ms.mailList = this.ms.trashList;
    //   this.ms.users = [];
    //   for (const mail of this.ms.mailList) {
    //     const User = getUser(mail.fromId);
    //     if (User !== null) {
    //       this.ms.users.push(User);
    //     }
    //   }
    //   this.ms.collectionSize = this.ms.trashList.length;
    //   this.ms.selectedMail = null;
    //   this.ms.topLable = 'Trash';
    //   this.mailActiveClass(type);
    //   this.ms.type = 'trash';
    //   this.router.navigate(['apps/email/trash']);
    // }




    //   formatDateOrToday(value: Date): any {
//     const currentDate = new Date();
//     const date = new Date(value);
//     if (this.isSameDate(date, currentDate)) {
//       return `Today ${this.formatTime12Hour(date)}`;
//     }
//     const yesterday = new Date(currentDate);
//     yesterday.setDate(currentDate.getDate() - 1);
//     if (this.isSameDate(date, yesterday)) {
//       return `Yesterday ${this.formatTime12Hour(date)}`;
//     }
//     return new DatePipe('en-US').transform(date, 'short');
//   }

//   private formatTime12Hour(date: Date): string {
//     const hours = date.getHours() % 12 || 12;
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
//     return `${hours}:${minutes} ${amPm}`;
//   }
//   private isSameDate(date1: Date, date2: Date): boolean {
//     return (date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate());
//   }
  
//   hideDetials(event:Event){    
//     this.sidebarVisible = false;
//     this.updateleadform.reset();
//   }
//   selectedAgent       :any;
//   assignLeadAgentName :any;
//   assignLeadAgenId    :any;
//   SelectAgent(event: Event) {
//     const typedEvent = event as any;
//     if (typedEvent.client_user_name) {
//       const name = typedEvent.client_user_name;
//       const id   = typedEvent.client_user_id;
//       this.assignLeadAgentName = typedEvent.client_user_name;
//       this.assignLeadAgenId    = typedEvent.client_user_id; 
//     }
//   }

//   resposibleusername:any;

//   getLeadInfo(lead_id: any, lead_status: any, event: Event) {
//     const id = lead_id;
//     // -------------------- Next And Previous Index --------------------
//     this.nextIndex = lead_status;
//     this.previousIndex = this.nextIndex - Number(1);
//     // ------------------------------------------------------------------
//     this.sidebarVisible = true;
//     this.leadsService.GetInfo(id).subscribe(
//         (res: any) => {
//             if (res) {
//                 this.leadInfo = res;
//                 if(this.leadInfo.agent === null || this.leadInfo.agent == null){
//                   this.resposibleusername = "User Can Not Found";
//                 }else{
//                   this.resposibleusername = this.leadInfo?.agent?.client_user_name || "User Can Not Found";

//                   // this.resposibleusername = this.leadInfo?.agent.client_user_name;
//                 }
                
//             }
//         },
//         (error: any) => {
//             console.log(error);
//         }
//     );
//  }

//  updateLeadStaus(event:Event){
//   if(this.updateleadform.valid){
//     const filed = this.updateleadform.value;
//     var fd = new FormData();
//     fd.append('lead_status',filed.lead_status)
//     fd.append('lead_id',filed.lead_id)
//     fd.append('lead_comment',filed.lead_comment)
//     fd.append('prev_status',this.previousIndex)
//     fd.append('next_status',this.nextIndex)
//     this.leadsService.UpdateSingLead(fd).subscribe((res:any) => {
//       if(res.status === "success"){      
//         Swal.fire({
//           title: 'Success',
//           html: 'Lead Update Successfully',
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         this.updateleadform.reset();
//         this.sidebarVisible = false;
//         this.getLead();
//       }
//     }, (error:any) => {
//         console.log(error);
//   });
//   }
//  }

//   onLeadStatusChange(newLeadStatus: any): void {
//     if (newLeadStatus === undefined) {
//       console.log('Nothing to update');
//     } else {
//       const previousLeadStatus = this.leadInfo.lead_status;
//       const pev = previousLeadStatus - 1; 
//       const nextLeadStatus = newLeadStatus.lead_status;
//       this.previousIndex = pev;
//       this.nextIndex = nextLeadStatus;
//     }
//   }

//   Cancel(event:Event){   
//     Swal.fire({
//       title: 'Are you sure want to Cancel ?',
//       showCancelButton: false,
//       confirmButtonText: 'Yes',
//     }).then((result) => {
//       if(result.isConfirmed == true){
//         this.sidebarVisible = false;
//         this.updateleadform.reset();
//       }
//     })
//   }

//   AssignNewLead(event: Event, lead_id: any, content: TemplateRef<any>) {
//     this.newLeadId = lead_id;
//     this.leadsService.getAgentInfo().subscribe(
//       (res: any) => {
//         this.allAgents = res;
//       },
//       (error: any) => {
//         console.error('Error fetching agents:', error);
//       }
//     );
//     this.openModal(content);
//   }

//   openModal(content: TemplateRef<any>) {
//     // this.modalService.open(content, { windowClass: 'animated rotateInUpRight' });
//   }

//   AssignLeadFromNewLead() {
//     if(this.assignLeadAgenId == undefined || this.assignLeadAgenId === undefined){
//       Swal.fire('Please select at least one agent Name', '', 'error');
//       return
//     }else{
//       var fd = new FormData();
//       // fd.append("agent_name", this.assignLeadAgentName);
//       fd.append("agent_id", this.assignLeadAgenId);
//       fd.append("lead_id", this.newLeadId);
//       this.leadsService.BulkLeadtoAssign(fd).subscribe((res: any) => {
//         if (res.status === "success") {
//           Swal.fire({
//             title: "Success",
//             html: "Assign Lead Successfully",
//             timer: 2000,
//             showConfirmButton: false
//           }).then(() => {
//             this.selectedAgent = null;
//             // this.modalService.dismissAll();
//           });
//           this.getLead();
//         }
//       });
//     }
//   }


  


  get f(){ return this.updateleadform.controls; }

  

}




























