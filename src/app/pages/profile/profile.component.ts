import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Iuser } from 'src/app/interfaces/iuser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  reactiveForm = this.fb.group({
    id: [],
    username: ['', [Validators.required, Validators.minLength(5)]],
    address: [],
    created_at: ['', [Validators.required]],
    updated_at: ['', [Validators.required]],
    name:[],
    email: [],
  });

  user: Iuser;

  constructor(private fb:FormBuilder, 
    private backend:BackendService) { }

  ngOnInit() {
    let id = 3;
    this.backend.getUser(id).then(
      (response:Iuser)=>{
        console.log(response);
        this.user = response;
        this.reactiveForm.patchValue(this.user);
      });
  }

  get form() {
    return this.reactiveForm.controls;
  }

  updateUser(){
    //console.log(this.reactiveForm.value);
    this.backend.updateUser(this.reactiveForm.value).then(
      ()=> console.log('data is updated')
    ).catch((err) => {
      console.log('error:', err)
    })
  }
}
