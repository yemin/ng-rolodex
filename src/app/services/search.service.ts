import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IContact } from '../interfaces/icontact';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  contacts: IContact[];
  private _isSearchListSubject = new BehaviorSubject<IContact[]>(null);

  constructor(private backend:BackendService) {
    this.backend.getAllContacts().then(
      (response: IContact[]) => {
        this.contacts = response;
      });
   }

  searchContactList(searchWord:string) {
        let filtered = this.contacts.filter(o =>
          o.name.toLowerCase().startsWith(searchWord.toLowerCase()));
        console.log(filtered);
        this._isSearchListSubject.next(filtered);
  }

  isSearchListAsAObservable() {
    return this._isSearchListSubject.asObservable();
  }
}
