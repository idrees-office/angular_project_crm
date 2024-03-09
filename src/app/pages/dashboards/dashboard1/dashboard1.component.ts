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
import { AuthService } from 'src/app/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';

declare const FB: any;
// declare const FB: any;


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
  allLeads: any[] = [];
  filteredLeads: any[] = [];
  Newleads: any[] = [];
  Assignleads: any[] = [];
  Connectedleads: any[] = [];
  Coldleads: any[] = [];
  Warmleads: any[] = [];
  Hotleads: any[] = [];
  MeetingSchduledeleads: any[] = [];
  MeetingComplate: any[] = [];
  NoAnswer: any[] = [];
  LowBuget: any[] = [];
  NotResponding: any[] = [];
  IncorrectDetail: any[] = [];
  Agent: any[] = [];
  Junk: any[] = [];

  userData: any;
  user: any;
  role: any;
  loginUserId: any;
  sidebarVisible = false;
  allAgents: any;
  isNextDisabled: any;
  ResponsibleUser: any;
  previousIndex: any;
  nextIndex: any;
  lastActiveAgent: any;
  leadInfo: any = {};
  updateleadform: FormGroup;
  leadoptions: LeadsOption[] = [];
  leadoptions2: LeadsOptionDropdown[] = [];
  newLeadId: any;
  agentName: any;
  sidePanelOpened = true;
  displayMode = 'default';
  p = 1;
  hide: any;
  currentselectdstatus: any;
  stateCtrl = new FormControl('');
  filteredStates: Observable<LeadsOptionDropdown[]>;
  itemsPerPage: number = 12;
  fd = new FormData();

  statusId: any;

  constructor(
    private leadsService: LeadsService,
    private fb: FormBuilder,
    private mailService: mailService,
    public ms: mailGlobalVariable,
    private router: Router,
    public dialog: MatDialog,
    private _Location: Location,
    private _AuthService: AuthService,
    private _Router: Router,
    private _cdr: ChangeDetectorRef
  ) {
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterStates(state) : this.leadoptions2.slice()
      )
    );
  }

  private _filterStates(value: string): LeadsOption[] {
    const filterValue = value.toLowerCase();

    return this.leadoptions2.filter((leadoptions2) =>
      leadoptions2.label.toLowerCase().includes(filterValue)
    );
  }
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);
  mailboxes: Category[] = mailbox;
  filters: Category[] = filter;
  labels: Category[] = label;
  selectedIndex: string;

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  ngOnInit() {
    this.initFacebookSdk();

    console.log('data');

    FB.api('/me', { fields: 'last_name' }, function (response: any) {
      console.log('xyz');

      console.log(response);
    });

    this.userData = localStorage.getItem('userData');
    if (this.userData) {
      this.user = JSON.parse(this.userData);
      this.role = this.user?.client_user_role;
      this.loginUserId = this.user?.client_user_id;
    } else {
      console.error('User data not found in localStorage');
    }

    this._AuthService.checkUserDataExists(this.loginUserId).subscribe(
      (res: any) => {},
      (error: any) => {
        // console.log(error.status);
        if (error.status == 404 || error.status === 404) {
          localStorage.removeItem('userData');
          this._Router.navigate(['/authentication/side-login']);
          //add swall
        }
      }
    );

    this.updateleadform = this.fb.group({
      lead_status: new FormControl('', [Validators.required]),
      lead_id: new FormControl(''),
      lead_comment: new FormControl('', [Validators.required]),
    });

    this.leadoptions = LeadStatus.leads;
    this.leadoptions2 = this.filteredLeadsOptions();

    if (this.role == 1) {
      if (this.ms.type == '' || this.ms.type === '') {
        // this.mailboxesChanged('Assigned Lead');
      } else {
        // this.mailboxesChanged('Assigned Lead');
      }
    } else if (this.role == 2) {
      if (this.ms.type == '' || this.ms.type === '') {
        // this.mailboxesChanged('Assigned Lead');
      } else {
        // this.mailboxesChanged('Assigned Lead');
      }
      // this.Newleads = [];
      // this.Newleads.length = 0;
    }

    this.loadAllLeads();
  }

  initFacebookSdk(): void {
    FB.init({
      appId: '1067623880812441',
      autoLogAppEvents: true,
      xfbml: true,
      version: 'v19.0',
    });
  }

  private filteredLeadsOptions() {
    return LeadStatusDropdown.leadsoption.filter(
      (lead) => lead.role === this.role || lead.role === ''
    );
  }

  loadAllLeads() {
    this.userData = localStorage.getItem('userData');
    this.user = JSON.parse(this.userData);
    this.role = this.user.client_user_role;
    const agent_id = this.user.client_user_id;
    this.fd.append('login_user_id', agent_id);
    this.fd.append('user_role', this.role);
    this.leadsService
      .GetAgentAndAdminWiseLeads(this.fd)
      .subscribe((res: any) => {
        this.allLeads = res.data;
        var leadsstatus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
        leadsstatus.forEach((leadStatus) => {
          this.filterLeads(leadStatus);
        });
      });
    // const res: any = this.leadsService.GetAgentAndAdminWiseLeads(this.fd);
    // console.log(res)
    // this.allLeads = res.data;
    // console.log(this.allLeads);
    // if (this.role == 2) {
    //   leadsstatus.forEach((leadStatus) => {
    //     this.fetchLeadsForAgent(leadStatus, agent_id);
    //   });
    // } else {

    // }
  }
  // fetchLeadsForAgent(leadStatus: number, agent_id: any) {
  //   if (agent_id) {
  //     if (leadStatus === 1) {
  //       this.Newleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 1 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 2) {
  //       this.Assignleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 2 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 3) {
  //       this.Connectedleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 3 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 4) {
  //       this.Coldleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 4 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 5) {
  //       this.Warmleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 5 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 6) {
  //       this.Hotleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 6 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 7) {
  //       this.MeetingSchduledeleads = this.allLeads.filter(
  //         (lead) => lead.lead_status == 7 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 8) {
  //       this.MeetingComplate = this.allLeads.filter(
  //         (lead) => lead.lead_status == 8 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 9) {
  //       this.NoAnswer = this.allLeads.filter(
  //         (lead) => lead.lead_status == 9 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 10) {
  //       this.LowBuget = this.allLeads.filter(
  //         (lead) => lead.lead_status == 10 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 11) {
  //       this.NotResponding = this.allLeads.filter(
  //         (lead) => lead.lead_status == 11 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 12) {
  //       this.IncorrectDetail = this.allLeads.filter(
  //         (lead) => lead.lead_status == 12 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 13) {
  //       this.Agent = this.allLeads.filter(
  //         (lead) => lead.lead_status == 13 && lead.agent_id == agent_id
  //       );
  //     } else if (leadStatus === 14) {
  //       this.Junk = this.allLeads.filter(
  //         (lead) => lead.lead_status == 14 && lead.agent_id == agent_id
  //       );
  //     }
  //   }
  // }

  filterLeads(leadStatus: number) {
    if (leadStatus === 1) {
      this.Newleads = this.allLeads.filter((lead) => lead.lead_status == 1);
    } else if (leadStatus === 2) {
      this.Assignleads = this.allLeads.filter((lead) => lead.lead_status == 2);
    } else if (leadStatus === 3) {
      this.Connectedleads = this.allLeads.filter(
        (lead) => lead.lead_status == 3
      );
    } else if (leadStatus === 4) {
      this.Coldleads = this.allLeads.filter((lead) => lead.lead_status == 4);
    } else if (leadStatus === 5) {
      this.Warmleads = this.allLeads.filter((lead) => lead.lead_status == 5);
    } else if (leadStatus === 6) {
      this.Hotleads = this.allLeads.filter((lead) => lead.lead_status == 6);
    } else if (leadStatus === 7) {
      this.MeetingSchduledeleads = this.allLeads.filter(
        (lead) => lead.lead_status == 7
      );
    } else if (leadStatus === 8) {
      this.MeetingComplate = this.allLeads.filter(
        (lead) => lead.lead_status == 8
      );
    } else if (leadStatus === 9) {
      this.NoAnswer = this.allLeads.filter((lead) => lead.lead_status == 9);
    } else if (leadStatus === 10) {
      this.LowBuget = this.allLeads.filter((lead) => lead.lead_status == 10);
    } else if (leadStatus === 11) {
      this.NotResponding = this.allLeads.filter(
        (lead) => lead.lead_status == 11
      );
    } else if (leadStatus === 12) {
      this.IncorrectDetail = this.allLeads.filter(
        (lead) => lead.lead_status == 12
      );
    } else if (leadStatus === 13) {
      this.Agent = this.allLeads.filter((lead) => lead.lead_status == 13);
    } else if (leadStatus === 14) {
      this.Junk = this.allLeads.filter((lead) => lead.lead_status == 14);
    }
  }

  leadUser(data: any): boolean {
    var indexofArray = data[2];
    var leadInfoArry = data[0];
    var currecntRecord = data[1];
    if (currecntRecord.user_id == null && indexofArray > 0) {
      return false;
    }
    return true;
  }

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
    return Math.ceil(this.ms.leadList?.length / this.itemsPerPage);
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const currentPage = this.p;
    const maxVisiblePages = 3;
    let startPage: number;
    let endPage: number;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      // Calculate start and end pages to display
      const middlePage = Math.floor(maxVisiblePages / 2);
      if (currentPage <= middlePage) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + middlePage >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - middlePage;
        endPage = currentPage + middlePage;
      }
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
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

  removeClass(): void {
    this.ms.addClass = false;
  }

  mailboxesChanged(lead_box_id: any) {
    if (this.role == 2 && lead_box_id === 1) {
      Swal.fire({
        title: 'Sorry',
        html: 'You do not have permission to access New leads',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }
    // await this.loadAllLeads();
    switch (lead_box_id) {
      case 1:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Newleads;
        this.ms.topLable = 'New Lead';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'newleads';
        this.statusId = lead_box_id;
        break;
      case 2:
        this.ms.selectedLead = null;
        // console.log(this.Assignleads);
        this.ms.leadList = this.Assignleads;
        this.ms.topLable = 'Assigned';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'assignedleads';
        this.statusId = lead_box_id;
        break;
      case 3:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Connectedleads;
        this.ms.topLable = 'Connected';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'connectedleads';
        this.statusId = lead_box_id;
        break;
      case 4:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Coldleads;
        this.ms.topLable = 'Cold';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'connectedleads';
        this.statusId = lead_box_id;

        break;
      case 5:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Warmleads;
        this.ms.topLable = 'Warm';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'warmleads';
        break;
      case 6:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Hotleads;
        this.ms.topLable = 'Hot';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'hotleads';

        break;
      case 7:
        this.ms.selectedLead = null;
        this.ms.leadList = this.MeetingSchduledeleads;
        this.ms.topLable = 'Meeting Schdulede';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'meetingschdulede';
        break;
      case 8:
        this.ms.selectedLead = null;
        this.ms.leadList = this.MeetingComplate;
        this.ms.topLable = 'Meeting Complate';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'meetingschdulede';
        break;
      case 9:
        this.ms.selectedLead = null;
        this.ms.leadList = this.NoAnswer;
        this.ms.topLable = 'No-Answer';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'noanswer';
        break;
      case 10:
        this.ms.selectedLead = null;
        this.ms.leadList = this.LowBuget;
        this.ms.topLable = 'Low-Buget';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'lowbuget';
        break;
      case 11:
        this.ms.selectedLead = null;
        this.ms.leadList = this.NotResponding;
        this.ms.topLable = 'Not-Responding';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'notresponding';
        break;
      case 12:
        this.ms.selectedLead = null;
        this.ms.leadList = this.IncorrectDetail;
        this.ms.topLable = 'Incorrect Detail';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'incorrectdetail';
        break;
      case 13:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Agent;
        this.ms.topLable = 'Agent';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'agent';
        break;
      case 14:
        this.ms.selectedLead = null;
        this.ms.leadList = this.Junk;
        this.ms.topLable = 'Junk';
        this.mailActiveClass(lead_box_id);
        this.ms.type = 'junk';
        break;
      default:
        // Handle the default case if necessary
        break;
    }
  }

  mailActiveClass(id: any): void {
    // for (const fil of filter) {
    //   fil.active = false;
    // }
    // for (const lab of label) {
    //   lab.active = false;
    // }

    for (const mail of mailbox) {
      mail.active = false;
    }
    mailbox.find((m) => m.id === id)!.active = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(
      ListingDialogDataExampleDialogComponent,
      {}
    );
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onOptionSelected(e: MatAutocompleteSelectedEvent) {
    this.currentselectdstatus = e.option.value;
  }

  displayLeadLabel(status: any): string {
    return status ? status.label : '';
  }

  updateLeadStaus(event: Event, agent_id: any) {
    event.preventDefault();
    if (this.updateleadform.valid) {
      const filed = this.updateleadform.value;
      var fd = new FormData();
      fd.append('lead_status', filed.lead_status.lead_status);
      fd.append('lead_id', filed.lead_id);
      fd.append('lead_comment', filed.lead_comment);
      fd.append('agent_id', agent_id);

      if (this.loginUserId) {
        fd.append('login_user_id', this.loginUserId);
      }

      if (this.role == 1) {
        fd.append('user_id', this.loginUserId);
      } else {
        fd.append('user_id', '');
      }
      this.leadsService.UpdateSingLead(fd).subscribe(
        (res: any) => {
          if (res.status === 'success') {
            Swal.fire({
              title: 'Success',
              html: 'Lead Update Successfully',
              timer: 2000,
              showConfirmButton: false,
            });

            this.updateleadform.reset();
            this.ms.selectedLead = null; // Hide

            // this.loadAllLeads();

            // this.cdr.detectChanges();

            this._cdr.detectChanges();

            // const leadTypes: { [key: string]: any } = {
            //   1: 1,
            //   2: 2,
            //   3: 3,
            //   4: 4,
            //   5: 5,
            //   6: 6,
            //   7: 7,
            //   8: 8,
            //   9: 9,
            //   10: 10,
            //   11: 11,
            //   12: 12,
            //   13: 13,
            //   14: 14,
            // };
            // const statusIds = this.statusId;

            // console.log(statusIds);

            // if (leadTypes.hasOwnProperty(statusIds)) {
            //   this.mailboxesChanged(leadTypes[statusIds]);
            // }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  displayedColumns1: string[] = [
    'Responsible-User',
    'Mobile',
    'Whatsapp',
    'Email',
    'Name/Position',
  ];
  dataSource1 = PRODUCT_DATA;

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
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  get f() {
    return this.updateleadform.controls;
  }
}




