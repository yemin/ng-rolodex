import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl:string = 'http://web01-dev-es1.colalab.com:50099/api/';

  constructor(private http: HttpClient) { }

  login(userData) {
    if(userData.username=='ymaung') {
      return Promise.resolve({
          id:123,
          username: userData.username
      });
    }
    else
    {
      return Promise.reject("Invalid User");
    }
  }

  logout() {
    return Promise.resolve();
  }

  getAllContacts(){
    const url = this.apiUrl + 'Contacts';
    return this.http.get(url).toPromise();
  }

  getContact(id){
    const url = this.apiUrl + "Contacts/" + id;
    return this.http.get(url).toPromise();
  }

  updateContact(data){
    const url = this.apiUrl + "Contacts/" + data.id;
    return this.http.put(url, data).toPromise();
  }

  deleteContact(id){
    const url = this.apiUrl + "Contacts/" + id;
    return this.http.delete(url).toPromise();
  }
  
  addContact(data){
    const url = this.apiUrl + "Contacts";
    return this.http.post(url, data).toPromise();
  }

  getUser(id){
    const url = this.apiUrl + "Users/" + id;
    return this.http.get(url).toPromise();
  }

  updateUser(data){
    const url = this.apiUrl + "Users/" + data.id;
    return this.http.put(url, data).toPromise();
  }
}
