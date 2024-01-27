import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { LeadsService } from 'src/app/services/leads.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss']
})
export class CreateLeadComponent implements OnInit {
  allAgents : any;
  searchfilteredOptions: Observable<string[]>;
  leadForm : FormGroup;
  selectedAgentName:any;
  filteredAgents = [];
  agentIdControl = new FormControl();
  
  constructor(private LeadsService:LeadsService, private router:Router, private fb:FormBuilder){}

  ngOnInit(): void {
    this.leadForm        = this.fb.group({
      lead_title         : new FormControl('',[Validators.required]),
      agent_id           : new FormControl(''),
      customer_name      : new FormControl('',[Validators.required, Validators.minLength(4)]),
      customer_phone     : new FormControl('',[Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]),
      customer_phone2    : new FormControl('',[Validators.required, Validators.pattern(/^\+(?:[0-9] ?){6,14}[0-9]$/)]),
      customer_email     : new FormControl('',[Validators.required, Validators.email]),
      customer_position  : new FormControl(''),
      lead_comments      : new FormControl(''),
    })
    this.agents();
  }
  agents(){
    this.LeadsService.getAgentInfo().subscribe((res:any)=>{ 
      this.allAgents = res;
    },(error:any) => {
      console.log(error);
    })
  } 

  submitForm(event:any){
    if(this.leadForm.invalid){ return }
    if(this.leadForm.valid){
      const formdata = new FormData();
      const filed    = this.leadForm.value;
      formdata.append('lead_title', filed.lead_title);
      formdata.append('agent_id', filed.agent_id);
      formdata.append('customer_name', filed.customer_name);
      formdata.append('customer_phone', filed.customer_phone);
      formdata.append('customer_email', filed.customer_email);
      formdata.append('customer_position', filed.customer_position);
      formdata.append('customer_phone2', filed.customer_phone2);
      // formdata.append('agent_name', this.selectedAgentName);
      this.LeadsService.createLead(formdata).subscribe((res:any) => {

        console.log(formdata);

        if(res.status === "success"){
          Swal.fire({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000, timerProgressBar: true, title: `Lead Assign Successfully`, icon: 'success' });
          this.leadForm.reset();
          this.router.navigate(['/dashboards/dashboard1']);
        }
      })
    }
  }
  onAgentChange(event: any) {
    const selectedAgentId = this.leadForm.get('agent_id')?.value;
    this.LeadsService.AgentNameById(selectedAgentId).subscribe(
      (res: any) => {
        if (res && res.length > 0) {
          if (res[0].client_user_name === '') {
            this.selectedAgentName = 'empty';
          } else {
            this.selectedAgentName = res[0].client_user_name;
          }
        } else {
          alert('Could Not find Any User');
        }
      },
      (error) => {
        console.error('Error fetching agent name:', error);
        alert('An error occurred while fetching agent name');
      }
    );
  }


  filterAgents(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
  
    if (typeof searchText !== 'string') {
      // For example, you might want to convert non-string types to string or return early.
      return;
    }
  
    this.allAgents = this.allAgents.filter((agent: any) =>
      agent.client_user_name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  

 

  

  get f(){
    return this.leadForm.controls;
  }

}
