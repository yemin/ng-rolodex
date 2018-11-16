import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IContact } from '../interfaces/icontact';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _isSearchListSubject = new BehaviorSubject<IContact[]>(null);

  constructor(private backend:BackendService) {
    
   }

  searchContactList(searchWord:string) {
    this.backend.getAllContacts().then(
      (response: IContact[]) => {
        let filtered = response.filter(o =>
          o.name.toLowerCase().startsWith(searchWord.toLowerCase()));
        console.log(filtered);
        this._isSearchListSubject.next(filtered);
      });
  }

  isSearchListAsAObservable() {
    return this._isSearchListSubject.asObservable();
  }

  clearSearch(){
    this._isSearchListSubject = new BehaviorSubject<IContact[]>(null);
  }
}
