import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ContactModel} from '../shared/model/contact.model';
import {MessageModel} from '../shared/model/message.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private static CONTACT_ENDPOINT = 'http://localhost:8089/api/contacts';
  private static SELECTED_CONTACT_CACHE_KEY = 'selectedContact';

  private contact: ContactModel = null;
  private contactSubject: Subject<ContactModel> = new Subject<ContactModel>();

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {
  }

  public getContactPhoneNumber(): string {
    return this.contact.dialCodeAndPhoneNumber;
  }

  public getSelectedContactSubject(): Subject<ContactModel> {
    return this.contactSubject;
  }

  public getSelectedContact(): ContactModel {
    if (this.contact !== null) {
      return this.contact;
    } else if (this.cookieService.check(ContactService.SELECTED_CONTACT_CACHE_KEY)) {
      return JSON.parse(this.cookieService.get(ContactService.SELECTED_CONTACT_CACHE_KEY));
    } else {
      return null;
    }
  }

  public setSelectedContact(contact) {
    this.contact = contact;
    this.cookieService.set(ContactService.SELECTED_CONTACT_CACHE_KEY, JSON.stringify(contact), 30);
    this.contactSubject.next(contact);
  }

  public getContacts(): Observable<ContactModel[]> {
    return this.httpClient.get<ContactModel[]>(ContactService.CONTACT_ENDPOINT);
  }

  public addContact(contact: ContactModel): Observable<any> {
    return this.httpClient.post(ContactService.CONTACT_ENDPOINT, [contact]);
  }
}
