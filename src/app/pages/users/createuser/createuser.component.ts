import { Component, OnInit,Renderer2, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Option, OptionStatus } from 'src/app/core/status';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LeadsService } from 'src/app/services/leads.service';
import { map, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';



// interface Item {
//   id: any;
//   label: any;
//   selected: any;
// }

@Component({
  selector: 'appcreate-user',
  templateUrl: './createuser.component.html',
  // styleUrls: ['./create-user.component.scss']
  styleUrls: [],
})
export class CreateuserComponent implements OnInit {
  userFrom: FormGroup;
  isNextDisabled: any;
  default = 'Select Option';
  options: Option[] = [];
  userFile: File | null = null;
  userFile2: File;
  client_user_id: any;
  loadingIndicator: any;
  userObj: any;
  DefineRoles: any;
  roleId: any;
  allAgents: any[] = [];
  filteredOptions: Observable<any[]>;
  firstControl = new FormControl('');
  team_id:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _UserService: UserService,
    private renderer: Renderer2,
    private el: ElementRef,
    private activeroute: ActivatedRoute,
    private _LeadsService: LeadsService
  ) {
    const paramMap = this.activeroute.snapshot.paramMap;
    this._UserService.GetUserRoles().subscribe(
      (res: any) => {
        this.DefineRoles = res;
      },
      (error: any) => {
        // console.log('Error in the fetching roles');
        Swal.fire('Error in the fetching roles', 'error');
        if (error.status == 403 || error.status === 403) {
          this.router.navigate(['error']);
        }
      }
    );
  }

  checkedItems: number[] = [];
  websitestatus: any;

  // items2: Item[] = [
  //   { id: 1, label: 'management', selected: false },
  //   { id: 2, label: 'sale_agent', selected: false },
  //   { id: 3, label: 'marketing_team', selected: false },
  //   { id: 4, label: 'admin_team', selected: false },
  // ];

  selectedOption: any = null;
  ngOnInit(): void {
    this.userObj = {};
    this.userFrom = this.fb.group({
      user_name: new FormControl('', [Validators.required]),
      user_phone: new FormControl('', [Validators.required]),
      user_designation: new FormControl('', [Validators.required]),
      user_email: new FormControl('', [Validators.required]),
      user_password: new FormControl('', [Validators.required]),
      user_status: new FormControl('', [Validators.required]),
      sort_order: new FormControl('', [Validators.required]),
      checkedItems: new FormControl('', [Validators.required]),
      // team_id : new FormControl('')
    });

    this.userFrom.valueChanges.subscribe((e) => {
      this.isNextDisabled = !this.userFrom.valid;
    });

    this.options = OptionStatus.optionvalue;

    this.agents();

    this.filteredOptions = this.firstControl.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  private _filter(value: any): any[] {
    return this.allAgents
      .filter((agent) => agent.client_user_name.includes(value))
      .map((agent) => ({
        name: agent.client_user_name,
        id: agent.client_user_id,
      }));
  }

  displaySelectedAgent(agent: any): string {
    return agent ? agent.name : '';
  }

  agents() {
    this._LeadsService.getAgentInfo().subscribe(
      (res: any) => {
        this.allAgents = res;
      },
      (error: any) => {
        if (error.status == 430 || error.status === 430) {
          this.router.navigate(['error']);
        }
      }
    );
  }

  userImage(event: any) {
    this.userFile = event.target.files[0]; // For Create
    this.userFile2 = event.target.files[0]; // For update
  }

  isChecked(item: any): boolean {
    return this.checkedItems.includes(item.id);
  }
  toggleCheckbox(item: any) {
    if (this.isChecked(item)) {
      this.checkedItems = this.checkedItems.filter((id) => id !== item.id);
    } else {
      this.checkedItems.push(item.id);
    }
  }

  toggleRadio() {
    this.roleId = this.userFrom.value.checkedItems;
  }

  get f() {
    return this.userFrom.controls;
  }

  hideFirstFiveCharacters(phone: string): string {
    return phone.substr(5);
  }

  onOptionSelected(e: MatAutocompleteSelectedEvent) {
    var team = e.option.value;
    const id = team.id;
    if (id != ''){ 
      this.team_id = id;
    };
  }

  create(event: any) {
    if (!this.userFrom.valid) {
      Swal.fire('Something Went Wrong. Please Check All the Fields', 'error');
      return;
    }
    const formData = new FormData();
    const isUpdate = this.client_user_id !== 0;
    const filed = this.userFrom.value;
    if (this.team_id){ formData.append('team_id', this.team_id); }
    if (this.roleId) { formData.append('role_id', this.roleId); }
    formData.append('client_user_name', filed.user_name);
    formData.append('client_user_phone', filed.user_phone);
    formData.append('client_user_designation', filed.user_designation);
    formData.append('client_user_email', filed.user_email);
    formData.append('password', filed.user_password);
    formData.append('client_sort_order', filed.sort_order);
    formData.append('client_user_status', filed.user_status);
    if (this.userFile) {
      formData.append('client_user_image', this.userFile);
    }
    this._UserService.create(formData).subscribe(
      (res: any) => {
        if (res.status == 'success') {
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: 'Create User Successfully', icon: 'success',
          });
          this.userFrom.reset();
          this.firstControl.reset();
        } else {
          Swal.fire('Some Thing was wrong...', '', 'error');
        }
      },
      (error: any) => {
        if(error.status == 403 || error.status === 403){
          this.router.navigate(['error']);
        }

      }
    );
  }
}
