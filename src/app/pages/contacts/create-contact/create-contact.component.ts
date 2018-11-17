import { Component, OnInit, ViewChild } from '@angular/core';
import { IContact } from 'src/app/interfaces/icontact';
import { BackendService } from 'src/app/services/backend.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  @ViewChild('nameInput') nameInput;
  @ViewChild('idInput') idInput;
  @ViewChild('form') form: NgForm;

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
  
  constructor(private router:Router,
    private backend:BackendService) { 
  }

  ngOnInit() {
  }

  validateName() {
    if(!this.formData.name){return false;}
    return true;
  }

  reset(){
    this.form.reset();
  }

  submit() {
    if(this.form.valid)
    {
      this.formData.created_by = 3; //static key for now;
        this.backend.addContact(this.formData).then((response:IContact)=>{
          console.log(response);
          alert("Thank you - a new contact is added.");
          this.router.navigate(['/']);
        }).catch((error) => {
          console.log(error);
        })
    }
  }
}
