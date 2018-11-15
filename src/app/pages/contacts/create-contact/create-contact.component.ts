import { Component, OnInit, ViewChild } from '@angular/core';
import { IContact } from 'src/app/interfaces/icontact';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  @ViewChild('nameInput') nameInput;
  @ViewChild('idInput') idInput;
  @ViewChild('form') form;

  formData: IContact = { 
    id: 0,
    name: '', 
    address: '', 
    created_at: null, 
    updated_at:null, 
    created_by: null,
    mobile:'',
    work:null,
    home:null,
    email:null,
    twitter:null,
    github:null,
    instagram: null,
  } ;
  
  constructor(private backend:BackendService) { 
  }

  ngOnInit() {
  }

  validateName() {
    if(!this.formData.name){return false;}
    return true;
  }
  disableSubmit(){
    const validateName = this.validateName();
    if(!this.form.valid && validateName){ return true;}
    return false;
  }

  submit() {
    if(this.form.valid)
    {
      this.formData.created_by = 3; //static key for now;
        this.backend.addContact(this.formData).then((response:IContact)=>{
          console.log(response);
        }).catch((error) => {
          console.log(error);
        })
    }
  }
}
