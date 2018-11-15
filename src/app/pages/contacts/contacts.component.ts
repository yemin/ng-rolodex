import { Component, OnInit } from '@angular/core';

import { BackendService } from 'src/app/services/backend.service';
import { IContact } from 'src/app/interfaces/icontact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  alphabet:string[] = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
  contacts:IContact[];

  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.backend.getAllContacts().then(
      (response:IContact[])=>{
        this.contacts = response;
        this.sortArray(this.contacts);
      });
  }

  matchContacts(letter){
    let results = this.contacts.filter(o =>
      o.name.toUpperCase().startsWith(letter));
      return results;
  }

  sortArray(objArray){
    objArray.sort(function(a, b) {
      var textA = a.name.toUpperCase();
      var textB = b.name.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
}
