import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { IContact } from 'src/app/interfaces/icontact';
import { BackendService } from 'src/app/services/backend.service';
import { SearchService } from 'src/app/services/search.service';
import { Button } from 'protractor';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
  //contacts: IContact[];
  //@Output() filterOutput = new EventEmitter<IContact[]>();
  searchWord: string = '';
  @ViewChild('searchbutton') mybutton:ElementRef;
  private _disposable;

  constructor(private searchService:SearchService) { }

  ngOnInit() {
    // this.backend.getAllContacts().then(
    //   (response: IContact[]) => {
    //     this.contacts = response;
    //   });
  }

  ngAfterViewInit(){
    this._disposable = fromEvent(this.mybutton.nativeElement, 'click').pipe(
      debounceTime(1500), distinctUntilChanged()
    ).subscribe(()=>{
      this.searchService.searchContactList(this.searchWord)
    });
  }

  ngOnDestroy(){
    this._disposable.unsubscribe();
  }

  searchContact() {
    //this.searchService.searchContactList(this.searchWord);
    // let data = this.contacts.filter(o =>
    //      o.name.toLowerCase().startsWith(this.searchWord.toLowerCase()));
    // this.filterOutput.emit(data);
  }
}
