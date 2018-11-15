import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { IContact } from 'src/app/interfaces/icontact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  reactiveForm = this.fb.group({
    id: ['', Validators.required],
    name: ['', [Validators.required, Validators.minLength(5)]],
    address: [],
    email:[],
    created_at: [],
    updated_at: [],
    created_by:[],
    github: [],
  });

  contact:IContact;

  constructor(private fb:FormBuilder, 
    private route:ActivatedRoute,
    private backend:BackendService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.backend.getContact(id).then(
      (response:IContact)=>{
        console.log(response);
        this.contact = response;
        this.reactiveForm.patchValue(this.contact);
      });
  }

  get form() {
    return this.reactiveForm.controls;
  }

  updateContact(){
    //console.log(this.reactiveForm.value);
    this.backend.updateContact(this.reactiveForm.value).then(
      ()=> console.log('data is updated')
    ).catch((err) => {
      console.log('error:', err)
    })
  }
}
