import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContactModel} from '../shared/model/contact.model';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';
import {MessageModel} from '../shared/model/message.model';
import {Observable} from 'rxjs';
import {PageResponseModel} from '../shared/model/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private static CONTACT_ENDPOINT = 'http://localhost:8089/api/chat';

  constructor(private httpClient: HttpClient, private auth: AuthenticationService) {
  }

  public getMessagesByContact(contact: ContactModel, pageNumber: number): Observable<Map<number, MessageModel>> {
    return this.httpClient
      .get(MessageService.CONTACT_ENDPOINT + '/' + contact.dialCodeAndPhoneNumber + '/' + pageNumber)
      .pipe(map((response: PageResponseModel<MessageModel>) => {
        return response.content
          .reduce((accumulatingMap: Map<any, any>, messageModel: MessageModel) => {
            accumulatingMap.set(messageModel.sentTimestamp, messageModel);
            return accumulatingMap;
          }, new Map());
      }));
  }
}
