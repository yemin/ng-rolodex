import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IContact } from 'src/app/interfaces/icontact';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  @Input() contactInput: IContact;
  //@Output() childUpdateOutput = new EventEmitter<string>();

  contactData: IContact;

  constructor(private router:Router) { }

  ngOnInit() {
    //console.log(this.contactInput);
    this.contactData = this.contactInput;
  }

  goToContact() {
    console.log('Called childLocalUpdate');
    this.router.navigateByUrl('/contacts/' + this.contactData.id);
    //this.childUpdateOutput.emit(this.contactData.name);
  }

}
